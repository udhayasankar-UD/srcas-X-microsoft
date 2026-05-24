import React from 'react';
import EventTimeline from '../../components/EventTimeline';

const TIMELINE_STEPS = [
  { title:'Registration Deadline', date:'May 20' },
  { title:'Idea Submission', date:'May 25' },
  { title:'Shortlist Announced', date:'Jun 5' },
  { title:'Prototype Submission', date:'Jun 15' },
  { title:'Grand Finale', date:'Jun 28' },
];

const card = (extra={}) => ({ background:'#fff', borderRadius:16, padding:'24px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1px solid #f3f4f6', ...extra });

export default function OverviewTab({ hasTeam, teamData, teamMembers, submissions, user, setActiveTab, announcements = [] }) {
  const memberCount = teamMembers?.length || 1;
  const overallProgress = hasTeam ? 20 : 0; 
  
  // Time ago formatter
  const timeAgo = (dateStr) => {
    if (!dateStr) return 'Just now';
    const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${Math.max(1, diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  };

  // Synthesize Recent Activity
  const activities = [];
  if (teamData?.created_at) {
    activities.push({ id: 'team_created', icon: '✅', color: '#16a34a', bg: '#f0fdf4', title: <span><strong>Registration completed successfully</strong></span>, date: new Date(teamData.created_at) });
  }
  if (teamMembers?.length > 0) {
    teamMembers.forEach(m => {
      if (m.created_at && m.email !== user?.email) {
        activities.push({ id: `member_${m.id}`, icon: '👥', color: '#8b5cf6', bg: '#f5f3ff', title: <span><strong style={{color:'#111'}}>{m.full_name}</strong> joined the team</span>, date: new Date(m.created_at) });
      }
    });
  }
  if (submissions?.length > 0) {
    submissions.forEach(sub => {
      activities.push({ id: `sub_${sub.id}`, icon: '☁️', color: '#f97316', bg: '#fff7ed', title: <span>Project <strong>"{sub.project_title || 'Submission'}"</strong> uploaded</span>, date: new Date(sub.created_at) });
    });
  }
  
  activities.sort((a, b) => b.date - a.date);
  const recentActivities = activities.slice(0, 5);
  
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
      
      {/* 1. Dynamic Timeline */}
      <EventTimeline steps={TIMELINE_STEPS} currentStepIndex={hasTeam ? 1 : 0} />

      {/* 2. Stats Grid (5 columns) */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16 }}>
        {/* Card 1 */}
        <div style={card({ display:'flex', flexDirection:'column', padding:'20px' })}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:'#ecfdf5', color:'#10b981', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>👥</div>
            <div>
              <div style={{ fontSize:24, fontWeight:800, color:'#111', lineHeight:1 }}>{memberCount}</div>
              <div style={{ fontSize:13, fontWeight:600, color:'#6b7280', marginTop:4 }}>Team Members</div>
            </div>
          </div>
          <div style={{ marginTop:'auto', fontSize:13, fontWeight:700, color:'#374151', cursor:'pointer' }} onClick={() => setActiveTab('team')}>View team →</div>
        </div>

        {/* Card 4 */}
        <div style={card({ display:'flex', flexDirection:'column', padding:'20px' })}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:'#eff6ff', color:'#3b82f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>📅</div>
            <div>
              <div style={{ fontSize:24, fontWeight:800, color:'#111', lineHeight:1 }}>12</div>
              <div style={{ fontSize:13, fontWeight:600, color:'#6b7280', marginTop:4 }}>Days to Next Milestone</div>
            </div>
          </div>
          <div style={{ marginTop:'auto', fontSize:13, fontWeight:700, color:'#9ca3af' }}>Shortlist Announced</div>
        </div>

        {/* Card 5 */}
        <div style={card({ display:'flex', flexDirection:'column', padding:'20px' })}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:48, height:48, borderRadius:12, background:'#fefce8', color:'#eab308', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>⭐</div>
            <div>
              <div style={{ fontSize:24, fontWeight:800, color:'#111', lineHeight:1 }}>245</div>
              <div style={{ fontSize:13, fontWeight:600, color:'#6b7280', marginTop:4 }}>Teams Participating</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Grid (3 columns) */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:16 }}>
        {/* Announcements */}
        <div style={card({ display:'flex', flexDirection:'column' })}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#111', margin:0 }}>Announcements</h3>
            <span style={{ fontSize:13, fontWeight:700, color:'#3b82f6', cursor:'pointer' }}>View all</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16, flex:1 }}>
            <div style={{ display:'flex', gap:12 }}>
              <span style={{ fontSize:10, fontWeight:800, color:'#10b981', background:'#ecfdf5', padding:'4px 8px', borderRadius:6, height:'fit-content' }}>New</span>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>Round 1 submissions are now open!</div>
                <div style={{ fontSize:13, color:'#6b7280', marginTop:4 }}>Make sure to submit your idea before the deadline.</div>
                <div style={{ fontSize:11, color:'#9ca3af', marginTop:6 }}>May 24, 2026 • Admin</div>
              </div>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <span style={{ fontSize:14, color:'#3b82f6', padding:'4px 8px' }}>🧑‍🏫</span>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>Mentor Connect Session</div>
                <div style={{ fontSize:13, color:'#6b7280', marginTop:4 }}>Join our live session on May 26 at 5:00 PM IST</div>
                <div style={{ fontSize:11, color:'#9ca3af', marginTop:6 }}>May 22, 2026 • Admin</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop:20, textAlign:'center', fontSize:13, fontWeight:700, color:'#6b7280', cursor:'pointer' }}>View all announcements</div>
        </div>

        {/* Project Progress */}
        <div style={card({ display:'flex', flexDirection:'column' })}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#111', margin:0 }}>Project Progress</h3>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:24, flex:1 }}>
            {/* Circular Gauge */}
            <div style={{ position:'relative', width:120, height:120, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 36 36" style={{ position:'absolute', width:'100%', height:'100%', transform:'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={`${overallProgress}, 100`} />
              </svg>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:24, fontWeight:900, color:'#111', lineHeight:1 }}>{overallProgress}%</div>
                <div style={{ fontSize:10, fontWeight:600, color:'#6b7280', marginTop:2 }}>Overall Progress</div>
              </div>
            </div>
            {/* Checklist */}
            <div style={{ display:'flex', flexDirection:'column', gap:12, flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', background:'#10b981', display:'flex', alignItems:'center', justifyContent:'center' }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                <span style={{ fontSize:13, fontWeight:600, color:'#111' }}>Team Setup</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', background:'#10b981', display:'flex', alignItems:'center', justifyContent:'center' }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                <span style={{ fontSize:13, fontWeight:600, color:'#111' }}>Idea Submission</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', border:'2px dashed #d1d5db' }}/>
                <span style={{ fontSize:13, fontWeight:600, color:'#6b7280' }}>Prototype Development</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', border:'2px solid #e5e7eb' }}/>
                <span style={{ fontSize:13, fontWeight:600, color:'#9ca3af' }}>Prototype Submission</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:16, height:16, borderRadius:'50%', border:'2px solid #e5e7eb' }}/>
                <span style={{ fontSize:13, fontWeight:600, color:'#9ca3af' }}>Final Presentation</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop:20, textAlign:'center', fontSize:13, fontWeight:700, color:'#10b981' }}>Keep going! You're on the right track.</div>
        </div>

        {/* Upcoming Milestones */}
        <div style={card({ display:'flex', flexDirection:'column' })}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#111', margin:0 }}>Upcoming Milestones</h3>
            <span style={{ fontSize:13, fontWeight:700, color:'#3b82f6', cursor:'pointer' }}>View all</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16, flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:'#eff6ff', color:'#3b82f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🚩</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>Shortlist Announced</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>Top teams will be shortlisted</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>Jun 5, 2026</div>
                <div style={{ fontSize:11, color:'#9ca3af' }}>12 days left</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:'#eff6ff', color:'#3b82f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>📤</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>Prototype Submission</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>Submit your prototype and pitch deck</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>Jun 15, 2026</div>
                <div style={{ fontSize:11, color:'#9ca3af' }}>22 days left</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:'#fefce8', color:'#eab308', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🏆</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>Grand Finale</div>
                <div style={{ fontSize:12, color:'#6b7280' }}>Final presentations and winner announcement</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>Jun 28, 2026</div>
                <div style={{ fontSize:11, color:'#9ca3af' }}>35 days left</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid (2 columns) */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1.2fr', gap:16 }}>
        {/* Recent Activity */}
        <div style={card({ display:'flex', flexDirection:'column' })}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#111', margin:0 }}>Recent Activity</h3>
            <span style={{ fontSize:13, fontWeight:700, color:'#3b82f6', cursor:'pointer' }}>View all</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {recentActivities.length > 0 ? recentActivities.map(act => (
              <div key={act.id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:32, height:32, borderRadius:'50%', background:act.bg, color:act.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>{act.icon}</div>
                <div style={{ fontSize:14, color:'#374151', flex:1 }}>{act.title}</div>
                <div style={{ fontSize:12, color:'#9ca3af' }}>{timeAgo(act.date)}</div>
              </div>
            )) : (
              <div style={{ fontSize:13, color:'#9ca3af', fontStyle:'italic' }}>No recent activity.</div>
            )}
          </div>
        </div>

        {/* Team Activity */}
        <div style={card({ display:'flex', flexDirection:'column' })}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#111', margin:0 }}>Team Activity</h3>
            <span style={{ fontSize:13, fontWeight:700, color:'#3b82f6', cursor:'pointer' }} onClick={() => setActiveTab('team')}>View team</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16, flex:1 }}>
            {teamMembers?.length > 0 ? teamMembers.map((m, i) => {
              const isMe = m.email === user?.email;
              const isLeader = m.email === user?.email || m.id === teamData?.leader_id;
              const colors = [
                { bg:'#10b981', labelBg:'#ecfdf5', labelColor:'#10b981' },
                { bg:'#8b5cf6', labelBg:'#f3e8ff', labelColor:'#7e22ce' },
                { bg:'#f97316', labelBg:'#ffedd5', labelColor:'#c2410c' },
                { bg:'#3b82f6', labelBg:'#dbeafe', labelColor:'#1d4ed8' }
              ];
              const c = colors[i % colors.length];

              return (
                <div key={m.id || i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:c.bg, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:14 }}>
                    {m.full_name ? m.full_name[0].toUpperCase() : '?'}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:'#111' }}>{m.full_name || 'Member'} {isMe && <span style={{ color:'#9ca3af', fontWeight:500 }}>(You)</span>}</div>
                  </div>
                  {isLeader ? (
                    <div style={{ fontSize:11, fontWeight:700, color:c.labelColor, background:c.labelBg, padding:'2px 8px', borderRadius:20 }}>Team Lead</div>
                  ) : (
                    <div style={{ fontSize:11, fontWeight:600, color:'#6b7280' }}>Member</div>
                  )}
                </div>
              );
            }) : (
              <div style={{ fontSize:13, color:'#9ca3af', fontStyle:'italic' }}>No team members yet.</div>
            )}
          </div>
          
          <div style={{ marginTop:24, paddingTop:16, borderTop:'1px solid #f3f4f6', display:'flex', alignItems:'center', gap:12 }}>
            
          </div>
        </div>
      </div>

    </div>
  );
}
