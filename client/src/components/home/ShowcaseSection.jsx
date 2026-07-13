import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import { Clock, CheckCircle, Calendar, MessageSquare, TrendingUp, Award, Laptop, Smartphone } from 'lucide-react';

// ==============================================================
// 1. SCREEN CONTENT RENDERS (High-Fidelity Mock App Views)
// ==============================================================

// PARENT APP SCREENS
const ParentScreen = ({ index }) => {
  switch (index) {
    case 0: // Dashboard
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8' }}>DASHBOARD</span>
            <span style={{ fontSize: 9, padding: '2px 6px', background: '#EEF2FF', color: '#6366F1', borderRadius: 4, fontWeight: 600 }}>Parent Portal</span>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 12, marginBottom: 12, border: '1px solid rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>📅 Today's Session</span>
              <span style={{ fontSize: 10, color: '#6366F1', fontWeight: 600 }}>4:00 PM</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>Mathematics</div>
            <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>Class 9 CBSE · Priya Ma'am</div>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 12, border: '1px solid rgba(15,23,42,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative', width: 44, height: 44, borderRadius: '50%', background: 'conic-gradient(#6366F1 94%, #E2E8F0 0%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#6366F1' }}>94%</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>Monthly Attendance</div>
              <div style={{ fontSize: 9, color: '#10B981', fontWeight: 600, marginTop: 1 }}>12/12 Sessions Present</div>
            </div>
          </div>
        </div>
      );
    case 1: // Attendance
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8' }}>ATTENDANCE MATRIX</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>94% Present</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 12 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} style={{ fontSize: 9, color: '#94A3B8', fontWeight: 700, textAlign: 'center' }}>{d}</div>)}
            {Array.from({ length: 28 }).map((_, i) => {
              const absent = i === 4 || i === 18;
              const future = i > 22;
              return (
                <div 
                  key={i} 
                  style={{ 
                    aspectRatio: '1', 
                    borderRadius: 6, 
                    background: future ? '#F1F5F9' : absent ? '#FEE2E2' : '#DCFCE7', 
                    color: future ? '#94A3B8' : absent ? '#EF4444' : '#10B981', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: 9, 
                    fontWeight: 700 
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        </div>
      );
    case 2: // Reports
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 12 }}>PROGRESS REPORTS</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { subject: 'Algebra', val: 92, label: 'Strong', color: '#6366F1' },
              { subject: 'Geometry', val: 78, label: 'Improving', color: '#4F7CFF' },
              { subject: 'Physics', val: 88, label: 'Normal', color: '#7469F8' }
            ].map(r => (
              <div key={r.subject}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                  <span>{r.subject}</span>
                  <span style={{ color: r.color }}>{r.val}% ({r.label})</span>
                </div>
                <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.val}%`, background: r.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 12 }}>HOMEWORK TRACKER</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { t: 'Trigonometry Worksheet', d: 'Due tomorrow', done: false },
              { t: 'Physics Lab Report', d: 'Completed 2d ago', done: true },
              { t: 'English Comprehension', d: 'Completed 4d ago', done: true }
            ].map(hw => (
              <div key={hw.t} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: '#F8FAFC', borderRadius: 8 }}>
                <CheckCircle size={14} color={hw.done ? '#10B981' : '#CBD5E1'} fill={hw.done ? '#DCFCE7' : 'transparent'} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: hw.done ? '#64748B' : '#1E293B', textDecoration: hw.done ? 'line-through' : 'none' }}>{hw.t}</div>
                  <div style={{ fontSize: 8, color: '#94A3B8', marginTop: 1 }}>{hw.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

// TEACHER APP SCREENS
const TeacherScreen = ({ index }) => {
  switch (index) {
    case 0: // Dashboard
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8' }}>TEACHER CONSOLE</span>
            <span style={{ fontSize: 9, padding: '2px 6px', background: '#E6F4EA', color: '#137333', borderRadius: 4, fontWeight: 600 }}>Active Portal</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div style={{ background: '#F8FAFC', border: '1px solid rgba(15,23,42,0.04)', borderRadius: 10, padding: 8 }}>
              <div style={{ fontSize: 8, color: '#64748B', fontWeight: 600 }}>EARNINGS</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#10B981', marginTop: 2 }}>₹28,400</div>
            </div>
            <div style={{ background: '#F8FAFC', border: '1px solid rgba(15,23,42,0.04)', borderRadius: 10, padding: 8 }}>
              <div style={{ fontSize: 8, color: '#64748B', fontWeight: 600 }}>STUDENTS</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>8 Active</div>
            </div>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 10, border: '1px solid rgba(15,23,42,0.04)' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8', marginBottom: 4 }}>NEXT UPCOMING CLASS</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>Rohan Sen · Class 10</div>
            <div style={{ fontSize: 9, color: '#6366F1', fontWeight: 600, marginTop: 2 }}>5:30 PM (Math)</div>
          </div>
        </div>
      );
    case 1: // Students
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 12 }}>MY STUDENT ROSTER</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Rohan Sen', class: 'Class 10 CBSE', rate: '₹4,500/mo' },
              { name: 'Aditi Das', class: 'Class 8 ICSE', rate: '₹3,500/mo' },
              { name: 'Suhail Khan', class: 'Class 12 CBSE', rate: '₹6,000/mo' }
            ].map(st => (
              <div key={st.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, background: '#F8FAFC', borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#1E293B' }}>{st.name}</div>
                  <div style={{ fontSize: 8, color: '#64748B', marginTop: 1 }}>{st.class}</div>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#10B981' }}>{st.rate}</div>
              </div>
            ))}
          </div>
        </div>
      );
    default: // Earnings
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px 12px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8', marginBottom: 12 }}>EARNINGS GROWTH</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 80, padding: '0 8px', borderBottom: '1px solid #E2E8F0', marginBottom: 8 }}>
            {[
              { m: 'Mar', h: 30 },
              { m: 'Apr', h: 45 },
              { m: 'May', h: 65 },
              { m: 'Jun', h: 80 }
            ].map(bar => (
              <div key={bar.m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 14, height: bar.h, background: 'linear-gradient(180deg, #10B981, #059669)', borderRadius: '3px 3px 0 0' }} />
                <span style={{ fontSize: 8, color: '#94A3B8', fontWeight: 600 }}>{bar.m}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748B', padding: '0 4px' }}>
            <span>Total payout processed:</span>
            <strong style={{ color: '#0F172A' }}>₹28,400</strong>
          </div>
        </div>
      );
  }
};

// OLYMPIAD BROWSER PORTAL SCREEN
const OlympiadScreen = ({ index }) => {
  switch (index) {
    case 0: // Dashboard
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8FAFC' }}>
          {/* Virtual Browser Top Nav */}
          <div style={{ height: 32, background: '#FFFFFF', borderBottom: '1px solid rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
              <div style={{ width: 100, height: 14, background: '#F1F5F9', borderRadius: 4, marginLeft: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#94A3B8' }}>olympiad.thementr.com</div>
            </div>
            <span style={{ fontSize: 9, color: '#6366F1', fontWeight: 700 }}>LIVE SYSTEM</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, padding: 16, flexGrow: 1 }} className="olympiad-portal-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(15,23,42,0.04)', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                <h5 style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#0F172A' }}>International Math Olympiad (IMO)</h5>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: '#64748B' }}>Mock practice series 3 is active and available for benchmarking.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', background: '#ECFDF5', color: '#059669', borderRadius: 4 }}>Active Now</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', background: '#EFF6FF', color: '#2563EB', borderRadius: 4 }}>50 Qs · 60 mins</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#FFFFFF', border: '1px solid rgba(15,23,42,0.04)', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                <h6 style={{ margin: 0, fontSize: 11, color: '#64748B', fontWeight: 700 }}>NATIONAL RANKING</h6>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: '#7469F8' }}>#182</span>
                  <span style={{ fontSize: 10, color: '#10B981', fontWeight: 700 }}>Top 5%</span>
                </div>
                <div style={{ fontSize: 10, color: '#64748B', marginTop: 4 }}>Rank calculated against 12,400 peers.</div>
              </div>
            </div>
          </div>
        </div>
      );
    case 1: // Exam
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8FAFC' }}>
          <div style={{ height: 32, background: '#FFFFFF', borderBottom: '1px solid rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#0F172A' }}>IMO Stage 1 Practice Test</span>
            <span style={{ fontSize: 10, color: '#EF4444', fontWeight: 700 }}>⏰ 42:15 remaining</span>
          </div>
          <div style={{ padding: 20, textAlign: 'left', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#94A3B8' }}>QUESTION 14 OF 50</span>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginTop: 6, lineHeight: 1.5 }}>
                Find the sum of all prime factors of 1008.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                {['A) 12', 'B) 10', 'C) 14', 'D) 15'].map((opt, i) => (
                  <div key={opt} style={{ padding: 10, border: i === 0 ? '1.5px solid #4F7CFF' : '1px solid rgba(15,23,42,0.06)', background: i === 0 ? '#EFF6FF' : '#FFFFFF', borderRadius: 8, fontSize: 11, fontWeight: 600, color: i === 0 ? '#4F7CFF' : '#1E293B', cursor: 'pointer' }}>{opt}</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button style={{ padding: '6px 16px', background: '#6366F1', color: '#FFFFFF', border: 'none', borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>Submit Answer</button>
            </div>
          </div>
        </div>
      );
    default: // Analytics
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8FAFC' }}>
          <div style={{ height: 32, background: '#FFFFFF', borderBottom: '1px solid rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#0F172A' }}>Subject-wise Diagnostic Analytics</span>
            <span style={{ fontSize: 10, color: '#10B981', fontWeight: 700 }}>Calculated Live</span>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flexGrow: 1, justifyContent: 'center' }}>
            {[
              { topic: 'Number Theory', val: 92, status: 'Strong', color: '#6366F1' },
              { topic: 'Combinatorics', val: 68, status: 'Normal', color: '#EF4444' },
              { topic: 'Geometry & Areas', val: 84, status: 'Improving', color: '#10B981' }
            ].map(an => (
              <div key={an.topic} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: 10, borderRadius: 10, border: '1px solid rgba(15,23,42,0.04)' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1E293B' }}>{an.topic}</div>
                  <div style={{ height: 4, width: 100, background: '#E2E8F0', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${an.val}%`, background: an.color, borderRadius: 2 }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: an.color }}>{an.val}%</div>
                  <div style={{ fontSize: 8, color: '#94A3B8', fontWeight: 600 }}>{an.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

// ==============================================================
// 2. MAIN SHOWCASE SECTION COMPONENT
// ==============================================================
export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0); // 0: Parent, 1: Teacher, 2: Olympiad
  const [parentIndex, setParentIndex] = useState(0);
  const [teacherIndex, setTeacherIndex] = useState(0);
  const [olympiadIndex, setOlympiadIndex] = useState(0);

  // Auto transition parent/teacher/olympiad sub-screens
  useEffect(() => {
    const t = setInterval(() => {
      if (activeTab === 0) setParentIndex(p => (p + 1) % 4);
      else if (activeTab === 1) setTeacherIndex(p => (p + 1) % 3);
      else setOlympiadIndex(p => (p + 1) % 3);
    }, 4500);
    return () => clearInterval(t);
  }, [activeTab]);

  return (
    <section id="showcase" className="section" style={{ background: '#fafafc', position: 'relative', overflow: 'hidden', padding: '140px 0' }}>
      
      {/* Background layer: Subtle warm glow */}
      <div style={{
        position: 'absolute',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.02) 0%, transparent 70%)',
        top: '20%',
        left: '15%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="showcase-header">
          <FadeUp><div className="showcase-eyebrow">THEMENTR ECOSYSTEM</div></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="showcase-title">
              One ecosystem.<br />Three connected experiences.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="showcase-subtitle">
              From learning at home to classroom management and monthly academic benchmarking, every experience is designed to work together.
            </p>
          </FadeUp>

          {/* Premium Segmented Controls Tabs */}
          <FadeUp delay={0.2}>
            <div className="showcase-tabs">
              <button onClick={() => setActiveTab(0)} className={`showcase-tab ${activeTab === 0 ? 'active' : ''}`}>Parent App</button>
              <button onClick={() => setActiveTab(1)} className={`showcase-tab ${activeTab === 1 ? 'active' : ''}`}>Teacher App</button>
              <button onClick={() => setActiveTab(2)} className={`showcase-tab ${activeTab === 2 ? 'active' : ''}`}>Olympiad</button>
            </div>
          </FadeUp>
        </div>

        {/* ============================================================== */}
        {/* TAB 0: PARENT APP SHOWCASE */}
        {/* ============================================================== */}
        {activeTab === 0 && (
          <div className="showcase-content-grid animate-crossfade">
            
            {/* Storytelling details */}
            <div className="showcase-details-col">
              <h3 className="details-title">Know exactly how your child is learning.</h3>
              <p className="details-desc">
                Track attendance, monitor progress, communicate with teachers and stay informed throughout your child's learning journey.
              </p>
              
              <div className="chips-container">
                {['Live Attendance', 'Weekly Reports', 'Teacher Chat', 'Homework', 'Learning Timeline', 'Payments'].map(chip => (
                  <span key={chip} className="feature-chip">{chip}</span>
                ))}
              </div>

              <div className="download-ctas">
                <a href="https://play.google.com/store/apps/details?id=com.mentr.parent" target="_blank" rel="noopener noreferrer" className="download-btn btn-playstore">
                  <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3.01 C5 3.003 5.003 3 5.01 3 C5.344 3 5.767 3.197 6.223 3.567 L17.587 12.822 L6.223 22.078 C5.767 22.448 5.344 22.645 5.01 22.645 C5.003 22.645 5 22.642 5 22.635 V3.01 Z M18.423 13.504 L7.464 22.434 C7.128 22.708 6.782 22.845 6.442 22.845 C6.084 22.845 5.727 22.697 5.385 22.418 L16.906 13.032 C17.387 12.64 17.925 12.164 18.423 13.504 Z M19.467 11.082 L7.464 1.211 C7.128 0.937 6.782 0.8 6.442 0.8 C6.084 0.8 5.727 0.948 5.385 1.227 L16.906 10.613 C17.387 11.005 17.925 11.481 19.467 11.082 Z" />
                  </svg>
                  <span>Google Play</span>
                </a>
                <a href="https://apps.apple.com/in/app/the-mentr/id6758754135" target="_blank" rel="noopener noreferrer" className="download-btn btn-appstore">
                  <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71,19.5 C17.88,20.74 17,21.95 15.66,21.97 C14.32,22 13.89,21.18 12.37,21.18 C10.84,21.18 10.37,21.95 9.1,22 C7.79,22.05 6.8,20.68 5.96,19.47 C4.25,17 2.94,12.45 4.7,9.39 C5.57,7.87 7.13,6.91 8.82,6.88 C10.1,6.86 11.32,7.75 12.11,7.75 C12.89,7.75 14.37,6.68 15.92,6.84 C16.57,6.87 18.39,7.1 19.56,8.82 C19.47,8.88 17.39,10.1 17.41,12.63 C17.44,15.65 20.06,16.66 20.1,16.67 C20.08,16.74 19.67,18.11 18.71,19.5 M15.97,4.17 C16.63,3.37 17.07,2.28 16.95,1 C16,1.04 14.9,1.6 14.24,2.38 C13.68,3.04 13.19,4.14 13.34,5.39 C14.39,5.47 15.4,4.88 15.97,4.17 Z" />
                  </svg>
                  <span>App Store</span>
                </a>
              </div>
            </div>
            
            {/* Phone Mockup Column */}
            <div className="showcase-mockup-col">
              <div className="phone-mockup-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  {/* Dynamic Transition Wrapper */}
                  <div key={parentIndex} className="animate-screen">
                    <ParentScreen index={parentIndex} />
                  </div>
                </div>
              </div>
              <div className="mockup-nav-dots">
                {[0, 1, 2, 3].map(i => (
                  <button key={i} onClick={() => setParentIndex(i)} className={`mockup-dot ${parentIndex === i ? 'active' : ''}`} />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: TEACHER APP SHOWCASE */}
        {/* ============================================================== */}
        {activeTab === 1 && (
          <div className="showcase-content-grid animate-crossfade">
            
            {/* Storytelling details */}
            <div className="showcase-details-col">
              <h3 className="details-title" style={{ color: '#1E293B' }}>Everything a modern educator needs.</h3>
              <p className="details-desc">
                Manage students, schedule classes, track attendance, assign homework and monitor progress from one powerful application.
              </p>
              
              <div className="chips-container">
                {['Attendance', 'Scheduling', 'Student Notes', 'Homework', 'Reports', 'Earnings'].map(chip => (
                  <span key={chip} className="feature-chip">{chip}</span>
                ))}
              </div>

              <div className="download-ctas">
                <a href="https://play.google.com/store/apps/details?id=com.mentr.teacher" target="_blank" rel="noopener noreferrer" className="download-btn btn-playstore">
                  <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3.01 C5 3.003 5.003 3 5.01 3 C5.344 3 5.767 3.197 6.223 3.567 L17.587 12.822 L6.223 22.078 C5.767 22.448 5.344 22.645 5.01 22.645 C5.003 22.645 5 22.642 5 22.635 V3.01 Z M18.423 13.504 L7.464 22.434 C7.128 22.708 6.782 22.845 6.442 22.845 C6.084 22.845 5.727 22.697 5.385 22.418 L16.906 13.032 C17.387 12.64 17.925 12.164 18.423 13.504 Z M19.467 11.082 L7.464 1.211 C7.128 0.937 6.782 0.8 6.442 0.8 C6.084 0.8 5.727 0.948 5.385 1.227 L16.906 10.613 C17.387 11.005 17.925 11.481 19.467 11.082 Z" />
                  </svg>
                  <span>Google Play</span>
                </a>
                <a href="https://apps.apple.com/in/app/mentr-teacher/id6755221229" target="_blank" rel="noopener noreferrer" className="download-btn btn-appstore">
                  <svg className="cta-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71,19.5 C17.88,20.74 17,21.95 15.66,21.97 C14.32,22 13.89,21.18 12.37,21.18 C10.84,21.18 10.37,21.95 9.1,22 C7.79,22.05 6.8,20.68 5.96,19.47 C4.25,17 2.94,12.45 4.7,9.39 C5.57,7.87 7.13,6.91 8.82,6.88 C10.1,6.86 11.32,7.75 12.11,7.75 C12.89,7.75 14.37,6.68 15.92,6.84 C16.57,6.87 18.39,7.1 19.56,8.82 C19.47,8.88 17.39,10.1 17.41,12.63 C17.44,15.65 20.06,16.66 20.1,16.67 C20.08,16.74 19.67,18.11 18.71,19.5 M15.97,4.17 C16.63,3.37 17.07,2.28 16.95,1 C16,1.04 14.9,1.6 14.24,2.38 C13.68,3.04 13.19,4.14 13.34,5.39 C14.39,5.47 15.4,4.88 15.97,4.17 Z" />
                  </svg>
                  <span>App Store</span>
                </a>
              </div>
            </div>
            
            {/* Phone Mockup Column */}
            <div className="showcase-mockup-col">
              <div className="phone-mockup-frame" style={{ border: '10px solid #1E293B' }}>
                <div className="phone-notch" />
                <div className="phone-screen">
                  {/* Dynamic Transition Wrapper */}
                  <div key={teacherIndex} className="animate-screen">
                    <TeacherScreen index={teacherIndex} />
                  </div>
                </div>
              </div>
              <div className="mockup-nav-dots">
                {[0, 1, 2].map(i => (
                  <button key={i} onClick={() => setTeacherIndex(i)} className={`mockup-dot ${teacherIndex === i ? 'active' : ''}`} />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: THEMENTR OLYMPIAD SHOWCASE */}
        {/* ============================================================== */}
        {activeTab === 2 && (
          <div className="showcase-content-grid animate-crossfade" style={{ gridTemplateColumns: '1fr 1.3fr' }}>
            
            {/* Storytelling details */}
            <div className="showcase-details-col">
              <h3 className="details-title">Compete. Measure. Improve.</h3>
              <p className="details-desc">
                TheMentR Olympiad is a monthly assessment platform that helps students benchmark their academic progress, discover learning gaps and earn recognition for consistent improvement.
              </p>
              
              <div className="chips-container">
                {['Monthly Olympiads', 'Performance Analytics', 'National Rankings', 'Certificates', 'Rewards', 'Progress Tracking', 'Leaderboards', 'Subject-wise Reports'].map(chip => (
                  <span key={chip} className="feature-chip">{chip}</span>
                ))}
              </div>

              <div className="download-ctas">
                <button onClick={() => window.location.href = '/contact'} className="btn-olympiad-primary">
                  Register for Olympiad
                </button>
                <button onClick={() => window.location.href = '/blogs'} className="btn-olympiad-secondary">
                  Explore Platform
                </button>
              </div>
            </div>
            
            {/* Laptop Mockup Column */}
            <div className="showcase-mockup-col">
              <div className="laptop-mockup-frame">
                <div className="laptop-screen-bezel">
                  <div className="laptop-screen-content">
                    {/* Dynamic Transition Wrapper */}
                    <div key={olympiadIndex} className="animate-screen" style={{ height: '100%' }}>
                      <OlympiadScreen index={olympiadIndex} />
                    </div>
                  </div>
                </div>
                <div className="laptop-keyboard-base" />
              </div>
              <div className="mockup-nav-dots" style={{ marginTop: 24 }}>
                {[0, 1, 2].map(i => (
                  <button key={i} onClick={() => setOlympiadIndex(i)} className={`mockup-dot ${olympiadIndex === i ? 'active' : ''}`} />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* ECOSYSTEM CONNECTOR FLOW DIAGRAM */}
        {/* ============================================================== */}
        <FadeUp>
          <div className="ecosystem-connector-wrapper">
            <h3 className="connector-title">One connected learning journey</h3>
            
            <div className="connector-flow-responsive">
              {[
                { label: 'Parent App', desc: 'Track & Monitor' },
                { label: 'Teacher App', desc: 'Manage & Plan' },
                { label: 'TheMentR Olympiad', desc: 'Measure & Compete' },
                { label: 'AVSAR Intelligence', desc: 'Analyze & Predict', highlighted: true },
                { label: 'Better Learning Outcomes', desc: 'The Ultimate Goal', success: true }
              ].map((node, i) => (
                <div key={node.label} className="connector-node-wrapper">
                  {i > 0 && (
                    <div className="connector-arrow-line">
                      <svg viewBox="0 0 40 40" fill="none" style={{ width: '40px', height: '40px' }} className="connector-arrow-svg">
                        <path d="M10 20 H30 M22 12 L30 20 L22 28" stroke="#4F7CFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div className={`connector-node ${node.highlighted ? 'node-highlight' : ''} ${node.success ? 'node-success' : ''}`}>
                    <h5 className="node-title">{node.label}</h5>
                    <p className="node-desc">{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

      </div>

      {/* Premium Showcase Stylesheet */}
      <style>{`
        /* Header styling */
        .showcase-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 48px;
        }
        .showcase-eyebrow {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #6366F1;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .showcase-title {
          font-family: var(--font-hero);
          font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .showcase-subtitle {
          font-family: var(--font-sans);
          font-size: 16px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        /* Segmented control tabs */
        .showcase-tabs {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.04);
          border: 1px solid rgba(15, 23, 42, 0.05);
          padding: 6px;
          border-radius: 99px;
          gap: 4px;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .showcase-tab {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          color: #64748B;
          padding: 10px 24px;
          border-radius: 99px;
          border: none;
          cursor: pointer;
          background: transparent;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .showcase-tab.active {
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.15);
        }

        /* Tab switching layouts */
        .showcase-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-top: 24px;
        }
        
        .showcase-details-col {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .details-title {
          font-family: var(--font-hero);
          font-size: clamp(24px, 2.2vw, 32px);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.25;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }
        .details-desc {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #64748B;
          line-height: 1.7;
          margin: 0 0 28px;
        }
        
        /* Feature Chips */
        .chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }
        .feature-chip {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.06);
          padding: 8px 16px;
          border-radius: 99px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.01);
          transition: all 0.2s ease;
          cursor: default;
        }
        .feature-chip:hover {
          border-color: rgba(79, 124, 255, 0.3);
          transform: translateY(-2px);
          color: #4F7CFF;
        }
        
        /* Download Buttons & CTAs */
        .download-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 99px;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-playstore {
          background: #0F172A;
          color: #FFFFFF;
        }
        .btn-playstore:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15);
        }
        .btn-appstore {
          background: #FFFFFF;
          color: #0F172A;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .btn-appstore:hover {
          transform: translateY(-2px);
          background: #F8FAFC;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }
        .cta-icon {
          width: 16px;
          height: 16px;
        }
        
        .btn-olympiad-primary {
          padding: 13px 28px;
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 99px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.15);
          transition: all 0.25s ease;
        }
        .btn-olympiad-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(79, 124, 255, 0.22);
        }
        .btn-olympiad-secondary {
          padding: 13px 28px;
          background: #FFFFFF;
          color: #0F172A;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 99px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
          transition: all 0.25s ease;
        }
        .btn-olympiad-secondary:hover {
          transform: translateY(-2px);
          background: #F8FAFC;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        /* Mockup Column and navigation */
        .showcase-mockup-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* Phone mockup frame */
        .phone-mockup-frame {
          position: relative;
          width: 260px;
          height: 530px;
          background: #0F172A;
          border: 10px solid #1E293B;
          border-radius: 40px;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.15), 
                      inset 0 4px 6px rgba(255, 255, 255, 0.15);
          overflow: hidden;
          animation: deviceFloat 6s ease-in-out infinite;
        }
        .phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 18px;
          background: #1E293B;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          z-index: 10;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          background: #FFFFFF;
          position: relative;
          overflow: hidden;
          padding-top: 24px;
        }

        /* Laptop mockup frame */
        .laptop-mockup-frame {
          position: relative;
          width: 100%;
          max-width: 540px;
          animation: deviceFloat 6s ease-in-out infinite;
        }
        .laptop-screen-bezel {
          background: #0F172A;
          border: 10px solid #1E293B;
          border-radius: 14px 14px 0 0;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.2);
          aspect-ratio: 16 / 10;
          overflow: hidden;
          position: relative;
        }
        .laptop-screen-content {
          width: 100%;
          height: 100%;
          background: #FAFAFC;
        }
        .laptop-keyboard-base {
          height: 10px;
          background: #E2E8F0;
          border-radius: 0 0 16px 16px;
          border-top: 1.5px solid #CBD5E1;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Mockup dot indicators */
        .mockup-nav-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }
        .mockup-dot {
          width: 6px;
          height: 6px;
          border-radius: '50%';
          border: none;
          background: #CBD5E1;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .mockup-dot.active {
          background: #6366F1;
          width: 16px;
          border-radius: 3px;
        }

        /* Device floating animation */
        @keyframes deviceFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* Fade-in screen transition */
        .animate-screen {
          animation: screenScaleFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          height: 100%;
        }
        @keyframes screenScaleFade {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1.0); }
        }

        .animate-crossfade {
          animation: crossFadeIn 0.3s ease-in-out forwards;
        }
        @keyframes crossFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Ecosystem Connector Flow */
        .ecosystem-connector-wrapper {
          margin-top: 100px;
          border-top: 1px solid rgba(15, 23, 42, 0.05);
          padding-top: 80px;
          text-align: center;
        }
        .connector-title {
          font-family: var(--font-hero);
          font-size: 24px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 40px;
        }
        .connector-flow-responsive {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .connector-node-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .connector-node {
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.06);
          padding: 16px 24px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.015);
          text-align: left;
        }
        .node-highlight {
          border-color: #6366F1;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.08);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(99, 102, 241, 0.05) 100%);
        }
        .node-success {
          border-color: #10B981;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.08);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.02) 0%, rgba(16, 185, 129, 0.05) 100%);
        }
        .node-title {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }
        .node-desc {
          font-family: var(--font-sans);
          font-size: 11px;
          color: #64748B;
          margin: 4px 0 0;
        }
        .connector-arrow-line {
          display: flex;
          align-items: center;
        }

        /* RESPONSIVE LAYOUTS */
        @media (max-width: 1024px) {
          .showcase-content-grid {
            gap: 40px;
          }
          .laptop-mockup-frame {
            max-width: 440px;
          }
        }
        
        @media (max-width: 768px) {
          .showcase-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 4px;
            margin-bottom: 32px;
            width: 100%;
            max-width: 100%;
            scrollbar-width: none;
          }
          .showcase-tabs::-webkit-scrollbar {
            display: none;
          }
          .showcase-tab {
            flex-shrink: 0;
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .showcase-content-grid {
            grid-template-columns: 1fr !important;
            gap: 40px;
            text-align: center;
          }
          .showcase-details-col {
            text-align: center;
            align-items: center;
          }
          .chips-container {
            justify-content: center;
          }
          .download-ctas {
            justify-content: center;
          }
          
          .connector-flow-responsive {
            flex-direction: column;
            gap: 20px;
          }
          .connector-node-wrapper {
            flex-direction: column;
            width: 100%;
            align-items: center;
          }
          .connector-arrow-line {
            transform: rotate(90deg);
            margin: 8px 0;
          }
          .connector-node {
            width: 100%;
            max-width: 280px;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
