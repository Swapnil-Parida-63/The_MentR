import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';
import { parentAPI, teachersAPI } from '../../services/api';

const boardOptions = ['Odisha State Board', 'SSVM (Odisha)', 'CHSE (Odisha)', 'ICSE', 'CBSE', 'IGCSE'];
const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
const subjectsList = ['All Subjects', 'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology', 'Social Science', 'Odia', 'English', 'Hindi', 'Sanskrit', 'IT/Computer', 'General Knowledge', 'Moral Values'];

const teacherBoardOptions = ['Odisha State Board', 'SSVM (Odisha)', 'CHSE (Odisha)', 'ICSE', 'CBSE', 'IGCSE'];
const teacherClassOptions = ['Class 1–5', 'Class 6–8', 'Class 9–10', 'Class 11–12'];
const mediumOptions = ['English', 'Hindi', 'Odia', 'Bengali', 'Bilingual'];

// Underline Input Field Component
function UnderlineField({ label, type = "text", placeholder, value, onChange, required = false, isMobile = false }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ marginBottom: isMobile ? 14 : 20, position: 'relative', textAlign: 'left' }}>
      {label && (
        <label 
          style={{ 
            display: 'block', 
            fontSize: isMobile ? 12 : 13, 
            fontWeight: 700, 
            color: isFocused ? '#4F7CFF' : '#475569', 
            marginBottom: 6,
            letterSpacing: '0.01em',
            transition: 'color 0.25s'
          }}
        >
          {label}
        </label>
      )}
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
            background: isFocused ? 'rgba(79, 124, 255, 0.01)' : '#F8FAFC',
            border: isFocused ? '1.5px solid #4F7CFF' : '1.5px solid rgba(148, 163, 184, 0.28)',
            borderRadius: 14,
            outline: 'none',
            padding: isMobile ? '10px 14px' : '12px 16px',
            fontSize: isMobile ? 13.5 : 14.5,
            color: '#1E293B',
            fontFamily: 'var(--font-sans)',
            caretColor: '#4F7CFF',
            boxSizing: 'border-box',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isFocused ? '0 0 0 3.5px rgba(79, 124, 255, 0.12)' : 'none'
          }}
        />
      </div>
    </div>
  );
}

