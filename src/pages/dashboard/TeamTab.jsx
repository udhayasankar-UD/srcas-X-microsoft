import React, { useState } from 'react';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'22px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

const MEMBERS = [
  { name:'Arjun S.', role:'Team Lead', email:'arjun@srcas.ac.in',   color:'#4C9F38' },
  { name:'Priya M.', role:'Developer', email:'priya@srcas.ac.in',   color:'#26BDE2' },
  { name:'Ravi K.',  role:'Designer',  email:'ravi@srcas.ac.in',    color:'#FCC30B' },
];

const PROGRESS = [
  { label:'Idea Submission',    pct:100, color:'#4C9F38' },
  { label:'Team Verification',  pct:100, color:'#4C9F38' },
  { label:'Prototype',          pct:40,  color:'#f59e0b' },
  { label:'Presentation Deck',  pct:20,  color:'#f59e0b' },
  { label:'Final Submission',   pct:0,   color:'#e5e7eb' },
];

function ProgressBar({ label, pct, color }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{label}</span>
        <span style={{ fontSize:12, fontWeight:700, color: pct===100?'#4C9F38': pct>0?'#f59e0b':'#9ca3af' }}>{pct}%</span>
      </div>
      <div style={{ height:8, background:'#f3f4f6', borderRadius:99 }}>
        <div style={{ height:'100%', width:`${pct}%`, background:pct===0?'#e5e7eb':color, borderRadius:99, transition:'width 0.5s ease' }}/>
      </div>
    </div>
  );
}

export default function TeamTab() {
  const [editing, setEditing] = useState(false);
  const [project, setProject] = useState('AquaSense');
  const [desc, setDesc] = useState('A real-time water quality monitoring system using IoT sensors and Azure ML to predict contamination before it affects communities.');

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
      {/* Team header */}
      <div className="dash-card" style={card({ display:'flex', alignItems:'center', gap:18, flexWrap:'wrap' })}>
        <div style={{ width:56, height:56, borderRadius:14, background:'linear-gradient(135deg,#4C9F38,#26BDE2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>🚀</div>
        <div style={{ flex:1, minWidth:160 }}>
          <div style={{ fontSize:20, fontWeight:900, color:'#111' }}>Team Nova</div>
          <div style={{ fontSize:13, color:'#6b7280', marginTop:2 }}>Project: <strong style={{ color:'#4C9F38' }}>{project}</strong> · SDG 6 – Clean Water & Sanitation</div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <span style={{ background:'#f0fdf4', border:'1.5px solid #4C9F38', borderRadius:20, padding:'5px 14px', fontSize:12, fontWeight:700, color:'#4C9F38' }}>Under Review</span>
          <button onClick={() => setEditing(!editing)} style={{ border:'1.5px solid #e5e7eb', borderRadius:10, padding:'6px 14px', fontSize:12, fontWeight:600, color:'#374151', background:'#fff', cursor:'pointer' }}>
            {editing ? 'Save' : '✏️ Edit'}
          </button>
        </div>
      </div>

      <div className="dash-grid-2" style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:18 }}>
        {/* Members */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div className="dash-card" style={card()}>
            <div style={{ fontSize:13, fontWeight:800, color:'#111', marginBottom:14 }}>👥 Team Members</div>
            {MEMBERS.map((m, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'#f9fafb', borderRadius:12, marginBottom: i<MEMBERS.length-1?8:0 }}>
                <div style={{ width:38, height:38, borderRadius:'50%', background:m.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:15, flexShrink:0 }}>{m.name[0]}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>{m.name}</div>
                  <div style={{ fontSize:11, color:'#9ca3af' }}>{m.email}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:'#6b7280', background:'#efefef', padding:'3px 10px', borderRadius:20 }}>{m.role}</span>
              </div>
            ))}
            <button style={{ width:'100%', marginTop:12, padding:'10px', borderRadius:10, border:'1.5px dashed #d1d5db', background:'transparent', color:'#9ca3af', fontSize:13, fontWeight:600, cursor:'pointer' }}>
              + Invite Member
            </button>
          </div>

          {/* Project details */}
          <div className="dash-card" style={card()}>
            <div style={{ fontSize:13, fontWeight:800, color:'#111', marginBottom:12 }}>📋 Project Details</div>
            {editing ? (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:600, color:'#6b7280', display:'block', marginBottom:4 }}>Project Name</label>
                  <input value={project} onChange={e => setProject(e.target.value)} style={{ width:'100%', padding:'9px 12px', borderRadius:9, border:'1.5px solid #4C9F38', fontSize:13, outline:'none' }}/>
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:600, color:'#6b7280', display:'block', marginBottom:4 }}>Description</label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={4} style={{ width:'100%', padding:'9px 12px', borderRadius:9, border:'1.5px solid #4C9F38', fontSize:13, outline:'none', resize:'vertical' }}/>
                </div>
              </div>
            ) : (
              <p style={{ fontSize:13, color:'#374151', lineHeight:1.6 }}>{desc}</p>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="dash-card" style={card()}>
          <div style={{ fontSize:13, fontWeight:800, color:'#111', marginBottom:16 }}>📊 Submission Progress</div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {PROGRESS.map((p, i) => <ProgressBar key={i} {...p}/>)}
          </div>
          <div style={{ marginTop:18, padding:'12px', background:'#f0fdf4', borderRadius:10, border:'1px solid #bbf7d0' }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#4C9F38' }}>Overall Progress</div>
            <div style={{ fontSize:24, fontWeight:900, color:'#4C9F38' }}>52%</div>
            <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>2 of 5 stages complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
