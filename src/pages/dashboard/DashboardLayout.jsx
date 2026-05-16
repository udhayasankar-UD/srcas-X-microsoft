import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SDG_COLORS = ['#E5243B','#DDA63A','#4C9F38','#C5192D','#FF3A21','#26BDE2','#FCC30B','#A21942','#FD6925','#DD1367','#FD9D24','#BF8B2E','#3F7E44','#0A97D9','#56C02B','#00689D','#19486A'];

export function SDGWheel({ size = 32 }) {
  const cx = size/2, cy = size/2, r = size/2-1, ri = r*0.38, n = 17, gap = 0.04;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {SDG_COLORS.map((color, i) => {
        const a1 = (2*Math.PI/n)*i - Math.PI/2 + gap/2;
        const a2 = (2*Math.PI/n)*(i+1) - Math.PI/2 - gap/2;
        return <path key={i} d={`M${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(a2)} ${cy+r*Math.sin(a2)} L${cx+ri*Math.cos(a2)} ${cy+ri*Math.sin(a2)} A${ri} ${ri} 0 0 0 ${cx+ri*Math.cos(a1)} ${cy+ri*Math.sin(a1)}Z`} fill={color}/>;
      })}
      <circle cx={cx} cy={cy} r={ri*0.8} fill="white"/>
    </svg>
  );
}

const NAV = [
  { id:'overview',   icon:'⊞',  label:'Overview'   },
  { id:'team',       icon:'◎',  label:'My Team'    },
  { id:'submission', icon:'↑',  label:'Submission' },
  { id:'resources',  icon:'≡',  label:'Resources'  },
  { id:'schedule',   icon:'▤',  label:'Schedule'   },
];