// Custom Styled Single Select matching user's screenshots
function CustomSelect({ label, value, onChange, options, placeholder = "Select option", required = false, isMobile = false }) {
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

  return (
    <div 
      ref={dropdownRef} 
      style={{ 
        marginBottom: isOpen ? (isMobile ? 180 : 220) : (isMobile ? 14 : 20), 
        position: 'relative', 
        textAlign: 'left',
        transition: 'margin-bottom 0.25s ease'
      }}
    >
      {label && (
        <label style={{ display: 'block', fontSize: isMobile ? 12 : 13, fontWeight: 700, color: '#4F7CFF', marginBottom: 6 }}>
          {label}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: isOpen ? 'rgba(79, 124, 255, 0.02)' : '#F8FAFC',
          border: isOpen ? '1.5px solid #4F7CFF' : '1.5px solid rgba(148, 163, 184, 0.28)',
          borderRadius: 14,
          padding: isMobile ? '10px 14px' : '12px 16px',
          fontSize: isMobile ? 13.5 : 14.5,
          color: value ? '#1E293B' : '#94A3B8',
          fontFamily: 'var(--font-sans)',
          cursor: 'pointer',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.2s ease',
          boxShadow: isOpen ? '0 0 0 3.5px rgba(79, 124, 255, 0.12)' : 'none'
        }}
      >
        <span>{value || placeholder}</span>
        <span style={{ fontSize: 10, color: '#64748B', marginLeft: 8 }}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          border: '1.5px solid rgba(79, 124, 255, 0.2)',
          borderRadius: 14,
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
          zIndex: 9999,
          maxHeight: 220,
          overflowY: 'auto',
          padding: 4
        }}>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              style={{
                padding: '10px 14px',
                fontSize: 13.5,
                fontWeight: value === opt ? 700 : 500,
                color: value === opt ? '#4F7CFF' : '#334155',
                background: value === opt ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (value !== opt) e.currentTarget.style.background = '#F1F5F9';
              }}
              onMouseLeave={(e) => {
                if (value !== opt) e.currentTarget.style.background = 'transparent';
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Custom Styled Multi-Select Dropdown matching user's screenshots
function CustomMultiSelect({ label, options, selectedValues = [], onChange, placeholder = "Select options...", isMobile = false, maxSelections = null }) {
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
    if (opt === "All Subjects") {
      if (selectedValues.includes("All Subjects")) {
        onChange([]);
      } else {
        onChange(["All Subjects"]);
      }
    } else {
      const nextValues = selectedValues.filter(v => v !== "All Subjects");
      if (nextValues.includes(opt)) {
        onChange(nextValues.filter(v => v !== opt));
      } else {
        if (maxSelections && nextValues.length >= maxSelections) {
          return;
        }
        onChange([...nextValues, opt]);
      }
    }
  };

  return (
    <div 
      ref={dropdownRef} 
      style={{ 
        marginBottom: isOpen ? (isMobile ? 180 : 220) : (isMobile ? 14 : 20), 
        position: 'relative', 
        textAlign: 'left',
        transition: 'margin-bottom 0.25s ease'
      }}
    >
      {label && (
        <label style={{ display: 'block', fontSize: isMobile ? 12 : 13, fontWeight: 700, color: '#4F7CFF', marginBottom: 6 }}>
          {label}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          minHeight: isMobile ? 42 : 46,
          background: isOpen ? 'rgba(79, 124, 255, 0.02)' : '#F8FAFC',
          border: isOpen ? '1.5px solid #4F7CFF' : '1.5px solid rgba(148, 163, 184, 0.28)',
          borderRadius: 14,
          padding: isMobile ? '6px 10px' : '8px 14px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          cursor: 'pointer',
          boxSizing: 'border-box',
          position: 'relative',
          transition: 'all 0.25s ease',
          boxShadow: isOpen ? '0 0 0 3.5px rgba(79, 124, 255, 0.12)' : 'none'
        }}
      >
        {selectedValues.length === 0 ? (
          <span style={{ color: '#94A3B8', fontSize: isMobile ? 13 : 14 }}>{placeholder}</span>
        ) : (
          selectedValues.map(v => (
            <span 
              key={v}
              style={{
                background: '#EFF6FF',
                color: '#4F7CFF',
                border: '1px solid rgba(79, 124, 255, 0.2)',
                fontSize: 12,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 99,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleOption(v);
              }}
            >
              {v} <span style={{ fontSize: 10, cursor: 'pointer', opacity: 0.8 }}>✕</span>
            </span>
          ))
        )}
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: 10 }}>
          {isOpen ? '▲' : '▼'}
        </div>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          border: '1.5px solid rgba(79, 124, 255, 0.2)',
          borderRadius: 14,
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
          zIndex: 9999,
          maxHeight: 220,
          overflowY: 'auto',
          padding: 4
        }}>
          {options.map((opt) => {
            const isSelected = selectedValues.includes(opt);
            const isMaxReached = maxSelections && selectedValues.length >= maxSelections && !isSelected;
            return (
              <div
                key={opt}
                onClick={() => toggleOption(opt)}
                style={{
                  padding: '10px 14px',
                  fontSize: 13.5,
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#4F7CFF' : isMaxReached ? '#94A3B8' : '#334155',
                  background: isSelected ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                  borderRadius: 10,
                  cursor: isMaxReached ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: isMaxReached ? 0.6 : 1,
                  transition: 'background 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected && !isMaxReached) e.currentTarget.style.background = '#F1F5F9';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{opt}</span>
                {isSelected && <span style={{ color: '#4F7CFF', fontWeight: 'bold' }}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FormsSection() {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'teacher'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 4000); };

  // ==========================================
  // 1. BOOK A DEMO FORM STATES
  // ==========================================
  const [demoParentName, setDemoParentName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoStudentName, setDemoStudentName] = useState('');
  const [demoBoard, setDemoBoard] = useState([]);
  const [demoClass, setDemoClass] = useState([]);
  const [demoLocation, setDemoLocation] = useState('');
  const [demoGuidanceSubjects, setDemoGuidanceSubjects] = useState([]);
  const [demoAgreed, setDemoAgreed] = useState(false);
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  // ==========================================
  // 2. JOIN AS A TEACHER FORM STATES
  // ==========================================
  const [teacherStep, setTeacherStep] = useState(1);
  // Step 1: Personal Info
  const [teacherFirstName, setTeacherFirstName] = useState('');
  const [teacherLastName, setTeacherLastName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherDob, setTeacherDob] = useState('');
  const [teacherAddress, setTeacherAddress] = useState('');
  const [teacherFatherName, setTeacherFatherName] = useState('');
  const [teacherMotherName, setTeacherMotherName] = useState('');

  // Step 2: Preferences
  const [boardsToTeach, setBoardsToTeach] = useState([]);
  const [boardsAlreadyTaught, setBoardsAlreadyTaught] = useState([]);
  const [classesToTeach, setClassesToTeach] = useState([]);
  const [classesAlreadyTaught, setClassesAlreadyTaught] = useState([]);
  const [subjectToTeach, setSubjectToTeach] = useState([]);
  const [subjectPreviouslyTaught, setSubjectPreviouslyTaught] = useState([]);
  const [mediumOfInstruction, setMediumOfInstruction] = useState([]);
  const [mostComfortableMedium, setMostComfortableMedium] = useState('');
  const [teacherAgreed, setTeacherAgreed] = useState(false);
  const [teacherSubmitting, setTeacherSubmitting] = useState(false);
  const [teacherSubmitted, setTeacherSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Demo Submit Handler
  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    if (demoSubmitting) return;

    const demoBoardStr = Array.isArray(demoBoard) ? demoBoard.join(', ') : demoBoard;
    const demoClassStr = Array.isArray(demoClass) ? demoClass.join(', ') : demoClass;

    if (!demoParentName.trim() || !demoPhone.trim() || !demoStudentName.trim() || !demoBoardStr || !demoClassStr || !demoLocation.trim()) {
      showToast("⚠️ Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(demoPhone.trim())) {
      showToast("⚠️ Mobile number must contain exactly 10 digits.");
      return;
    }

    if (!demoAgreed) {
      showToast("⚠️ You must agree to the Terms & Conditions before submitting.");
      return;
    }

    setDemoSubmitting(true);
    try {
      await parentAPI.submit({
        parentName: demoParentName,
        phone: demoPhone,
        studentName: demoStudentName,
        board: demoBoardStr,
        class: demoClassStr,
        location: demoLocation,
        specificSubject: demoGuidanceSubjects.join(', ') || 'General Guidance',
        agreedToTerms: true
      });
      setDemoSubmitted(true);
      showToast("🎉 Interest received! Our team will contact uh soon.");
    } catch (err) {
      console.error(err);
      setDemoSubmitted(true);
    } finally {
      setDemoSubmitting(false);
    }
  };

  // Teacher Submit Handler
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (teacherSubmitting) return;

    if (!teacherAgreed) {
      showToast("⚠️ You must agree to the Terms & Conditions before submitting.");
      return;
    }

    setTeacherSubmitting(true);
    try {
      await teachersAPI.apply({
        firstName: teacherFirstName,
        lastName: teacherLastName,
        email: teacherEmail,
        phone: teacherPhone,
        dob: teacherDob,
        address: teacherAddress,
        fatherName: teacherFatherName,
        motherName: teacherMotherName,
        boardsToTeach,
        boardsAlreadyTaught,
        classesToTeach,
        classesAlreadyTaught,
        subjectToTeach,
        subjectPreviouslyTaught,
        mediumOfInstruction,
        mostComfortableMedium,
        agreedToTerms: true
      });
      setTeacherSubmitted(true);
      showToast("🎉 Teacher application submitted successfully!");
    } catch (err) {
      console.error(err);
      setTeacherSubmitted(true);
    } finally {
      setTeacherSubmitting(false);
    }
  };

  return (
    <section id="contact-forms" className="section" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #E3E8FF 50%, rgba(143, 149, 246, 0.42) 100%)', padding: isMobile ? '16px 0 40px' : '100px 0' }}>
      <div className="container">
        {!isMobile && <FadeUp><div className="eyebrow">GET STARTED</div></FadeUp>}
        <FadeUp delay={0.1} duration={0.8} y={isMobile ? 8 : 24}>
          <h2 style={{ fontSize: isMobile ? '22px' : 'clamp(32px, 3.5vw, 44px)', marginBottom: isMobile ? 6 : 16, fontFamily: 'var(--font-display)', fontWeight: 500, color: '#1D2433', textAlign: 'center' }}>
            {isMobile ? 'Get Started' : "Let's build your learning journey"}
          </h2>
        </FadeUp>

        <FadeUp delay={0.3} y={16}>
          <div style={{ borderRadius: 28, maxWidth: 960, margin: '0 auto' }}>
            <BorderGlow borderRadius={28} backgroundColor="#FFFFFF">
              <div className="editorial-form-grid">
              
              {/* Form Surface */}
              <div className="editorial-form-left" style={{ padding: isMobile ? '20px 16px 24px' : '44px 52px' }}>
                
                {/* 2 Form Tabs Selector: Book a Demo & Join as a Teacher */}
                <div 
                  className="tabs-container"
                  style={{ 
                    display: 'flex', 
                    background: '#F1F5F9',
                    padding: 4,
                    borderRadius: 99,
                    border: '1px solid rgba(148, 163, 184, 0.12)',
                    marginBottom: isMobile ? 18 : 32,
                    gap: 4
                  }}
                >
                  {[
                    { id: 'demo', label: 'Book a Demo', mobileLabel: 'Book a Demo' },
                    { id: 'teacher', label: 'Join as a Teacher', mobileLabel: 'Join as Teacher' }
                  ].map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        type="button"
                        style={{
                          background: isActive ? '#FFFFFF' : 'transparent', 
                          boxShadow: isActive ? '0 4px 12px rgba(15, 23, 42, 0.08)' : 'none',
                          border: 'none', 
                          fontSize: isMobile ? 12.5 : 14, 
                          fontWeight: 700,
                          color: isActive ? '#4F7CFF' : '#475569', 
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-in-out', 
                          fontFamily: 'var(--font-sans)',
                          padding: isMobile ? '10px 14px' : '11px 24px',
                          borderRadius: 99,
                          flex: 1,
                          textAlign: 'center',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {isMobile ? tab.mobileLabel : tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* ============================================================== */}
                {/* TAB 1: BOOK A DEMO FORM */}
                {/* ============================================================== */}
                <div style={{ flex: 1, display: activeTab === 'demo' ? 'flex' : 'none', flexDirection: 'column' }}>
                  {demoSubmitted ? (
                    <div style={{ textAlign: 'center', padding: isMobile ? '24px 12px' : '40px 20px' }}>
                      <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
                        Demo Request Received!
                      </h3>
                      <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, maxWidth: 400, margin: '0 auto 20px' }}>
                        We have noticed your interest, our team will contact uh soon.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setDemoSubmitted(false);
                          setDemoParentName('');
                          setDemoPhone('');
                          setDemoStudentName('');
                          setDemoBoard('');
                          setDemoClass('');
                          setDemoLocation('');
                          setDemoGuidanceSubjects([]);
                          setDemoAgreed(false);
                        }}
                        className="btn-editorial-pill"
                        style={{ padding: '10px 28px', fontSize: 13.5 }}
                      >
                        Book Another Demo
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleDemoSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                      <UnderlineField 
                        label="Parent Name *" 
                        placeholder="Your full name" 
                        value={demoParentName} 
                        onChange={e => setDemoParentName(e.target.value)} 
                        required 
                        isMobile={isMobile}
                      />

                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                        <UnderlineField 
                          label="Phone Number *" 
                          type="tel" 
                          placeholder="10-digit number" 
                          value={demoPhone} 
                          onChange={e => setDemoPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                          required 
                          isMobile={isMobile}
                        />

                        <UnderlineField 
                          label="Student Name *" 
                          placeholder="Student's full name" 
                          value={demoStudentName} 
                          onChange={e => setDemoStudentName(e.target.value)} 
                          required 
                          isMobile={isMobile}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                        <CustomMultiSelect 
                          label="Syllabus / Board *" 
                          options={boardOptions} 
                          selectedValues={demoBoard} 
                          onChange={setDemoBoard} 
                          placeholder="Select board (Max 3)"
                          maxSelections={3}
                          isMobile={isMobile}
                        />

                        <CustomMultiSelect 
                          label="Class *" 
                          options={classOptions} 
                          selectedValues={demoClass} 
                          onChange={setDemoClass} 
                          placeholder="Select class (Max 3)"
                          maxSelections={3}
                          isMobile={isMobile}
                        />
                      </div>

                      <UnderlineField 
                        label="Location *" 
                        placeholder="Area / Landmark, City" 
                        value={demoLocation} 
                        onChange={e => setDemoLocation(e.target.value)} 
                        required 
                        isMobile={isMobile}
                      />

                      <CustomMultiSelect 
                        label="Any specific subject required for guidance" 
                        options={subjectsList} 
                        selectedValues={demoGuidanceSubjects} 
                        onChange={setDemoGuidanceSubjects} 
                        placeholder="Select options..."
                        isMobile={isMobile}
                      />

                      {/* Mandatory Checkbox for Terms and Conditions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: isMobile ? 16 : 24, textAlign: 'left' }}>
                        <input 
                          type="checkbox" 
                          id="demoTermsCheckbox"
                          checked={demoAgreed} 
                          onChange={(e) => setDemoAgreed(e.target.checked)} 
                          required
                          style={{ width: isMobile ? 16 : 18, height: isMobile ? 16 : 18, accentColor: '#4F7CFF', cursor: 'pointer', flexShrink: 0 }}
                        />
                        <label htmlFor="demoTermsCheckbox" style={{ fontSize: isMobile ? 12 : 13, color: '#475569', cursor: 'pointer', userSelect: 'none', lineHeight: 1.35 }}>
                          I agree with the{' '}
                          <a 
                            href="/teacher-terms" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: '#4F7CFF', fontWeight: 700, textDecoration: 'underline' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>

                      <button 
                        type="submit"
                        disabled={!demoAgreed || demoSubmitting}
                        className="btn-editorial-pill"
                        style={{ width: '100%', padding: isMobile ? '12px' : '14px', fontSize: isMobile ? 14 : 15 }}
                      >
                        {demoSubmitting ? 'Submitting...' : 'Book Demo Class →'}
                      </button>
                    </form>
                  )}
                </div>

                {/* ============================================================== */}
                {/* TAB 2: JOIN AS A TEACHER FORM */}
                {/* ============================================================== */}
                <div style={{ flex: 1, display: activeTab === 'teacher' ? 'flex' : 'none', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {teacherSubmitted ? (
                      <div style={{ textAlign: 'center', padding: isMobile ? '24px 12px' : '40px 20px' }}>
                        <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
                          Application Submitted!
                        </h3>
                        <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, maxWidth: 400, margin: '0 auto 20px' }}>
                          Thank you for applying to join The MentR network. Our onboarding team will contact you shortly.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setTeacherSubmitted(false);
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
                            setSubjectToTeach([]);
                            setSubjectPreviouslyTaught([]);
                            setMediumOfInstruction([]);
                            setMostComfortableMedium('');
                            setTeacherAgreed(false);
                          }}
                          className="btn-editorial-pill"
                          style={{ padding: '10px 28px', fontSize: 13.5 }}
                        >
                          Submit Another Application
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleTeacherSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        
                        {/* Teacher Form Step 1: Basic & Personal Info */}
                        {teacherStep === 1 && (
                          <div style={{ animation: 'fadeFormStep 0.3s ease' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <UnderlineField label="First Name *" placeholder="First Name" value={teacherFirstName} onChange={e => setTeacherFirstName(e.target.value)} required isMobile={isMobile} />
                              <UnderlineField label="Last Name *" placeholder="Last Name" value={teacherLastName} onChange={e => setTeacherLastName(e.target.value)} required isMobile={isMobile} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <UnderlineField label="Email Address *" type="email" placeholder="user@gmail.com" value={teacherEmail} onChange={e => setTeacherEmail(e.target.value)} required isMobile={isMobile} />
                              <UnderlineField label="Phone / WhatsApp *" type="tel" placeholder="10-digit number" value={teacherPhone} onChange={e => setTeacherPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required isMobile={isMobile} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <UnderlineField label="Date of Birth *" type="date" value={teacherDob} onChange={e => setTeacherDob(e.target.value)} required isMobile={isMobile} />
                              <UnderlineField label="Current Address *" placeholder="Address / Landmark" value={teacherAddress} onChange={e => setTeacherAddress(e.target.value)} required isMobile={isMobile} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <UnderlineField label="Father's Name *" placeholder="Father's full name" value={teacherFatherName} onChange={e => setTeacherFatherName(e.target.value)} required isMobile={isMobile} />
                              <UnderlineField label="Mother's Name *" placeholder="Mother's full name" value={teacherMotherName} onChange={e => setTeacherMotherName(e.target.value)} required isMobile={isMobile} />
                            </div>

                            <button 
                              type="button"
                              onClick={() => {
                                if (!teacherFirstName.trim() || !teacherLastName.trim() || !teacherEmail.trim() || !teacherPhone.trim()) {
                                  showToast("⚠️ Please fill in all required fields.");
                                  return;
                                }
                                if (!/^\d{10}$/.test(teacherPhone.trim())) {
                                  showToast("⚠️ Phone number must contain 10 digits.");
                                  return;
                                }
                                setTeacherStep(2);
                              }}
                              className="btn-editorial-pill"
                              style={{ width: '100%', marginTop: 8, padding: isMobile ? '12px' : '14px', fontSize: isMobile ? 14 : 15 }}
                            >
                              Next Step →
                            </button>
                          </div>
                        )}

                        {/* Teacher Form Step 2: Teaching Preferences Dropdowns */}
                        {teacherStep === 2 && (
                          <div style={{ animation: 'fadeFormStep 0.3s ease' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <CustomMultiSelect 
                                label="Boards to Teach" 
                                options={teacherBoardOptions} 
                                selectedValues={boardsToTeach} 
                                onChange={setBoardsToTeach} 
                                placeholder="Select options..."
                                isMobile={isMobile}
                              />
                              <CustomMultiSelect 
                                label="Boards Already Taught" 
                                options={teacherBoardOptions} 
                                selectedValues={boardsAlreadyTaught} 
                                onChange={setBoardsAlreadyTaught} 
                                placeholder="Select options..."
                                isMobile={isMobile}
                              />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <CustomMultiSelect 
                                label="Classes to Teach" 
                                options={teacherClassOptions} 
                                selectedValues={classesToTeach} 
                                onChange={setClassesToTeach} 
                                placeholder="Select options..."
                                isMobile={isMobile}
                              />
                              <CustomMultiSelect 
                                label="Classes Already Taught" 
                                options={teacherClassOptions} 
                                selectedValues={classesAlreadyTaught} 
                                onChange={setClassesAlreadyTaught} 
                                placeholder="Select options..."
                                isMobile={isMobile}
                              />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 16 }}>
                              <CustomMultiSelect 
                                label="Subject to Teach" 
                                options={subjectsList} 
                                selectedValues={subjectToTeach} 
                                onChange={setSubjectToTeach} 
                                placeholder="Select options..."
                                isMobile={isMobile}
                              />
                              <CustomMultiSelect 
                                label="Subject Previously Taught" 
                                options={subjectsList} 
                                selectedValues={subjectPreviouslyTaught} 
                                onChange={setSubjectPreviouslyTaught} 
                                placeholder="Select options..."
                                isMobile={isMobile}
                              />
                            </div>

                            <CustomMultiSelect 
                              label="Medium of Instruction" 
                              options={mediumOptions} 
                              selectedValues={mediumOfInstruction} 
                              onChange={setMediumOfInstruction} 
                              placeholder="Select options..."
                              isMobile={isMobile}
                            />

                            <CustomSelect 
                              label="Most Comfortable Medium" 
                              options={mediumOptions} 
                              value={mostComfortableMedium} 
                              onChange={setMostComfortableMedium} 
                              placeholder="Select language..."
                              isMobile={isMobile}
                            />

                            {/* Mandatory Checkbox for Terms and Conditions */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: isMobile ? 16 : 24, textAlign: 'left' }}>
                              <input 
                                type="checkbox" 
                                id="teacherTermsCheckbox"
                                checked={teacherAgreed} 
                                onChange={(e) => setTeacherAgreed(e.target.checked)} 
                                required
                                style={{ width: isMobile ? 16 : 18, height: isMobile ? 16 : 18, accentColor: '#4F7CFF', cursor: 'pointer', flexShrink: 0 }}
                              />
                              <label htmlFor="teacherTermsCheckbox" style={{ fontSize: isMobile ? 12 : 13, color: '#475569', cursor: 'pointer', userSelect: 'none', lineHeight: 1.35 }}>
                                I agree with the{' '}
                                <a 
                                  href="/teacher-terms" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  style={{ color: '#4F7CFF', fontWeight: 700, textDecoration: 'underline' }}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Terms and Conditions
                                </a>
                              </label>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                              <button 
                                type="button" 
                                onClick={() => setTeacherStep(1)} 
                                className="btn-editorial-secondary-pill"
                                style={{ flex: 1, padding: isMobile ? '12px' : '14px' }}
                              >
                                Back
                              </button>
                              <button 
                                type="submit"
                                disabled={!teacherAgreed || teacherSubmitting}
                                className="btn-editorial-pill"
                                style={{ flex: 2, padding: isMobile ? '12px' : '14px', fontSize: isMobile ? 14 : 15 }}
                              >
                                {teacherSubmitting ? 'Submitting...' : 'Apply to Join TheMentR →'}
                              </button>
                            </div>
                          </div>
                        )}

                      </form>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Promotional Info Banner (30%) */}
              <div 
                className="editorial-form-right"
                style={{
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                  borderRadius: isMobile ? '28px 28px 0 0' : '0 28px 28px 0',
                  padding: isMobile ? '20px 20px' : '44px 36px'
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', color: '#818CF8', marginBottom: 8 }}>
                    Why choose The MentR
                  </div>
                  <h3 style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.3, marginBottom: 12, fontFamily: 'var(--font-display)' }}>
                    Structured learning, verified teachers.
                  </h3>
                  <p style={{ fontSize: isMobile ? 12.5 : 13.5, color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: 0 }}>
                    We match top-tier teachers with dedicated students in their local area, empowering education with transparent tools.
                  </p>
                </div>

                <div style={{ marginTop: isMobile ? 16 : 32, display: 'flex', flexDirection: 'column', gap: isMobile ? 10 : 16 }}>
                  {[
                    { icon: '🎓', title: 'Curated Tutors', desc: 'Top verified teachers approved' },
                    { icon: '🛡️', title: 'Personalized Matching', desc: 'Customized learning profiles' },
                    { icon: '📊', title: 'Direct Outcomes', desc: 'Structured feedback and reporting' }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <div style={{ fontSize: 15, marginTop: 1 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: '#FFFFFF' }}>{item.title}</div>
                        <div style={{ fontSize: isMobile ? 11 : 11.5, color: 'rgba(255, 255, 255, 0.65)' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </BorderGlow>
        </div>
        </FadeUp>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', background: 'var(--color-navy)', color: 'white', padding: '14px 24px', borderRadius: 12, fontSize: 15, fontWeight: 500, zIndex: 2000, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>{toast}</div>
      )}

      <style>{`
        .editorial-form-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          min-height: 520px;
        }
        .editorial-form-left {
          display: flex;
          flex-direction: column;
        }
        .editorial-form-right {
          color: #FFFFFF;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }
        .tabs-container::-webkit-scrollbar {
          display: none;
        }
        .tabs-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .btn-editorial-pill {
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%) !important;
          border-radius: 99px !important;
          color: white !important;
          font-weight: 600 !important;
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
        .btn-editorial-pill:disabled {
          background: #CBD5E1 !important;
          color: #64748B !important;
          cursor: not-allowed !important;
          box-shadow: none !important;
          transform: none !important;
        }
        .btn-editorial-secondary-pill {
          background: #FFFFFF !important;
          border: 1px solid rgba(79, 124, 255, 0.2) !important;
          border-radius: 99px !important;
          color: #1E293B !important;
          font-weight: 600 !important;
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
        @media (max-width: 1024px) {
          .editorial-form-grid {
            grid-template-columns: 1fr;
          }
          .editorial-form-right {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
