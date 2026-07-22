import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { Check, ChevronDown, User, Phone, Mail, FileText, ChevronRight } from 'lucide-react';

// Pricing Data
const PRICING_DATA = {
  AP: {
    title: "AP Pricing (Classes 1–3)",
    classes: ["1", "2", "3"],
    rows: [
      { code: "AP-1", range: "₹1,499 – ₹2,999" },
      { code: "AP-2", range: "₹1,999 – ₹3,499" },
      { code: "AP-3", range: "₹2,499 – ₹3,499" },
      { code: "AP-4", range: "₹2,999 – ₹3,999" },
      { code: "AP-5", range: "₹3,499 – ₹4,499" },
      { code: "AP-6", range: "₹3,499 – ₹4,999" },
      { code: "AP-7", range: "₹3,999 – ₹5,499" },
      { code: "AP-8", range: "₹4,499 – ₹5,999" },
      { code: "AP-9", range: "₹4,999 – ₹5,999" },
      { code: "AP-10", range: "₹5,499 – ₹6,499" }
    ]
  },
  BP: {
    title: "BP Pricing (Classes 4–7)",
    classes: ["4", "5", "6", "7"],
    rows: [
      { code: "BP-1", range: "₹1,999 – ₹3,499" },
      { code: "BP-2", range: "₹2,499 – ₹3,499" },
      { code: "BP-3", range: "₹2,999 – ₹3,999" },
      { code: "BP-4", range: "₹3,499 – ₹4,499" },
      { code: "BP-5", range: "₹3,499 – ₹4,999" },
      { code: "BP-6", range: "₹3,999 – ₹5,499" },
      { code: "BP-7", range: "₹4,499 – ₹5,999" },
      { code: "BP-8", range: "₹4,999 – ₹5,999" },
      { code: "BP-9", range: "₹5,499 – ₹6,499" },
      { code: "BP-10", range: "₹5,999 – ₹6,999" }
    ]
  },
  DP: {
    title: "DP Pricing (Classes 8–10)",
    classes: ["8", "9", "10"],
    rows: [
      { code: "DP-1", range: "₹1,499 – ₹2,999" },
      { code: "DP-2", range: "₹1,999 – ₹3,499" },
      { code: "DP-3", range: "₹2,499 – ₹3,999" },
      { code: "DP-4", range: "₹2,999 – ₹3,999" },
      { code: "DP-5", range: "₹3,499 – ₹4,499" },
      { code: "DP-6", range: "₹3,999 – ₹4,499" },
      { code: "DP-7", range: "₹3,999 – ₹4,999" },
      { code: "DP-8", range: "₹4,499 – ₹4,999" },
      { code: "DP-9", range: "₹4,499 – ₹5,499" },
      { code: "DP-10", range: "₹4,999 – ₹5,999" }
    ]
  },
  EP: {
    title: "EP Pricing (Classes 11–12)",
    classes: ["11", "12"],
    rows: [
      { code: "EP-1", range: "₹1,999 – ₹3,499" },
      { code: "EP-2", range: "₹2,499 – ₹3,999" },
      { code: "EP-3", range: "₹2,999 – ₹3,999" },
      { code: "EP-4", range: "₹3,499 – ₹4,499" },
      { code: "EP-5", range: "₹3,999 – ₹4,499" },
      { code: "EP-6", range: "₹3,999 – ₹4,999" },
      { code: "EP-7", range: "₹4,499 – ₹4,999" },
      { code: "EP-8", range: "₹4,499 – ₹5,499" },
      { code: "EP-9", range: "₹4,999 – ₹5,999" },
      { code: "EP-10", range: "₹4,999 – ₹6,499" }
    ]
  }
};

const BOARDS = ["CBSE", "ICSE", "State Board", "ISC", "NIOS", "IB", "IGCSE"];
const CLASSES = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Science",
  "English", "Hindi", "Odia", "Social Science", "History",
  "Geography", "Political Science", "Economics", "Computer Science",
  "Accountancy", "Business Studies", "Commerce", "EVS", "General Knowledge"
];

