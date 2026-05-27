import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Home, Users, Flag, FileText, CheckSquare, Calendar, Bell, BookOpen, BarChart2, Settings, Link as LinkIcon, Shield, LogOut, Search, ChevronDown, LayoutDashboard, Download, ChevronRight, Plus, MoreVertical, Filter, ChevronLeft } from 'lucide-react';

const S = {
  bg: '#F8FAFC', card: '#FFFFFF', border: '#E5E7EB', primary: '#6C4EFF',
  t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', green: '#16A34A',
  activeBg: '#EEE8FF', radius: '14px', pad: '24px', gap: '20px',
};



export default function AdminUsers() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  
  // Filters and Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [teamFilter, setTeamFilter] = useState('All Teams');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate('/register'); return; }
      const { data: adminList } = await supabase.from('admins').select('email');
      const e1 = "udteam06" + "@" + "gmail.com";
      const e2 = "udhayasankar200721" + "@" + "gmail.com";
      const hardcoded = [e1, e2];
      const email = session.user.email.trim().toLowerCase();
      const ok = hardcoded.includes(email) || adminList?.some(a => a.email.trim().toLowerCase() === email);
      if (ok) { setIsAdmin(true); fetchData(); } else { alert("Not admin!"); navigate('/dashboard'); }
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    const [{ data: m }, { data: t }] = await Promise.all([
      supabase.from('team_members').select('*').order('created_at', { ascending: false }),
      supabase.from('teams').select('*')
    ]);
    if (m) setMembers(m);
    if (t) setTeams(t);
    setLoading(false);
  };

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:S.bg}}><div style={{width:40,height:40,border:'3px solid '+S.primary,borderTopColor:'transparent',borderRadius:'50%',animation:'spin 1s linear infinite'}}/></div>;
  if (!isAdmin) return null;

  const filteredMembers = members.filter(m => {
    const t = teams.find(team => team.id === m.team_id);
    const isLeader = t?.leader_id === m.id;
    const role = isLeader ? 'Team Lead' : 'Participant';
    
    const matchSearch = m.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || m.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'All Roles' || role === roleFilter;
    const matchTeam = teamFilter === 'All Teams' || t?.team_name === teamFilter;
    const matchYear = yearFilter === 'All Years' || String(m.year) === yearFilter;
    const matchCollege = collegeFilter === '' || m.college_name?.toLowerCase().includes(collegeFilter.toLowerCase());
    
    return matchSearch && matchRole && matchTeam && matchYear && matchCollege;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { title: 'Total Users', value: members.length, trend: '12.8%', c: S.primary, bg: S.activeBg, icon: Users },
    { title: 'Team Leads', value: teams.length, trend: '10.6%', c: '#D97706', bg: '#FEF3C7', icon: BookOpen },
    { title: 'Admins', value: '2', trend: '0%', c: '#9333EA', bg: '#F3E8FF', icon: Shield },
  ];

  const exportCSV = () => {
    let csv = "data:text/csv;charset=utf-8,User,Role,Team,Email,College,Location,Year\n";
    filteredMembers.forEach(m => {
      const t = teams.find(team => team.id === m.team_id);
      const isLeader = t?.leader_id === m.id;
      const role = isLeader ? 'Team Lead' : 'Participant';
      csv += `"${m.full_name || ''}","${role}","${t ? t.team_name : ''}","${m.email || ''}","${m.college_name || ''}","${m.city || ''}","${m.year || ''}"\n`;
    });
    const a = document.createElement("a");
    a.href = encodeURI(csv);
    a.download = "users_export.csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <>
      <header style={{ height:64, background:S.card, borderBottom:'1px solid '+S.border, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div>
              <h1 style={{ fontSize:18, fontWeight:700, margin:0, color:S.t1 }}>Dashboard</h1>
              <div style={{ fontSize:11, fontWeight:500, color:S.t2, display:'flex', alignItems:'center', gap:4 }}>Home <ChevronRight size={12}/> <span style={{color:S.t1}}>Users</span></div>
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

        <div style={{ flex:1, overflowY:'auto', padding:S.pad }}>
          <div style={{ display:'flex', flexDirection:'column', gap:S.gap }}>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <div>
                <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Users</h2>
                <p style={{ fontSize:13, color:S.t2, margin:'4px 0 0' }}>Manage all users of the hackathon platform.</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <button style={{ display:'flex', alignItems:'center', gap:6, background:S.primary, color:'#fff', border:'none', padding:'10px 16px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 1px 2px rgba(0,0,0,.04)' }}>
                  <Plus size={16}/> Add User
                </button>
                <button onClick={exportCSV} style={{ display:'flex', alignItems:'center', gap:6, background:S.card, color:S.t1, border:'1px solid '+S.border, padding:'10px 16px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 1px 2px rgba(0,0,0,.04)' }}>
                  <Download size={16}/> Export
                </button>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:S.gap }}>
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
                      placeholder="Search users by name or email..." 
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft:36, paddingRight:16, paddingTop:10, paddingBottom:10, background:S.card, border:'1px solid '+S.border, borderRadius:8, fontSize:13, width:'100%', outline:'none', color:S.t1 }}
                    />
                  </div>
                  <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                    <option>All Roles</option>
                    <option>Team Lead</option>
                    <option>Participant</option>
                  </select>
                  <select value={teamFilter} onChange={e => { setTeamFilter(e.target.value); setCurrentPage(1); }} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                    <option>All Teams</option>
                    {teams.map(t => <option key={t.id} value={t.team_name}>{t.team_name}</option>)}
                  </select>
                  <select value={yearFilter} onChange={e => { setYearFilter(e.target.value); setCurrentPage(1); }} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                    <option>All Years</option>
                    <option>1</option><option>2</option><option>3</option><option>4</option>
                  </select>
                  <input placeholder="Filter by college..." value={collegeFilter} onChange={e => { setCollegeFilter(e.target.value); setCurrentPage(1); }} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, outline:'none', minWidth:180 }}/>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <span onClick={() => { setSearchTerm(''); setRoleFilter('All Roles'); setTeamFilter('All Teams'); setYearFilter('All Years'); setCollegeFilter(''); setCurrentPage(1); }} style={{ fontSize:13, fontWeight:600, color:S.t2, cursor:'pointer' }}>Clear Filters</span>
                </div>
              </div>

              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                  <thead>
                    <tr style={{ background:'#FAFAFA', borderBottom:'1px solid '+S.border }}>
                      {['User', 'Role', 'Team', 'Email', 'College', 'Location', 'Year'].map(h => (
                        <th key={h} style={{ padding:'16px 20px', fontWeight:600, color:S.t2, textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentMembers.map(m => {
                      const t = teams.find(team => team.id === m.team_id);
                      const isLeader = t?.leader_id === m.id;
                      const avatarColors = [
                        {bg: '#DCFCE7', text: '#16A34A'}, {bg: '#EEE8FF', text: '#6C4EFF'},
                        {bg: '#FEF3C7', text: '#D97706'}, {bg: '#DBEAFE', text: '#2563EB'},
                        {bg: '#F3E8FF', text: '#9333EA'}
                      ];
                      const ac = avatarColors[m.id % avatarColors.length] || avatarColors[0];
                      
                      return (
                        <tr key={m.id} style={{ borderBottom:'1px solid #F8FAFC' }}>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                              <div style={{ width:36, height:36, borderRadius:'50%', background:ac.bg, color:ac.text, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>
                                {m.full_name?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                              <div>
                                <div style={{ fontWeight:700, color:S.t1 }}>{m.full_name || 'N/A'}</div>
                                <div style={{ fontSize:12, color:S.t3, marginTop:2 }}>@{m.full_name?.toLowerCase().replace(/\s+/g,'') || 'user'}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ 
                              background: isLeader ? '#EEE8FF' : '#DBEAFE', 
                              color: isLeader ? '#6C4EFF' : '#2563EB', 
                              padding:'4px 10px', borderRadius:6, fontSize:11, fontWeight:600 
                            }}>
                              {isLeader ? 'Team Lead' : 'Participant'}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600, color:S.t1 }}>
                              <div style={{ width:20, height:20, borderRadius:4, background:ac.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <Flag size={12} color={ac.text}/>
                              </div>
                              {t ? t.team_name : '-'}
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px', color:S.t2 }}>{m.email || 'N/A'}</td>
                          <td style={{ padding:'16px 20px', color:S.t2 }}>{m.college_name || '-'}</td>
                          <td style={{ padding:'16px 20px', color:S.t2 }}>{m.city || '-'}</td>
                          <td style={{ padding:'16px 20px', color:S.t2 }}>{m.year || '-'}</td>
                        </tr>
                      );
                    })}
                    {currentMembers.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ padding:40, textAlign:'center', color:S.t3 }}>No participants found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ padding:'16px 20px', borderTop:'1px solid '+S.border, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13 }}>
                <div style={{ color:S.t2, fontWeight:500 }}>Showing {filteredMembers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} users</div>
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