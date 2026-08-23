import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useModal } from '../../context/ModalContext';
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
    <div style={{ marginBottom: isMobile ? 12 : 18, position: 'relative', textAlign: 'left' }}>
      {label && (
        <label 
          style={{ 
            display: 'block', 
            fontSize: isMobile ? 11.5 : 12.5, 
            fontWeight: 700, 
            color: isFocused ? '#4F7CFF' : '#475569', 
            marginBottom: 4,
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
            borderRadius: 12,
            outline: 'none',
            padding: isMobile ? '8px 12px' : '10px 14px',
            fontSize: isMobile ? 13 : 14,
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

// Custom Styled Single Select
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
        marginBottom: isOpen ? (isMobile ? 180 : 220) : (isMobile ? 12 : 18), 
        position: 'relative', 
        textAlign: 'left',
        transition: 'margin-bottom 0.25s ease'
      }}
    >
      {label && (
        <label style={{ display: 'block', fontSize: isMobile ? 11.5 : 12.5, fontWeight: 700, color: '#4F7CFF', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          background: isOpen ? 'rgba(79, 124, 255, 0.02)' : '#F8FAFC',
          border: isOpen ? '1.5px solid #4F7CFF' : '1.5px solid rgba(148, 163, 184, 0.28)',
          borderRadius: 12,
          padding: isMobile ? '8px 12px' : '10px 14px',
          fontSize: isMobile ? 13 : 14,
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
          borderRadius: 12,
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
                padding: '8px 12px',
                fontSize: 13,
                fontWeight: value === opt ? 700 : 500,
                color: value === opt ? '#4F7CFF' : '#334155',
                background: value === opt ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'background 0.15s ease'
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

// Custom Styled Multi-Select Dropdown
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
        marginBottom: isOpen ? (isMobile ? 180 : 220) : (isMobile ? 12 : 18), 
        position: 'relative', 
        textAlign: 'left',
        transition: 'margin-bottom 0.25s ease'
      }}
    >
      {label && (
        <label style={{ display: 'block', fontSize: isMobile ? 11.5 : 12.5, fontWeight: 700, color: '#4F7CFF', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          minHeight: isMobile ? 38 : 42,
          background: isOpen ? 'rgba(79, 124, 255, 0.02)' : '#F8FAFC',
          border: isOpen ? '1.5px solid #4F7CFF' : '1.5px solid rgba(148, 163, 184, 0.28)',
          borderRadius: 12,
          padding: isMobile ? '5px 8px' : '6px 12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          alignItems: 'center',
          cursor: 'pointer',
          boxSizing: 'border-box',
          position: 'relative',
          transition: 'all 0.25s ease',
          boxShadow: isOpen ? '0 0 0 3.5px rgba(79, 124, 255, 0.12)' : 'none'
        }}
      >
        {selectedValues.length === 0 ? (
          <span style={{ color: '#94A3B8', fontSize: isMobile ? 12.5 : 13.5 }}>{placeholder}</span>
        ) : (
          selectedValues.map(v => (
            <span 
              key={v}
              style={{
                background: '#EFF6FF',
                color: '#4F7CFF',
                border: '1px solid rgba(79, 124, 255, 0.2)',
                fontSize: 11.5,
                fontWeight: 700,
                padding: '2px 8px',
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
              {v} <span style={{ fontSize: 9, cursor: 'pointer', opacity: 0.8 }}>✕</span>
            </span>
          ))
        )}
        <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: 10 }}>
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
          borderRadius: 12,
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
                  padding: '8px 12px',
                  fontSize: 13,
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#4F7CFF' : isMaxReached ? '#94A3B8' : '#334155',
                  background: isSelected ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                  borderRadius: 8,
                  cursor: isMaxReached ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: isMaxReached ? 0.6 : 1,
                  transition: 'background 0.15s ease'
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

export default function FormModal() {
  const { activeModal, closeModal, modalConfig } = useModal();
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' or 'teacher'

  // Lead Modal States
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Demo Form States
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

  // Teacher Form States
  const [teacherStep, setTeacherStep] = useState(1);
  const [teacherFirstName, setTeacherFirstName] = useState('');
  const [teacherLastName, setTeacherLastName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhone, setTeacherPhone] = useState('');
  const [teacherDob, setTeacherDob] = useState('');
  const [teacherAddress, setTeacherAddress] = useState('');
  const [teacherFatherName, setTeacherFatherName] = useState('');
  const [teacherMotherName, setTeacherMotherName] = useState('');

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

  // Coming Soon Form States (Name & Phone only)
  const [csName, setCsName] = useState('');
  const [csPhone, setCsPhone] = useState('');
  const [csSubmitting, setCsSubmitting] = useState(false);
  const [csSubmitted, setCsSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeModal) {
      if (activeModal === 'teacher') setActiveTab('teacher');
      else if (activeModal === 'parent') setActiveTab('demo');

      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(cardRef.current, { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 });
    } else {
      document.body.style.overflow = 'unset';
      setCsSubmitted(false);
      setCsName('');
      setCsPhone('');
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  if (!activeModal) return null;

  const handleClose = () => {
    gsap.to(cardRef.current, {
      y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in', onComplete: closeModal });
      }
    });
  };

  // Coming Soon form submit
  const handleCsSubmit = async (e) => {
    e.preventDefault();
    if (csSubmitting) return;

    if (!csName.trim()) {
      alert("⚠️ Please enter your full name.");
      return;
    }
    if (!/^\d{10}$/.test(csPhone.trim())) {
      alert("⚠️ Mobile number must contain 10 digits.");
      return;
    }

    setCsSubmitting(true);
    try {
      await parentAPI.submit({
        parentName: csName,
        phone: csPhone,
        studentName: 'Career Registrant',
        board: 'Careers / ' + (modalConfig?.title || 'General'),
        class: 'Applicant',
        location: 'Not Specified',
        specificSubject: modalConfig?.title || 'Careers Coming Soon',
        agreedToTerms: true
      });
      setCsSubmitted(true);
    } catch (err) {
      console.error(err);
      setCsSubmitted(true);
    } finally {
      setCsSubmitting(false);
    }
  };

  // Lead form submit (for lead modal buttons)
  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (leadSubmitting) return;

    if (!leadName.trim() || !leadPhone.trim() || !leadEmail.trim()) {
      alert("⚠️ All fields (Name, Mobile Number, Email) are required.");
      return;
    }
    if (!/^\d{10}$/.test(leadPhone.trim())) {
      alert("⚠️ Mobile number must contain exactly 10 digits.");
      return;
    }
    if (!agreedToTerms) {
      alert("⚠️ You must agree to the Terms and Conditions before submitting.");
      return;
    }

    setLeadSubmitting(true);
    try {
      await parentAPI.submit({
        parentName: leadName,
        phone: leadPhone,
        email: leadEmail,
        studentName: 'N/A',
        board: 'N/A',
        class: 'N/A',
        location: 'N/A',
        specificSubject: modalConfig?.title || 'Interest Inquiry',
        agreedToTerms: true
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error(err);
      setLeadSubmitted(true);
    } finally {
      setLeadSubmitting(false);
    }
  };

  // Demo form submit
  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    if (demoSubmitting) return;

    const demoBoardStr = Array.isArray(demoBoard) ? demoBoard.join(', ') : demoBoard;
    const demoClassStr = Array.isArray(demoClass) ? demoClass.join(', ') : demoClass;

    if (!demoParentName.trim() || !demoPhone.trim() || !demoStudentName.trim() || !demoBoardStr || !demoClassStr || !demoLocation.trim()) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }
    if (!/^\d{10}$/.test(demoPhone.trim())) {
      alert("⚠️ Mobile number must contain 10 digits.");
      return;
    }
    if (!demoAgreed) {
      alert("⚠️ You must agree to the Terms & Conditions.");
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
    } catch (err) {
      console.error(err);
      setDemoSubmitted(true);
    } finally {
      setDemoSubmitting(false);
    }
  };

  // Teacher form submit
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (teacherSubmitting) return;

    if (!teacherAgreed) {
      alert("⚠️ You must agree to the Terms & Conditions.");
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
    } catch (err) {
      console.error(err);
      setTeacherSubmitted(true);
    } finally {
      setTeacherSubmitting(false);
    }
  };

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 100020,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '70px 10px 20px 10px' : '24px 20px'
      }}
      onClick={handleClose}
    >
      <div 
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: 620,
          background: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: isMobile ? '88vh' : '92vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: isMobile ? 12 : 18,
            right: isMobile ? 12 : 18,
            background: '#F1F5F9',
            border: 'none',
            width: isMobile ? 28 : 32,
            height: isMobile ? 28 : 32,
            borderRadius: '50%',
            fontSize: 14,
            cursor: 'pointer',
            color: '#64748B',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {/* Lead modal flow */}
        {activeModal === 'lead' ? (
          <div style={{ padding: isMobile ? '20px 16px' : '36px 32px', overflowY: 'auto' }}>
            {leadSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
                  Thank You for Your Interest!
                </h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
                  We have noticed your interest, our team will contact uh soon.
                </p>
                <button type="button" onClick={handleClose} className="btn-editorial-pill" style={{ padding: '10px 28px', fontSize: 13.5 }}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit}>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
                  {modalConfig?.title || 'Register Your Interest'}
                </h3>

                <UnderlineField label="Full Name *" placeholder="Enter your full name" value={leadName} onChange={e => setLeadName(e.target.value)} required isMobile={isMobile} />
                <UnderlineField label="Phone Number *" type="tel" placeholder="10-digit mobile number" value={leadPhone} onChange={e => setLeadPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required isMobile={isMobile} />
                <UnderlineField label="Email Address *" type="email" placeholder="your@email.com" value={leadEmail} onChange={e => setLeadEmail(e.target.value)} required isMobile={isMobile} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <input type="checkbox" id="leadTermsCheckbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} required style={{ width: 16, height: 16, accentColor: '#4F7CFF' }} />
                  <label htmlFor="leadTermsCheckbox" style={{ fontSize: 12.5, color: '#475569' }}>
                    I agree with the <a href="/teacher-terms" target="_blank" rel="noopener noreferrer" style={{ color: '#4F7CFF', fontWeight: 700 }}>Terms and Conditions</a>
                  </label>
                </div>

                <button type="submit" disabled={!agreedToTerms || leadSubmitting} className="btn-editorial-pill" style={{ width: '100%', padding: '12px', fontSize: 14 }}>
                  {leadSubmitting ? 'Submitting...' : 'Submit Request →'}
                </button>
              </form>
            )}
          </div>
        ) : activeModal === 'comingSoon' ? (
          /* Coming Soon flow - NO TAB BUTTONS */
          <div style={{ padding: isMobile ? '24px 18px' : '36px 32px', overflowY: 'auto' }}>
            {csSubmitted ? (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
                  Thank You for Registering!
                </h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
                  We have noted your interest for {modalConfig?.title || 'this section'}. Our team will contact you as soon as openings launch!
                </p>
                <button type="button" onClick={handleClose} className="btn-editorial-pill" style={{ padding: '10px 28px', fontSize: 13.5 }}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCsSubmit}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)',
                    border: '1.5px solid rgba(59, 130, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    margin: '0 auto 12px'
                  }}>
                    🚀
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '3px 12px', borderRadius: 99, fontSize: 11, fontWeight: 750, color: '#2563EB', marginBottom: 8 }}>
                    COMING SOON
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: isMobile ? 19 : 22, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                    {modalConfig?.title || 'Section'} Coming Soon!
                  </h3>
                  <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                    Enter your name and number to register your interest and receive instant updates when we launch.
                  </p>
                </div>

                <UnderlineField label="Full Name *" placeholder="Your full name" value={csName} onChange={e => setCsName(e.target.value)} required isMobile={isMobile} />
                <UnderlineField label="Phone Number *" type="tel" placeholder="10-digit mobile number" value={csPhone} onChange={e => setCsPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required isMobile={isMobile} />

                <button type="submit" disabled={csSubmitting} className="btn-editorial-pill" style={{ width: '100%', padding: '12px', fontSize: 14, marginTop: 8 }}>
                  {csSubmitting ? 'Submitting...' : 'Register Interest →'}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Demo & Teacher tabs flow */
          <div style={{ padding: isMobile ? '20px 16px' : '36px 32px', overflowY: 'auto', flex: 1 }}>
            
            {/* Tabs */}
            <div style={{ display: 'flex', background: '#F1F5F9', padding: 4, borderRadius: 99, marginBottom: 20, gap: 4 }}>
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                style={{
                  flex: 1, padding: '9px 12px', border: 'none', borderRadius: 99, fontSize: 13, fontWeight: 700,
                  background: activeTab === 'demo' ? '#FFF' : 'transparent',
                  color: activeTab === 'demo' ? '#4F7CFF' : '#64748B', cursor: 'pointer'
                }}
              >
                Book a Demo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('teacher')}
                style={{
                  flex: 1, padding: '9px 12px', border: 'none', borderRadius: 99, fontSize: 13, fontWeight: 700,
                  background: activeTab === 'teacher' ? '#FFF' : 'transparent',
                  color: activeTab === 'teacher' ? '#4F7CFF' : '#64748B', cursor: 'pointer'
                }}
              >
                Join as Teacher
              </button>
            </div>

            {/* TAB 1: DEMO FORM */}
            {activeTab === 'demo' && (
              demoSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
                    Demo Request Received!
                  </h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
                    We have noticed your interest, our team will contact uh soon.
                  </p>
                  <button type="button" onClick={handleClose} className="btn-editorial-pill" style={{ padding: '10px 28px', fontSize: 13.5 }}>
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit}>
                  <UnderlineField label="Parent Name *" placeholder="Your full name" value={demoParentName} onChange={e => setDemoParentName(e.target.value)} required isMobile={isMobile} />
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                    <UnderlineField label="Phone Number *" type="tel" placeholder="10-digit number" value={demoPhone} onChange={e => setDemoPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required isMobile={isMobile} />
                    <UnderlineField label="Student Name *" placeholder="Student's full name" value={demoStudentName} onChange={e => setDemoStudentName(e.target.value)} required isMobile={isMobile} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                    <CustomMultiSelect label="Syllabus / Board *" options={boardOptions} selectedValues={demoBoard} onChange={setDemoBoard} placeholder="Select board (Max 3)" maxSelections={3} isMobile={isMobile} />
                    <CustomMultiSelect label="Class *" options={classOptions} selectedValues={demoClass} onChange={setDemoClass} placeholder="Select class (Max 3)" maxSelections={3} isMobile={isMobile} />
                  </div>
                  <UnderlineField label="Location *" placeholder="Area / Landmark, City" value={demoLocation} onChange={e => setDemoLocation(e.target.value)} required isMobile={isMobile} />
                  <CustomMultiSelect label="Any specific subject required for guidance" options={subjectsList} selectedValues={demoGuidanceSubjects} onChange={setDemoGuidanceSubjects} placeholder="Select options..." isMobile={isMobile} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <input type="checkbox" id="modalDemoTerms" checked={demoAgreed} onChange={e => setDemoAgreed(e.target.checked)} required style={{ width: 16, height: 16, accentColor: '#4F7CFF' }} />
                    <label htmlFor="modalDemoTerms" style={{ fontSize: 12.5, color: '#475569' }}>
                      I agree with the <a href="/teacher-terms" target="_blank" rel="noopener noreferrer" style={{ color: '#4F7CFF', fontWeight: 700 }}>Terms and Conditions</a>
                    </label>
                  </div>

                  <button type="submit" disabled={!demoAgreed || demoSubmitting} className="btn-editorial-pill" style={{ width: '100%', padding: '12px', fontSize: 14 }}>
                    {demoSubmitting ? 'Submitting...' : 'Book Demo Class →'}
                  </button>
                </form>
              )
            )}

            {/* TAB 2: TEACHER FORM */}
            {activeTab === 'teacher' && (
              teacherSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                  <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
                    Application Submitted!
                  </h3>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
                    Thank you for applying to join The MentR network. Our onboarding team will contact you shortly.
                  </p>
                  <button type="button" onClick={handleClose} className="btn-editorial-pill" style={{ padding: '10px 28px', fontSize: 13.5 }}>
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTeacherSubmit}>
                  {teacherStep === 1 ? (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <UnderlineField label="First Name *" placeholder="First Name" value={teacherFirstName} onChange={e => setTeacherFirstName(e.target.value)} required isMobile={isMobile} />
                        <UnderlineField label="Last Name *" placeholder="Last Name" value={teacherLastName} onChange={e => setTeacherLastName(e.target.value)} required isMobile={isMobile} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <UnderlineField label="Email Address *" type="email" placeholder="user@gmail.com" value={teacherEmail} onChange={e => setTeacherEmail(e.target.value)} required isMobile={isMobile} />
                        <UnderlineField label="Phone / WhatsApp *" type="tel" placeholder="10-digit number" value={teacherPhone} onChange={e => setTeacherPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required isMobile={isMobile} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <UnderlineField label="Date of Birth *" type="date" value={teacherDob} onChange={e => setTeacherDob(e.target.value)} required isMobile={isMobile} />
                        <UnderlineField label="Current Address *" placeholder="Address / Landmark" value={teacherAddress} onChange={e => setTeacherAddress(e.target.value)} required isMobile={isMobile} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <UnderlineField label="Father's Name *" placeholder="Father's full name" value={teacherFatherName} onChange={e => setTeacherFatherName(e.target.value)} required isMobile={isMobile} />
                        <UnderlineField label="Mother's Name *" placeholder="Mother's full name" value={teacherMotherName} onChange={e => setTeacherMotherName(e.target.value)} required isMobile={isMobile} />
                      </div>
                      <button type="button" onClick={() => setTeacherStep(2)} className="btn-editorial-pill" style={{ width: '100%', padding: '12px', fontSize: 14, marginTop: 8 }}>
                        Next Step →
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <CustomMultiSelect label="Boards to Teach" options={teacherBoardOptions} selectedValues={boardsToTeach} onChange={setBoardsToTeach} isMobile={isMobile} />
                        <CustomMultiSelect label="Boards Already Taught" options={teacherBoardOptions} selectedValues={boardsAlreadyTaught} onChange={setBoardsAlreadyTaught} isMobile={isMobile} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <CustomMultiSelect label="Classes to Teach" options={teacherClassOptions} selectedValues={classesToTeach} onChange={setClassesToTeach} isMobile={isMobile} />
                        <CustomMultiSelect label="Classes Already Taught" options={teacherClassOptions} selectedValues={classesAlreadyTaught} onChange={setClassesAlreadyTaught} isMobile={isMobile} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 12 }}>
                        <CustomMultiSelect label="Subject to Teach" options={subjectsList} selectedValues={subjectToTeach} onChange={setSubjectToTeach} isMobile={isMobile} />
                        <CustomMultiSelect label="Subject Previously Taught" options={subjectsList} selectedValues={subjectPreviouslyTaught} onChange={setSubjectPreviouslyTaught} isMobile={isMobile} />
                      </div>
                      <CustomMultiSelect label="Medium of Instruction" options={mediumOptions} selectedValues={mediumOfInstruction} onChange={setMediumOfInstruction} isMobile={isMobile} />
                      <CustomSelect label="Most Comfortable Medium" options={mediumOptions} value={mostComfortableMedium} onChange={setMostComfortableMedium} placeholder="Select language..." isMobile={isMobile} />

                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <input type="checkbox" id="modalTeacherTerms" checked={teacherAgreed} onChange={e => setTeacherAgreed(e.target.checked)} required style={{ width: 16, height: 16, accentColor: '#4F7CFF' }} />
                        <label htmlFor="modalTeacherTerms" style={{ fontSize: 12.5, color: '#475569' }}>
                          I agree with the <a href="/teacher-terms" target="_blank" rel="noopener noreferrer" style={{ color: '#4F7CFF', fontWeight: 700 }}>Terms and Conditions</a>
                        </label>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <button type="button" onClick={() => setTeacherStep(1)} className="btn-editorial-secondary-pill" style={{ flex: 1, padding: '12px' }}>
                          Back
                        </button>
                        <button type="submit" disabled={!teacherAgreed || teacherSubmitting} className="btn-editorial-pill" style={{ flex: 2, padding: '12px', fontSize: 14 }}>
                          {teacherSubmitting ? 'Submitting...' : 'Apply to Join →'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
