import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'22px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

const STEPS = ['Project Info','Links & Repo','Review & Submit'];

const SDG_OPTIONS = [
  "SDG 1 - No Poverty", "SDG 2 - Zero Hunger", "SDG 3 - Good Health", "SDG 4 - Quality Education",
  "SDG 5 - Gender Equality", "SDG 6 - Clean Water", "SDG 7 - Clean Energy", "SDG 8 - Economic Growth",
  "SDG 9 - Industry & Innovation", "SDG 10 - Reduced Inequalities", "SDG 11 - Sustainable Cities",
  "SDG 12 - Responsible Consumption", "SDG 13 - Climate Action", "SDG 14 - Life Below Water",
  "SDG 15 - Life on Land", "SDG 16 - Peace & Justice", "SDG 17 - Partnerships"
];

function Field({ label, value, onChange, placeholder, type='text', hint }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <label style={{ fontSize:13, fontWeight:600, color:'#374151' }}>{label}</label>
        {hint && <span style={{ fontSize:11, color:'#9ca3af' }}>{hint}</span>}
      </div>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={e => { e.target.style.borderColor='#4C9F38'; e.target.style.boxShadow='0 0 0 3px rgba(76,159,56,0.1)'; }}
        onBlur={e  => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
        style={{ padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', transition:'border-color 0.2s' }}/>
    </div>
  );
}

export default function SubmissionTab({ hasTeam, teamData, teamMembers, submissions, setSubmissions }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  
  const [sdgOpen, setSdgOpen] = useState(false);
  const sdgRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sdgRef.current && !sdgRef.current.contains(event.target)) {
        setSdgOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if they already submitted
  const alreadySubmitted = submissions && submissions.length > 0;
  
  const [form, setForm] = useState({
    title: alreadySubmitted ? submissions[0].project_title : '',
    sdg: alreadySubmitted ? (submissions[0].sdg_goal ? submissions[0].sdg_goal.split(', ') : []) : [],
    category: alreadySubmitted ? submissions[0].category : '',
    description: alreadySubmitted ? submissions[0].project_description : '',
    github: alreadySubmitted ? submissions[0].github_url : '',
    demo: alreadySubmitted ? submissions[0].demo_video_url : '',
    pdf: null,
    pdf_url: alreadySubmitted ? submissions[0].pdf_url : ''
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    if (!alreadySubmitted && teamData) {
      const draft = localStorage.getItem(`submission_draft_${teamData.id}`);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setForm(prev => ({ ...prev, ...parsed, pdf: null })); // PDF files can't be stored in localStorage
        } catch(e) {}
      }
    }
  }, [teamData, alreadySubmitted]);

  const handleSaveDraft = () => {
    if (!teamData) return;
    const draft = { ...form, pdf: null };
    localStorage.setItem(`submission_draft_${teamData.id}`, JSON.stringify(draft));
    setSaveMsg('Progress saved successfully! You can return later.');
    setTimeout(() => setSaveMsg(''), 4000);
  };

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target ? e.target.value : e }));

  const handleSdgToggle = (val) => {
    setForm(prev => {
      const current = Array.isArray(prev.sdg) ? prev.sdg : (prev.sdg ? prev.sdg.split(', ') : []);
      if (current.includes(val)) {
        return { ...prev, sdg: current.filter(s => s !== val) };
      } else {
        return { ...prev, sdg: [...current, val] };
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      let pdf_url = '';
      
      // Upload PDF if provided
      if (form.pdf) {
        const fileExt = form.pdf.name.split('.').pop();
        const fileName = `${teamData.id}-${Math.random()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('presentations_deck')
          .upload(fileName, form.pdf);
          
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('presentations_deck')
          .getPublicUrl(fileName);
          
        pdf_url = publicUrl;
      }

      const newSubmission = {
        team_id: teamData.id,
        project_title: form.title,
        sdg_goal: Array.isArray(form.sdg) ? form.sdg.join(', ') : form.sdg,
        category: form.category,
        project_description: form.description,
        github_url: form.github,
        demo_video_url: form.demo,
        pdf_url: pdf_url
      };

      // Insert to submissions table
      const { error } = await supabase.from('submissions').insert(newSubmission);

      if (error) throw error;
      
      if (setSubmissions) setSubmissions([newSubmission]);
      setForm(p => ({...p, pdf_url: pdf_url}));
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasTeam) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400 }}>
        <div className="dash-card" style={card({ width:'100%', maxWidth:500 })}>
          <div style={{ fontSize:40, textAlign:'center', marginBottom:12 }}>🔒</div>
          <h2 style={{ fontSize:20, fontWeight:900, color:'#111', textAlign:'center', marginBottom:8 }}>Submission Locked</h2>
          <p style={{ fontSize:14, color:'#6b7280', textAlign:'center', marginBottom:24 }}>You must register your team in the "My Team" tab before you can submit a project.</p>
        </div>
      </div>
    );
  }

  // Warning Logic: Lock if team has less than 2 members total (assuming legacy teams might have 0 in teamMembers if only leader exists)
  const isTeamTooSmall = !teamMembers || teamMembers.length === 0;

  if (isTeamTooSmall) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400 }}>
        <div className="dash-card" style={card({ width:'100%', maxWidth:500 })}>
          <div style={{ fontSize:40, textAlign:'center', marginBottom:12 }}>⚠️</div>
          <h2 style={{ fontSize:20, fontWeight:900, color:'#111', textAlign:'center', marginBottom:8 }}>Not Enough Members</h2>
          <p style={{ fontSize:14, color:'#6b7280', textAlign:'center', marginBottom:24 }}>You must have at least 2 members to submit a project. Go back to My Team and add a teammate.</p>
        </div>
      </div>
    );
  }

  if (alreadySubmitted || success) {
    const s = alreadySubmitted ? submissions[0] : form;
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        <div className="dash-card" style={card({ width:'100%', borderLeft:'4px solid #4C9F38' })}>
          <h2 style={{ fontSize:20, fontWeight:900, color:'#111', marginBottom:8, display:'flex', alignItems:'center', gap:10 }}>
            🎉 Project Submitted!
          </h2>
          <p style={{ fontSize:14, color:'#6b7280' }}>Your submission has been successfully received and is locked in for judging. Good luck!</p>
        </div>

        <div className="dash-card" style={card({ width:'100%' })}>
          <h3 style={{ fontSize:16, fontWeight:800, color:'#111', marginBottom:16, borderBottom:'1px solid #e5e7eb', paddingBottom:12 }}>Submission Details</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>Project Title</span>
              <span style={{ fontSize:14, color:'#111', fontWeight:500 }}>{s.project_title || s.title}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>SDG Goal</span>
              <span style={{ fontSize:14, color:'#111', fontWeight:500 }}>{s.sdg_goal || s.sdg}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>Category</span>
              <span style={{ fontSize:14, color:'#111', fontWeight:500 }}>{s.category}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>Description</span>
              <span style={{ fontSize:14, color:'#374151', lineHeight:1.5 }}>{s.project_description || s.description}</span>
            </div>
            {(s.github_url || s.github) && (
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>GitHub</span>
                <a href={s.github_url || s.github} target="_blank" rel="noreferrer" style={{ fontSize:14, color:'#00689D', textDecoration:'none' }}>{s.github_url || s.github}</a>
              </div>
            )}
            {(s.demo_video_url || s.demo) && (
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>Demo Video</span>
                <a href={s.demo_video_url || s.demo} target="_blank" rel="noreferrer" style={{ fontSize:14, color:'#00689D', textDecoration:'none' }}>{s.demo_video_url || s.demo}</a>
              </div>
            )}
            {(s.pdf_url) && (
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:8 }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase' }}>Presentation Deck</span>
                <a href={s.pdf_url} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 16px', background:'#f3f4f6', color:'#111', fontWeight:600, fontSize:13, borderRadius:8, textDecoration:'none', width:'fit-content', border:'1px solid #e5e7eb', transition:'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#e5e7eb'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#f3f4f6'; }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                  View PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Word counter logic
  const wordCount = form.description ? form.description.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
  const isOverLimit = wordCount > 500;

  const handleDescChange = (e) => {
    const val = e.target.value;
    const count = val.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (count <= 500 || val.length < form.description.length) {
      setForm({...form, description: val});
    }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Stepper */}
      <div className="dash-card" style={card({ padding:'16px 24px' })}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, flexWrap:'wrap' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background: i<=step ? '#4C9F38' : '#f3f4f6', border:`2px solid ${i<=step?'#4C9F38':'#e5e7eb'}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                  {i < step
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    : <span style={{ fontSize:12, fontWeight:800, color: i<=step?'#fff':'#9ca3af' }}>{i+1}</span>}
                </div>
                <span style={{ fontSize:11, fontWeight: i===step?700:500, color: i<=step?'#4C9F38':'#9ca3af', whiteSpace:'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length-1 && <div style={{ flex:1, height:2, background: i<step?'#4C9F38':'#e5e7eb', margin:'0 8px', marginBottom:20 }}/>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {errorMsg && <div style={{ padding:14, background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, color:'#dc2626', fontSize:13 }}>{errorMsg}</div>}
      {saveMsg && <div style={{ padding:14, background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, color:'#166534', fontSize:13 }}>💾 {saveMsg}</div>}

      {/* Step content */}
      <div className="dash-card" style={card()}>
        {step === 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {/* Section A: Team Reference */}
            <div style={{ padding:16, background:'#f9fafb', borderRadius:12, border:'1.5px solid #e5e7eb' }}>
              <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4C9F38" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Team Summary
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <div style={{ display:'flex', gap:10 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'#6b7280', width:90 }}>Team Name:</span>
                  <span style={{ fontSize:13, fontWeight:700, color:'#111' }}>{teamData.team_name}</span>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'#6b7280', width:90 }}>Members:</span>
                  <span style={{ fontSize:13, fontWeight:600, color:'#374151' }}>
                    {teamMembers ? teamMembers.map(m => m.full_name).join(', ') : 'No members found'}
                  </span>
                </div>
              </div>
            </div>

            {/* Section B: Project Info */}
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:4 }}>Project Information</div>
              <Field label="Project Title" value={form.title} onChange={set('title')} placeholder="Your project name"/>
              <div className="dash-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }} ref={sdgRef}>
                  <label style={{ fontSize:13, fontWeight:600, color:'#374151' }}>SDG Goals</label>
                  <div style={{ position: 'relative' }}>
                    <div 
                      onClick={() => setSdgOpen(!sdgOpen)}
                      style={{ 
                        padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, 
                        background:'#fff', cursor:'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        color: form.sdg && form.sdg.length > 0 ? '#111' : '#9ca3af'
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {form.sdg && form.sdg.length > 0 ? form.sdg.join(', ') : 'Select SDG Goals...'}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: sdgOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 8 }}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    
                    {sdgOpen && (
                      <div style={{ 
                        position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', zIndex: 10,
                        padding:'10px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'#fff', 
                        maxHeight:'200px', overflowY:'auto', display:'flex', flexDirection:'column', gap:'6px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                      }}>
                        {SDG_OPTIONS.map(opt => {
                          const isChecked = Array.isArray(form.sdg) ? form.sdg.includes(opt) : (form.sdg || '').includes(opt);
                          return (
                            <label key={opt} style={{ display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', fontSize:'13px', color:'#111', padding: '4px 0' }}>
                              <input type="checkbox" checked={isChecked} onChange={() => handleSdgToggle(opt)} style={{ cursor:'pointer', accentColor:'#4C9F38' }} />
                              {opt}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  <label style={{ fontSize:13, fontWeight:600, color:'#374151' }}>Category</label>
                  <select value={form.category} onChange={set('category')} style={{ padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, outline:'none', background:'#fff', color: form.category ? '#111' : '#9ca3af' }}>
                    <option value="" disabled>Select Category...</option>
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                    <option value="IoT">IoT</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'flex', justifyContent:'space-between' }}>
                  Project Description
                  <span style={{ color: wordCount >= 500 ? '#E5243B' : '#9ca3af', fontWeight:500, fontSize:11 }}>{wordCount} / 500 words</span>
                </label>
                <textarea value={form.description} onChange={handleDescChange} placeholder="Describe your solution..." rows={6}
                  style={{ padding:'12px 14px', borderRadius:10, border: wordCount >= 500 ? '1.5px solid #fecaca' : '1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', resize:'vertical', fontFamily:'inherit' }}/>
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:4 }}>Links & Presentation</div>
            <Field label="GitHub Repository (Optional)" value={form.github} onChange={set('github')} placeholder="https://github.com/your-repo"/>
            <Field label="Demo Video URL (Optional)" value={form.demo} onChange={set('demo')} placeholder="https://youtube.com/..."/>
            
            <div style={{ display:'flex', flexDirection:'column', gap:5, marginTop:8 }}>
              <label style={{ fontSize:13, fontWeight:700, color:'#374151' }}>Presentation Deck</label>
              <div style={{ fontSize:11, color:'#6b7280', marginBottom:4 }}>Please upload your presentation as a PDF. (Export your Office PPT to PDF format). Max 20MB.</div>
              <input type="file" accept=".pdf" onChange={e => setForm({...form, pdf: e.target.files[0]})}
                style={{ padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', background:'#f9fafb' }}/>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:4 }}>Review Your Submission</div>
            {[['Project Title',form.title],['SDG Goal',form.sdg],['Category',form.category],['GitHub',form.github],['Demo Video',form.demo], ['Presentation PDF', form.pdf ? form.pdf.name : 'No file chosen']].map(([k,v]) => (
              <div key={k} style={{ display:'flex', gap:12, padding:'10px 14px', background:'#f9fafb', borderRadius:10 }}>
                <span style={{ fontSize:12, fontWeight:700, color:'#6b7280', minWidth:110, flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:12, color:'#374151', wordBreak:'break-all' }}>{v || '-'}</span>
              </div>
            ))}
            <div style={{ padding:14, background:'#f0fdf4', border:'1.5px solid #bbf7d0', borderRadius:10 }}>
              <p style={{ fontSize:12, color:'#14532d', margin:0 }}>✅ By submitting, you confirm all information is accurate and your project is your original work. You cannot edit this after submission.</p>
            </div>
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <button onClick={() => setStep(s => Math.max(0, s-1))} style={{ padding:'12px 22px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:13, fontWeight:600, cursor: step===0?'not-allowed':'pointer', color: step===0?'#d1d5db':'#374151', opacity: step===0?0.5:1, textAlign:'center', whiteSpace:'nowrap' }} disabled={step===0}>
          ← Previous
        </button>
        
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'flex-end' }}>
          <button onClick={handleSaveDraft} style={{ padding:'12px 18px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'#f9fafb', fontSize:13, fontWeight:600, cursor:'pointer', color:'#374151', transition:'all 0.2s', textAlign:'center', whiteSpace:'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.background='#f3f4f6'} onMouseLeave={e => e.currentTarget.style.background='#f9fafb'}>
            Save Progress
          </button>
          {step < STEPS.length-1
            ? <button onClick={() => setStep(s => s+1)} style={{ padding:'12px 24px', borderRadius:10, border:'none', background:'#4C9F38', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', textAlign:'center', whiteSpace:'nowrap' }}>Next →</button>
            : <button disabled={submitting} onClick={handleSubmit} style={{ padding:'12px 28px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#4C9F38,#3d8a2e)', color:'#fff', fontSize:13, fontWeight:700, cursor:submitting?'not-allowed':'pointer', boxShadow:'0 4px 14px rgba(76,159,56,0.3)', opacity: submitting?0.7:1, textAlign:'center', whiteSpace:'nowrap' }}>
                {submitting ? 'Uploading...' : 'Submit Project 🚀'}
              </button>
          }
        </div>
      </div>
    </div>
  );
}