// Helper components
function MultiSelectDropdown({ label, options, selectedValues, onChange }) {
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
    <div ref={dropdownRef} style={{ marginBottom: 24, position: 'relative', textAlign: 'left' }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D2433', marginBottom: 8, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          minHeight: 44,
          border: '1px solid rgba(79, 124, 255, 0.18)',
          borderRadius: 12,
          padding: '8px 12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          background: '#FFFFFF',
          boxSizing: 'border-box'
        }}
      >
        {selectedValues.length === 0 ? (
          <span style={{ color: '#5D677A', opacity: 0.6, fontSize: 14 }}>Select {label.toLowerCase()}...</span>
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
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#5D677A', fontSize: 10 }}>
          {isOpen ? '▲' : '▼'}
        </div>
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

export default function PricingPage() {
  const { openModal } = useModal();
  const [step, setStep] = useState(1); // 1: Contact, 2: Requirements, 3: Pricing
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1 States
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isParent, setIsParent] = useState(false);

  // Step 2 States
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Determine which pricing tables to show
  const getApplicableCategories = () => {
    const categories = new Set();
    selectedClasses.forEach(clsStr => {
      const cls = parseInt(clsStr, 10);
      if (cls >= 1 && cls <= 3) categories.add("AP");
      else if (cls >= 4 && cls <= 7) categories.add("BP");
      else if (cls >= 8 && cls <= 10) categories.add("DP");
      else if (cls >= 11 && cls <= 12) categories.add("EP");
    });
    return Array.from(categories);
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg("⚠️ All fields are mandatory.");
      return;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      setErrorMsg("⚠️ Phone number must contain exactly 10 digits and only numbers.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim())) {
      setErrorMsg("⚠️ Email must be a valid Gmail address (e.g. user@gmail.com).");
      return;
    }
    if (!isParent) {
      setErrorMsg("⚠️ You must check 'I am a Parent' to proceed.");
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (selectedBoards.length === 0 || selectedClasses.length === 0 || selectedSubjects.length === 0) {
      setErrorMsg("⚠️ Please select at least one option for Board, Class, and Subject.");
      return;
    }

    setStep(3);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '140px 0 96px' }}>
      
      {/* Background radial atmosphere */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '-10%',
        width: '50vw',
        height: '50vw',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.08) 0%, transparent 70%)',
        filter: 'blur(90px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '55vw',
        height: '55vw',
        background: 'radial-gradient(circle, rgba(116, 105, 248, 0.07) 0%, transparent 75%)',
        filter: 'blur(100px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
        
        {/* Step Progress Indicators */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 44, padding: '0 8px' }}>
          {[
            { num: 1, label: "Contact" },
            { num: 2, label: "Requirements" },
            { num: 3, label: "Pricing Plan" }
          ].map((item, idx) => {
            const isActive = step === item.num;
            const isCompleted = step > item.num;
            return (
              <div key={item.num} style={{ display: 'flex', alignItems: 'center', flex: idx < 2 ? '1' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isCompleted ? '#4F7CFF' : isActive ? 'linear-gradient(135deg, #4F7CFF 0%, #6366F1 100%)' : '#FFFFFF',
                    border: isCompleted || isActive ? 'none' : '1px solid rgba(79, 124, 255, 0.25)',
                    color: isCompleted || isActive ? '#FFFFFF' : '#64748B',
                    fontWeight: 700,
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isActive ? '0 4px 12px rgba(79, 124, 255, 0.25)' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    {isCompleted ? "✓" : item.num}
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: isActive || isCompleted ? 600 : 500, color: isActive || isCompleted ? '#1D2433' : '#64748B' }}>
                    {item.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div style={{
                    flex: 1,
                    height: 1.5,
                    background: isCompleted ? '#4F7CFF' : 'rgba(79, 124, 255, 0.15)',
                    margin: '0 16px',
                    minWidth: 24
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Error Toast */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.18)',
                color: '#EF4444',
                padding: '12px 16px',
                borderRadius: 12,
                fontSize: 13.5,
                fontWeight: 500,
                marginBottom: 24,
                textAlign: 'left'
              }}
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content Cards */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="card-brand-glow"
              style={{ background: '#FFFFFF', borderRadius: 28, padding: '40px 32px', textAlign: 'center' }}
            >
              <h2 style={{ fontFamily: 'var(--font-hero)', fontWeight: 800, fontSize: 26, color: '#1D2433', margin: '0 0 8px' }}>
                View Tuition Fee Plans
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#5C667A', margin: '0 0 32px' }}>
                Enter your details to view the available tuition fee packages.
              </p>

              <form onSubmit={handleStep1Submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Full Name */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D2433', marginBottom: 8, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        height: 46,
                        border: '1px solid rgba(79, 124, 255, 0.18)',
                        borderRadius: 12,
                        padding: '0 16px 0 40px',
                        fontSize: 14.5,
                        color: '#1D2433',
                        outline: 'none',
                        background: '#FFFFFF'
                      }}
                    />
                    <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5C667A', opacity: 0.7 }} />
                  </div>
                </div>

                {/* Phone Number */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D2433', marginBottom: 8, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Phone Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="tel" 
                      placeholder="10-digit number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      style={{
                        width: '100%',
                        height: 46,
                        border: '1px solid rgba(79, 124, 255, 0.18)',
                        borderRadius: 12,
                        padding: '0 16px 0 40px',
                        fontSize: 14.5,
                        color: '#1D2433',
                        outline: 'none',
                        background: '#FFFFFF'
                      }}
                    />
                    <Phone size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5C667A', opacity: 0.7 }} />
                  </div>
                </div>

                {/* Email */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1D2433', marginBottom: 8, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      placeholder="Gmail address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        height: 46,
                        border: '1px solid rgba(79, 124, 255, 0.18)',
                        borderRadius: 12,
                        padding: '0 16px 0 40px',
                        fontSize: 14.5,
                        color: '#1D2433',
                        outline: 'none',
                        background: '#FFFFFF'
                      }}
                    />
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#5C667A', opacity: 0.7 }} />
                  </div>
                </div>

                {/* Mandatory Parent Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left', marginTop: 8 }}>
                  <input 
                    type="checkbox"
                    checked={isParent}
                    onChange={(e) => setIsParent(e.target.checked)}
                    style={{
                      width: 18,
                      height: 18,
                      accentColor: '#4F7CFF',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ fontSize: 13.5, color: '#5C667A', fontWeight: 500 }}>
                    I am a Parent
                  </span>
                </label>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary" style={{ height: 48, borderRadius: 14, marginTop: 12, justifyContent: 'center' }}>
                  Continue →
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="card-brand-glow"
              style={{ background: '#FFFFFF', borderRadius: 28, padding: '40px 32px', textAlign: 'center' }}
            >
              <h2 style={{ fontFamily: 'var(--font-hero)', fontWeight: 800, fontSize: 26, color: '#1D2433', margin: '0 0 8px' }}>
                Tell us what you're looking for
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#5C667A', margin: '0 0 32px' }}>
                Select your board, classes, and subjects to build your package.
              </p>

              <form onSubmit={handleStep2Submit} style={{ display: 'flex', flexDirection: 'column' }}>
                <MultiSelectDropdown 
                  label="Board"
                  options={BOARDS}
                  selectedValues={selectedBoards}
                  onChange={setSelectedBoards}
                />

                <MultiSelectDropdown 
                  label="Class"
                  options={CLASSES}
                  selectedValues={selectedClasses}
                  onChange={setSelectedClasses}
                />

                <MultiSelectDropdown 
                  label="Subject"
                  options={SUBJECTS}
                  selectedValues={selectedSubjects}
                  onChange={setSelectedSubjects}
                />

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="btn btn-secondary" 
                    style={{ flex: 1, height: 48, borderRadius: 14, justifyContent: 'center' }}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ flex: 2, height: 48, borderRadius: 14, justifyContent: 'center' }}
                  >
                    View Pricing →
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
            >
              {getApplicableCategories().map(catKey => {
                const category = PRICING_DATA[catKey];
                return (
                  <div 
                    key={catKey}
                    className="card-brand-glow"
                    style={{ background: '#FFFFFF', borderRadius: 28, padding: '40px 32px', textAlign: 'center' }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-hero)', fontWeight: 800, fontSize: 22, color: '#1D2433', marginBottom: 6 }}>
                      {category.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#64748B', marginBottom: 28 }}>
                      Fee structure for selected class range.
                    </p>

                    {/* Premium Table layout */}
                    <div style={{ overflowX: 'auto', border: '1px solid rgba(79, 124, 255, 0.12)', borderRadius: 16, marginBottom: 32 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14.5 }}>
                        <thead>
                          <tr style={{ background: 'rgba(79, 124, 255, 0.03)', borderBottom: '1px solid rgba(79, 124, 255, 0.12)' }}>
                            <th style={{ padding: '14px 20px', fontWeight: 600, color: '#1D2433' }}>Fee Code</th>
                            <th style={{ padding: '14px 20px', fontWeight: 600, color: '#1D2433', textAlign: 'right' }}>Monthly Fee Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.rows.map((row, idx) => (
                            <tr 
                              key={row.code} 
                              style={{ 
                                borderBottom: idx < category.rows.length - 1 ? '1px solid rgba(79, 124, 255, 0.06)' : 'none',
                                background: idx % 2 === 1 ? 'rgba(79, 124, 255, 0.01)' : 'transparent'
                              }}
                            >
                              <td style={{ padding: '14px 20px', color: '#1D2433', fontWeight: 550 }}>{row.code}</td>
                              <td style={{ padding: '14px 20px', color: '#4F7CFF', fontWeight: 700, textAlign: 'right' }}>{row.range}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* CTA and Assessment trigger */}
                    <button 
                      onClick={() => openModal('parent')}
                      className="btn btn-primary"
                      style={{ width: '100%', height: 48, borderRadius: 14, justifyContent: 'center', fontSize: 15 }}
                    >
                      Proceed with Assessment
                    </button>
                    
                    <div style={{ 
                      marginTop: 20, 
                      padding: '12px 18px', 
                      background: 'rgba(79, 124, 255, 0.05)', 
                      border: '1px dashed rgba(79, 124, 255, 0.3)', 
                      borderRadius: 12, 
                      fontSize: 13.5, 
                      color: '#1D2433', 
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      flexWrap: 'wrap'
                    }}>
                      <span>📞 For further inquiries, call</span>
                      <a href="tel:18008892388" style={{ color: '#4F7CFF', fontWeight: 700, textDecoration: 'none', borderBottom: '1px dashed #4F7CFF' }}>
                        1800 889 2388
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* Back to change selections */}
              <button 
                onClick={() => setStep(2)} 
                className="btn btn-secondary" 
                style={{ height: 46, borderRadius: 14, alignSelf: 'center', padding: '10px 24px' }}
              >
                ← Edit Requirements
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
