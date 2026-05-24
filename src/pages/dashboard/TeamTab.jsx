import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const card = (extra={}) => ({ background:'#fff', borderRadius:14, padding:'22px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)', border:'1.5px solid #f0f0f0', ...extra });

export default function TeamTab({ hasTeam, teamData, teamMembers, user, setTeamMembers, setTeamData, setHasTeam }) {
  const [teamName, setTeamName] = useState('');
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Add member form state
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newMember, setNewMember] = useState({
    full_name: '', email: '', phone_number: '', college_name: '', reg_no: '', dept: '', year: '', location: ''
  });

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setCreating(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase.from('teams').insert({
        leader_id: user.id,
        team_name: teamName
      }).select().single();
      
      if (error) throw error;
      setTeamData(data);
      setHasTeam(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setAdding(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase.from('team_members').insert({
        team_id: teamData.id,
        ...newMember
      }).select().single();
      
      if (error) throw error;
      setTeamMembers([...teamMembers, data]);
      setShowAdd(false);
      setNewMember({ full_name: '', email: '', phone_number: '', college_name: '', reg_no: '', dept: '', year: '', location: '' });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (!hasTeam) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:400 }}>
        <div className="dash-card" style={card({ width:'100%', maxWidth:500 })}>
          <div style={{ fontSize:40, textAlign:'center', marginBottom:12 }}>🤝</div>
          <h2 style={{ fontSize:20, fontWeight:900, color:'#111', textAlign:'center', marginBottom:8 }}>Register Your Team</h2>
          <p style={{ fontSize:14, color:'#6b7280', textAlign:'center', marginBottom:24 }}>You must create a team to unlock the rest of the dashboard and invite your teammates.</p>
          
          <form onSubmit={handleCreateTeam} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {errorMsg && <div style={{ color: '#E5243B', fontSize: 13, fontWeight: 600 }}>{errorMsg}</div>}
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <label style={{ fontSize:13, fontWeight:700, color:'#374151' }}>Team Name</label>
              <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} required
                placeholder="e.g. Innovators, Team Nova"
                pattern="^[a-zA-Z0-9 ]+$"
                title="Only letters, numbers, and spaces are allowed."
                style={{ padding:'12px 14px', borderRadius:10, border:'1.5px solid #e5e7eb', fontSize:14, outline:'none', transition:'all 0.2s' }}
                onFocus={e => { e.target.style.borderColor='#4C9F38'; e.target.style.boxShadow='0 0 0 3px rgba(76,159,56,0.1)'; }}
                onBlur={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; }}
              />
              <div style={{ fontSize: '11px', color: '#9ca3af' }}>Only letters, numbers, and spaces allowed. No special characters.</div>
            </div>
            <button type="submit" disabled={creating} style={{ padding:'12px', borderRadius:10, background:'#4C9F38', color:'#fff', fontWeight:800, fontSize:14, border:'none', cursor: creating?'not-allowed':'pointer', opacity: creating?0.7:1 }}>
              {creating ? 'Creating...' : 'Create Team'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const maxMembers = 3; // + 1 leader = 4 total

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
      <div className="dash-card" style={card({ display:'flex', alignItems:'center', gap:18, flexWrap:'wrap' })}>
        <div style={{ width:56, height:56, borderRadius:14, background:'linear-gradient(135deg,#4C9F38,#26BDE2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, flexShrink:0 }}>🚀</div>
        <div style={{ flex:1, minWidth:160 }}>
          <div style={{ fontSize:20, fontWeight:900, color:'#111' }}>{teamData.team_name}</div>
          <div style={{ fontSize:13, color:'#6b7280', marginTop:2 }}>You are the Team Leader</div>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div className="dash-card" style={card()}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div style={{ fontSize:15, fontWeight:800, color:'#111' }}>👥 Team Members ({teamMembers.length + 1}/4)</div>
            {teamMembers.length < maxMembers && !showAdd && (
              <button onClick={() => setShowAdd(true)} style={{ padding:'6px 12px', borderRadius:8, background:'#f0fdf4', color:'#166534', fontWeight:700, fontSize:12, border:'1px solid #bbf7d0', cursor:'pointer' }}>+ Add Member</button>
            )}
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {/* Team Leader */}
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'#f9fafb', borderRadius:12 }}>
              <div style={{ width:38, height:38, borderRadius:'50%', background:'#4C9F38', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:15 }}>{user.user_metadata?.full_name?.[0] || 'L'}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>{user.user_metadata?.full_name || 'Team Leader'}</div>
                <div style={{ fontSize:11, color:'#9ca3af' }}>{user.email}</div>
              </div>
              <span style={{ fontSize:11, fontWeight:600, color:'#166534', background:'#dcfce7', padding:'3px 10px', borderRadius:20 }}>Leader</span>
            </div>

            {/* Other Members */}
            {teamMembers.map((m) => (
              <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', background:'#fff', border:'1px solid #e5e7eb', borderRadius:12 }}>
                <div style={{ width:38, height:38, borderRadius:'50%', background:'#26BDE2', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:800, fontSize:15 }}>{m.full_name[0]}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#111' }}>{m.full_name} <span style={{ fontSize:11, color:'#6b7280', fontWeight:500 }}>({m.college_name})</span></div>
                  <div style={{ fontSize:11, color:'#9ca3af' }}>{m.email} • {m.phone_number}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:600, color:'#6b7280', background:'#f3f4f6', padding:'3px 10px', borderRadius:20 }}>Member</span>
              </div>
            ))}
          </div>

          {showAdd && (
            <form onSubmit={handleAddMember} style={{ marginTop:20, padding:16, border:'1.5px dashed #d1d5db', borderRadius:12, background:'#f9fafb' }}>
              <div style={{ fontSize:14, fontWeight:800, marginBottom:12 }}>Add New Member</div>
              {errorMsg && <div style={{ color: '#E5243B', fontSize: 13, marginBottom:10 }}>{errorMsg}</div>}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <input type="text" required placeholder="Full Name" value={newMember.full_name} onChange={e => setNewMember({...newMember, full_name:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="email" required placeholder="Email" value={newMember.email} onChange={e => setNewMember({...newMember, email:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="tel" required placeholder="Phone Number" value={newMember.phone_number} onChange={e => setNewMember({...newMember, phone_number:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="text" required placeholder="College Name" value={newMember.college_name} onChange={e => setNewMember({...newMember, college_name:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="text" required placeholder="Registration Number" value={newMember.reg_no} onChange={e => setNewMember({...newMember, reg_no:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="text" required placeholder="Department" value={newMember.dept} onChange={e => setNewMember({...newMember, dept:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="text" required placeholder="Year" value={newMember.year} onChange={e => setNewMember({...newMember, year:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
                <input type="text" required placeholder="Location" value={newMember.location} onChange={e => setNewMember({...newMember, location:e.target.value})} style={{ padding:10, borderRadius:8, border:'1px solid #e5e7eb', fontSize:13 }}/>
              </div>
              <div style={{ display:'flex', gap:10, marginTop:16 }}>
                <button type="button" onClick={() => setShowAdd(false)} style={{ padding:'8px 16px', borderRadius:8, border:'1px solid #e5e7eb', background:'#fff', fontWeight:600, fontSize:13, cursor:'pointer' }}>Cancel</button>
                <button type="submit" disabled={adding} style={{ padding:'8px 16px', borderRadius:8, border:'none', background:'#4C9F38', color:'#fff', fontWeight:700, fontSize:13, cursor: adding?'not-allowed':'pointer' }}>{adding ? 'Adding...' : 'Add Member'}</button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
