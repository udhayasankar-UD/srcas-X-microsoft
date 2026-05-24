import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

const INDIA_STATES_CITIES = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kakinada", "Anantapur", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Roing"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Ara", "Begusarai"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Panchkula"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Manali", "Kullu"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi", "Davangere", "Ballari", "Vijayapura", "Shivamogga"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur", "Alappuzha", "Kottayam", "Palakkad"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Navi Mumbai", "Kolhapur", "Sangli", "Jalgaon"],
  "Manipur": ["Imphal", "Thoubal", "Kakching", "Churachandpur", "Bishnupur"],
  "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak"],
  "Puducherry": ["Puducherry", "Oulgaret", "Karaikal", "Yanam", "Mahe"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Moga", "Abohar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Greater Noida"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur"]
};

const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics and Communication",
  "Electrical and Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence",
  "Data Science",
  "Other"
];

const defaultMember = { 
  full_name: '', email: '', phone_number: '', 
  state: '', city: '', dept: '', dept_other: '', year: '',
  college_name: '', reg_no: '' 
};

// Reusable inline styles to replace Tailwind
const styles = {
  card: { background: '#fff', borderRadius: 16, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1.5px solid #f0f0f0' },
  input: { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', background: '#fff', transition: 'border-color 0.2s', fontFamily: 'inherit' },
  inputDisabled: { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', background: '#f3f4f6', color: '#9ca3af', cursor: 'not-allowed', fontFamily: 'inherit' },
  label: { fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 6, display: 'block' },
  buttonPrimary: { padding: '12px 24px', borderRadius: 10, border: 'none', background: '#4C9F38', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'transform 0.1s, background 0.2s', boxShadow: '0 4px 12px rgba(76,159,56,0.2)' },
  buttonSecondary: { padding: '12px 24px', borderRadius: 10, border: 'none', background: '#111', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'transform 0.1s, background 0.2s' },
  buttonDisabled: { padding: '12px 24px', borderRadius: 10, border: 'none', background: '#e5e7eb', color: '#9ca3af', fontSize: 14, fontWeight: 800, cursor: 'not-allowed' },
  buttonBack: { padding: '12px 24px', borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }
};

export default function TeamTab({ hasTeam, teamData, teamMembers, user, setTeamMembers, setTeamData, setHasTeam }) {
  // --- STATE MANAGEMENT ---
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    teamName: '',
    teamSize: 2,
    leader: { 
      ...defaultMember, 
      full_name: user?.user_metadata?.full_name || '', 
      email: user?.email || '' 
    },
    teammates: [{ ...defaultMember }] // Initialized for teamSize 2 (1 teammate)
  });
  
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update teammates array when team size changes
  useEffect(() => {
    const requiredTeammates = formData.teamSize - 1;
    let newTeammates = [...formData.teammates];
    
    if (newTeammates.length < requiredTeammates) {
      for (let i = newTeammates.length; i < requiredTeammates; i++) {
        newTeammates.push({ ...defaultMember });
      }
    } else if (newTeammates.length > requiredTeammates) {
      newTeammates = newTeammates.slice(0, requiredTeammates);
    }
    
    setFormData(prev => ({ ...prev, teammates: newTeammates }));
  }, [formData.teamSize]);

  // --- VALIDATION ---
  const validateCurrentStep = () => {
    setErrorMsg('');
    if (currentStep === 0) {
      if (!formData.teamName.trim()) return "Team Name is required.";
      if (!/^[a-zA-Z0-9 ]+$/.test(formData.teamName)) return "Team Name can only contain letters, numbers, and spaces.";
      return true;
    }

    const validateMember = (member) => {
      if (!member.full_name.trim() || !member.email.trim() || !member.phone_number.trim() || !member.state || !member.city || !member.dept || !member.year || !member.college_name.trim() || !member.reg_no.trim()) {
        return "Please fill out all fields.";
      }
      if (!/^\d{10}$/.test(member.phone_number)) {
        return "Phone number must be exactly 10 digits.";
      }
      if (member.dept === 'Other' && !member.dept_other.trim()) {
        return "Please specify your department.";
      }
      return true;
    };

    if (currentStep === 1) {
      return validateMember(formData.leader);
    }

    if (currentStep > 1) {
      const teammateIndex = currentStep - 2;
      return validateMember(formData.teammates[teammateIndex]);
    }
    
    return true;
  };

  const handleNext = () => {
    const isValid = validateCurrentStep();
    if (isValid !== true) {
      setErrorMsg(isValid);
      return;
    }
    setErrorMsg('');
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setErrorMsg('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const isValid = validateCurrentStep();
    if (isValid !== true) {
      setErrorMsg(isValid);
      return;
    }
    
    setCreating(true);
    setErrorMsg('');
    try {
      // 1. Create Team
      const { data: team, error: teamErr } = await supabase.from('teams').insert({
        leader_id: user.id,
        team_name: formData.teamName
      }).select().single();
      if (teamErr) throw teamErr;
      
      // 2. Format Members (Merge State/City into Location, resolve Dept)
      const formatMember = (m) => ({
        team_id: team.id,
        full_name: m.full_name,
        email: m.email,
        phone_number: m.phone_number,
        location: `${m.city}, ${m.state}`,
        college_name: m.college_name,
        reg_no: m.reg_no,
        dept: m.dept === 'Other' ? m.dept_other : m.dept,
        year: m.year
      });

      const allMembers = [
        formatMember(formData.leader),
        ...formData.teammates.map(formatMember)
      ];
      
      // 3. Insert Members
      const { data: members, error: memErr } = await supabase.from('team_members').insert(allMembers).select();
      if (memErr) throw memErr;
      
      setTeamData(team);
      setTeamMembers(members);
      setHasTeam(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setCreating(false);
    }
  };

  // --- RENDER HELPERS ---
  const totalSteps = 2 + formData.teammates.length; // Setup + Leader + Teammates

  const renderMemberFields = (member, isLeader, index) => {
    const updateMember = (field, value) => {
      if (isLeader) {
        setFormData(prev => ({ ...prev, leader: { ...prev.leader, [field]: value } }));
      } else {
        const newTeammates = [...formData.teammates];
        newTeammates[index] = { ...newTeammates[index], [field]: value };
        // Reset city if state changes
        if (field === 'state') newTeammates[index].city = '';
        setFormData(prev => ({ ...prev, teammates: newTeammates }));
      }
    };

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {/* Personal Details */}
        <div>
          <label style={styles.label}>Full Name</label>
          <input type="text" value={member.full_name} onChange={e => updateMember('full_name', e.target.value)} disabled={isLeader} style={isLeader ? styles.inputDisabled : styles.input} placeholder="Full Name" />
        </div>
        <div>
          <label style={styles.label}>Email Address</label>
          <input type="email" value={member.email} onChange={e => updateMember('email', e.target.value)} disabled={isLeader} style={isLeader ? styles.inputDisabled : styles.input} placeholder="Email Address" />
        </div>
        <div>
          <label style={styles.label}>Phone Number</label>
          <div style={{ display: 'flex', borderRadius: 10, border: '1.5px solid #e5e7eb', overflow: 'hidden', background: '#fff' }}>
            <span style={{ padding: '12px 14px', background: '#f9fafb', borderRight: '1.5px solid #e5e7eb', color: '#6b7280', fontSize: 14, fontWeight: 600 }}>+91</span>
            <input type="tel" value={member.phone_number} onChange={e => updateMember('phone_number', e.target.value.replace(/\D/g, '').slice(0, 10))} style={{ width: '100%', padding: '12px 14px', border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit' }} placeholder="10-digit mobile number" />
          </div>
        </div>

        {/* Location Details */}
        <div>
          <label style={styles.label}>State</label>
          <select value={member.state} onChange={e => { updateMember('state', e.target.value); if(isLeader) setFormData(p => ({...p, leader:{...p.leader, state:e.target.value, city:''}})); }} style={{ ...styles.input, cursor: 'pointer' }}>
            <option value="" disabled>Select State</option>
            {Object.keys(INDIA_STATES_CITIES).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label style={styles.label}>City</label>
          <select value={member.city} onChange={e => updateMember('city', e.target.value)} disabled={!member.state} style={!member.state ? styles.inputDisabled : { ...styles.input, cursor: 'pointer' }}>
            <option value="" disabled>Select City</option>
            {member.state && INDIA_STATES_CITIES[member.state]?.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Academic Details */}
        <div>
          <label style={styles.label}>College / Organization</label>
          <input type="text" value={member.college_name} onChange={e => updateMember('college_name', e.target.value)} style={styles.input} placeholder="E.g., SRCAS" />
        </div>
        <div>
          <label style={styles.label}>Register Number</label>
          <input type="text" value={member.reg_no} onChange={e => updateMember('reg_no', e.target.value)} style={styles.input} placeholder="Registration ID" />
        </div>
        <div>
          <label style={styles.label}>Department</label>
          <select value={member.dept} onChange={e => updateMember('dept', e.target.value)} style={{ ...styles.input, cursor: 'pointer' }}>
            <option value="" disabled>Select Department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        {member.dept === 'Other' && (
          <div>
            <label style={styles.label}>Specify Department</label>
            <input type="text" value={member.dept_other} onChange={e => updateMember('dept_other', e.target.value)} style={styles.input} placeholder="Your Department" />
          </div>
        )}
        <div>
          <label style={styles.label}>Year of Study</label>
          <select value={member.year} onChange={e => updateMember('year', e.target.value)} style={{ ...styles.input, cursor: 'pointer' }}>
            <option value="" disabled>Select Year</option>
            {[1, 2, 3, 4].map(y => <option key={y} value={`${y} Year`}>{y} Year</option>)}
          </select>
        </div>
      </div>
    );
  };

  // --- MAIN RENDER ---
  if (!hasTeam) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Wizard Header / Progress Bar */}
        <div style={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: 20 }}>
            <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '100%', height: 4, background: '#f3f4f6', borderRadius: 10, zIndex: 0 }}></div>
            <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', height: 4, background: '#4C9F38', borderRadius: 10, zIndex: 0, transition: 'width 0.3s ease', width: `${(currentStep / (totalSteps - 1)) * 100}%` }}></div>
            
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;
              return (
                <div key={idx} style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', fontWeight: 800, fontSize: 14, border: '3px solid', transition: 'all 0.3s ease', 
                  background: isActive ? '#4C9F38' : isPast ? '#4C9F38' : '#fff', 
                  borderColor: isActive ? '#4C9F38' : isPast ? '#4C9F38' : '#e5e7eb', 
                  color: isActive || isPast ? '#fff' : '#9ca3af',
                  boxShadow: isActive ? '0 0 0 4px rgba(76,159,56,0.15)' : 'none'
                }}>
                  {isPast ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : idx + 1}
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', fontWeight: 800, fontSize: 16, color: '#111' }}>
            {currentStep === 0 && "Step 1: Team Setup"}
            {currentStep === 1 && "Step 2: Team Lead Details"}
            {currentStep > 1 && `Step ${currentStep + 1}: Teammate ${currentStep - 1} Details`}
          </div>
        </div>

        {/* Wizard Content */}
        <div style={styles.card}>
          
          {errorMsg && (
            <div style={{ marginBottom: 24, background: '#fef2f2', border: '1.5px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {errorMsg}
            </div>
          )}

          {/* Step 1: Team Setup */}
          {currentStep === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minHeight: 300 }}>
              <div style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 14, padding: 20, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ background: '#dbeafe', color: '#2563eb', padding: 8, borderRadius: 10, flexShrink: 0 }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>
                <div>
                  <h3 style={{ color: '#1e3a8a', fontWeight: 800, margin: '0 0 6px 0', fontSize: 15 }}>Registration Rules</h3>
                  <p style={{ color: '#1e40af', fontSize: 13, margin: 0, lineHeight: 1.5 }}>Only the Team Lead needs to register the team. Teams must consist of <strong>2 to 4 members</strong> in total (including the leader). Please establish your team size before proceeding.</p>
                </div>
              </div>

              <div>
                <label style={styles.label}>Team Name</label>
                <input type="text" value={formData.teamName} onChange={e => setFormData({...formData, teamName: e.target.value})} placeholder="e.g. Innovators, Team Nova" style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>Total Team Size</label>
                <select value={formData.teamSize} onChange={e => setFormData({...formData, teamSize: parseInt(e.target.value)})} style={{ ...styles.input, cursor: 'pointer' }}>
                  <option value={2}>2 Members (Lead + 1 Teammate)</option>
                  <option value={3}>3 Members (Lead + 2 Teammates)</option>
                  <option value={4}>4 Members (Lead + 3 Teammates)</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Team Lead Details */}
          {currentStep === 1 && (
            <div style={{ minHeight: 300 }}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#111', margin: '0 0 4px 0' }}>Your Details (Team Lead)</h3>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Please provide your contact and academic information.</p>
              </div>
              {renderMemberFields(formData.leader, true, null)}
            </div>
          )}

          {/* Step 3+: Teammate Details */}
          {currentStep > 1 && (
            <div style={{ minHeight: 300 }}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#111', margin: '0 0 4px 0' }}>Teammate {currentStep - 1} Details</h3>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Provide the details for member {currentStep} of {formData.teamSize}.</p>
              </div>
              {renderMemberFields(formData.teammates[currentStep - 2], false, currentStep - 2)}
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1.5px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" onClick={handleBack} disabled={currentStep === 0 || creating} style={currentStep === 0 ? { ...styles.buttonBack, opacity: 0, cursor: 'default' } : styles.buttonBack}
              onMouseEnter={e => { if (currentStep !== 0 && !creating) e.currentTarget.style.background = '#f9fafb'; }}
              onMouseLeave={e => { if (currentStep !== 0 && !creating) e.currentTarget.style.background = '#fff'; }}>
              ← Back
            </button>
            
            {currentStep === totalSteps - 1 ? (
              <button type="button" onClick={handleSubmit} disabled={creating} style={creating ? styles.buttonDisabled : styles.buttonPrimary}
                onMouseEnter={e => { if (!creating) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { if (!creating) e.currentTarget.style.transform = 'translateY(0)'; }}>
                {creating ? 'Submitting...' : 'Submit Team 🚀'}
              </button>
            ) : (
              <button type="button" onClick={handleNext} style={styles.buttonSecondary}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Next Step →
              </button>
            )}
          </div>

        </div>
      </div>
    );
  }

  // --- SUMMARY VIEW (After Registration) ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <div style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg,#4C9F38,#26BDE2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>🚀</div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: '#111', margin: '0 0 4px 0' }}>{teamData.team_name}</h2>
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0, fontWeight: 600 }}>Total Members: {teamMembers.length}</p>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: '#111', marginBottom: 20 }}>👥 Team Roster</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {teamMembers.map((m, idx) => {
            const isLeader = m.email === user.email;
            return (
              <div key={m.id || idx} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', borderRadius: 14, background: isLeader ? '#f0fdf4' : '#fff', border: isLeader ? '1.5px solid #bbf7d0' : '1.5px solid #e5e7eb' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, flexShrink: 0, background: isLeader ? '#4C9F38' : '#26BDE2' }}>
                  {m.full_name ? m.full_name[0].toUpperCase() : '?'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.full_name} <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280' }}>({m.college_name})</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>
                    {m.email} • {m.phone_number}
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20, background: isLeader ? '#dcfce7' : '#f3f4f6', color: isLeader ? '#166534' : '#4b5563' }}>
                  {isLeader ? 'Leader' : 'Member'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
