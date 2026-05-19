import React, { useState, useEffect, useRef } from 'react';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'22px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

const STEPS = ['Project Info','Links & Repo','Review & Submit'];

function Field({ label, value, onChange, placeholder, type='text', hint }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <label style={{ fontSize:13, fontWeight:600, color:'#374151' }}>{label}</label>
        {hint && <span style={{ fontSize:11, color:'#9ca3af' }}>{hint}</span>}
      </div>
      {type === 'textarea' ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} rows={4}
          onFocus={e => { e.target.style.borderColor='#4C9F38'; e.target.style.boxShadow='0 0 0 3px rgba(76,159,56,0.1)'; }}
          onBlur={e  => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
          style={{ padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', resize:'vertical', transition:'border-color 0.2s' }}/>
      ) : (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          onFocus={e => { e.target.style.borderColor='#4C9F38'; e.target.style.boxShadow='0 0 0 3px rgba(76,159,56,0.1)'; }}
          onBlur={e  => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
          style={{ padding:'10px 13px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', transition:'border-color 0.2s' }}/>
      )}
    </div>
  );
}

function MarkdownField({ label, value, onChange, placeholder, hint }) {
  const [mode, setMode] = useState('write');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    onChange(e);
    setSaveStatus('Saving...');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSaveStatus('Auto-saved just now');
    }, 1000);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 4 }}>
        <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'#374151' }}>{label}</label>
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 6, padding: 2 }}>
            <button onClick={() => setMode('write')} style={{ padding: '2px 8px', fontSize: 11, fontWeight: mode==='write'?600:500, background: mode==='write'?'#fff':'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', boxShadow: mode==='write'?'0 1px 2px rgba(0,0,0,0.1)':'none', color: mode==='write'?'#111':'#6b7280' }}>Write</button>
            <button onClick={() => setMode('preview')} style={{ padding: '2px 8px', fontSize: 11, fontWeight: mode==='preview'?600:500, background: mode==='preview'?'#fff':'transparent', border: 'none', borderRadius: 4, cursor: 'pointer', boxShadow: mode==='preview'?'0 1px 2px rgba(0,0,0,0.1)':'none', color: mode==='preview'?'#111':'#6b7280' }}>Preview</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {saveStatus === 'Saving...' && <span style={{ fontSize:11, color:'#f59e0b', fontWeight: 500 }}>Saving...</span>}
          {saveStatus === 'Auto-saved just now' && <span style={{ fontSize:11, color:'#4C9F38', fontWeight: 500 }}>✓ Auto-saved just now</span>}
          {saveStatus === 'Saved' && hint && <span style={{ fontSize:11, color:'#9ca3af' }}>{hint}</span>}
        </div>
      </div>
      
      {mode === 'write' ? (
        <textarea value={value} onChange={handleChange} placeholder={placeholder} rows={6}
          onFocus={e => { e.target.style.borderColor='#4C9F38'; e.target.style.boxShadow='0 0 0 3px rgba(76,159,56,0.1)'; }}
          onBlur={e  => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
          style={{ padding:'12px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#111', outline:'none', resize:'vertical', transition:'border-color 0.2s', fontFamily: 'monospace' }}/>
      ) : (
        <div style={{ padding:'12px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:13, color:'#374151', minHeight: 120, background: '#f9fafb', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {value ? (
            value.split('\n').map((line, i) => {
              if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return <li key={i} style={{ marginLeft: 20 }}>{line.substring(2)}</li>;
              }
              if (line.trim().startsWith('# ')) return <h3 key={i} style={{ margin: '8px 0', color: '#111' }}>{line.substring(2)}</h3>;
              // Bold formatting support: **bold**
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return <div key={i} style={{ minHeight: 16 }}>
                {parts.map((part, j) => 
                  part.startsWith('**') && part.endsWith('**') 
                    ? <strong key={j} style={{ color: '#111' }}>{part.slice(2, -2)}</strong> 
                    : part
                )}
              </div>;
            })
          ) : (
            <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Nothing to preview</span>
          )}
        </div>
      )}
      {mode === 'write' && <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>Supports basic Markdown: # Heading, - Lists, **bold**</div>}
    </div>
  );
}

