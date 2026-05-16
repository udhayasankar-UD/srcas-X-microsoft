import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SDG_COLORS = ['#E5243B','#DDA63A','#4C9F38','#C5192D','#FF3A21','#26BDE2','#FCC30B','#A21942','#FD6925','#DD1367','#FD9D24','#BF8B2E','#3F7E44','#0A97D9','#56C02B','#00689D','#19486A'];

// Proper SDG wheel SVG using donut arc segments
function SDGWheel({ size = 120, innerRatio = 0.4 }) {
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 2;
  const ri = r * innerRatio;
  const n = 17;
  const gap = 0.03; // gap in radians between segments

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {SDG_COLORS.map((color, i) => {
        const startAngle = (2 * Math.PI / n) * i - Math.PI / 2 + gap / 2;
        const endAngle   = (2 * Math.PI / n) * (i + 1) - Math.PI / 2 - gap / 2;
        const x1 = cx + r  * Math.cos(startAngle), y1 = cy + r  * Math.sin(startAngle);
        const x2 = cx + r  * Math.cos(endAngle),   y2 = cy + r  * Math.sin(endAngle);
        const x3 = cx + ri * Math.cos(endAngle),   y3 = cy + ri * Math.sin(endAngle);
        const x4 = cx + ri * Math.cos(startAngle), y4 = cy + ri * Math.sin(startAngle);
        return (
          <path key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${ri} ${ri} 0 0 0 ${x4} ${y4} Z`}
            fill={color} />
        );
      })}
      <circle cx={cx} cy={cy} r={ri * 0.85} fill="white" />
    </svg>
  );
}

function SDGCard({ mode }) {
  const sdgs = [
    { num: 4,  label: 'Quality\nEducation',        color: '#C5192D' },
    { num: 5,  label: 'Gender\nEquality',           color: '#FF3A21' },
    { num: 7,  label: 'Affordable\nClean Energy',   color: '#FCC30B' },
    { num: 8,  label: 'Decent Work\n& Growth',      color: '#A21942' },
    { num: 9,  label: 'Industry &\nInfrastructure', color: '#FD6925' },
    { num: 10, label: 'Reduced\nInequalities',      color: '#DD1367' },
    { num: 13, label: 'Climate\nAction',            color: '#3F7E44' },
    { num: 17, label: 'Partnerships\nfor Goals',    color: '#19486A' },
  ];
  return (
    <div style={{ width:'100%', height:'100%', minHeight:'520px', background:'linear-gradient(135deg,#f0fdf4,#e8f5e9,#f0f9ff)', borderRadius:'24px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 24px', position:'relative', overflow:'hidden' }}>
      {/* Concentric rings */}
      {[100,160,220,280].map((s,i) => (
        <div key={i} style={{ position:'absolute', width:s, height:s, borderRadius:'50%', border:'1px solid rgba(76,159,56,0.12)', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none' }} />
      ))}

      {/* SDG GOALS badge */}
      <div style={{ position:'absolute', top:20, right:20, textAlign:'right', lineHeight:1.2 }}>
        <div style={{ fontSize:'8px', fontWeight:800, color:'#19486A', letterSpacing:'0.14em' }}>SUSTAINABLE</div>
        <div style={{ fontSize:'8px', fontWeight:800, color:'#19486A', letterSpacing:'0.14em' }}>DEVELOPMENT</div>
        <div style={{ fontSize:'20px', fontWeight:900, letterSpacing:'-0.01em' }}>
          {'GOALS'.split('').map((c,i) => <span key={i} style={{ color:['#E5243B','#DDA63A','#4C9F38','#C5192D','#26BDE2'][i] }}>{c}</span>)}
        </div>
      </div>

      <SDGWheel size={130} innerRatio={0.38} />

      {/* SDG tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'5px', width:'100%', maxWidth:'300px', marginTop:'14px' }}>
        {sdgs.map(({ num, label, color }) => (
          <div key={num} style={{ background:color, borderRadius:'7px', padding:'5px 3px', textAlign:'center', color:'#fff', fontSize:'8px', fontWeight:700, lineHeight:1.3 }}>
            <div style={{ fontSize:'15px', fontWeight:900, lineHeight:1 }}>{num}</div>
            <div style={{ whiteSpace:'pre-line', marginTop:'2px', opacity:0.9 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div style={{ marginTop:'18px', background:'#fff', borderRadius:'12px', padding:'14px 18px', boxShadow:'0 4px 20px rgba(0,0,0,0.07)', width:'100%', maxWidth:'300px' }}>
        <div style={{ fontSize:'24px', color:'#4C9F38', lineHeight:0.8, fontFamily:'Georgia,serif' }}>"</div>
        <p style={{ fontSize:'12px', color:'#333', margin:'4px 0 10px', lineHeight:1.5 }}>
          {mode === 'login' ? 'Join the movement of student innovators solving the world\'s biggest challenges.' : 'Build something that matters. Register your team and compete for a chance to present on the world stage.'}
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#4C9F38,#26BDE2)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:'11px', flexShrink:0 }}>M</div>
          <div>
            <div style={{ fontSize:'11px', fontWeight:700, color:'#111' }}>SRCAS Hackathon 3.0</div>
            <div style={{ fontSize:'10px', color:'#4C9F38', fontWeight:600 }}>in Association with Microsoft Imagine Cup</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialBtn({ icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'7px', padding:'10px 6px', borderRadius:'10px', border:'1.5px solid #e5e7eb', background: hov ? '#f9fafb' : '#fff', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#374151', transition:'all 0.2s', transform: hov ? 'translateY(-2px)' : 'none', boxShadow: hov ? '0 4px 12px rgba(0,0,0,0.08)' : 'none' }}>
      {icon}<span style={{ whiteSpace:'nowrap' }}>{label}</span>
    </button>
  );
}

function InputField({ label, type='text', placeholder, icon, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
      <label style={{ fontSize:'13px', fontWeight:600, color:'#374151' }}>{label}</label>
      <div style={{ display:'flex', alignItems:'center', border:`1.5px solid ${focused ? '#4C9F38' : '#e5e7eb'}`, borderRadius:'10px', padding:'0 12px', gap:'9px', background:'#fff', transition:'border-color 0.2s, box-shadow 0.2s', boxShadow: focused ? '0 0 0 3px rgba(76,159,56,0.12)' : 'none' }}>
        <span style={{ color: focused ? '#4C9F38' : '#9ca3af', flexShrink:0 }}>{icon}</span>
        <input type={show && type==='password' ? 'text' : type} placeholder={placeholder} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ flex:1, border:'none', outline:'none', padding:'11px 0', fontSize:'14px', color:'#111', background:'transparent' }} />
        {type === 'password' && (
          <button type="button" onClick={() => setShow(!show)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9ca3af', padding:0, flexShrink:0 }}>
            {show
              ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            }
          </button>
        )}
      </div>
    </div>
  );
}

const GoogleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>;
const FbIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const AppleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#111"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>;

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchMode = (next) => {
    if (next === mode || animating) return;
    setAnimating(true);
    setTimeout(() => { setMode(next); setAnimating(false); }, 380);
  };

  const isLogin = mode === 'login';

  const formPanel = (
    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'40px 44px', height:'100%', opacity: animating ? 0 : 1, transform: animating ? `translateX(${isLogin ? '-28px' : '28px'})` : 'translateX(0)', transition:'opacity 0.38s ease, transform 0.38s ease' }}>

      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px' }}>
        <SDGWheel size={38} innerRatio={0.36} />
        <div>
          <div style={{ fontWeight:800, fontSize:'14px', color:'#111', letterSpacing:'0.04em' }}>SDG FOCUSED</div>
          <div style={{ fontSize:'11px', color:'#6b7280' }}>Building a sustainable future</div>
        </div>
      </div>

      {/* Heading */}
      <h1 style={{ fontSize:'26px', fontWeight:900, color:'#111', margin:'0 0 6px', lineHeight:1.2 }}>
        {isLogin ? 'Welcome back!' : 'Create an account'}
      </h1>
      <p style={{ fontSize:'13px', color:'#6b7280', margin:'0 0 24px', lineHeight:1.6 }}>
        {isLogin ? 'Sign in to access your hackathon dashboard and track your submissions.' : 'Register to join SRCAS Hackathon 3.0 in Association with Microsoft Imagine Cup and showcase your innovation.'}
      </p>

      {/* ── Social buttons FIRST ── */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'16px' }}>
        <SocialBtn label="Google"   icon={<GoogleIcon />} />
        <SocialBtn label="Facebook" icon={<FbIcon />} />
        <SocialBtn label="Apple"    icon={<AppleIcon />} />
      </div>

      {/* Divider */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
        <div style={{ flex:1, height:'1px', background:'#e5e7eb' }} />
        <span style={{ fontSize:'12px', color:'#9ca3af', fontWeight:500 }}>or continue with email</span>
        <div style={{ flex:1, height:'1px', background:'#e5e7eb' }} />
      </div>

      {/* ── Fields AFTER social ── */}
      <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'20px' }}>
        {!isLogin && (
          <InputField label="Full Name" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
            icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} />
        )}
        <InputField label="Email" type="email" placeholder="youremail@domain.com" value={email} onChange={e => setEmail(e.target.value)}
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>} />
        <InputField label="Password" type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)}
          icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} />
      </div>

      {/* Submit */}
      <button style={{ width:'100%', padding:'13px', borderRadius:'11px', background:'linear-gradient(135deg,#4C9F38,#3d8a2e)', color:'#fff', fontWeight:800, fontSize:'15px', border:'none', cursor:'pointer', letterSpacing:'0.04em', boxShadow:'0 4px 16px rgba(76,159,56,0.35)', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'20px' }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(76,159,56,0.45)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow='0 4px 16px rgba(76,159,56,0.35)'; }}>
        {isLogin ? 'Sign in' : 'Create Account'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </button>

      {/* Toggle */}
      <p style={{ textAlign:'center', fontSize:'13px', color:'#6b7280', margin:0 }}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => switchMode(isLogin ? 'signup' : 'login')}
          style={{ background:'none', border:'none', cursor:'pointer', color:'#4C9F38', fontWeight:700, fontSize:'13px', padding:0 }}>
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );

  const cardPanel = (
    <div style={{ padding:'20px', height:'100%', opacity: animating ? 0 : 1, transform: animating ? `translateX(${isLogin ? '28px' : '-28px'})` : 'translateX(0)', transition:'opacity 0.38s ease, transform 0.38s ease' }}>
      <SDGCard mode={mode} />
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#f8fafc,#f0fdf4 50%,#f0f9ff)', padding:'24px', fontFamily:"'Inter','Segoe UI',system-ui,sans-serif" }}>

      {/* Back button */}
      <button onClick={() => navigate('/')}
        style={{ position:'fixed', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'7px', background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:'10px', padding:'8px 16px', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#374151', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', transition:'all 0.2s', zIndex:100 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='#4C9F38'; e.currentTarget.style.color='#4C9F38'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='#e5e7eb'; e.currentTarget.style.color='#374151'; }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        Back to Home
      </button>

      {/* Main card */}
      <div style={{ width:'100%', maxWidth:'940px', background:'#fff', borderRadius:'28px', boxShadow:'0 24px 80px rgba(0,0,0,0.10)', display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'600px', overflow:'hidden' }}>
        {isLogin ? (
          <>
            <div>{formPanel}</div>
            <div style={{ background:'linear-gradient(135deg,#f0fdf4,#e8f5e9)' }}>{cardPanel}</div>
          </>
        ) : (
          <>
            <div style={{ background:'linear-gradient(135deg,#f0fdf4,#e8f5e9)' }}>{cardPanel}</div>
            <div>{formPanel}</div>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #9ca3af; }
        @media (max-width: 700px) {
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
