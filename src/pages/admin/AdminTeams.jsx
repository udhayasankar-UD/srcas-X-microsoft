import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, ADMIN_EMAILS } from '../../lib/supabaseClient';
import { Users, Flag, CheckSquare, Search, ChevronDown, Download, ChevronRight, MoreVertical, ChevronLeft, Trophy } from 'lucide-react';

const S = {
  bg: '#F8FAFC', card: '#FFFFFF', border: '#E5E7EB', primary: '#6C4EFF',
  t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', green: '#16A34A',
  activeBg: '#EEE8FF', radius: '14px', pad: '24px', gap: '20px',
};



export default function AdminTeams() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [members, setMembers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  
  // Filters and Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState('All Tracks');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    const [{ data: t }, { data: m }, { data: s }] = await Promise.all([
      supabase.from('teams').select('*').order('created_at', { ascending: false }),
      supabase.from('team_members').select('*'),
      supabase.from('submissions').select('team_id, category')
    ]);
    if (t) setTeams(t);
    if (m) setMembers(m);
    if (s) setSubmissions(s);
    setLoading(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate('/register'); return; }
      const { data: adminList } = await supabase.from('admins').select('email');
      const hardcoded = ADMIN_EMAILS;
      const email = session.user.email.trim().toLowerCase();
      const ok = hardcoded.includes(email) || adminList?.some(a => a.email.trim().toLowerCase() === email);
      if (ok) { setIsAdmin(true); fetchData(); } else { alert("Not admin!"); navigate('/dashboard'); }
    };
    checkAuth();
  }, [navigate, fetchData]);



  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:S.bg}}><div style={{width:40,height:40,border:'3px solid '+S.primary,borderTopColor:'transparent',borderRadius:'50%',animation:'spin 1s linear infinite'}}/></div>;
  if (!isAdmin) return null;

  const filteredTeams = teams.filter(t => {
    const sub = submissions.find(s => s.team_id === t.id);
    const track = sub?.category || 'General';
    const status = t.status || 'Active';
    
    const matchSearch = t.team_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTrack = trackFilter === 'All Tracks' || track === trackFilter;
    const matchStatus = statusFilter === 'All Status' || status === statusFilter;
    
    return matchSearch && matchTrack && matchStatus;
  });

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const currentTeams = filteredTeams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { title: 'Total Teams', value: teams.length, trend: '12.5%', c: S.primary, bg: S.activeBg, icon: Users },
    { title: 'Registered Teams', value: teams.length, trend: '10.3%', c: S.green, bg: '#DCFCE7', icon: Flag },
    { title: 'Shortlisted Teams', value: teams.filter(t => t.status === 'Shortlisted').length, trend: '4.2%', c: '#2563EB', bg: '#DBEAFE', icon: CheckSquare },
    { title: 'Winners', value: '3', trend: '0%', c: '#DC2626', bg: '#FEF2F2', icon: Trophy },
  ];

  const exportCSV = () => {
    let csv = "data:text/csv;charset=utf-8,Team,Track,Lead Name,Lead Email,Members Count,Status,Registered On\n";
    filteredTeams.forEach(t => {
      const sub = submissions.find(s => s.team_id === t.id);
      const track = sub?.category || 'General';
      const lead = members.find(m => m.id === t.leader_id);
      const memberCount = members.filter(m => m.team_id === t.id).length;
      csv += `"${t.team_name || ''}","${track}","${lead?.full_name || ''}","${lead?.email || ''}","${memberCount}","${t.status || 'Active'}","${t.created_at || ''}"\n`;
    });
    const a = document.createElement("a");
    a.href = encodeURI(csv);
    a.download = "teams_export.csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <>
        {/* TOP NAV */}
        <header style={{ height:64, background:S.card, borderBottom:'1px solid '+S.border, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div>
              <h1 style={{ fontSize:18, fontWeight:700, margin:0, color:S.t1 }}>Dashboard</h1>
              <div style={{ fontSize:11, fontWeight:500, color:S.t2, display:'flex', alignItems:'center', gap:4 }}>Home <ChevronRight size={12}/> <span style={{color:S.t1}}>Teams</span></div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <div style={{ position:'relative' }}>
              <Search style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', width:16, height:16, color:S.t3 }}/>
              <input placeholder="Search anything..." style={{ paddingLeft:34, paddingRight:48, paddingTop:8, paddingBottom:8, background:'#F1F5F9', border:'1px solid '+S.border, borderRadius:10, fontSize:13, width:240, outline:'none' }}/>
              <span style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', fontSize:10, fontWeight:700, color:S.t3, background:S.card, border:'1px solid '+S.border, padding:'2px 6px', borderRadius:4 }}>Ctrl+K</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10, borderLeft:'1px solid '+S.border, paddingLeft:20, cursor:'pointer' }}>
              <div style={{ width:34, height:34, borderRadius:'50%', background:'#059669', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:14 }}>A</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:S.t1 }}>Admin User</div>
                <div style={{ fontSize:11, fontWeight:500, color:S.t2 }}>Super Admin</div>
              </div>
              <ChevronDown size={14} style={{color:S.t3}}/>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div style={{ flex:1, overflowY:'auto', padding:S.pad }}>
          <div style={{ display:'flex', flexDirection:'column', gap:S.gap }}>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <div>
                <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Teams</h2>
                <p style={{ fontSize:13, color:S.t2, margin:'4px 0 0' }}>Manage all teams participating in the hackathon.</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                
                <button onClick={exportCSV} style={{ display:'flex', alignItems:'center', gap:6, background:S.card, color:S.t1, border:'1px solid '+S.border, padding:'10px 16px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 1px 2px rgba(0,0,0,.04)' }}>
                  <Download size={16}/> Export
                </button>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:S.gap }}>
              {stats.map((c, i) => (
                <div key={i} style={{ background:S.card, border:'1px solid '+S.border, borderRadius:S.radius, padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04)', display:'flex', gap:16, alignItems:'flex-start' }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:c.bg, color:c.c, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <c.icon size={20}/>
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:S.t2, marginBottom:4 }}>{c.title}</div>
                    <div style={{ fontSize:24, fontWeight:800, color:S.t1, marginBottom:4 }}>{c.value}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:S.green }}>↑ {c.trend} <span style={{ color:S.t3, fontWeight:400, marginLeft:4 }}>vs last 7 days</span></div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background:S.card, border:'1px solid '+S.border, borderRadius:S.radius, boxShadow:'0 1px 3px rgba(0,0,0,.04)', display:'flex', flexDirection:'column' }}>
              
              <div style={{ padding:'20px', borderBottom:'1px solid '+S.border, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, flex:1, flexWrap:'wrap' }}>
                  <div style={{ position:'relative', minWidth:260 }}>
                    <Search size={16} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:S.t3 }}/>
                    <input 
                      placeholder="Search teams by name..." 
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft:36, paddingRight:16, paddingTop:10, paddingBottom:10, background:S.card, border:'1px solid '+S.border, borderRadius:8, fontSize:13, width:'100%', outline:'none', color:S.t1 }}
                    />
                  </div>
                  <select value={trackFilter} onChange={e => { setTrackFilter(e.target.value); setCurrentPage(1); }} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                    <option>All Tracks</option>
                    <option>Climate Action</option>
                    <option>Quality Education</option>
                    <option>Affordable Energy</option>
                    <option>Sustainable Cities</option>
                    <option>Life on Land</option>
                    <option>General</option>
                  </select>
                  <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Shortlisted</option>
                    <option>Rejected</option>
                  </select>
                  <select style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                    <option>All Rounds</option>
                  </select>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <span onClick={() => { setSearchTerm(''); setTrackFilter('All Tracks'); setStatusFilter('All Status'); setCurrentPage(1); }} style={{ fontSize:13, fontWeight:600, color:S.primary, cursor:'pointer' }}>Clear Filters</span>
                </div>
              </div>

              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                  <thead>
                    <tr style={{ background:'#FAFAFA', borderBottom:'1px solid '+S.border }}>
                      {['Team', 'Track', 'Team Lead', 'Members', 'Status', 'Round', 'Registered On', 'Actions'].map(h => (
                        <th key={h} style={{ padding:'16px 20px', fontWeight:600, color:S.t2, textAlign: h==='Actions'?'center':'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentTeams.map(t => {
                      const sub = submissions.find(s => s.team_id === t.id);
                      const track = sub?.category || 'General';
                      const lead = members.find(m => m.id === t.leader_id);
                      const teamMembers = members.filter(m => m.team_id === t.id);
                      
                      const avatarColors = [
                        {bg: '#EEE8FF', text: '#6C4EFF'}, {bg: '#DBEAFE', text: '#2563EB'},
                        {bg: '#FEF3C7', text: '#D97706'}, {bg: '#F3E8FF', text: '#9333EA'},
                        {bg: '#DCFCE7', text: '#16A34A'}
                      ];
                      const ac = avatarColors[t.id % avatarColors.length] || avatarColors[0];
                      
                      const trackColors = {
                        'Climate Action': {bg:'#DCFCE7', text:'#16A34A'},
                        'Affordable Energy': {bg:'#FEF3C7', text:'#D97706'},
                        'Sustainable Cities': {bg:'#F3E8FF', text:'#9333EA'},
                        'Life on Land': {bg:'#DCFCE7', text:'#16A34A'},
                        'Quality Education': {bg:'#DBEAFE', text:'#2563EB'}
                      };
                      const tc = trackColors[track] || {bg:'#F1F5F9', text:'#64748B'};

                      const getStatusColor = (s) => {
                        if (s === 'Shortlisted') return {color: '#9333EA', bg: '#F3E8FF'};
                        if (s === 'Pending' || s === 'Under Review') return {color: '#D97706', bg: '#FEF3C7'};
                        if (s === 'Rejected' || s === 'Inactive') return {color: '#DC2626', bg: '#FEF2F2'};
                        return {color: '#16A34A', bg: '#DCFCE7'};
                      };
                      const sc = getStatusColor(t.status || 'Active');

                      return (
                        <tr key={t.id} style={{ borderBottom:'1px solid #F8FAFC' }}>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                              <div style={{ width:36, height:36, borderRadius:'8px', background:ac.bg, color:ac.text, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>
                                {t.team_name?.substring(0,2)?.toUpperCase() || 'TM'}
                              </div>
                              <div>
                                <div style={{ fontWeight:700, color:S.t1 }}>{t.team_name || 'Unnamed Team'}</div>
                                <div style={{ fontSize:12, color:S.t3, marginTop:2 }}>@{t.team_name?.toLowerCase().replace(/\s+/g,'') || 'team'}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ background:tc.bg, color:tc.text, padding:'4px 10px', borderRadius:6, fontSize:11, fontWeight:600 }}>
                              {track}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                              <div style={{ width:28, height:28, borderRadius:'50%', background:S.activeBg, color:S.primary, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:10 }}>
                                {lead?.full_name?.charAt(0) || '?'}
                              </div>
                              <div>
                                <div style={{ fontWeight:600, color:S.t1, fontSize:12 }}>{lead?.full_name || 'N/A'}</div>
                                <div style={{ fontSize:11, color:S.t3 }}>{lead?.email || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center' }}>
                              {teamMembers.slice(0,3).map((m, idx) => (
                                <div key={m.id} style={{ width:28, height:28, borderRadius:'50%', background:'#E2E8F0', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#475569', marginLeft: idx > 0 ? -8 : 0 }}>
                                  {m.full_name?.charAt(0)}
                                </div>
                              ))}
                              {teamMembers.length > 3 && (
                                <div style={{ width:28, height:28, borderRadius:'50%', background:'#F1F5F9', border:'2px solid #fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:'#64748B', marginLeft:-8 }}>
                                  +{teamMembers.length - 3}
                                </div>
                              )}
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ color: sc.color, fontWeight:600, fontSize:12 }}>
                              {t.status || 'Active'}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px', color:S.t2 }}>Submission</td>
                          <td style={{ padding:'16px 20px', color:S.t2 }}>{t.created_at ? new Date(t.created_at).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) : '-'}</td>
                          <td style={{ padding:'16px 20px', textAlign:'center' }}>
                            <button style={{ background:'none', border:'none', color:S.t3, cursor:'pointer', padding:4 }}>
                              <MoreVertical size={16}/>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {currentTeams.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ padding:40, textAlign:'center', color:S.t3 }}>No teams found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ padding:'16px 20px', borderTop:'1px solid '+S.border, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13 }}>
                <div style={{ color:S.t2, fontWeight:500 }}>Showing {filteredTeams.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTeams.length)} of {filteredTeams.length} teams</div>
                {totalPages > 1 && (
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ background:S.card, border:'1px solid '+S.border, borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', color: currentPage === 1 ? S.border : S.t3, cursor: currentPage === 1 ? 'default' : 'pointer' }}><ChevronLeft size={14}/></button>
                    
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                      <button key={p} onClick={() => setCurrentPage(p)} style={{ background: currentPage === p ? '#EEE8FF' : S.card, border: currentPage === p ? 'none' : '1px solid '+S.border, borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', color: currentPage === p ? S.primary : S.t2, fontWeight: currentPage === p ? 700 : 600, cursor:'pointer' }}>{p}</button>
                    ))}
                    
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ background:S.card, border:'1px solid '+S.border, borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', color: currentPage === totalPages ? S.border : S.t3, cursor: currentPage === totalPages ? 'default' : 'pointer' }}><ChevronRight size={14}/></button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      
    </>
  );
}

