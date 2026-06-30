import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useModal } from '../../context/ModalContext';
import BorderGlow from './BorderGlow';
import { parentAPI, teachersAPI } from '../../services/api';

const subjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Social Studies', 'Computer Science'];
const boardsOptions = ['CBSE', 'ICSE', 'IB', 'State Board'];
const classesOptions = ['Class 1–5', 'Class 6–8', 'Class 9–10', 'Class 11–12'];
const mediumsList = ['English', 'Hindi', 'Odia', 'Bengali', 'Bilingual'];
const locationOptions = ['Patia', 'Jayadev Vihar', 'Nayapalli', 'Saheed Nagar', 'Khandagiri', 'Chandrasekharpur', 'Ghatikia', 'Vani Vihar'];

// Underline Input Components matching FormsSection editorial design
function UnderlineField({ label, type = "text", placeholder, value, onChange, required = false }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ marginBottom: 32, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isFocused ? '#4F7CFF' : '#1D2433', 
          marginBottom: 8,
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
            padding: '10px 0',
            fontSize: 15.5,
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
    <div style={{ marginBottom: 32, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isFocused ? '#4F7CFF' : '#1D2433', 
          marginBottom: 8,
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
            padding: '10px 0',
            fontSize: 15.5,
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
    <div style={{ marginBottom: 32, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isFocused ? '#4F7CFF' : '#1D2433', 
          marginBottom: 8,
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
            padding: '10px 0',
            fontSize: 15.5,
            color: '#1D2433',
            fontFamily: 'var(--font-sans)',
            resize: 'none',
            height: 56,
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
    <div ref={dropdownRef} style={{ marginBottom: 32, position: 'relative' }}>
      <label 
        style={{ 
          display: 'block', 
          fontSize: 12, 
          fontWeight: 600, 
          color: isOpen ? '#4F7CFF' : '#1D2433', 
          marginBottom: 8,
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
          minHeight: 40,
          borderBottom: '1px solid rgba(29, 36, 51, 0.15)',
          padding: '6px 0',
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
          <span style={{ color: '#5D677A', opacity: 0.6, fontSize: 15 }}>Select options...</span>
        ) : (
          selectedValues.map(v => (
            <span 
              key={v}
              style={{
                background: 'rgba(79, 124, 255, 0.08)',
                color: '#4F7CFF',
                fontSize: 11.5,
                fontWeight: 600,
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
              {v} <span style={{ fontSize: 9 }}>✕</span>
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
          maxHeight: 180,
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
                  fontSize: 13.5,
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

export default function FormModal() {
  const { activeModal, closeModal } = useModal();
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

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

  // Reset steps & inputs on modal change
  useEffect(() => {
    if (activeModal) {
      setParentStep(1);
      setTeacherStep(1);
      setParentName('');
      setParentPhone('');
      setParentBoard('');
      setParentGrade('');
      setParentSubjects([]);
      setParentGaps('');

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

      document.body.style.overflow = 'hidden';

      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(cardRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  if (!activeModal) return null;

  const handleClose = () => {
    gsap.to(cardRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: closeModal
        });
      }
    });
  };

  const handleParentSubmit = async (e) => {
    e.preventDefault();
    if (parentSubjects.length === 0) {
      alert("⚠️ Please select at least one subject.");
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
      alert("✅ Assessment visit request submitted! We'll call you within 24 hours.");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("❌ Connection error. Please make sure the backend is running.");
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (boardsToTeach.length === 0 || classesToTeach.length === 0 || subjectsToTeach.length === 0 || preferredLocations.length === 0) {
      alert("⚠️ Please fill in all teaching and location preferences.");
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
      alert("✅ Teacher application received! We'll review and contact you within 5–7 days.");
      handleClose();
    } catch (err) {
      console.error(err);
      alert("❌ Connection error. Please make sure the backend is running.");
    }
  };

  return (
    <div 
      ref={overlayRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 22, 40, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div 
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 620,
        }}
      >
        <BorderGlow
          borderRadius={28}
          backgroundColor="#FFFFFF"
          style={{ width: '100%' }}
        >
          <div style={{ padding: '44px 40px', position: 'relative', minHeight: 480, display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflowY: 'auto' }}>
            {/* Close Button */}
            <button 
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: '#FAFBFD',
                border: '1px solid rgba(79, 124, 255, 0.1)',
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 14,
                color: '#5D677A',
                transition: 'all 0.25s',
                zIndex: 10
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#e2e8f0'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#FAFBFD'; }}
            >
              ✕
            </button>

            {activeModal === 'parent' ? (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 24, marginBottom: 8, paddingRight: 40, fontFamily: 'var(--font-display)', fontWeight: 500 }}>Book an Assessment Visit</h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>We'll visit your home, evaluate your child's learning profile, and match you with the right teacher.</p>
                
                {/* 3 Progress Lines */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: parentStep >= 1 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: parentStep >= 2 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: parentStep >= 3 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                </div>

                <form onSubmit={handleParentSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Step 1 Fields */}
                  {parentStep === 1 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <UnderlineField label="Parent Name" placeholder="Your full name" value={parentName} onChange={e => setParentName(e.target.value)} required />
                      <UnderlineField label="Phone Number" type="tel" placeholder="+91 00000 00000" value={parentPhone} onChange={e => setParentPhone(e.target.value)} required />
                      
                      <button 
                        type="button" 
                        onClick={() => {
                          if (parentName && parentPhone) setParentStep(2);
                          else alert("⚠️ Please fill in all fields.");
                        }}
                        className="btn-editorial-pill" 
                        style={{ width: '100%', marginTop: 'auto' }}
                      >
                        Next Step →
                      </button>
                    </div>
                  )}

                  {/* Step 2 Fields */}
                  {parentStep === 2 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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

                      <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
                        <button type="button" onClick={() => setParentStep(1)} className="btn-editorial-secondary-pill" style={{ flex: 1 }}>Back</button>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (parentBoard && parentGrade) setParentStep(3);
                            else alert("⚠️ Please select syllabus and grade.");
                          }}
                          className="btn-editorial-pill" 
                          style={{ flex: 2 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3 Fields */}
                  {parentStep === 3 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: 32 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D2433', marginBottom: 12, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Select Subjects (Select Multiple)</label>
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
                                  padding: '6px 12px',
                                  borderRadius: 20,
                                  fontSize: 12,
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

                      <UnderlineTextarea label="Learning Gaps or Concerns" placeholder="Tell us what help your child needs..." value={parentGaps} onChange={e => setParentGaps(e.target.value)} />

                      <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
                        <button type="button" onClick={() => setParentStep(2)} className="btn-editorial-secondary-pill" style={{ flex: 1 }}>Back</button>
                        <button type="submit" className="btn-editorial-pill" style={{ flex: 2 }}>Book Assessment Visit →</button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              /* Teacher form inside modal (4 steps comprehensive) */
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 24, marginBottom: 8, paddingRight: 40, fontFamily: 'var(--font-display)', fontWeight: 500 }}>Join as a Verified Teacher</h3>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>Apply to become part of India's most curated educator network.</p>
                
                {/* 4 Progress Lines */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 1 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 2 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 3 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                  <div style={{ flex: 1, height: 2, borderRadius: 9, background: teacherStep >= 4 ? '#4F7CFF' : 'rgba(79, 124, 255, 0.1)' }} />
                </div>

                <form onSubmit={handleTeacherSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Step 1: Basic Info */}
                  {teacherStep === 1 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeFormStep 0.4s ease' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <UnderlineField label="First Name" placeholder="First Name" value={teacherFirstName} onChange={e => setTeacherFirstName(e.target.value)} required />
                        <UnderlineField label="Last Name" placeholder="Last Name" value={teacherLastName} onChange={e => setTeacherLastName(e.target.value)} required />
                      </div>
                      <UnderlineField label="Email Address" type="email" placeholder="email@address.com" value={teacherEmail} onChange={e => setTeacherEmail(e.target.value)} required />
                      <UnderlineField label="Phone / WhatsApp" type="tel" placeholder="+91 00000 00000" value={teacherPhone} onChange={e => setTeacherPhone(e.target.value)} required />
                      
                      <button 
                        type="button" 
                        onClick={() => {
                          if (teacherFirstName && teacherLastName && teacherEmail && teacherPhone) setTeacherStep(2);
                          else alert("⚠️ Please fill in all fields.");
                        }}
                        className="btn-editorial-pill" 
                        style={{ width: '100%', marginTop: 'auto' }}
                      >
                        Next Step →
                      </button>
                    </div>
                  )}

                  {/* Step 2: Personal Details */}
                  {teacherStep === 2 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeFormStep 0.4s ease' }}>
                      <UnderlineField label="Date of Birth" type="date" value={teacherDob} onChange={e => setTeacherDob(e.target.value)} required />
                      <UnderlineField label="Current Address" placeholder="Street address, city" value={teacherAddress} onChange={e => setTeacherAddress(e.target.value)} required />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <UnderlineField label="Father's Name" placeholder="Father's Name" value={teacherFatherName} onChange={e => setTeacherFatherName(e.target.value)} required />
                        <UnderlineField label="Mother's Name" placeholder="Mother's Name" value={teacherMotherName} onChange={e => setTeacherMotherName(e.target.value)} required />
                      </div>

                      <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
                        <button type="button" onClick={() => setTeacherStep(1)} className="btn-editorial-secondary-pill" style={{ flex: 1 }}>Back</button>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (teacherDob && teacherAddress && teacherFatherName && teacherMotherName) setTeacherStep(3);
                            else alert("⚠️ Please fill in all fields.");
                          }}
                          className="btn-editorial-pill" 
                          style={{ flex: 2 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Teaching Preferences */}
                  {teacherStep === 3 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeFormStep 0.4s ease' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <UnderlineMultiSelect label="Boards to Teach" options={boardsOptions} selectedValues={boardsToTeach} onChange={setBoardsToTeach} />
                        <UnderlineMultiSelect label="Boards Already Taught" options={boardsOptions} selectedValues={boardsAlreadyTaught} onChange={setBoardsAlreadyTaught} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <UnderlineMultiSelect label="Classes to Teach" options={classesOptions} selectedValues={classesToTeach} onChange={setClassesToTeach} />
                        <UnderlineMultiSelect label="Classes Already Taught" options={classesOptions} selectedValues={classesAlreadyTaught} onChange={setClassesAlreadyTaught} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <UnderlineMultiSelect label="Subject to Teach" options={subjectsList} selectedValues={subjectsToTeach} onChange={setSubjectsToTeach} />
                        <UnderlineMultiSelect label="Subject Previously Taught" options={subjectsList} selectedValues={subjectsPreviouslyTaught} onChange={setSubjectsPreviouslyTaught} />
                      </div>

                      <UnderlineMultiSelect label="Medium of Instruction" options={mediumsList} selectedValues={mediumOfInstruction} onChange={setMediumOfInstruction} />

                      <UnderlineSelect label="Most Comfortable Medium" value={mostComfortableMedium} onChange={e => setMostComfortableMedium(e.target.value)} required>
                        <option value="">Select language...</option>
                        {mediumsList.map(m => <option key={m} value={m}>{m}</option>)}
                      </UnderlineSelect>

                      <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
                        <button type="button" onClick={() => setTeacherStep(2)} className="btn-editorial-secondary-pill" style={{ flex: 1 }}>Back</button>
                        <button 
                          type="button" 
                          onClick={() => {
                            if (boardsToTeach.length > 0 && classesToTeach.length > 0 && subjectsToTeach.length > 0 && mostComfortableMedium) setTeacherStep(4);
                            else alert("⚠️ Please select boards, classes, subjects and comfortable medium.");
                          }}
                          className="btn-editorial-pill" 
                          style={{ flex: 2 }}
                        >
                          Next Step →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Service Location */}
                  {teacherStep === 4 && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', animation: 'fadeFormStep 0.4s ease' }}>
                      <UnderlineMultiSelect label="Preferred Location(s)" options={locationOptions} selectedValues={preferredLocations} onChange={setPreferredLocations} />

                      <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
                        <button type="button" onClick={() => setTeacherStep(3)} className="btn-editorial-secondary-pill" style={{ flex: 1 }}>Back</button>
                        <button type="submit" className="btn-editorial-pill" style={{ flex: 2 }}>Apply to Join TheMentR →</button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </BorderGlow>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}