export default function DashboardLayout({ activeTab, setActiveTab, children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:"'Inter','Segoe UI',sans-serif", background:'#f5f6fa' }}>
      {/* Sidebar */}
      <aside className="dash-sidebar" style={{ width: collapsed ? 64 : 230, background:'#fff', borderRight:'1.5px solid #ebebeb', display:'flex', flexDirection:'column', transition:'width 0.25s ease', flexShrink:0, position:'sticky', top:0, height:'100vh', overflow:'hidden', zIndex:10 }}>
        {/* Logo */}
        <div onClick={() => setCollapsed(!collapsed)} style={{ padding:'20px 16px', borderBottom:'1.5px solid #ebebeb', display:'flex', alignItems:'center', gap:10, cursor:'pointer', minHeight:64 }}>
          <SDGWheel size={32}/>
          {!collapsed && <div>
            <div style={{ fontWeight:800, fontSize:13, color:'#111', whiteSpace:'nowrap', letterSpacing:'0.04em' }}>SDG HACKATHON</div>
            <div style={{ fontSize:10, color:'#aaa', whiteSpace:'nowrap' }}>Participant Portal</div>
          </div>}
        </div>

        {/* Nav items */}
        <nav style={{ flex:1, padding:'10px 8px', display:'flex', flexDirection:'column', gap:2 }}>
          {NAV.map(item => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:10, border:'none', cursor:'pointer', textAlign:'left', width:'100%', background: active ? '#f0fdf4' : 'transparent', outline:'none', transition:'all 0.15s' }}
                onMouseEnter={e => { if(!active) e.currentTarget.style.background='#f9fafb'; }}
                onMouseLeave={e => { if(!active) e.currentTarget.style.background='transparent'; }}>
                <span style={{ fontSize:17, flexShrink:0, color: active ? '#4C9F38' : '#9ca3af', fontWeight:800 }}>{item.icon}</span>
                {!collapsed && <span style={{ fontSize:13, fontWeight: active ? 700 : 500, color: active ? '#4C9F38' : '#374151', whiteSpace:'nowrap' }}>{item.label}</span>}
                {!collapsed && active && <div style={{ marginLeft:'auto', width:6, height:6, borderRadius:'50%', background:'#4C9F38' }}/>}
              </button>
            );
          })}
        </nav>

        {/* Footer nav */}
        <div style={{ padding:'10px 8px', borderTop:'1.5px solid #ebebeb' }}>
          <button onClick={() => navigate('/')} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:10, border:'none', cursor:'pointer', width:'100%', background:'transparent', textAlign:'left', outline:'none' }}
            onMouseEnter={e => e.currentTarget.style.background='#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            <span style={{ fontSize:15, color:'#9ca3af' }}>←</span>
            {!collapsed && <span style={{ fontSize:12, color:'#9ca3af', fontWeight:500 }}>Back to Site</span>}
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="dash-main-wrapper" style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        {/* Topbar */}
        <header className="dash-header" style={{ background:'#fff', borderBottom:'1.5px solid #ebebeb', padding:'0 28px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:9 }}>
          <div>
            <h1 style={{ fontSize:17, fontWeight:800, color:'#111', margin:0 }}>
              {NAV.find(n => n.id === activeTab)?.label}
            </h1>
            <p className="dash-subtitle" style={{ fontSize:11, color:'#9ca3af', margin:0 }}>SRCAS Hackathon 3.0 · Microsoft Imagine Cup</p>
          </div>
          <div className="dash-header-right" style={{ display:'flex', alignItems:'center', gap:10 }}>
            {/* Notification Icon */}
            <button onClick={() => setShowAnnouncements(true)} style={{ background:'transparent', border:'none', cursor:'pointer', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:4, marginRight:4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <div style={{ position:'absolute', top:2, right:4, width:8, height:8, borderRadius:'50%', background:'#E5243B', border:'2px solid #fff' }}/>
            </button>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#4C9F38' }}/>
            <span style={{ fontSize:12, color:'#4C9F38', fontWeight:600 }}>Round 1 · Active</span>
            <div onClick={() => setShowProfile(true)} style={{ cursor:'pointer', marginLeft:8, width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#4C9F38,#26BDE2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:13 }}>A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="dash-content" style={{ flex:1, padding:'24px 28px', overflow:'auto' }}>
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="dash-bottom-nav">
        {NAV.map(item => {
          const active = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, background:'transparent', border:'none', outline:'none', padding:'8px', flex:1, cursor:'pointer' }}>
              <span style={{ fontSize:20, color: active ? '#4C9F38' : '#9ca3af', fontWeight: active ? 900 : 500 }}>{item.icon}</span>
              <span style={{ fontSize:10, color: active ? '#4C9F38' : '#9ca3af', fontWeight: active ? 700 : 500 }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Announcements Modal */}
      {showAnnouncements && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#fff', borderRadius:16, width:'100%', maxWidth:500, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.2)', position:'relative' }}>
            <div style={{ padding:'20px 24px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:18, fontWeight:800, color:'#111' }}>Notifications</div>
              <button onClick={() => setShowAnnouncements(false)} style={{ background:'none', border:'none', fontSize:24, cursor:'pointer', color:'#9ca3af' }}>&times;</button>
            </div>
            <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:16, maxHeight:'70vh', overflowY:'auto' }}>
              {[
                { time:'2h ago', tag:'New',    text:'Mentorship sessions open — book your slot before June 3.' },
                { time:'1d ago', tag:'Update', text:'Problem statement details updated on the Problem Statements page.' },
                { time:'3d ago', tag:'',       text:'Welcome to SRCAS Hackathon 3.0! Registration confirmed.' },
              ].map((a, i, arr) => (
                <div key={i} style={{ paddingBottom: i<arr.length-1?14:0, marginBottom: i<arr.length-1?14:0, borderBottom: i<arr.length-1?'1px solid #f3f4f6':'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                    {a.tag && <span style={{ fontSize:10, fontWeight:700, color:'#4C9F38', background:'#f0fdf4', padding:'2px 8px', borderRadius:20 }}>{a.tag}</span>}
                    <span style={{ fontSize:11, color:'#9ca3af', fontWeight:500 }}>{a.time}</span>
                  </div>
                  <p style={{ fontSize:13, color:'#374151', lineHeight:1.5, margin:0 }}>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'#fff', borderRadius:16, width:'100%', maxWidth:600, overflow:'hidden', boxShadow:'0 20px 40px rgba(0,0,0,0.2)', position:'relative' }}>
            <div style={{ padding:'20px 24px', borderBottom:'1px solid #f3f4f6', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:18, fontWeight:800, color:'#111' }}>User Profile</div>
              <button onClick={() => setShowProfile(false)} style={{ background:'none', border:'none', fontSize:24, cursor:'pointer', color:'#9ca3af' }}>&times;</button>
            </div>
            <div style={{ padding:'24px', display:'flex', flexDirection:'column', gap:16, maxHeight:'75vh', overflowY:'auto' }}>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:6 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'#111' }}>First Name</label>
                  <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', gap:10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input type="text" placeholder="Enter your first name" style={{ border:'none', outline:'none', width:'100%', fontSize:13 }}/>
                  </div>
                </div>
                <div style={{ flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:6 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'#111' }}>Last Name</label>
                  <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', gap:10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input type="text" placeholder="Enter your last name" style={{ border:'none', outline:'none', width:'100%', fontSize:13 }}/>
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'#111' }}>Email Address</label>
                <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', gap:10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input type="email" placeholder="Enter your email address" style={{ border:'none', outline:'none', width:'100%', fontSize:13 }}/>
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                <label style={{ fontSize:12, fontWeight:700, color:'#111' }}>College / Organization</label>
                <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', gap:10 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                  <input type="text" placeholder="Enter your college or organization" style={{ border:'none', outline:'none', width:'100%', fontSize:13 }}/>
                </div>
              </div>

              <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:6 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'#111' }}>Phone Number</label>
                  <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:8, overflow:'hidden' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, padding:'10px 14px', background:'#f9fafb', borderRight:'1px solid #e5e7eb' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span style={{ fontSize:13, color:'#374151' }}>+91</span>
                    </div>
                    <input type="tel" placeholder="Enter your phone number" style={{ border:'none', outline:'none', width:'100%', fontSize:13, padding:'10px 14px' }}/>
                  </div>
                </div>
                <div style={{ flex:1, minWidth:200, display:'flex', flexDirection:'column', gap:6 }}>
                  <label style={{ fontSize:12, fontWeight:700, color:'#111' }}>Year / Department</label>
                  <div style={{ display:'flex', alignItems:'center', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'10px 14px', gap:10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    <select style={{ border:'none', outline:'none', width:'100%', fontSize:13, background:'transparent', color:'#6b7280', appearance:'none' }}>
                      <option>Select year / department</option>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                    </select>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ pointerEvents:'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding:'20px 24px', borderTop:'1px solid #f3f4f6', display:'flex', justifyContent:'flex-end', gap:12 }}>
              <button onClick={() => setShowProfile(false)} style={{ padding:'10px 18px', borderRadius:10, border:'1.5px solid #e5e7eb', background:'#fff', fontWeight:600, color:'#374151', cursor:'pointer' }}>Cancel</button>
              <button onClick={() => setShowProfile(false)} style={{ padding:'10px 24px', borderRadius:10, border:'none', background:'#4C9F38', fontWeight:700, color:'#fff', cursor:'pointer' }}>Save Profile</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        button{font-family:inherit}
        input,textarea{font-family:inherit}
        .dash-bottom-nav { display: none; }
        @media (max-width: 768px) {
          .dash-sidebar { display: none !important; }
          .dash-bottom-nav { 
            display: flex; position: fixed; bottom: 0; left: 0; right: 0; 
            background: #fff; border-top: 1.5px solid #ebebeb; z-index: 50; 
            justify-content: space-between; align-items: center; 
            padding-bottom: env(safe-area-inset-bottom);
          }
          .dash-main-wrapper { padding-bottom: 60px !important; }
          .dash-header { padding: 12px 16px !important; height: auto !important; flex-direction: column; align-items: flex-start !important; justify-content: center; gap: 4px; }
          .dash-subtitle { display: none !important; }
          .dash-header-right { position: absolute; right: 16px; top: 16px; }
          .dash-content { padding: 16px !important; }
          .dash-grid-2 { grid-template-columns: 1fr !important; }
          .dash-grid-4 { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .dash-card { padding: 16px !important; }
          .dash-hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
