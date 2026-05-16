import React from 'react';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'20px 22px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

const TIMELINE = [
  { date:'May 20', label:'Registration Deadline', done:true  },
  { date:'May 25', label:'Idea Submission',       done:true  },
  { date:'Jun 5',  label:'Shortlist Announced',   done:false },
  { date:'Jun 15', label:'Prototype Submission',  done:false },
  { date:'Jun 28', label:'Grand Finale',          done:false },
];

const ANNOUNCEMENTS = [
  { time:'2h ago', tag:'New',    text:'Mentorship sessions open — book your slot before June 3.' },
  { time:'1d ago', tag:'Update', text:'Problem statement details updated on the Problem Statements page.' },
  { time:'3d ago', tag:'',       text:'Welcome to SRCAS Hackathon 3.0! Registration confirmed.' },
];

const TEAM_MEMBERS = [
  { name: 'Arjun S.', role: 'Team Leader', color: '#8b5cf6' },
  { name: 'Priya M.', role: 'Member',      color: '#3b82f6' },
  { name: 'Ravi K.',  role: 'Member',      color: '#ec4899' }
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

function Stat({ icon, label, value, badge, badgeColor }) {
  return (
    <div className="dash-card" style={card({ display:'flex', flexDirection:'column', gap:6 })}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ fontSize:28 }}>{icon}</div>
        {badge && <span style={{ fontSize:10, fontWeight:700, color:badgeColor, background:`${badgeColor}18`, padding:'3px 9px', borderRadius:20 }}>{badge}</span>}
      </div>
      <div style={{ fontSize:26, fontWeight:900, color:'#111' }}>{value}</div>
      <div style={{ fontSize:12, color:'#9ca3af', fontWeight:500 }}>{label}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

export default function OverviewTab() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      
      {/* 1. Horizontal Timeline */}
      <div className="dash-card" style={{ padding:'20px 0', overflowX:'auto' }}>
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

      {/* 2. & 3. Team Members and Announcements */}
      <div className="dash-grid-2" style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:16 }}>
        
        {/* Left Column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Team Member Card */}
          <div className="dash-card" style={card()}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:16 }}>Team Leader</div>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
              <div style={{ width:36, height:36, borderRadius:'8px', background:TEAM_MEMBERS[0].color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:800 }}>{TEAM_MEMBERS[0].name[0]}</div>
              <div style={{ fontSize:14, fontWeight:600, color:'#374151' }}>{TEAM_MEMBERS[0].name}</div>
              <CheckIcon />
            </div>

            <div style={{ height:1, background:'#f3f4f6', margin:'0 -22px 20px -22px' }}/>

            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:16 }}>Team Members</div>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {TEAM_MEMBERS.slice(1).map((m, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'8px', background:m.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:800 }}>{m.name[0]}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:'#374151' }}>{m.name}</div>
                  <CheckIcon />
                </div>
              ))}
            </div>
          </div>

          {/* Announcements Card (Moved under Team Info) */}
          <div className="dash-card" style={card()}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ color:'#f59e0b' }}>📢</span> Announcements
            </div>
            {ANNOUNCEMENTS.map((a, i) => (
              <div key={i} style={{ paddingBottom: i<ANNOUNCEMENTS.length-1?14:0, marginBottom: i<ANNOUNCEMENTS.length-1?14:0, borderBottom: i<ANNOUNCEMENTS.length-1?'1px solid #f3f4f6':'none' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                  {a.tag && <span style={{ fontSize:10, fontWeight:700, color:'#4C9F38', background:'#f0fdf4', padding:'2px 8px', borderRadius:20 }}>{a.tag}</span>}
                  <span style={{ fontSize:11, color:'#9ca3af', fontWeight:500 }}>{a.time}</span>
                </div>
                <p style={{ fontSize:13, color:'#374151', lineHeight:1.5, margin:0 }}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Submission Progress Bars */}
          <div className="dash-card" style={card()}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111', marginBottom:16 }}>📊 Team Progress</div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {PROGRESS.map((p, i) => <ProgressBar key={i} {...p}/>)}
            </div>
            <div style={{ marginTop:18, padding:'14px 16px', background:'#f0fdf4', borderRadius:10, border:'1px solid #bbf7d0' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#166534' }}>Overall Progress</div>
              <div style={{ fontSize:28, fontWeight:900, color:'#166534', marginTop:4 }}>52%</div>
              <div style={{ fontSize:12, color:'#15803d', marginTop:4, fontWeight:600 }}>2 of 5 stages complete</div>
            </div>
          </div>
          
          
        </div>

      </div>

      {/* 4. Stats */}
      <div className="dash-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <Stat icon="🏅" label="Current Round"    value="Round 1" badge="Active"    badgeColor="#4C9F38"/>
        <Stat icon="⏳" label="Days to Finals"   value="13"      badge="Jun 28"    badgeColor="#f59e0b"/>
        <Stat icon="👥" label="Registered Teams" value="284"     badge="+12 today" badgeColor="#26BDE2"/>
        <Stat icon="🎯" label="Your SDG Focus"   value="SDG 6"   badge="Clean Water" badgeColor="#26BDE2"/>
      </div>

    </div>
  );
}
