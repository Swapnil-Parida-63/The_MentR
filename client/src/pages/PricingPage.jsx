import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { Check, ChevronDown, User, Phone, Mail, FileText, ChevronRight } from 'lucide-react';
import { pricingAPI } from '../services/api';
import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';

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
const CLASS_GROUPS = [
  {
    title: "AP Pricing • Classes 1–3",
    options: ["1", "2", "3"]
  },
  {
    title: "BP Pricing • Classes 4–7",
    options: ["4", "5", "6", "7"]
  },
  {
    title: "DP Pricing • Classes 8–10",
    options: ["8", "9", "10"]
  },
  {
    title: "EP Pricing • Classes 11–12",
    options: ["11", "12"]
  }
];
const SUBJECTS = [
  "All Subjects",
  "Mathematics", "Physics", "Chemistry", "Biology", "Science",
  "English", "Hindi", "Odia", "Social Science", "History",
  "Geography", "Political Science", "Economics", "Computer Science",
  "Accountancy", "Business Studies", "Commerce", "EVS", "General Knowledge"
];

// Helper components
function MultiSelectDropdown({ label, options, groups, selectedValues, onChange }) {
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
        onChange([...nextValues, opt]);
      }
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
              {label === 'Class' ? `Class ${v}` : v} <span style={{ fontSize: 9 }}>✕</span>
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
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
          borderRadius: 14,
          zIndex: 999,
          maxHeight: 260,
          overflowY: 'auto',
          marginTop: 6,
          padding: 8
        }}>
          {groups ? (
            groups.map((group, gIdx) => (
              <div key={group.title} style={{ marginBottom: gIdx < groups.length - 1 ? 10 : 0 }}>
                {/* Group Header */}
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#4F7CFF',
                  background: 'rgba(79, 124, 255, 0.06)',
                  padding: '6px 10px',
                  borderRadius: 6,
                  marginBottom: 4,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <span>⚡</span> {group.title}
                </div>
                {/* Group Items */}
                {group.options.map(opt => {
                  const isSelected = selectedValues.includes(opt);
                  return (
                    <div
                      key={opt}
                      onClick={() => toggleOption(opt)}
                      style={{
                        padding: '8px 12px 8px 24px',
                        fontSize: 13.5,
                        borderRadius: 8,
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                        color: isSelected ? '#4F7CFF' : '#1D2433',
                        fontWeight: isSelected ? 600 : 500,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span>Class {opt}</span>
                      {isSelected && <span style={{ fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            options.map(opt => {
              const isSelected = selectedValues.includes(opt);
              return (
                <div
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  style={{
                    padding: '8px 12px',
                    fontSize: 13.5,
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                    color: isSelected ? '#4F7CFF' : '#1D2433',
                    fontWeight: isSelected ? 600 : 500,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>{opt}</span>
                  {isSelected && <span style={{ fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
              );
            })
          )}
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
  const [submitting, setSubmitting] = useState(false);
  
  // Step 3 States (Price Selection & Success)
  const [selectedPrices, setSelectedPrices] = useState([]); // Array of { code, range }
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(false);

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

  const [showScrollArrow, setShowScrollArrow] = useState(false);

  useEffect(() => {
    if (step !== 3 || isSuccess) {
      setShowScrollArrow(false);
      return;
    }

    const checkScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (scrollHeight > clientHeight + 50) {
        if (scrollHeight - scrollTop - clientHeight > 100) {
          setShowScrollArrow(true);
        } else {
          setShowScrollArrow(false);
        }
      } else {
        setShowScrollArrow(false);
      }
    };

    checkScroll();
    const timer = setTimeout(checkScroll, 250);

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [step, isSuccess, selectedClasses]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleSelectPrice = (code, range) => {
    const exists = selectedPrices.some(p => p.code === code);
    if (exists) {
      setSelectedPrices(selectedPrices.filter(p => p.code !== code));
    } else {
      setSelectedPrices([...selectedPrices, { code, range }]);
    }
  };

  const handleFinalSubmit = async () => {
    if (selectedPrices.length === 0 || submitCooldown) return;
    setSubmitting(true);
    setSubmitCooldown(true);
    setErrorMsg("");

    // Set cooldown timer for 15 seconds
    setTimeout(() => {
      setSubmitCooldown(false);
    }, 15000);

    const codesStr = selectedPrices.map(p => p.code).join(', ');
    const rangesStr = selectedPrices.map(p => p.range).join('; ');

    try {
      await pricingAPI.submit({
        fullName,
        phone,
        email,
        isParent,
        boards: selectedBoards,
        classes: selectedClasses,
        subjects: selectedSubjects,
        categories: getApplicableCategories(),
        selectedPriceCode: codesStr,
        selectedPriceRange: rangesStr
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("❌ Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '140px 0 96px' }}>
      <SEO {...PAGE_SEO.pricing} />
      
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
                  groups={CLASS_GROUPS}
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
                    disabled={submitting}
                    style={{ flex: 2, height: 48, borderRadius: 14, justifyContent: 'center' }}
                  >
                    {submitting ? "Submitting..." : "View Pricing →"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {!isSuccess && step === 3 && (
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
                      Please select preferred fee codes (you can choose one or multiple) from the list below to submit.
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
                          {category.rows.map((row, idx) => {
                            const isSelected = selectedPrices.some(p => p.code === row.code);
                            return (
                              <tr 
                                key={row.code} 
                                onClick={() => handleSelectPrice(row.code, row.range)}
                                style={{ 
                                  borderBottom: idx < category.rows.length - 1 ? '1px solid rgba(79, 124, 255, 0.06)' : 'none',
                                  background: isSelected 
                                    ? 'rgba(79, 124, 255, 0.08)' 
                                    : idx % 2 === 1 ? 'rgba(79, 124, 255, 0.01)' : 'transparent',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <td style={{ padding: '14px 20px', color: '#1D2433', fontWeight: 550 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                      width: 18,
                                      height: 18,
                                      borderRadius: 4,
                                      border: isSelected ? '5px solid #4F7CFF' : '2px solid rgba(79, 124, 255, 0.25)',
                                      background: '#FFFFFF',
                                      transition: 'all 0.2s ease'
                                    }} />
                                    {row.code}
                                  </div>
                                </td>
                                <td style={{ padding: '14px 20px', color: '#4F7CFF', fontWeight: 700, textAlign: 'right' }}>{row.range}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
 
                    {/* Submit selection button */}
                    <button 
                      onClick={handleFinalSubmit}
                      disabled={submitting || submitCooldown || selectedPrices.length === 0}
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        height: 48, 
                        borderRadius: 14, 
                        justifyContent: 'center', 
                        fontSize: 15,
                        opacity: (submitting || submitCooldown || selectedPrices.length === 0) ? 0.6 : 1,
                        cursor: (submitting || submitCooldown || selectedPrices.length === 0) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {submitting ? "Submitting Selection..." : submitCooldown ? "Submitted (Please wait...)" : "Submit Selection"}
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

          {isSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="card-brand-glow"
              style={{ background: '#FFFFFF', borderRadius: 28, padding: '48px 32px', textAlign: 'center' }}
            >
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                margin: '0 auto 24px',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
              <h2 style={{ fontFamily: 'var(--font-hero)', fontWeight: 800, fontSize: 26, color: '#1D2433', margin: '0 0 12px' }}>
                Pricing Selection Submitted!
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#5C667A', lineHeight: 1.6, marginBottom: 32 }}>
                Thank you, <strong>{fullName}</strong>. Your pricing plan selection (<strong>{selectedPrices.map(p => p.code).join(', ')}</strong>) has been successfully submitted.
                Our team will contact you shortly at <strong>{phone}</strong>.
              </p>
              <a href="/" className="btn btn-primary" style={{ height: 46, borderRadius: 14, justifyContent: 'center', display: 'inline-flex' }}>
                Go back to Homepage
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Floating Scroll Down Arrow Indicator */}
      <AnimatePresence>
        {showScrollArrow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -6, 0] 
            }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut"
              },
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 }
            }}
            onClick={scrollToBottom}
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid rgba(79, 124, 255, 0.15)',
              boxShadow: '0 8px 30px rgba(79, 124, 255, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#4F7CFF',
              zIndex: 99999,
              transition: 'background-color 0.2s, transform 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#FAFBFD';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Scroll Down"
          >
            <ChevronDown size={22} strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
