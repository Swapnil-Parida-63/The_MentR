import { useState, useEffect, useRef } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';
import { parentAPI, teachersAPI } from '../../services/api';

const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Social Studies', 'Computer Science'];
const boardsOptions = ['CBSE', 'ICSE', 'IB', 'State Board'];
const classesOptions = ['Class 1–5', 'Class 6–8', 'Class 9–10', 'Class 11–12'];
const mediumsList = ['English', 'Hindi', 'Odia', 'Bengali', 'Bilingual'];
const locationOptions = ['Patia', 'Jayadev Vihar', 'Nayapalli', 'Saheed Nagar', 'Khandagiri', 'Chandrasekharpur', 'Ghatikia', 'Vani Vihar'];

// Underline Input Component matching Apple/Stripe focus transitions
function UnderlineField({ label, type = "text", placeholder, value, onChange, required = false }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ marginBottom: 40, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isFocused ? '#4F7CFF' : '#1D2433', 
          marginBottom: 10,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          transition: 'color 0.25s'
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input 
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            padding: '12px 0',
            fontSize: 16,
            color: '#1D2433',
            fontFamily: 'var(--font-sans)',
            caretColor: '#4F7CFF',
            boxSizing: 'border-box'
          }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(29, 36, 51, 0.15)', pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #4F7CFF 0%, #7469F8 100%)',
          transform: isFocused ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
}

function UnderlineSelect({ label, value, onChange, required = false, children }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ marginBottom: 40, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isFocused ? '#4F7CFF' : '#1D2433', 
          marginBottom: 10,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          transition: 'color 0.25s'
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select 
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            padding: '12px 0',
            fontSize: 16,
            color: '#1D2433',
            fontFamily: 'var(--font-sans)',
            appearance: 'none',
            cursor: 'pointer',
            boxSizing: 'border-box'
          }}
        >
          {children}
        </select>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(29, 36, 51, 0.15)', pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #4F7CFF 0%, #7469F8 100%)',
          transform: isFocused ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#5D677A', fontSize: 10 }}>▼</div>
      </div>
    </div>
  );
}

function UnderlineTextarea({ label, placeholder, value, onChange, required = false }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ marginBottom: 40, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isFocused ? '#4F7CFF' : '#1D2433', 
          marginBottom: 10,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          transition: 'color 0.25s'
        }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <textarea 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            padding: '12px 0',
            fontSize: 16,
            color: '#1D2433',
            fontFamily: 'var(--font-sans)',
            resize: 'none',
            height: 64,
            boxSizing: 'border-box'
          }}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(29, 36, 51, 0.15)', pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #4F7CFF 0%, #7469F8 100%)',
          transform: isFocused ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
}

