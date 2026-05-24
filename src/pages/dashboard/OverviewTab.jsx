import React from 'react';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'20px 22px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

const TIMELINE = [
  { date:'May 20', label:'Registration Deadline', done:true  },
  { date:'May 25', label:'Idea Submission',       done:true  },
  { date:'Jun 5',  label:'Shortlist Announced',   done:false },
  { date:'Jun 15', label:'Prototype Submission',  done:false },
  { date:'Jun 28', label:'Grand Finale',          done:false },
];

export default function OverviewTab({ hasTeam, teamData, setActiveTab, announcements = [] }) {
  // We use placeholder progress if they have a team, but wait on actual submissions.
  const overallProgress = hasTeam ? 20 : 0; 
  
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* 1. Horizontal Timeline */}
      <div className="dash-card" style={{ padding:'20px 0', overflowX:'auto', background:'#fff', borderRadius:14, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', minWidth:500, padding:'0 20px' }}>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ flex: 1, position:'relative', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
              {i < TIMELINE.length - 1 && (
                <div style={{ position:'absolute', top:10, left:'50%', width:'100%', height:2, background: t.done ? '#4C9F38' : '#e5e7eb', zIndex:0 }}/>
              )}
              <div style={{ width:22, height:22, borderRadius:'50%', background: t.done ? '#4C9F38' : '#e5e7eb', zIndex:1, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <div style={{ fontSize:12, fontWeight:700, color: t.done ? '#4C9F38' : '#374151', padding:'0 5px', lineHeight:1.3 }}>{t.label}</div>
              <div style={{ fontSize:11, color:'#9ca3af', marginTop:4 }}>{t.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-grid-2" style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:16 }}>
        {/* Left Column: Announcements */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div className="dash-card" style={card({ minHeight: 300 })}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ color:'#f59e0b' }}>📢</span> Announcements
            </div>
            {announcements.length > 0 ? (
              announcements.map((a, i) => (
                <div key={a.id || i} style={{ paddingBottom: i<announcements.length-1?14:0, marginBottom: i<announcements.length-1?14:0, borderBottom: i<announcements.length-1?'1px solid #f3f4f6':'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                    {a.tag && <span style={{ fontSize:10, fontWeight:700, color:'#4C9F38', background:'#f0fdf4', padding:'2px 8px', borderRadius:20 }}>{a.tag}</span>}
                    <span style={{ fontSize:11, color:'#9ca3af', fontWeight:500 }}>{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 style={{ fontSize:14, fontWeight:700, color:'#111', margin:'0 0 4px 0' }}>{a.title}</h4>
                  <p style={{ fontSize:13, color:'#374151', lineHeight:1.5, margin:0 }}>{a.message}</p>
                </div>
              ))
            ) : (
              <p style={{ fontSize:13, color:'#9ca3af', fontStyle:'italic' }}>No announcements yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: CTA or Team Info */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {!hasTeam ? (
            <div className="dash-card" style={card({ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight: 300, background:'linear-gradient(135deg, #f0fdf4, #e8f5e9)', border:'1px solid #bbf7d0' })}>
              <div style={{ fontSize:50, marginBottom:16 }}>🚀</div>
              <h3 style={{ fontSize:20, fontWeight:900, color:'#166534', margin:'0 0 8px 0', textAlign:'center' }}>You haven't formed a team yet!</h3>
              <p style={{ fontSize:14, color:'#15803d', textAlign:'center', maxWidth:300, marginBottom:24 }}>Create your team to unlock the submission portal and invite your teammates.</p>
              <button onClick={() => setActiveTab('team')} style={{ padding:'12px 24px', borderRadius:10, background:'#4C9F38', color:'#fff', fontWeight:800, fontSize:15, border:'none', cursor:'pointer', boxShadow:'0 4px 14px rgba(76,159,56,0.3)' }}>
                Create Team Now
              </button>
            </div>
          ) : (
            <div className="dash-card" style={card()}>
              <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:16 }}>🌟 Welcome, {teamData?.team_name}!</div>
              <div style={{ padding:'14px 16px', background:'#f9fafb', borderRadius:10, border:'1.5px solid #e5e7eb', marginBottom: 16 }}>
                <p style={{ margin:0, fontSize:14, color:'#374151' }}>Head over to the <strong>Submission</strong> tab to start filling out your project details. You can save your progress at any time!</p>
              </div>
              
              <div style={{ padding:'14px 16px', background:'#f0fdf4', borderRadius:10, border:'1px solid #bbf7d0' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#166534' }}>Overall Completion</div>
                <div style={{ height:8, background:'#dcfce7', borderRadius:99, margin:'10px 0' }}>
                  <div style={{ height:'100%', width:`${overallProgress}%`, background:'#4C9F38', borderRadius:99 }}/>
                </div>
                <div style={{ fontSize:12, color:'#15803d', fontWeight:600 }}>{overallProgress}% Complete</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
