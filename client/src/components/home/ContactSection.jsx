import { useState, useEffect } from 'react';
import { FadeUp } from '../../hooks/useScrollReveal';
import BorderGlow from './BorderGlow';

const defaultFaqs = [
  { q: 'Who can apply to become a teacher with TheMentR?', a: 'Any individual holding a minimum qualification of 10+2, ITI, Diploma, or higher degrees (B.Sc., B.Ed., M.Ed., M.Sc., M.Tech, LLB, M. Com., BA, MA, B.Com., PhD, etc.) may apply. Recruitment is skill-based and inclusive; both freshers and experienced educators are welcome.', category: 'Teachers' },
  { q: 'How do students join TheMentR?', a: 'Students or parents can register via the TheMentR website or app by entering basic information (name, contact, grade, subjects required) and verifying their contact details through OTP or email.', category: 'Students' },
  { q: 'What is TheMentR and how does it work?', a: 'TheMentR is a digital platform designed to connect students and parents with fully verified, qualified tuition teachers for KG to PG levels, offering both online and offline sessions through a secure and transparent marketplace.', category: 'Parents' },
  { q: 'What subscription plans are available for institutions?', a: 'Institutions can purchase annual subscription plans at nominal rates, paying a one-time fee for one academic year. The subscription allows them to recruit visiting faculty through TheMentR on a per class fee basis without additional costs during the subscription period.', category: 'Institutions' }
];

