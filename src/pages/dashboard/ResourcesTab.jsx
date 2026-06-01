import { useState } from 'react';

const RESOURCES = [
  { icon:'📄', label:'Hackathon Rulebook',       desc:'Official rules and judging criteria',   tag:'PDF',    href:'#', color:'#E5243B' },
  { icon:'🎯', label:'Problem Statements',        desc:'All 6 challenge categories explained',  tag:'PDF',    href:'#', color:'#E5243B' },
  { icon:'💬', label:'Discord Community',         desc:'Connect with participants & organizers', tag:'Link',   href:'#', color:'#3b82f6' },
  { icon:'📱', label:'Whatsapp Community',       desc:'Connect with organizers all detail share there', tag:'Link',   href:'#', color:'#3b82f6' },
  { icon:'🏆', label:'Prize Details',             desc:'Learn about the cash prizes & awards',  tag:'Page',   href:'/prizes', color:'#f59e0b' },
  { icon:'📹', label:'Submission Guidelines',     desc:'How to record your demo video',         tag:'Video',  href:'#', color:'#8b5cf6' },
];

const FAQS = [
  { q:'Can I change my SDG goal after registration?', a:'Yes, you can update your SDG focus until the Idea Submission deadline (Jul 25).' },
  { q:'Is the hackathon online or offline?',          a:'The hackathon is hybrid — ideation is online, finals are at SRCAS campus on Aug 14.' },
  { q:'What Azure services can we use?',              a:'All Azure services are allowed. Use your student credits or apply for additional credits.' },
  { q:'How many members per team?',                   a:'Teams can have 2–4 members. Solo participation is not allowed.' },
];



const STATUS_STYLE = {
  done:    { dot:'#4C9F38', line:'#4C9F38', label:'Completed', labelColor:'#4C9F38', labelBg:'#f0fdf4' },
  active:  { dot:'#f59e0b', line:'#e5e7eb', label:'In Progress', labelColor:'#92400e', labelBg:'#fffbeb' },
  upcoming:{ dot:'#e5e7eb', line:'#e5e7eb', label:'Upcoming',   labelColor:'#6b7280', labelBg:'#f3f4f6' },
};

export default function ResourcesTab({ hasTeam, submissions }) {
  const [openFaq, setOpenFaq] = useState(null);
  const hasSubmitted = submissions?.length > 0;

  const EVENTS = [
    { date:'Jun 21',    event:'Registration',             status:'done',    desc:'Team registration and idea brief.',       time:'All day' },
    { date:'Jul 10',    event:'Team Confirmation',        status: hasTeam ? 'done' : 'active',    desc:'Form your team and confirm details.',     time:'11:59 PM IST' },
    { date:'Jul 25',    event:'Idea Submission',          status: hasSubmitted ? 'done' : (hasTeam ? 'active' : 'upcoming'),  desc:'300-word abstract of your solution.',     time:'11:59 PM IST' },
    { date:'Aug 7',     event:'Shortlist Announced',      status: hasSubmitted ? 'active' : 'upcoming', desc:'Top teams notified via email.',           time:'12:00 PM IST' },
    { date:'Aug 14',    event:'Grand Finale',             status:'upcoming',desc:'Live presentations and prize ceremony.',  time:'09:00 AM IST' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
      {/* Resources grid */}
      <div>
        <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:14 }}>📚 Resource Library</div>
        <div className="dash-grid-resources" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
          {RESOURCES.map((r, i) => (
            <a key={i} href={r.href} style={{ textDecoration:'none', display:'flex', flexDirection:'column', height:'100%' }}>
              <div style={{ background:'#fff', borderRadius:14, padding:'18px 18px', border:'1.5px solid #f0f0f0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)', cursor:'pointer', transition:'all 0.2s', display:'flex', flexDirection:'column', gap:8, flex:1 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=r.color; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${r.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#f0f0f0'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.05)'; }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:26 }}>{r.icon}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:r.color, background:`${r.color}15`, padding:'3px 8px', borderRadius:20 }}>{r.tag}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>{r.label}</div>
                <div style={{ fontSize:11, color:'#9ca3af', lineHeight:1.4 }}>{r.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:14 }}>📅 Full Event Timeline</div>
        <div className="dash-card" style={{ background:'#fff', borderRadius:14, padding:'22px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)', border:'1.5px solid #f0f0f0' }}>
          {EVENTS.map((ev, i) => {
            const s = STATUS_STYLE[ev.status];
            return (
              <div key={i} style={{ display:'flex', gap:16, paddingBottom: i<EVENTS.length-1?24:0, position:'relative' }}>
                {i < EVENTS.length-1 && (
                  <div style={{ position:'absolute', left:9, top:22, width:2, bottom:0, background:'#e5e7eb' }}>
                    <div style={{ width:'100%', height: EVENTS[i].status === 'done' ? '100%' : '0%', background:'#4C9F38', transition:'height 0.4s ease' }} />
                  </div>
                )}
                <div style={{ width:20, height:20, borderRadius:'50%', background:s.dot, flexShrink:0, zIndex:1, marginTop:2, display:'flex', alignItems:'center', justifyContent:'center', border: ev.status==='active'?'3px solid #fde68a':'none' }}>
                  {ev.status==='done' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:2 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:'#111' }}>{ev.event}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:s.labelColor, background:s.labelBg, padding:'2px 8px', borderRadius:20 }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize:11, color:'#9ca3af', marginBottom:4 }}>{ev.date} · {ev.time}</div>
                  <div style={{ fontSize:12, color:'#6b7280' }}>{ev.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:14 }}>❓ Frequently Asked Questions</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ background:'#fff', borderRadius:12, border:'1.5px solid #f0f0f0', overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
              <button onClick={() => setOpenFaq(openFaq===i ? null : i)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', background:'none', border:'none', cursor:'pointer', textAlign:'left', gap:12 }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#111' }}>{f.q}</span>
                <span style={{ fontSize:18, color:'#9ca3af', flexShrink:0, transform: openFaq===i?'rotate(45deg)':'rotate(0deg)', transition:'transform 0.2s' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding:'0 18px 14px', fontSize:13, color:'#6b7280', lineHeight:1.6, borderTop:'1px solid #f3f4f6' }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
