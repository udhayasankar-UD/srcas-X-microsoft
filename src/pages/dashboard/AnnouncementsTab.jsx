import React from 'react';

// Easy to edit announcements list
const ANNOUNCEMENTS_LIST = [
  {
    id: 1,
    title: 'Round 1 submissions are now open!',
    date: 'May 24, 2026',
    author: 'Admin',
    content: 'Make sure to submit your idea before the deadline. We are excited to see your innovative solutions for the SDG goals.',
    tag: 'New'
  },
  {
    id: 2,
    title: 'Mentor Connect Session',
    date: 'May 22, 2026',
    author: 'Admin',
    content: 'Join our live session on May 26 at 5:00 PM IST to interact with industry experts and get your doubts clarified.',
    tag: 'Event'
  }
];

export default function AnnouncementsTab() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24, maxWidth:800, margin:'0 auto', width:'100%' }}>
      <div style={{ background:'#fff', borderRadius:16, padding:'32px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1px solid #f3f4f6' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
          <div style={{ fontSize:28 }}>📢</div>
          <h2 style={{ fontSize:24, fontWeight:900, color:'#111', margin:0 }}>Announcements</h2>
        </div>
        <p style={{ color:'#6b7280', margin:'0 0 32px 0' }}>Stay updated with the latest news and important notices about the hackathon.</p>
        
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {ANNOUNCEMENTS_LIST.map(a => (
            <div key={a.id} style={{ padding:'20px', borderRadius:12, border:'1.5px solid #f3f4f6', background:'#f9fafb' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <div>
                  <h3 style={{ fontSize:16, fontWeight:800, color:'#111', margin:'0 0 6px 0' }}>{a.title}</h3>
                  <div style={{ fontSize:12, color:'#9ca3af', fontWeight:500 }}>{a.date} • {a.author}</div>
                </div>
                {a.tag && (
                  <span style={{ fontSize:11, fontWeight:800, color: a.tag==='New'?'#10b981':'#3b82f6', background: a.tag==='New'?'#ecfdf5':'#eff6ff', padding:'4px 10px', borderRadius:20 }}>
                    {a.tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize:14, color:'#4b5563', lineHeight:1.6, margin:0 }}>{a.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