const faqsData = {
  teachers: [
    { q: 'Who can apply to become a teacher with TheMentR?', a: 'Any individual holding a minimum qualification of 10+2, ITI, Diploma, or higher degrees (B.Sc., B.Ed., M.Ed., M.Sc., M.Tech, LLB, M. Com., BA, MA, B.Com., PhD, etc.) may apply. Recruitment is skill-based and inclusive; both freshers and experienced educators are welcome.' },
    { q: 'What is the process to register as a teacher on TheMentR?', a: 'Registration is completed via the TheMentR web/mobile app, requiring basic contact details and OTP verification. You must upload official ID, educational certificates and a Bio-data/ CV. After registration, TheMentR conducts document verification, a demo lesson or virtual interview and reference/ background checks before onboarding.' },
    { q: 'How does TheMentR verify teachers’ credibility?', a: 'Every teacher undergoes multi-layered verification, including government ID and qualification authentication, criminal background screening, demo teaching session/ interview assessment, reference checks, probation/ trial period and continuous quality monitoring. Annual re-verification is mandatory.' },
    { q: 'How will I be paid for my classes?', a: 'Teachers receive structured monthly payments directly to their bank accounts on a fixed date each month. Payment is calculated per class attended and reflected in digital payslips, with all statutory deductions (PT, IT TDS etc.) as per law.' },
    { q: 'Does TheMentR provide payslips and statutory benefits?', a: 'Yes. Teachers receive detailed payslips showing gross pay, deductions and net pay. Confirmed teachers benefit from professional tax and additional allowances after confirmation from probation status.' },
    { q: 'Is my income capped or fixed?', a: 'No. TheMentR offers a performance-based, “more work, more pay” model with no income capping. Pay-outs can range depending on the number of classes and student loaded.' },
    { q: 'What extra benefits do TheMentR teachers receive?', a: 'TheMentR provides group insurance, mobile phone allowance, reward bonuses, banking assistance (such as loan eligibility and credit cards) and employment identity like TheMentR verified badge and Experience Certificate. These are in addition to regular pays and statutory benefits.' },
    { q: 'Is there job security for TheMentR teachers?', a: 'Teachers appointed on the platform have contractual agreements in shape of an LoA along with applicable T & C detailing payment, duty, benefits and difficult removal processes (except under performance/ complaint scenarios). Probation is followed by confirmed appointment and enhanced benefits.' },
    { q: 'Can I become a verified teacher even if I am currently a student?', a: 'Yes. TheMentR allows students who have passed 10+2, ITI or Diploma to begin part-time teaching, provided they meet verification and demonstrate sufficient skill/ performance.' },
    { q: 'Can I choose my own subjects, location and schedule?', a: 'Yes. Teachers specify preferred subjects, grades and timing during registration. The AI-based platform matches student requirements with teachers based on skill, availability, location and fee structure.' },
    { q: 'How is my performance tracked?', a: 'Student feedback and ratings are collected after every session. Regular monitoring, surprise checks and periodic re-verification ensure on-going quality improvement and determine eligibility for higher pay or continued association with TheMentR.' },
    { q: 'What support does TheMentR provide during onboarding and teaching?', a: 'Dedicated support teams help teachers during onboarding, document verification and with any operational queries. Teachers can submit suggestions, grievances and receive prompt assistance through a structured escalation workflow.' },
    { q: 'What if I face delayed payment or any disputes?', a: 'All payments are managed digitally and scheduled monthly. Any issues can be escalated to customer support for rapid resolution with formal contracts and digital audit trails ensuring protection of teacher rights.' },
    { q: 'Is there opportunity for growth or recognition?', a: 'Performance-based bonuses, rewards and higher compensation tiers are available for teachers with superior ratings and verified experience. Referral programs offer cash and subscription bonuses for onboarding peers; featured teachers may also be promoted in platform marketing.' }
  ],
  students: [
    { q: 'How do students join TheMentR?', a: 'Students or parents can register via the TheMentR website or app by entering basic information (name, contact, grade, subjects required) and verifying their contact details through OTP or email.' },
    { q: 'Is there a verification process for student registration?', a: 'Yes, contact authenticity is verified using OTP/ email and profiles are created with academic, scheduling and location preferences for optimal tutor matching.' },
    { q: 'How does TheMentR ensure the quality and safety of tutors?', a: 'TheMentR uses a rigorous multi-layered verification process: government ID, qualification certificates, background checks, demo lesson/ video, live interviews, reference checks and ongoing feedback monitoring. Only teachers passing all these checks and verified through this process are on-boarded.' },
    { q: 'Can students review their tutors or provide feedback?', a: 'Absolutely. After each session, students and parents are encouraged to rate and review their tutors, helping maintain continuous quality assurance.' },
    { q: 'Is the payment process safe and transparent?', a: 'Yes, all payments are made securely through the TheMentR platform, with no cash transactions. Fees are held until the session is completed and detailed invoices are provided. The fee structure is transparent and payable per month depending on tutor experience, sessions conducted and student requirements.' },
    { q: 'What payment options are available?', a: 'Parents and students can pay using various digital methods—UPI, credit/debit cards, net banking and digital wallets. Cash payments are not accepted for added security and compliance.' },
    { q: 'What subjects and grades are covered?', a: 'TheMentR offers tutoring for all subjects from Class 1 to Class 12, including board exam and entrance prep, delivered both online and offline (conditional). Students are matched with tutors based on subject, grade, location and personal requirements using AI-enabled matching technology.' },
    { q: 'Is there flexibility in scheduling classes?', a: 'Yes, students and parents can schedule classes weekly or monthly as per convenience, with easy online booking and full transparency.' },
    { q: 'Is support available during the learning process?', a: '24-hour support channels are provided for queries, grievances, feedback and plan changes. Progress reports and regular tests are delivered via the dashboard and app.' },
    { q: 'Can students try a tutor before committing?', a: 'TheMentR offers no free trial classes or discounted first sessions to new students as TheMentR believes in its teachers’ potential & performance. Every teacher at TheMentR is trusted and verified thereby allowing you to experience the platform risk-free before making a long-term commitment.' },
    { q: 'How is TheMentR different from other tutor platforms?', a: 'TheMentR stands out for its strict teacher verification, structured payments (with social benefits for teachers), no exploitation or hidden fees, inclusivity for a wide range of teachers and a commitment to TRUTH, TRUST and TRANSPARENCY. Importantly, feedback, progress tracking and grievance redressal are systematized, unlike informal models in the market. TheMentR has been carefully crafted to address the main concerns and expectations of students and parents. TheMentR ensures a transparent, secure and value-driven private tutoring experience.' }
  ],
  parents: [
    { q: 'What is TheMentR and how does it work?', a: 'TheMentR is a digital platform designed to connect students and parents with fully verified, qualified tuition teachers for KG to PG levels, offering both online and offline sessions through a secure and transparent marketplace.' },
    { q: 'Who operates TheMentR?', a: 'TheMentR is managed by BUDIN Candor Pvt. Ltd., with strong policies on trust, verification and service transparency at every step.' },
    { q: 'How are TheMentR teachers verified?', a: 'Every teacher undergoes multi-step verification, including ID and qualification checks, background records checks, demo lessons, live interviews, references and ongoing annual re-verification. Ratings and parent/ student reviews drive continuous quality assurance.' },
    { q: 'Can parents trust the teachers assigned to their child?', a: 'Yes, only those who pass strict verification, regular reviews and demonstration of teaching skills are allowed to join or remain active on the TheMentR platform.' },
    { q: 'What is the fee range for tuition through TheMentR?', a: 'TheMentR offers a wide, pocket-friendly fee structure starting at ₹1,499 per month and going up to ₹9,999 per month that too including all taxes, cess and platform fees, allowing parents of all socio-economic strata to choose a plan within their capacity without hidden charges or exploitation.' },
    { q: 'How are payments handled?', a: 'All payments are made securely through digital channels (UPI, cards, wallets), guaranteeing that money is only released after successful completion of tutoring sessions.' },
    { q: 'Are there any additional charges?', a: 'Fees include standard GST (18%) and platform charges (2%), ensuring transparency for every transaction.' },
    { q: 'How do parents register for or book a tutor?', a: 'Registration is fully digital through the TheMentR app or website. Parents provide basic contact info, student details and academic requirements and then receive AI-powered tutor recommendations based on subject, class, location and budget preferences.' },
    { q: 'Can parents review or change their assigned tutor?', a: 'After each session, parents and students can rate and review tutors. If unsatisfied, a new tutor can be recommended within 7 days and the platform provides continuous feedback support.' },
    { q: 'What makes TheMentR different from other tutoring sites?', a: 'TheMentR uniquely offers verified tutors, structured payments, teacher social security benefits (EPF/ ESI), transparent contracts and robust grievance redressal—ensuring safety, transparency and true value for money.' },
    { q: 'Is there a risk-free way to try out TheMentR?', a: 'Parents may call on 9861047800 or Whatsapp on 9861047801 or may visit www.thementr.com or may email to contact@thementr.com to have clarity on mentorship quality and platform features before committing to any payment plan.' },
    { q: 'What if there is a problem during the learning journey?', a: 'TheMentR has a 24-hour grievance and support response system. Parents can contact the support team via the app, messaging or email for any issues, suggestions or help.' },
    { q: 'What are the additional benefits which make TheMentR different from the others?', a: '• Real-time syllabus tracking and progress reports\n• Frequent assessments and AI-driven evaluation\n• Option to choose learning mode, timing, teacher and fee structure\n• Digital safety, privacy and trust at all stages' }
  ],
  institutions: [
    { q: 'How can institutions register on the TheMentR platform?', a: 'Institutions can register via the TheMentR web by providing basic details and choosing a subscription plan. After registration, they can submit teacher requirements anytime within their subscription period.' },
    { q: 'What are the steps involved after registration?', a: 'After registration, institutions submit their teaching requirements based on subjects, classes, fees, location and timing. TheMentR uses AI-based matching to connect the institution with qualified, verified teachers. Interview schedules are coordinated, and teachers are appointed as visiting faculty based on terms agreed with TheMentR.' },
    { q: 'What subscription plans are available for institutions?', a: 'Institutions can purchase annual subscription plans at nominal rates, paying a one-time fee for one academic year. The subscription allows them to recruit visiting faculty through TheMentR on a per class fee basis without additional costs during the subscription period.' },
    { q: 'Are there any hidden or additional charges?', a: 'No hidden costs. Institutions pay a transparent annual subscription fee that covers the entire year’s teacher sourcing and appointment services.' },
    { q: 'How does TheMentR source teachers for institutions?', a: 'TheMentR recruits verified teachers through a structured recruitment plan including background checks, document verification, demo lessons and interviews. Teachers are categorized by qualification and experience to match institution requirements precisely.' },
    { q: 'Can institutions specify requirements for part-time or full-time teachers?', a: 'Yes, institutions can specify preferences for part-time or full-time visiting faculty in terms of subjects, class levels, fees and location.' },
    { q: 'How does TheMentR ensure the quality of teachers?', a: 'TheMentR performs multi-step verification including government ID checks, educational credential verification, background screening, demo teaching assessments, reference checks, trial periods and ongoing quality monitoring via student feedback and periodic reverification.' },
    { q: 'What happens if a teacher’s performance is unsatisfactory?', a: 'TheMentR continuously monitors ratings and reviews. Teachers with poor ratings are reverified or removed. Institutions also have access to real-time grading and progress tracking to ensure teaching quality.' },
    { q: 'How are payments managed between institutions and TheMentR?', a: 'There are flexible options for the Institutions for payments. Institutions may pay TheMentR monthly on a per class basis for visiting faculty appointed through the platform or may take any applicable monthly/ quarterly/ half yearly/ annual subscription plan to ensure transparency and timely disbursement to the teachers.' },
    { q: 'Are there structured payments for the teachers?', a: 'Yes, teachers receive monthly structured payouts with formal contracts, payslips and social security benefits including EPF and ESI contributions.' },
    { q: 'What support does TheMentR offer to institutions?', a: 'TheMentR provides dedicated customer service for onboarding assistance, grievance redressal, schedule coordination and quality concerns. Institutions have access to progress reports, AI-powered matching support and regular communication updates.' },
    { q: 'Can institutions request teacher substitutions if needed?', a: 'Yes, TheMentR offers teacher substitution within 7 days if a teacher leaves mid-session, ensuring uninterrupted teaching services.' }
  ]
};

