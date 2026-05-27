import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Home, Users, Flag, FileText, CheckSquare, Calendar, Bell, BookOpen, BarChart2, Settings, Link as LinkIcon, Shield, LogOut, Search, ChevronDown, LayoutDashboard, Download, ChevronRight, MoreVertical, ChevronLeft, Star, Clock, XCircle, Eye, Calendar as CalendarIcon, ClipboardCheck, Filter } from 'lucide-react';

const S = {
  bg: '#F8FAFC', card: '#FFFFFF', border: '#E5E7EB', primary: '#6C4EFF',
  t1: '#111827', t2: '#6B7280', t3: '#9CA3AF', green: '#16A34A',
  activeBg: '#EEE8FF', radius: '14px', pad: '24px', gap: '20px',
};



export default function AdminEvaluations() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  
  // Filters and Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All Evaluations');
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
    const [{ data: t }, { data: s }] = await Promise.all([
      supabase.from('teams').select('*'),
      supabase.from('submissions').select('*').order('created_at', { ascending: false })
    ]);
    
    // Use real data from submissions
    const evals = (s || []).map((sub) => {
      const team = (t || []).find(tm => tm.id === sub.team_id);
      
      // Use actual fields if they exist in DB, otherwise safe defaults
      const status = sub.status || 'Pending';
      const score = sub.score || null;
      const round = sub.round || 'Evaluation';
      const evalName = sub.evaluator_name || 'Unassigned';
      
      return {
        id: sub.id,
        teamName: team?.team_name || 'Unknown Team',
        teamTrack: sub.category || 'General',
        subTitle: sub.project_title || 'Untitled Project',
        subDesc: sub.project_description || 'No description provided',
        status: status,
        score: score,
        round: round,
        evaluator: { name: evalName, email: '', inits: evalName.charAt(0).toUpperCase(), color: '#64748B', bg: '#F1F5F9' },
        date: sub.created_at || new Date().toISOString()
      };
    });
    
    setEvaluations(evals);
    
    setLoading(false);
  };

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:S.bg}}><div style={{width:40,height:40,border:'3px solid '+S.primary,borderTopColor:'transparent',borderRadius:'50%',animation:'spin 1s linear infinite'}}/></div>;
  if (!isAdmin) return null;

  const filteredEvals = evaluations.filter(e => {
    const matchSearch = e.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || e.subTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTab = activeTab === 'All Evaluations' || e.status === activeTab;
    return matchSearch && matchTab;
  });

  const totalPages = Math.ceil(filteredEvals.length / itemsPerPage);
  const currentEvals = filteredEvals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    if (filteredEvals.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ['Submission ID', 'Team Name', 'Track', 'Project Title', 'Status', 'Score', 'Round', 'Evaluator', 'Submitted On'];
    const csvContent = [
      headers.join(','),
      ...filteredEvals.map(e => [
        `"${e.id}"`,
        `"${e.teamName}"`,
        `"${e.teamTrack}"`,
        `"${e.subTitle}"`,
        `"${e.status}"`,
        `"${e.score || 'Pending'}"`,
        `"${e.round}"`,
        `"${e.evaluator.name}"`,
        `"${new Date(e.date).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'evaluations_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statCounts = {
    total: evaluations.length,
    completed: evaluations.filter(e => e.status === 'Completed').length,
    pending: evaluations.filter(e => e.status === 'Pending').length,
    inProgress: evaluations.filter(e => e.status === 'In Progress').length,
    overdue: 0
  };

  const stats = [
    { title: 'Total Evaluations', value: statCounts.total, trend: '12.8%', c: S.primary, bg: S.activeBg, icon: Star },
    { title: 'Completed', value: statCounts.completed, trend: '14.3%', c: S.green, bg: '#DCFCE7', icon: ClipboardCheck },
    { title: 'Pending', value: statCounts.pending, trend: '8.7%', c: '#D97706', bg: '#FEF3C7', icon: Clock },
    { title: 'In Progress', value: statCounts.inProgress, trend: '20.0%', c: '#2563EB', bg: '#DBEAFE', icon: CalendarIcon },
    { title: 'Overdue', value: statCounts.overdue, trend: '0%', c: '#DC2626', bg: '#FEF2F2', icon: XCircle, hideTrend: true },
  ];

  const tabs = [
    { label: 'All Evaluations', count: statCounts.total, color: S.primary, bg: S.activeBg },
    { label: 'Completed', count: statCounts.completed, color: S.green, bg: '#DCFCE7' },
    { label: 'Pending', count: statCounts.pending, color: '#D97706', bg: '#FEF3C7' },
    { label: 'In Progress', count: statCounts.inProgress, color: '#2563EB', bg: '#DBEAFE' },
    { label: 'Overdue', count: statCounts.overdue, color: '#DC2626', bg: '#FEF2F2' }
  ];

  const getStatusStyle = (s) => {
    if (s === 'Completed') return {color: '#16A34A', bg: '#DCFCE7'};
    if (s === 'Pending') return {color: '#D97706', bg: '#FEF3C7'};
    if (s === 'In Progress') return {color: '#D97706', bg: '#FEF3C7'}; // Orange text for in progress
    return {color: S.t2, bg: S.bg};
  };

  return (
    <>
        {/* TOP NAV */}
        <header style={{ height:64, background:S.card, borderBottom:'1px solid '+S.border, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div>
              <h1 style={{ fontSize:18, fontWeight:700, margin:0, color:S.t1 }}>Dashboard</h1>
              <div style={{ fontSize:11, fontWeight:500, color:S.t2, display:'flex', alignItems:'center', gap:4 }}>Home <ChevronRight size={12}/> <span style={{color:S.t1}}>Evaluations</span></div>
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
                <h2 style={{ fontSize:20, fontWeight:700, margin:0 }}>Evaluations</h2>
                <p style={{ fontSize:13, color:S.t2, margin:'4px 0 0' }}>Monitor and manage all team evaluations across rounds and criteria.</p>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                
                <button onClick={handleExport} style={{ display:'flex', alignItems:'center', gap:6, background:S.primary, color:'#fff', border:'none', padding:'10px 16px', borderRadius:10, fontSize:13, fontWeight:600, cursor:'pointer', boxShadow:'0 1px 2px rgba(0,0,0,.04)' }}>
                  <Download size={16}/> Export <ChevronDown size={14}/>
                </button>
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:S.gap }}>
              {stats.map((c, i) => (
                <div key={i} style={{ background:S.card, border:'1px solid '+S.border, borderRadius:S.radius, padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04)', display:'flex', gap:16, alignItems:'flex-start' }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:c.bg, color:c.c, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <c.icon size={20}/>
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:600, color:S.t2, marginBottom:4 }}>{c.title}</div>
                    <div style={{ fontSize:24, fontWeight:800, color:S.t1, marginBottom:4 }}>{c.value}</div>
                    {!c.hideTrend ? (
                      <div style={{ fontSize:11, fontWeight:600, color:S.green }}>↑ {c.trend} <span style={{ color:S.t3, fontWeight:400, marginLeft:4 }}>vs last 7 days</span></div>
                    ) : (
                      <div style={{ fontSize:11, fontWeight:400, color:S.t3 }}>vs last 7 days</div>
                    )}
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
                      placeholder="Search by team name or submission title..." 
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft:36, paddingRight:16, paddingTop:10, paddingBottom:10, background:S.card, border:'1px solid '+S.border, borderRadius:8, fontSize:13, width:'100%', outline:'none', color:S.t1 }}
                    />
                  </div>
                  {['All Rounds', 'All Tracks', 'All Evaluators', 'All Status'].map((lbl, i) => (
                    <select key={i} style={{ padding:'10px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, outline:'none', cursor:'pointer', appearance:'none', background:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`, paddingRight:32 }}>
                      <option>{lbl}</option>
                    </select>
                  ))}
                  <div style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 14px', border:'1px solid '+S.border, borderRadius:8, fontSize:13, fontWeight:500, color:S.t1, cursor:'pointer' }}>
                    <CalendarIcon size={14} style={{color:S.t3}}/> May 20, 2025 - May 26, 2025
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <span onClick={() => setSearchTerm('')} style={{ fontSize:13, fontWeight:600, color:S.t2, cursor:'pointer' }}>Clear Filters</span>
                  <button style={{ display:'flex', alignItems:'center', gap:6, background:S.card, color:S.t1, border:'1px solid '+S.border, padding:'10px 16px', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }}>
                    <Filter size={16}/> Filters
                  </button>
                </div>
              </div>

              <div style={{ padding:'0 20px', borderBottom:'1px solid '+S.border, display:'flex', gap:24 }}>
                {tabs.map((t, i) => (
                  <div key={i} onClick={() => { setActiveTab(t.label); setCurrentPage(1); }} style={{ padding:'16px 0', borderBottom: activeTab === t.label ? '2px solid '+S.primary : '2px solid transparent', color: activeTab === t.label ? S.primary : S.t2, fontSize:13, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
                    {t.label}
                    <span style={{ padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700, background: t.bg, color: t.color }}>{t.count}</span>
                  </div>
                ))}
              </div>

              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                  <thead>
                    <tr style={{ background:'#FAFAFA', borderBottom:'1px solid '+S.border }}>
                      {['Team', 'Submission', 'Round', 'Evaluator', 'Status', 'Score', 'Submitted On', 'Actions'].map(h => (
                        <th key={h} style={{ padding:'16px 20px', fontWeight:600, color:S.t2, textAlign: h==='Actions'?'center':'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvals.map(e => {
                      const ac = {bg: '#EEE8FF', text: '#6C4EFF'};
                      const subIconColor = '#16A34A'; // Greenish
                      const sc = getStatusStyle(e.status);

                      return (
                        <tr key={e.id} style={{ borderBottom:'1px solid #F8FAFC' }}>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                              <div style={{ width:36, height:36, borderRadius:'8px', background:ac.bg, color:ac.text, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>
                                {e.teamName.substring(0,2).toUpperCase()}
                              </div>
                              <div>
                                <div style={{ fontWeight:700, color:S.t1 }}>{e.teamName}</div>
                                <div style={{ fontSize:11, color:S.t3, marginTop:2 }}>{e.teamTrack}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                              <div style={{ width:28, height:28, borderRadius:'6px', background:'#DCFCE7', color:subIconColor, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <FileText size={14}/>
                              </div>
                              <div>
                                <div style={{ fontWeight:600, color:S.t1, fontSize:12 }}>{e.subTitle}</div>
                                <div style={{ fontSize:11, color:S.t3 }}>{e.subDesc}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ background: e.round === 'Finale' ? '#DBEAFE' : '#F3E8FF', color: e.round === 'Finale' ? '#2563EB' : '#9333EA', padding:'4px 10px', borderRadius:6, fontSize:11, fontWeight:600 }}>
                              {e.round}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                              <div style={{ width:28, height:28, borderRadius:'50%', background:e.evaluator.bg, color:e.evaluator.color, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:10 }}>
                                {e.evaluator.inits}
                              </div>
                              <div>
                                <div style={{ fontWeight:600, color:S.t1, fontSize:12 }}>{e.evaluator.name}</div>
                                <div style={{ fontSize:11, color:S.t3 }}>{e.evaluator.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <span style={{ color: sc.color, fontWeight:600, fontSize:12 }}>
                              {e.status}
                            </span>
                          </td>
                          <td style={{ padding:'16px 20px', fontWeight:600, color:S.t1 }}>
                            {e.score ? (
                              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                                {e.score}/100 
                                {e.score > 85 && <Star size={12} color="#EAB308" fill="#EAB308"/>}
                              </div>
                            ) : '-'}
                          </td>
                          <td style={{ padding:'16px 20px' }}>
                            <div style={{ fontSize:12, color:S.t1, fontWeight:500 }}>
                              {new Date(e.date).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})}
                            </div>
                            <div style={{ fontSize:11, color:S.t3, marginTop:2 }}>
                              {new Date(e.date).toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'})}
                            </div>
                          </td>
                          <td style={{ padding:'16px 20px', textAlign:'center' }}>
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                              <button onClick={() => navigate(`/udview/evaluations/${e.id}`)} style={{ background:S.card, border:'1px solid '+S.border, borderRadius:6, color:S.t2, cursor:'pointer', padding:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <Eye size={14}/>
                              </button>
                              <button style={{ background:S.card, border:'1px solid '+S.border, borderRadius:6, color:S.t2, cursor:'pointer', padding:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <MoreVertical size={14}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {currentEvals.length === 0 && (
                      <tr>
                        <td colSpan="8" style={{ padding:40, textAlign:'center', color:S.t3 }}>No evaluations found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ padding:'16px 20px', borderTop:'1px solid '+S.border, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:13 }}>
                <div style={{ color:S.t2, fontWeight:500 }}>Showing {filteredEvals.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEvals.length)} of {filteredEvals.length} evaluations</div>
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