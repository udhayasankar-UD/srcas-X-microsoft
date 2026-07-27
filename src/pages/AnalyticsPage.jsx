import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from 'recharts';
import {
  Users, FileText, Activity, Clock, MapPin, BookOpen, GraduationCap,
  ArrowUp, Calendar, Info, RefreshCw, Trophy, ChevronDown,
  Monitor, Cpu, Database, Zap, Briefcase, Award, PieChart as PieChartIcon,
  Globe, Building2
} from 'lucide-react';
import analyticsData from './analytics.json';

/* ─── colour palettes ──────────────────────────────────────────── */
const BAR_COLORS  = ['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ef4444','#ec4899','#6366f1','#14b8a6','#f97316','#84cc16'];
const SDG_COLORS  = ['#f59e0b','#10b981','#ef4444','#3b82f6','#7c3aed','#f59e0b','#ec4899','#ef4444','#f97316','#8b5cf6'];
const GENDER_CLR  = { Male: '#3b82f6', Female: '#ec4899' };
const YEAR_CLR    = ['#10b981','#ec4899','#8b5cf6','#3b82f6','#f59e0b'];

/* ─── tiny helpers ─────────────────────────────────────────────── */
const getDeptIcon = (n) => {
  const l = n.toLowerCase();
  if (l.includes('computer'))   return { Icon: Monitor,  color: '#3b82f6', bg: '#eff6ff' };
  if (l.includes('artificial')) return { Icon: Cpu,      color: '#10b981', bg: '#ecfdf5' };
  if (l.includes('information'))return { Icon: Database, color: '#8b5cf6', bg: '#f5f3ff' };
  if (l.includes('electronic')) return { Icon: Zap,      color: '#f59e0b', bg: '#fffbeb' };
  if (l.includes('data'))       return { Icon: Activity, color: '#ec4899', bg: '#fdf2f8' };
  return                                { Icon: Briefcase,color: '#14b8a6', bg: '#f0fdfa' };
};

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:10, padding:'10px 14px', boxShadow:'0 4px 20px rgba(0,0,0,.1)' }}>
      <p style={{ fontSize:11, color:'#6b7280', fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:4 }}>
        {label || payload[0].payload?.fullName || payload[0].name}
      </p>
      <p style={{ fontSize:16, fontWeight:800, color:'#111827' }}>
        {payload[0].value} <span style={{ fontSize:11, fontWeight:500, color:'#9ca3af' }}>count</span>
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function AnalyticsPage() {
  const { summary_metrics: sm, demographics: demo, submission_details: sub } = analyticsData;

  const totalGender = sm.estimated_gender_breakdown.male + sm.estimated_gender_breakdown.female;
  const genderData  = [
    { name: 'Female', value: sm.estimated_gender_breakdown.female },
    { name: 'Male',   value: sm.estimated_gender_breakdown.male   },
  ];

  const yearData = demo.year_of_study.slice(0, 4);
  const totalYrs = yearData.reduce((a, c) => a + c.count, 0);

  const sdgData = sub.by_sdg_goal.map(d => ({
    name: d.sdg.replace(/SDG (\d+) -.*/, 'SDG $1'),
    fullName: d.sdg,
    count: d.count,
  }));

  /* stat card data */
  const stats = [
    { title:'Total Participants',   value: sm.total_participants.toLocaleString(),    sub:'Registered individuals',                           Icon:Users,        color:'#3b82f6', bg:'#eff6ff' },
    { title:'Teams Registered',     value: sm.total_teams_registered.toLocaleString(), sub:`Avg ${sm.average_team_size_submitted} members/team`, Icon:Users,        color:'#10b981', bg:'#ecfdf5' },
    { title:'Total Submissions',    value: sm.total_submissions.toLocaleString(),      sub:'Projects submitted',                               Icon:FileText,     color:'#8b5cf6', bg:'#f5f3ff' },
    { title:'Submission Rate',      value:`${sm.team_submission_rate_pct}%`,           sub:'Teams that submitted',                             Icon:PieChartIcon, color:'#f97316', bg:'#fff7ed' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#f8fafc', fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      <div style={{ maxWidth:'100%', padding:'100px 60px 60px' }}>

        {/* ── HEADER ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ background:'#4f46e5', borderRadius:12, padding:10, display:'flex' }}>
              <Activity size={22} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ fontSize:26, fontWeight:800, color:'#111827', margin:0, letterSpacing:'-.4px' }}>Event Analytics</h1>
              <p  style={{ fontSize:13, color:'#6b7280', margin:'3px 0 0', fontWeight:500 }}>Comprehensive overview of hackathon statistics and demographics.</p>
            </div>
          </div>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <span style={{ display:'flex', alignItems:'center', gap:6, background:'#fff', border:'1px solid #e5e7eb', color:'#374151', fontSize:12, fontWeight:600, padding:'7px 16px', borderRadius:10 }}>
              <Calendar size={14} color="#9ca3af" /> Final Event Data • July 26, 2026
            </span>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, marginBottom:32 }}>
          {stats.map(({ title, value, sub: subtitle, Icon, color, bg }) => (
            <div key={title} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:20, padding:'28px 28px 24px', boxShadow:'0 1px 4px rgba(0,0,0,.04)', transition:'box-shadow .2s' }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow='0 6px 24px rgba(0,0,0,.08)'}
              onMouseLeave={e=>e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,.04)'}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                <div style={{ background:bg, borderRadius:99, padding:12, flexShrink:0 }}>
                  <Icon size={26} color={color} strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize:13, color:'#6b7280', fontWeight:600, margin:'0 0 4px' }}>{title}</p>
                  <p style={{ fontSize:32, fontWeight:800, color:'#111827', margin:'0 0 4px', lineHeight:1 }}>{value}</p>
                  <p style={{ fontSize:12, color:'#9ca3af', fontWeight:500, margin:0 }}>{subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── REACH BANNER ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:32 }}>
          <div style={{ background:'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', borderRadius:16, padding:'22px 28px', display:'flex', alignItems:'center', gap:16, boxShadow:'0 4px 20px rgba(0,0,0,.15)' }}>
            <Globe size={32} color="#60a5fa" strokeWidth={1.8} />
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:'.08em', margin:'0 0 4px' }}>States / UTs Represented</p>
              <p style={{ fontSize:30, fontWeight:900, color:'#fff', margin:0, lineHeight:1 }}>{demo.total_states_uts_represented}</p>
            </div>
          </div>
          <div style={{ background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)', borderRadius:16, padding:'22px 28px', display:'flex', alignItems:'center', gap:16, boxShadow:'0 4px 20px rgba(0,0,0,.15)' }}>
            <Building2 size={32} color="#a78bfa" strokeWidth={1.8} />
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:'.08em', margin:'0 0 4px' }}>Unique Colleges</p>
              <p style={{ fontSize:30, fontWeight:900, color:'#fff', margin:0, lineHeight:1 }}>{demo.total_unique_colleges}</p>
            </div>
          </div>
          <div style={{ background:'linear-gradient(135deg,#0d2137 0%,#0a3d2b 100%)', borderRadius:16, padding:'22px 28px', display:'flex', alignItems:'center', gap:16, boxShadow:'0 4px 20px rgba(0,0,0,.15)' }}>
            <Calendar size={32} color="#34d399" strokeWidth={1.8} />
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.6)', textTransform:'uppercase', letterSpacing:'.08em', margin:'0 0 4px' }}>Busiest Submission Day</p>
              <p style={{ fontSize:18, fontWeight:900, color:'#fff', margin:0, lineHeight:1.2 }}>{sub.busiest_submission_day}</p>
            </div>
          </div>
        </div>

        {/* ── ROW 2 : COLLEGES + GENDER ── */}
        <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:20, marginBottom:24 }}>

          {/* colleges */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <GraduationCap size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Top 10 Colleges</span>
            </div>
            <div style={{ height:340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demo.top_10_colleges} layout="vertical" margin={{ top:0, right:44, left:0, bottom:0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={200} tick={{ fontSize:12, fill:'#374151', fontWeight:600 }} tickLine={false} axisLine={false} interval={0} />
                  <Tooltip cursor={{ fill:'#f9fafb' }} content={<ChartTip />} />
                  <Bar dataKey="count" radius={[0,5,5,0]} barSize={17}>
                    {demo.top_10_colleges.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                    <LabelList dataKey="count" position="right" style={{ fontSize:12, fontWeight:700, fill:'#374151' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#9ca3af', fontWeight:600, marginTop:8, paddingTop:10, borderTop:'1px solid #f3f4f6', paddingLeft:200 }}>
              {['0','110','220','330','440'].map(v=><span key={v}>{v}</span>)}
            </div>
          </div>

          {/* gender */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <Users size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Gender Breakdown</span>
            </div>
            <div style={{ flex:1, position:'relative', display:'flex', justifyContent:'center', alignItems:'center', minHeight:280 }}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={genderData} cx="50%" cy="50%" innerRadius={90} outerRadius={125} paddingAngle={3} dataKey="value" stroke="none">
                    {genderData.map((g, i) => <Cell key={i} fill={GENDER_CLR[g.name]} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
                <span style={{ fontSize:34, fontWeight:900, color:'#111827', lineHeight:1 }}>{totalGender.toLocaleString()}</span>
                <span style={{ fontSize:13, color:'#6b7280', fontWeight:600, marginTop:4 }}>Participants</span>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:16 }}>
              {genderData.map(g => (
                <div key={g.name} style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ width:11, height:11, borderRadius:'50%', background:GENDER_CLR[g.name], display:'inline-block' }}/>
                  <span style={{ fontSize:13, fontWeight:700, color:'#374151' }}>{g.name}</span>
                  <span style={{ fontSize:13, color:'#6b7280', fontWeight:500 }}>{g.value.toLocaleString()} ({(g.value/totalGender*100).toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 3 : YEAR + DEPTS + CITIES ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:32 }}>

          {/* Year of Study */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <BookOpen size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Year of Study</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, height:260 }}>
              <div style={{ width:'48%', height:'100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={yearData} cx="50%" cy="50%" innerRadius={32} outerRadius={88} dataKey="count" stroke="#fff" strokeWidth={3}>
                      {yearData.map((_, i) => <Cell key={i} fill={YEAR_CLR[i % YEAR_CLR.length]} />)}
                    </Pie>
                    <Tooltip content={<ChartTip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                {yearData.map((y, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:13 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ width:10, height:10, borderRadius:'50%', background:YEAR_CLR[i % YEAR_CLR.length], display:'inline-block', flexShrink:0 }}/>
                      <span style={{ fontWeight:700, color:'#374151' }}>{y.year}</span>
                    </div>
                    <span style={{ color:'#6b7280', fontWeight:600 }}>
                      {(y.count/totalYrs*100).toFixed(1)}% <span style={{ color:'#9ca3af', fontWeight:400 }}>({y.count})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Departments */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <Users size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Top Departments</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {demo.top_10_departments.slice(0,6).map((d, i) => {
                const { Icon: DI, color, bg } = getDeptIcon(d.department);
                return (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 12px', borderRadius:12, cursor:'default', transition:'background .15s' }}
                    onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'}
                    onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, overflow:'hidden' }}>
                      <div style={{ background:bg, borderRadius:8, padding:7, flexShrink:0 }}>
                        <DI size={15} color={color} />
                      </div>
                      <span style={{ fontSize:13, fontWeight:700, color:'#374151', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.department}</span>
                    </div>
                    <span style={{ fontSize:14, fontWeight:900, color, flexShrink:0, marginLeft:8 }}>{d.count.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Cities */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <MapPin size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Top Cities</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {demo.top_10_cities.slice(0,6).map((c, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 8px', borderBottom: i < 5 ? '1px solid #f3f4f6' : 'none' }}>
                  <span style={{ fontSize:14, fontWeight:700, color:'#374151' }}>{c.city.split(',')[0]}</span>
                  <span style={{ fontSize:15, fontWeight:900, color:'#10b981' }}>{c.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 4 : COLLEGE TYPE + TOP STATES ── */}
        <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:20, marginBottom:24 }}>

          {/* College type breakdown */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <Building2 size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>College Type Breakdown</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {demo.college_type_breakdown.map((c, i) => {
                const total = demo.college_type_breakdown.reduce((a, x) => a + x.participant_count, 0);
                const pct   = (c.participant_count / total * 100).toFixed(1);
                return (
                  <div key={i}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:'#374151' }}>{c.type}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:'#6b7280' }}>
                        {c.participant_count.toLocaleString()} <span style={{ color:'#9ca3af', fontWeight:500 }}>({pct}%) · {c.unique_colleges} colleges</span>
                      </span>
                    </div>
                    <div style={{ background:'#f3f4f6', borderRadius:99, height:8, overflow:'hidden' }}>
                      <div style={{ width:`${pct}%`, height:'100%', borderRadius:99, background:BAR_COLORS[i] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 5 States */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)', display:'flex', flexDirection:'column' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <Globe size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Top States / UTs</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column' }}>
              {demo.top_5_states.map((s, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 8px', borderBottom: i < demo.top_5_states.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ width:24, height:24, borderRadius:6, background:BAR_COLORS[i], display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, color:'#fff', flexShrink:0 }}>{i+1}</span>
                    <span style={{ fontSize:14, fontWeight:700, color:'#374151' }}>{s.state}</span>
                  </div>
                  <span style={{ fontSize:15, fontWeight:900, color:'#3b82f6' }}>{s.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 5 : SDG CHART + HIGHLIGHTS ── */}
        <div style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:20, marginBottom:24 }}>

          {/* SDG bar chart */}
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:18, padding:'28px 32px', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
              <Activity size={18} color="#6366f1" strokeWidth={2} />
              <span style={{ fontSize:16, fontWeight:800, color:'#111827' }}>Submissions by UN SDG Goal</span>
            </div>
            <div style={{ height:310 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sdgData} margin={{ top:28, right:8, left:-16, bottom:36 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize:11, fill:'#6b7280', fontWeight:600 }} angle={-45} textAnchor="end" height={48} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize:12, fill:'#9ca3af' }} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill:'#f9fafb' }} content={<ChartTip />} />
                  <Bar dataKey="count" radius={[4,4,0,0]} barSize={30}>
                    {sdgData.map((_, i) => <Cell key={i} fill={SDG_COLORS[i % SDG_COLORS.length]} />)}
                    <LabelList dataKey="count" position="top" style={{ fontSize:11, fontWeight:700, fill:'#374151' }} offset={6} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* peak time + top category */}
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

            {/* peak time */}
            <div style={{ background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)', borderRadius:18, padding:'32px 36px', flex:1, position:'relative', overflow:'hidden', boxShadow:'0 8px 32px rgba(79,70,229,.25)' }}>
              {/* wave decoration */}
              <svg style={{ position:'absolute', bottom:0, left:0, right:0, width:'100%', opacity:.2 }} viewBox="0 0 400 60" preserveAspectRatio="none">
                <path d="M0,30 C50,0 100,60 150,30 C200,0 250,60 300,30 C350,0 400,60 400,30 L400,60 L0,60 Z" fill="white"/>
              </svg>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <Clock size={18} color="rgba(255,255,255,.8)" />
                  <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.8)', textTransform:'uppercase', letterSpacing:'.08em' }}>Peak Submission Time</span>
                </div>
                <p style={{ fontSize:24, fontWeight:900, color:'#fff', margin:'0 0 6px', letterSpacing:'-.5px', lineHeight:1.25 }}>{sub.peak_submission_time}</p>
                <p style={{ fontSize:13, color:'rgba(255,255,255,.65)', fontWeight:500, margin:0 }}>Highest traffic window</p>
              </div>
            </div>

            {/* top category */}
            <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:18, padding:'28px 32px', flex:1, position:'relative', overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
              <Trophy size={80} color="#86efac" style={{ position:'absolute', right:12, bottom:8, opacity:.5 }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <Award size={18} color="#15803d" />
                  <span style={{ fontSize:11, fontWeight:700, color:'#15803d', textTransform:'uppercase', letterSpacing:'.08em' }}>Top Category</span>
                </div>
                <p style={{ fontSize:26, fontWeight:900, color:'#14532d', margin:'0 0 8px', letterSpacing:'-.3px' }}>{sub.by_category[0]?.category}</p>
                <p style={{ fontSize:14, fontWeight:700, color:'#16a34a', margin:0 }}>
                  {sub.by_category[0]?.count} submissions ({(sub.by_category[0]?.count/sm.total_submissions*100).toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:'14px 24px', fontSize:12, color:'#6b7280', fontWeight:600 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, color:'#4f46e5' }}>
            <Info size={15} />
            <span>Final analytics from SRCAS Hackathon 3.0</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <span>Event concluded: July 26, 2026 • 6:00 PM IST</span>
          </div>
        </div>

      </div>
    </div>
  );
}