export default function ContactSection({ background = 'white' }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [viewMore, setViewMore] = useState(false);
  const [selectedSection, setSelectedSection] = useState('teachers');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const finalBg = background === 'white' ? '#fafafc' : background;

  const toggleFaq = (key) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <section id="contact-section" className="section" style={{ background: finalBg, padding: isMobile ? '60px 0' : '120px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80 }} className="contact-grid-responsive">
          <FadeUp>
            <div>
              <div className="eyebrow">Contact</div>
              <h2 style={{ fontSize: isMobile ? 28 : 36, marginBottom: 12, marginTop: 0 }}>We're here to help.</h2>
              <p style={{ fontSize: isMobile ? 14 : 16, color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: isMobile ? 24 : 40 }}>Whether you have a question about our services, our team responds within one business day.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '📧', label: 'Email', value: 'contact@thementr.com' },
                  { icon: '📞', label: 'Phone', value: '+91 96685 62631 (Available 24/7)' },
                  { icon: '📞', label: 'Toll Free', value: '1800 889 2388 (9:30 AM to 5:30 PM)' },
                  { icon: '📍', label: 'Headquartered in', value: 'Plot no. 2937/6463, Saptasati Vihar, Palasuni, Bhubaneswar, Odisha 751025' },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: 'linear-gradient(135deg, var(--color-blue-light) 0%, rgba(220,232,255,0.7) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(79,124,255,0.08), inset 0 1px 1px rgba(255,255,255,0.8)',
                      border: '1px solid rgba(79,124,255,0.12)'
                    }}>{c.icon}</div>
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: 2 }}>{c.label}</h5>
                      <p style={{ fontSize: 15, color: 'var(--color-text-primary)', margin: 0, wordBreak: 'break-word' }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <BorderGlow
                borderRadius={20}
                backgroundColor="#FFFFFF"
                style={{ marginTop: 32, overflow: 'hidden' }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5292.447848159905!2d85.86468450667138!3d20.306181982195294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190b5211172741%3A0xd48005ed35a54455!2sTheMentR!5e0!3m2!1sen!2sin!4v1783924246452!5m2!1sen!2sin" 
                  width="100%" 
                  height="250" 
                  style={{ border: 0, display: 'block' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </BorderGlow>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div>
              <h3 style={{ fontSize: 24, marginBottom: 24, marginTop: isMobile ? 0 : 42 }}>Frequently Asked Questions</h3>
              
              {!viewMore ? (
                /* Initial view with 4 questions, one from each category */
                <div>
                  {defaultFaqs.map((f, i) => (
                    <div key={`def-${i}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <div 
                        onClick={() => toggleFaq(`def-${i}`)} 
                        style={{ 
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', cursor: 'pointer', fontSize: 15, fontWeight: 600, 
                          color: openFaq === `def-${i}` ? 'var(--color-blue)' : 'var(--color-text-primary)', transition: 'color 0.3s' 
                        }}
                      >
                        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#7469F8', letterSpacing: '0.05em' }}>For {f.category}</span>
                          <span>{f.q}</span>
                        </span>
                        <span style={{
                          width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, transition: 'all 0.3s',
                          background: openFaq === `def-${i}` ? 'var(--color-blue)' : '#F6F8FD',
                          border: `1px solid ${openFaq === `def-${i}` ? 'var(--color-blue)' : 'var(--color-border)'}`,
                          color: openFaq === `def-${i}` ? 'white' : 'inherit',
                          transform: openFaq === `def-${i}` ? 'rotate(45deg)' : 'none',
                        }}>+</span>
                      </div>
                      <div style={{ 
                        fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.75, 
                        maxHeight: openFaq === `def-${i}` ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease', 
                        paddingBottom: openFaq === `def-${i}` ? 16 : 0 
                      }}>
                        {f.a}
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => { setViewMore(true); setOpenFaq(null); }}
                    className="btn-view-more-faqs"
                    style={{
                      marginTop: 24,
                      background: 'transparent',
                      border: '1px solid rgba(79, 124, 255, 0.3)',
                      borderRadius: 99,
                      color: '#4F7CFF',
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 24px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'var(--font-sans)',
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    View More FAQs →
                  </button>
                </div>
              ) : (
                /* Card view with section by section navigation */
                <BorderGlow borderRadius={20} backgroundColor="#FFFFFF">
                  <div style={{ padding: '24px 20px' }}>
                    {/* Category tabs */}
                    <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid rgba(79,124,255,0.08)', pb: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                      {[
                        { id: 'teachers', label: 'Teachers' },
                        { id: 'students', label: 'Students' },
                        { id: 'parents', label: 'Parents' },
                        { id: 'institutions', label: 'Institutions' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => { setSelectedSection(tab.id); setOpenFaq(null); }}
                          style={{
                            background: selectedSection === tab.id ? 'rgba(79, 124, 255, 0.08)' : 'transparent',
                            border: 'none',
                            borderRadius: 16,
                            padding: '6px 14px',
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: selectedSection === tab.id ? '#4F7CFF' : '#5D677A',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-sans)',
                            transition: 'all 0.2s'
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* FAQ questions based on selection */}
                    <div style={{ maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}>
                      {faqsData[selectedSection].map((f, i) => (
                        <div key={`${selectedSection}-${i}`} style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <div 
                            onClick={() => toggleFaq(`${selectedSection}-${i}`)} 
                            style={{ 
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, 
                              color: openFaq === `${selectedSection}-${i}` ? 'var(--color-blue)' : 'var(--color-text-primary)', transition: 'color 0.3s' 
                            }}
                          >
                            <span style={{ textAlign: 'left', paddingRight: 12 }}>{f.q}</span>
                            <span style={{
                              width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0, transition: 'all 0.3s',
                              background: openFaq === `${selectedSection}-${i}` ? 'var(--color-blue)' : '#F6F8FD',
                              border: `1px solid ${openFaq === `${selectedSection}-${i}` ? 'var(--color-blue)' : 'var(--color-border)'}`,
                              color: openFaq === `${selectedSection}-${i}` ? 'white' : 'inherit',
                              transform: openFaq === `${selectedSection}-${i}` ? 'rotate(45deg)' : 'none',
                            }}>+</span>
                          </div>
                          <div style={{ 
                            fontSize: 13.5, color: 'var(--color-text-secondary)', lineHeight: 1.7, 
                            maxHeight: openFaq === `${selectedSection}-${i}` ? 320 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, padding 0.3s ease', 
                            paddingBottom: openFaq === `${selectedSection}-${i}` ? 14 : 0, whiteSpace: 'pre-line'
                          }}>
                            {f.a}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => { setViewMore(false); setOpenFaq(null); }}
                      style={{
                        marginTop: 20,
                        background: 'none',
                        border: 'none',
                        color: '#5D677A',
                        fontSize: 13.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontFamily: 'var(--font-sans)',
                        width: '100%',
                        textAlign: 'center'
                      }}
                    >
                      ← Back to summary FAQs
                    </button>
                  </div>
                </BorderGlow>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){.contact-grid-responsive{grid-template-columns:1fr!important;gap:40px!important;}}
        .btn-view-more-faqs:hover {
          background: rgba(79, 124, 255, 0.05) !important;
          border-color: #4F7CFF !important;
        }
      `}</style>
    </section>
  );
}
