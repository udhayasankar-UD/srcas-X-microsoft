import React from 'react';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'20px 22px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

const TIMELINE = [
  { date:'May 20', label:'Registration Deadline', done:true  },
  { date:'May 25', label:'Idea Submission',        done:true  },
  { date:'Jun 5',  label:'Shortlist Announced',    done:false },
  { date:'Jun 15', label:'Prototype Submission',   done:false },
  { date:'Jun 28', label:'Grand Finale',           done:false },
];

const ANNOUNCEMENTS = [
  { time:'2h ago', tag:'New',    text:'Mentorship sessions open — book your slot before June 3.' },
  { time:'1d ago', tag:'Update', text:'Problem statement details updated on the Problem Statements page.' },
  { time:'3d ago', tag:'',       text:'Welcome to SRCAS Hackathon 3.0! Registration confirmed.' },
];

const SDG_TAGS = [
  { num:1,  label:'No Poverty',         color:'#E5243B' },
  { num:3,  label:'Good Health',        color:'#4C9F38' },
  { num:6,  label:'Clean Water',        color:'#26BDE2' },
  { num:7,  label:'Clean Energy',       color:'#FCC30B' },
  { num:11, label:'Sustainable Cities', color:'#FD6925' },
  { num:13, label:'Climate Action',     color:'#3F7E44' },
];

function Stat({ icon, label, value, badge, badgeColor }) {
  return (
    <div style={card({ display:'flex', flexDirection:'column', gap:6 })}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ fontSize:28 }}>{icon}</div>
        {badge && <span style={{ fontSize:10, fontWeight:700, color:badgeColor, background:`${badgeColor}18`, padding:'3px 9px', borderRadius:20 }}>{badge}</span>}
      </div>
      <div style={{ fontSize:26, fontWeight:900, color:'#111' }}>{value}</div>
      <div style={{ fontSize:12, color:'#9ca3af', fontWeight:500 }}>{label}</div>
    </div>
  );
}

export default function OverviewTab() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Stats */}
      <div className="dash-grid-4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        <Stat icon="🏅" label="Current Round"    value="Round 1" badge="Active"    badgeColor="#4C9F38"/>
        <Stat icon="⏳" label="Days to Finals"   value="13"      badge="Jun 28"    badgeColor="#f59e0b"/>
        <Stat icon="👥" label="Registered Teams" value="284"     badge="+12 today" badgeColor="#26BDE2"/>
        <Stat icon="🎯" label="Your SDG Focus"   value="SDG 6"   badge="Clean Water" badgeColor="#26BDE2"/>
      </div>

      <div className="dash-grid-2" style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:16 }}>
        {/* Timeline */}
        <div className="dash-card" style={card()}>
          <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:18, display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ color:'#4C9F38' }}>◎</span> Event Timeline
          </div>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', paddingBottom: i<TIMELINE.length-1?16:0, position:'relative' }}>
              {i < TIMELINE.length-1 && <div style={{ position:'absolute', left:9, top:20, width:2, bottom:0, background: t.done ? '#4C9F38' : '#e5e7eb' }}/>}
              <div style={{ width:20, height:20, borderRadius:'50%', background: t.done ? '#4C9F38' : '#e5e7eb', flexShrink:0, zIndex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight: t.done?700:600, color: t.done?'#4C9F38':'#374151' }}>{t.label}</div>
                <div style={{ fontSize:11, color:'#9ca3af' }}>{t.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <div className="dash-card" style={card()}>
          <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ color:'#f59e0b' }}>📢</span> Announcements
          </div>
          {ANNOUNCEMENTS.map((a, i) => (
            <div key={i} style={{ paddingBottom: i<ANNOUNCEMENTS.length-1?14:0, marginBottom: i<ANNOUNCEMENTS.length-1?14:0, borderBottom: i<ANNOUNCEMENTS.length-1?'1px solid #f3f4f6':'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                {a.tag && <span style={{ fontSize:10, fontWeight:700, color:'#4C9F38', background:'#f0fdf4', padding:'2px 7px', borderRadius:20 }}>{a.tag}</span>}
                <span style={{ fontSize:10, color:'#9ca3af' }}>{a.time}</span>
              </div>
              <p style={{ fontSize:12, color:'#374151', lineHeight:1.5 }}>{a.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SDG Tags */}
      <div className="dash-card" style={card()}>
        <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
          <span>🌍</span> SDG Focus Areas
        </div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {SDG_TAGS.map(g => (
            <div key={g.num} style={{ display:'flex', alignItems:'center', gap:8, background:`${g.color}12`, border:`1.5px solid ${g.color}35`, borderRadius:10, padding:'7px 14px' }}>
              <div style={{ width:24, height:24, borderRadius:6, background:g.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:900, fontSize:11 }}>{g.num}</div>
              <span style={{ fontSize:12, fontWeight:600, color:'#374151' }}>{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