// Custom MultiSelect Dropdown Component matching Stripe/Apple aesthetics
function UnderlineMultiSelect({ label, options, selectedValues, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (opt) => {
    if (selectedValues.includes(opt)) {
      onChange(selectedValues.filter(v => v !== opt));
    } else {
      onChange([...selectedValues, opt]);
    }
  };

  return (
    <div ref={dropdownRef} style={{ marginBottom: 40, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isOpen ? '#4F7CFF' : '#1D2433', 
          marginBottom: 10,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          transition: 'color 0.25s'
        }}
      >
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          minHeight: 44,
          borderBottom: '1px solid rgba(29, 36, 51, 0.15)',
          padding: '8px 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {selectedValues.length === 0 ? (
          <span style={{ color: '#5D677A', opacity: 0.6, fontSize: 16 }}>Select options...</span>
        ) : (
          selectedValues.map(v => (
            <span 
              key={v}
              style={{
                background: 'rgba(79, 124, 255, 0.08)',
                color: '#4F7CFF',
                fontSize: 12,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 99,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(v);
              }}
            >
              {v} <span style={{ fontSize: 10 }}>✕</span>
            </span>
          ))
        )}
        <div style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', color: '#5D677A', fontSize: 10 }}>
          {isOpen ? '▲' : '▼'}
        </div>
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, #4F7CFF 0%, #7469F8 100%)',
          transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.25s ease',
          pointerEvents: 'none'
        }} />
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          border: '1px solid rgba(79, 124, 255, 0.12)',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
          borderRadius: 12,
          zIndex: 999,
          maxHeight: 200,
          overflowY: 'auto',
          marginTop: 6,
          padding: 8
        }}>
          {options.map(opt => {
            const isSelected = selectedValues.includes(opt);
            return (
              <div
                key={opt}
                onClick={() => toggleOption(opt)}
                style={{
                  padding: '8px 12px',
                  fontSize: 14,
                  borderRadius: 6,
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(79, 124, 255, 0.05)' : 'transparent',
                  color: isSelected ? '#4F7CFF' : '#1D2433',
                  fontWeight: isSelected ? 600 : 500,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
                {isSelected && <span style={{ fontSize: 12 }}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FormsSection() {
  const [activeTab, setActiveTab] = useState('parent'); // 'parent' or 'teacher'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); };

  // Step states
  const [parentStep, setParentStep] = useState(1);
  const [teacherStep, setTeacherStep] = useState(1);

  // Parent form states
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentBoard, setParentBoard] = useState('');
  const [parentGrade, setParentGrade] = useState('');
  const [parentSubjects, setParentSubjects] = useState([]);
  const [parentGaps, setParentGaps] = useState('');

  // Teacher Form Comprehensive fields
  // Step 1: Basic Info
  const [teacherFirstName, setTeacherFirstName] = useState('');
  const [teacherLastName, setTeacherLastName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  
  // Step 2: Personal Details
  const [teacherDob, setTeacherDob] = useState('');
  const [teacherAddress, setTeacherAddress] = useState('');
  const [teacherFatherName, setTeacherFatherName] = useState('');
  const [teacherMotherName, setTeacherMotherName] = useState('');

  // Step 3: Teaching Preferences
  const [boardsToTeach, setBoardsToTeach] = useState([]);
  const [boardsAlreadyTaught, setBoardsAlreadyTaught] = useState([]);
  const [classesToTeach, setClassesToTeach] = useState([]);
  const [classesAlreadyTaught, setClassesAlreadyTaught] = useState([]);
  const [subjectsToTeach, setSubjectsToTeach] = useState([]);
  const [subjectsPreviouslyTaught, setSubjectsPreviouslyTaught] = useState([]);
  const [mediumOfInstruction, setMediumOfInstruction] = useState([]);
  const [mostComfortableMedium, setMostComfortableMedium] = useState('');

  // Step 4: Service Location
  const [preferredLocations, setPreferredLocations] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleParentSubmit = async (e) => {
    e.preventDefault();
    if (parentSubjects.length === 0) {
      showToast("⚠️ Please select at least one subject.");
      return;
    }
    try {
      await parentAPI.submit({
        parentName,
        phone: parentPhone,
        board: parentBoard,
        class: parentGrade,
        subjects: parentSubjects,
        additionalNotes: parentGaps
      });
      showToast("✅ Assessment visit request submitted! We'll call you within 24 hours.");
      setParentStep(1);
      setParentName('');
      setParentPhone('');
      setParentBoard('');
      setParentGrade('');
      setParentSubjects([]);
      setParentGaps('');
    } catch (err) {
      console.error(err);
      showToast("❌ Connection error. Please check if backend is running.");
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (boardsToTeach.length === 0 || classesToTeach.length === 0 || subjectsToTeach.length === 0 || preferredLocations.length === 0) {
      showToast("⚠️ Please fill in all teaching and location preferences.");
      return;
    }

    try {
      await teachersAPI.apply({
        firstName: teacherFirstName,
        lastName: teacherLastName,
        email: teacherEmail,
        phone: teacherPhone,
        dob: teacherDob,
        currentAddress: teacherAddress,
        fatherName: teacherFatherName,
        motherName: teacherMotherName,
        boardsToTeach,
        boardsAlreadyTaught,
        classesToTeach,
        classesAlreadyTaught,
        subjectsToTeach,
        subjectsPreviouslyTaught,
        mediumOfInstruction,
        mostComfortableMedium,
        preferredLocations
      });
      showToast("✅ Teacher application received! We'll review and contact you within 5–7 days.");
      
      // Reset forms
      setTeacherStep(1);
      setTeacherFirstName('');
      setTeacherLastName('');
      setTeacherEmail('');
      setTeacherPhone('');
      setTeacherDob('');
      setTeacherAddress('');
      setTeacherFatherName('');
      setTeacherMotherName('');
      setBoardsToTeach([]);
      setBoardsAlreadyTaught([]);
      setClassesToTeach([]);
      setClassesAlreadyTaught([]);
      setSubjectsToTeach([]);
      setSubjectsPreviouslyTaught([]);
      setMediumOfInstruction([]);
      setMostComfortableMedium('');
      setPreferredLocations([]);
    } catch (err) {
      console.error(err);
      showToast("❌ Connection error. Please check if backend is running.");
    }
  };

  return (
    <section id="contact-forms" className="section" style={{ background: '#FAFBFF', padding: '120px 0' }}>
      <div className="container">
        <FadeUp><div className="eyebrow">Get Started</div></FadeUp>
        <FadeUp delay={0.1} duration={0.8} y={24}>
          <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 44px)', marginBottom: 20, fontFamily: 'var(--font-display)', fontWeight: 500, color: '#1D2433' }}>
            Let's build your learning journey
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} duration={0.7} y={12}>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, marginBottom: 60, fontSize: 16, lineHeight: 1.8 }}>
            Whether you are a parent looking for structured matching, or an educator ready to join — start here.
          </p>
        </FadeUp>

        <FadeUp delay={0.3} y={16}>
          <BorderGlow borderRadius={28} backgroundColor="#FFFFFF">
            <div className="editorial-form-grid">
              
              {/* Left Column: Form surface (70%) */}
              <div className="editorial-form-left">
                {/* Form Tabs Selector */}
                <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid rgba(79, 124, 255, 0.08)', marginBottom: 44, paddingBottom: 16 }}>
                  <button
                    onClick={() => setActiveTab('parent')}
                    style={{
                      background: 'none', border: 'none', fontSize: 15, fontWeight: 700,
                      color: activeTab === 'parent' ? '#4F7CFF' : '#5D677A', cursor: 'pointer',
                      position: 'relative', transition: 'color 0.25s', fontFamily: 'var(--font-sans)',
                      padding: '4px 0'
                    }}
                  >
                    Book Assessment Visit
                    {activeTab === 'parent' && <div style={{ position: 'absolute', bottom: -17, left: 0, right: 0, height: 2, background: '#4F7CFF' }} />}
                  </button>
                  <button
                    onClick={() => setActiveTab('teacher')}
                    style={{
                      background: 'none', border: 'none', fontSize: 15, fontWeight: 700,
                      color: activeTab === 'teacher' ? '#4F7CFF' : '#5D677A', cursor: 'pointer',
                      position: 'relative', transition: 'color 0.25s', fontFamily: 'var(--font-sans)',
                      padding: '4px 0'
                    }}
                  >
                    Join as a Teacher
                    {activeTab === 'teacher' && <div style={{ position: 'absolute', bottom: -17, left: 0, right: 0, height: 2, background: '#4F7CFF' }} />}
                  </button>
                </div>

                {activeTab === 'parent' ? (
                  /* Parent intake form */
                  <form onSubmit={handleParentSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* 3 Steps Progress Line */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 44 }}>
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: parentStep >= 1 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: parentStep >= 2 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: parentStep >= 3 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                    </div>

                    {parentStep === 1 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <UnderlineField label="Parent Name" placeholder="Your full name" value={parentName} onChange={e => setParentName(e.target.value)} required />
                        <UnderlineField label="Phone Number" type="tel" placeholder="+91 00000 00000" value={parentPhone} onChange={e => setParentPhone(e.target.value)} required />
                        
                        <button 
                          type="button" 
                          onClick={() => {
                            if (parentName && parentPhone) setParentStep(2);
                            else showToast("⚠️ Please fill in all fields.");
                          }}
                          className="btn-editorial-pill"
                          style={{ marginTop: 24 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    )}

                    {parentStep === 2 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <UnderlineSelect label="Syllabus / Board" value={parentBoard} onChange={e => setParentBoard(e.target.value)} required>
                          <option value="">Select board</option>
                          <option>CBSE</option>
                          <option>ICSE</option>
                          <option>IB</option>
                          <option>State Board</option>
                        </UnderlineSelect>

                        <UnderlineSelect label="Child's Grade" value={parentGrade} onChange={e => setParentGrade(e.target.value)} required>
                          <option value="">Select grade</option>
                          <option>Class 1–5</option>
                          <option>Class 6–8</option>
                          <option>Class 9–10</option>
                          <option>Class 11–12</option>
                        </UnderlineSelect>

                        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                          <button type="button" onClick={() => setParentStep(1)} className="btn-editorial-secondary-pill">Back</button>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (parentBoard && parentGrade) setParentStep(3);
                              else showToast("⚠️ Please select syllabus and grade.");
                            }} 
                            className="btn-editorial-pill"
                          >
                            Next Step →
                          </button>
                        </div>
                      </div>
                    )}

                    {parentStep === 3 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <div style={{ marginBottom: 40 }}>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D2433', marginBottom: 16, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Select Subjects (Select Multiple)</label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {subjectsList.map(s => {
                              const isSelected = parentSubjects.includes(s);
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => {
                                    if (isSelected) {
                                      setParentSubjects(parentSubjects.filter(sub => sub !== s));
                                    } else {
                                      setParentSubjects([...parentSubjects, s]);
                                    }
                                  }}
                                  style={{
                                    padding: '6px 14px',
                                    borderRadius: 20,
                                    fontSize: 12.5,
                                    fontWeight: 600,
                                    background: isSelected ? 'linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%)' : 'transparent',
                                    color: isSelected ? 'white' : '#1D2433',
                                    border: isSelected ? '1px solid transparent' : '1px solid rgba(79, 124, 255, 0.15)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: 'var(--font-sans)'
                                  }}
                                >
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <UnderlineTextarea label="Learning Gaps or Concerns" placeholder="Tell us what academic help your child needs..." value={parentGaps} onChange={e => setParentGaps(e.target.value)} />

                        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                          <button type="button" onClick={() => setParentStep(2)} className="btn-editorial-secondary-pill">Back</button>
                          <button type="submit" className="btn-editorial-pill">Book Assessment Visit →</button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  /* Teacher application form (Comprehensive 4 Steps) */
                  <form onSubmit={handleTeacherSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* 4 Steps Progress Line */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 44 }}>
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 1 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 2 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 3 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                      <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 4 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                    </div>

                    {/* Step 1: Basic Info */}
                    {teacherStep === 1 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 28, color: '#1D2433' }}>Step 1: Basic Info</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          <UnderlineField label="First Name" placeholder="First Name" value={teacherFirstName} onChange={e => setTeacherFirstName(e.target.value)} required />
                          <UnderlineField label="Last Name" placeholder="Last Name" value={teacherLastName} onChange={e => setTeacherLastName(e.target.value)} required />
                        </div>
                        <UnderlineField label="Email Address" type="email" placeholder="email@address.com" value={teacherEmail} onChange={e => setTeacherEmail(e.target.value)} required />
                        <UnderlineField label="Phone / WhatsApp" type="tel" placeholder="+91 00000 00000" value={teacherPhone} onChange={e => setTeacherPhone(e.target.value)} required />
                        
                        <button 
                          type="button" 
                          onClick={() => {
                            if (teacherFirstName && teacherLastName && teacherEmail && teacherPhone) setTeacherStep(2);
                            else showToast("⚠️ Please fill in all fields.");
                          }}
                          className="btn-editorial-pill"
                          style={{ marginTop: 24 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    )}

                    {/* Step 2: Personal Details */}
                    {teacherStep === 2 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 28, color: '#1D2433' }}>Step 2: Personal Details</h4>
                        <UnderlineField label="Date of Birth" type="date" value={teacherDob} onChange={e => setTeacherDob(e.target.value)} required />
                        <UnderlineField label="Current Address" placeholder="Street, landmark, city" value={teacherAddress} onChange={e => setTeacherAddress(e.target.value)} required />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          <UnderlineField label="Father's Name" placeholder="Father's Name" value={teacherFatherName} onChange={e => setTeacherFatherName(e.target.value)} required />
                          <UnderlineField label="Mother's Name" placeholder="Mother's Name" value={teacherMotherName} onChange={e => setTeacherMotherName(e.target.value)} required />
                        </div>

                        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                          <button type="button" onClick={() => setTeacherStep(1)} className="btn-editorial-secondary-pill">Back</button>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (teacherDob && teacherAddress && teacherFatherName && teacherMotherName) setTeacherStep(3);
                              else showToast("⚠️ Please fill in all fields.");
                            }} 
                            className="btn-editorial-pill"
                          >
                            Next Step →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Teaching Preferences */}
                    {teacherStep === 3 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 28, color: '#1D2433' }}>Step 3: Teaching Preferences</h4>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          <UnderlineMultiSelect label="Boards to Teach" options={boardsOptions} selectedValues={boardsToTeach} onChange={setBoardsToTeach} />
                          <UnderlineMultiSelect label="Boards Already Taught" options={boardsOptions} selectedValues={boardsAlreadyTaught} onChange={setBoardsAlreadyTaught} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          <UnderlineMultiSelect label="Classes to Teach" options={classesOptions} selectedValues={classesToTeach} onChange={setClassesToTeach} />
                          <UnderlineMultiSelect label="Classes Already Taught" options={classesOptions} selectedValues={classesAlreadyTaught} onChange={setClassesAlreadyTaught} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                          <UnderlineMultiSelect label="Subject to Teach" options={subjectsList} selectedValues={subjectsToTeach} onChange={setSubjectsToTeach} />
                          <UnderlineMultiSelect label="Subject Previously Taught" options={subjectsList} selectedValues={subjectsPreviouslyTaught} onChange={setSubjectsPreviouslyTaught} />
                        </div>

                        <UnderlineMultiSelect label="Medium of Instruction" options={mediumsList} selectedValues={mediumOfInstruction} onChange={setMediumOfInstruction} />

                        <UnderlineSelect label="Most Comfortable Medium" value={mostComfortableMedium} onChange={e => setMostComfortableMedium(e.target.value)} required>
                          <option value="">Select language...</option>
                          {mediumsList.map(m => <option key={m} value={m}>{m}</option>)}
                        </UnderlineSelect>

                        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                          <button type="button" onClick={() => setTeacherStep(2)} className="btn-editorial-secondary-pill">Back</button>
                          <button 
                            type="button" 
                            onClick={() => {
                              if (boardsToTeach.length > 0 && classesToTeach.length > 0 && subjectsToTeach.length > 0 && mostComfortableMedium) setTeacherStep(4);
                              else showToast("⚠️ Please select boards, classes, subjects and comfortable medium.");
                            }} 
                            className="btn-editorial-pill"
                          >
                            Next Step →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Service Location */}
                    {teacherStep === 4 && (
                      <div style={{ animation: 'fadeFormStep 0.4s ease' }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 28, color: '#1D2433' }}>Step 4: Service Location</h4>
                        
                        <UnderlineMultiSelect label="Preferred Location(s)" options={locationOptions} selectedValues={preferredLocations} onChange={setPreferredLocations} />

                        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                          <button type="button" onClick={() => setTeacherStep(3)} className="btn-editorial-secondary-pill">Back</button>
                          <button type="submit" className="btn-editorial-pill">Apply to Join TheMentR →</button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>

              {/* Right Column: Dynamic Gradient Information Panel (30%) */}
              <div 
                className="editorial-form-right"
                style={{
                  background: activeTab === 'parent'
                    ? 'linear-gradient(180deg, #4A74F5 0%, #5E71FA 45%, #6E62EB 100%)'
                    : 'linear-gradient(180deg, #6E62EB 0%, #5E71FA 45%, #4B74F5 100%)',
                  transition: 'background 0.5s ease'
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: activeTab === 'parent'
                    ? 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)'
                    : 'radial-gradient(circle at 10% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)',
                  pointerEvents: 'none',
                  transition: 'background 0.5s ease'
                }} />
                
                <svg 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none', transform: activeTab === 'teacher' ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s ease' }}
                  viewBox="0 0 300 500"
                  fill="none"
                >
                  <path d="M50,100 Q150,50 250,150 T100,350 T200,450" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="50" cy="100" r="3" fill="#FFFFFF" />
                  <circle cx="250" cy="150" r="3.5" fill="#FFFFFF" />
                  <circle cx="100" cy="350" r="3.5" fill="#FFFFFF" />
                  <circle cx="200" cy="450" r="3" fill="#FFFFFF" />
                </svg>

                {activeTab === 'parent' ? (
                  <div key="parent-info" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', animation: 'fadeFormStep 0.4s ease' }}>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 2.2vw, 30px)',
                        color: '#FFFFFF',
                        lineHeight: 1.25,
                        marginBottom: 16,
                        fontWeight: 500,
                        letterSpacing: '-0.01em'
                      }}>
                        Let's build your learning journey.
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        TheMentR connects parents, students and verified teachers through structured learning — from assessment to outcome.
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 48 }}>
                      {[
                        { icon: '📝', title: 'Assessment First', desc: 'Detailed 60-90m diagnostic visit' },
                        { icon: '🛡️', title: 'Verified Teachers', desc: 'Rigorous 5-step background vetting' },
                        { icon: '📈', title: 'AVSAR Intelligence', desc: 'Consistent tracking of curriculum gaps' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <div style={{ fontSize: 16, marginTop: 2 }}>{item.icon}</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>{item.title}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.7)', marginTop: 2 }}>{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div key="teacher-info" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', animation: 'fadeFormStep 0.4s ease' }}>
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 2.2vw, 30px)',
                        color: '#FFFFFF',
                        lineHeight: 1.25,
                        marginBottom: 16,
                        fontWeight: 500,
                        letterSpacing: '-0.01em'
                      }}>
                        Join our verified educator network.
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        We match top-tier teachers with dedicated students in their local area, empowering your pedagogy with digital tools.
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 48 }}>
                      {[
                        { icon: '🎓', title: 'Curated Community', desc: 'Only top 20% of applicants are approved' },
                        { icon: '🛡️', title: 'Professional Onboarding', desc: 'Interactive demo audits and teaching tips' },
                        { icon: '📊', title: 'Direct Outcomes', desc: 'Structured feedback reporting systems' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <div style={{ fontSize: 16, marginTop: 2 }}>{item.icon}</div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>{item.title}</div>
                            <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.7)', marginTop: 2 }}>{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </BorderGlow>
        </FadeUp>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: 'var(--color-navy)', color: 'white', padding: '14px 24px', borderRadius: 12, fontSize: 15, fontWeight: 500, zIndex: 2000, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>{toast}</div>
      )}

      <style>{`
        .editorial-form-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          min-height: 560px;
        }
        .editorial-form-left {
          padding: 56px 64px;
          display: flex;
          flex-direction: column;
        }
        .editorial-form-right {
          padding: 56px 40px;
          color: #FFFFFF;
          position: relative;
          display: flex;
          flex-direction: column;
          justifyContent: 'space-between';
          overflow: hidden;
        }
        .btn-editorial-pill {
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%) !important;
          border-radius: 99px !important;
          color: white !important;
          font-weight: 600 !important;
          padding: 13px 28px !important;
          font-size: 14px !important;
          border: none !important;
          cursor: pointer !important;
          box-shadow: 0 4px 14px rgba(79, 124, 255, 0.2) !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          outline: none !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-editorial-pill:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(79, 124, 255, 0.3) !important;
        }
        .btn-editorial-secondary-pill {
          background: #FFFFFF !important;
          border: 1px solid rgba(79, 124, 255, 0.2) !important;
          border-radius: 99px !important;
          color: var(--color-text-primary) !important;
          font-weight: 600 !important;
          padding: 13px 24px !important;
          font-size: 14px !important;
          cursor: pointer !important;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
          outline: none !important;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn-editorial-secondary-pill:hover {
          background: #F6F8FD !important;
          transform: translateY(-2px) !important;
        }
        @keyframes fadeFormStep {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .editorial-form-grid {
            grid-template-columns: 1fr;
          }
          .editorial-form-right {
            order: -1;
            padding: 40px 24px !important;
          }
          .editorial-form-left {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