export default function SubmissionTab() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title:'AquaSense', sdg:'SDG 6 – Clean Water & Sanitation', category:'IoT & Hardware',
    description:'A real-time water quality monitoring system using IoT sensors and Azure ML to predict contamination.',
    github:'https://github.com/team-nova/aquasense', demo:'https://youtube.com/watch?v=...', slides:'https://docs.google.com/...',
    azure:'Yes – Azure IoT Hub, Azure ML, Azure Maps',
  });
  const set = (k) => (e) => setForm(p => ({ ...p, [k]:e.target.value }));

  if (submitted) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400, gap:16 }}>
      <div style={{ fontSize:60 }}>🎉</div>
      <h2 style={{ fontSize:22, fontWeight:900, color:'#111', margin:0 }}>Submission Received!</h2>
      <p style={{ fontSize:14, color:'#6b7280', textAlign:'center', maxWidth:400 }}>Your project has been submitted successfully. You'll receive a confirmation email shortly.</p>
      <button onClick={() => setSubmitted(false)} style={{ padding:'10px 24px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:13, fontWeight:600, cursor:'pointer', color:'#374151' }}>Submit Another Draft</button>
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Stepper */}
      <div className="dash-card" style={card({ padding:'16px 24px' })}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:0, flexWrap:'wrap' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer' }} onClick={() => setStep(i)}>
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

      {/* Step content */}
      <div className="dash-card" style={card()}>
        {step === 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:4 }}>Project Information</div>
            <div className="dash-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <Field label="Project Title"    value={form.title}       onChange={set('title')}       placeholder="Your project name"/>
              <Field label="SDG Goal"         value={form.sdg}         onChange={set('sdg')}         placeholder="e.g. SDG 6 – Clean Water"/>
              <Field label="Category"         value={form.category}    onChange={set('category')}    placeholder="e.g. AI/ML, IoT, Health"/>
              <Field label="Azure Services"   value={form.azure}       onChange={set('azure')}       placeholder="Azure services used" hint="Optional"/>
            </div>
            <MarkdownField label="Project Description" value={form.description} onChange={set('description')} placeholder="Describe your solution using Markdown..." hint="Min. 100 words"/>
          </div>
        )}
        {step === 1 && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:4 }}>Links & Repository</div>
            <Field label="GitHub Repository" value={form.github} onChange={set('github')} placeholder="https://github.com/your-repo"/>
            <Field label="Demo Video URL"    value={form.demo}   onChange={set('demo')}   placeholder="https://youtube.com/..."/>
            <Field label="Presentation Deck" value={form.slides} onChange={set('slides')} placeholder="https://docs.google.com/..."/>
            <div style={{ padding:14, background:'#fffbeb', border:'1.5px solid #fde68a', borderRadius:10 }}>
              <p style={{ fontSize:12, color:'#92400e', margin:0 }}>⚠️ Ensure your GitHub repo is public and the demo video is unlisted or public before submitting.</p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:4 }}>Review Your Submission</div>
            {[['Project Title',form.title],['SDG Goal',form.sdg],['Category',form.category],['GitHub',form.github],['Demo Video',form.demo],['Slides',form.slides]].map(([k,v]) => (
              <div key={k} style={{ display:'flex', gap:12, padding:'10px 14px', background:'#f9fafb', borderRadius:10 }}>
                <span style={{ fontSize:12, fontWeight:700, color:'#6b7280', minWidth:110, flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:12, color:'#374151', wordBreak:'break-all' }}>{v}</span>
              </div>
            ))}
            <div style={{ padding:14, background:'#f0fdf4', border:'1.5px solid #bbf7d0', borderRadius:10 }}>
              <p style={{ fontSize:12, color:'#14532d', margin:0 }}>✅ By submitting, you confirm all information is accurate and your project is your original work.</p>
            </div>
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button onClick={() => setStep(s => Math.max(0, s-1))} style={{ padding:'10px 22px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'#fff', fontSize:13, fontWeight:600, cursor: step===0?'not-allowed':'pointer', color: step===0?'#d1d5db':'#374151', opacity: step===0?0.5:1 }} disabled={step===0}>
          ← Previous
        </button>
        {step < STEPS.length-1
          ? <button onClick={() => setStep(s => s+1)} style={{ padding:'10px 24px', borderRadius:10, border:'none', background:'#4C9F38', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}>Next →</button>
          : <button onClick={() => setSubmitted(true)} style={{ padding:'10px 28px', borderRadius:10, border:'none', background:'linear-gradient(135deg,#4C9F38,#3d8a2e)', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', boxShadow:'0 4px 14px rgba(76,159,56,0.3)' }}>Submit Project 🚀</button>
        }
      </div>
    </div>
  );
}
