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
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#4C9F38' }}/>
            <span style={{ fontSize:12, color:'#4C9F38', fontWeight:600 }}>Round 1 · Active</span>
            <div style={{ marginLeft:8, width:34, height:34, borderRadius:'50%', background:'linear-gradient(135deg,#4C9F38,#26BDE2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:13 }}>A</div>
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
