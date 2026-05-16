import React, { useState } from 'react';

const RESOURCES = [
  { icon:'📄', label:'Hackathon Rulebook',       desc:'Official rules and judging criteria',   tag:'PDF',    href:'#', color:'#E5243B' },
  { icon:'🎯', label:'Problem Statements',        desc:'All 6 challenge categories explained',  tag:'PDF',    href:'#', color:'#4C9F38' },
  { icon:'☁️', label:'Azure Student Credits',     desc:'Free $100 credits for your project',    tag:'Tool',   href:'#', color:'#26BDE2' },
  { icon:'📅', label:'Mentorship Schedule',       desc:'Book 1-on-1 sessions with mentors',     tag:'Calendar',href:'#',color:'#FCC30B' },
  { icon:'💬', label:'Discord Community',         desc:'Connect with participants & organizers', tag:'Link',   href:'#', color:'#5865F2' },
  { icon:'🏆', label:'Prize Details',             desc:'Learn about the cash prizes & awards',  tag:'Page',   href:'/prizes', color:'#f59e0b' },
  { icon:'📹', label:'Submission Guidelines',     desc:'How to record your demo video',         tag:'Video',  href:'#', color:'#DD1367' },
  { icon:'🤖', label:'AI & Azure Workshop',       desc:'Recorded workshop for Azure AI tools',  tag:'Video',  href:'#', color:'#0A97D9' },
];

const FAQS = [
  { q:'Can I change my SDG goal after registration?', a:'Yes, you can update your SDG focus until the Prototype Submission deadline (Jun 15).' },
  { q:'Is the hackathon online or offline?',          a:'The hackathon is hybrid — ideation is online, finals are at SRCAS campus on Jun 28.' },
  { q:'What Azure services can we use?',              a:'All Azure services are allowed. Use your student credits or apply for additional credits.' },
  { q:'How many members per team?',                   a:'Teams can have 2–4 members. Solo participation is not allowed.' },
];

export default function ResourcesTab() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
      {/* Resources grid */}
      <div>
        <div style={{ fontSize:14, fontWeight:800, color:'#111', marginBottom:14 }}>📚 Resource Library</div>
        <div className="dash-grid-resources" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
          {RESOURCES.map((r, i) => (
            <a key={i} href={r.href} style={{ textDecoration:'none' }}>
              <div style={{ background:'#fff', borderRadius:14, padding:'18px 18px', border:'1.5px solid #f0f0f0', boxShadow:'0 1px 4px rgba(0,0,0,0.05)', cursor:'pointer', transition:'all 0.2s', display:'flex', flexDirection:'column', gap:8 }}
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
