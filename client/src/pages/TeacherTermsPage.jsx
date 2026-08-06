import { useState, useEffect } from 'react';
import { Scale, Users, UserCheck, Shield, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';

export default function TermsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Resolve tab from path name
  const getTabFromPath = (path) => {
    if (path.includes('privacy')) return 'privacy';
    if (path.includes('parent')) return 'parents';
    return 'teachers';
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  const termsSeo = {
    ...PAGE_SEO.terms,
    title: activeTab === 'privacy'
      ? 'Privacy Policy | TheMentR Legal Center'
      : activeTab === 'parents'
      ? 'Parent Code of Conduct & Terms | TheMentR'
      : 'Teacher Terms of Service & Agreement | TheMentR'
  };

  return (
    <div className="subpage-wrapper" style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F0F5FF 0%, #EBF2FE 100%)', paddingBottom: 100 }}>
      <SEO {...termsSeo} />
      <div className="container" style={{ paddingTop: 40 }}>
        
        {/* Back Button */}
        <button
          onClick={() => {
            const hasHistory = window.history.length > 1 && document.referrer && document.referrer.includes(window.location.host);
            if (hasHistory) {
              navigate(-1);
            } else {
              // Close the new tab and return to the previous main website tab
              window.close();
              // Fallback if window.close() is blocked by the browser
              setTimeout(() => {
                navigate('/');
              }, 150);
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#FFFFFF',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 12,
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 600,
            color: '#1E293B',
            cursor: 'pointer',
            marginBottom: 24,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.04)',
            transition: 'all 0.2s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3B82F6';
            e.currentTarget.style.color = '#3B82F6';
            e.currentTarget.style.transform = 'translateX(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
            e.currentTarget.style.color = '#1E293B';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.04)';
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Page Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: 24,
          padding: '48px 40px',
          color: '#FFFFFF',
          marginBottom: 36,
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59, 130, 246, 0.18)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 100, padding: '6px 16px', fontSize: 13, fontWeight: 600, color: '#60A5FA', marginBottom: 20 }}>
            <Scale size={15} /> BUDIN CANDOR PVT. LTD. LEGAL INFRASTRUCTURE
          </div>

          <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.2, margin: '0 0 12px' }}>
            Terms & Policy Center
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', maxWidth: 740, lineHeight: 1.6, margin: 0 }}>
            Complete, binding legal terms, compliance rules, service level agreements, and operational policies for Teachers and Parents on TheMentR platform.
          </p>

          {/* Segmented Tab Switcher */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('privacy')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 26px',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease',
                background: activeTab === 'privacy' ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                boxShadow: activeTab === 'privacy' ? '0 8px 20px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <Shield size={18} /> Privacy Policy
            </button>

            <button
              onClick={() => setActiveTab('parents')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 26px',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease',
                background: activeTab === 'parents' ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                boxShadow: activeTab === 'parents' ? '0 8px 20px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <Users size={18} /> Parents Terms & Conditions
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 26px',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease',
                background: activeTab === 'teachers' ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                boxShadow: activeTab === 'teachers' ? '0 8px 20px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <UserCheck size={18} /> Teachers Terms & Conditions
            </button>
          </div>
        </div>

        {/* TAB 1: PRIVACY POLICY */}
        {activeTab === 'privacy' && (
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: '48px 40px', border: '1px solid rgba(59, 130, 246, 0.18)', boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.06)', transform: 'translateZ(0)', willChange: 'transform' }}>
            <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: 24, marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                PRIVACY POLICY
              </h2>
              <div style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>
                BUDIN Candor Pvt. Ltd. for TheMentR
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
                Effective Date: December 1, 2025 | Last Updated: December 1, 2025
              </div>
            </div>

            <div style={{ color: '#334155', fontSize: 15, lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
              
              <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginTop: 24, marginBottom: 12 }}>TABLE OF CONTENTS</h4>
              <ol style={{ paddingLeft: 20, marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 14, color: '#475569', fontWeight: 500 }}>
                <li>1. Introduction</li>
                <li>2. Who We Are</li>
                <li>3. Scope and Application</li>
                <li>4. Data We Collect</li>
                <li>5. How We Collect Your Data</li>
                <li>6. Why We Collect and Use Your Data</li>
                <li>7. Children's Privacy Protection</li>
                <li>8. Consent and Legal Basis</li>
                <li>9. Data Sharing and Disclosure</li>
                <li>10. Data Storage and Security</li>
                <li>11. Data Retention</li>
                <li>12. International Data Transfer</li>
                <li>13. Your Rights Under DPDP Act</li>
                <li>14. Cookies and Tracking Technologies</li>
                <li>15. Third-Party Services and Links</li>
                <li>16. Data Breach Notification</li>
                <li>17. Grievance Redressal</li>
                <li>18. Updates to This Policy</li>
                <li>19. Contact Information</li>
                <li>20. Legal Compliance</li>
              </ol>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>1. INTRODUCTION</h3>
              <p>
                Welcome to TheMentR, operated by BUDIN Candor Private Limited ("Company," "we," "us," or "our"). We are committed to protecting your privacy and personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act), Information Technology Act, 2000, and other applicable laws and regulations of India.
                <br />
                This Privacy Policy explains how we collect, use, store, process and protect your personal data when you use our educational technology platform, website (www.thementr.com), mobile application and related services (collectively, the "Platform" or "Services").
                <br /><br />
                By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy and consent to our data processing activities as described herein.
              </p>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>2. WHO WE ARE</h3>
              <p>
                BUDIN Candor Private Limited is a company incorporated under the Companies Act, 2013, with its registered office in Odisha, India. We operate TheMentR, an educational technology platform that connects verified tutors with students from KG to PG levels across India.
                <br />
                Our Brand Tagline: "Where Learning meets its Purpose..."
                <br /><br />
                <strong>Company Details:</strong>
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Registered Name: BUDIN Candor Private Limited</li>
                <li>Brand Name: TheMentR</li>
                <li>Registration: Companies Act, 2013</li>
                <li>Registered Office: 2nd Floor, Plot No. 2937/ 6463, Saptasati Vihar, Near ISA Diagnostic, Bhubaneswar, Khurda, Odisha – 751025. Registration: A company incorporated under the Companies Act, 2013 with REGD No. 051315, PAN - AAOCB1006A, GSTIN - 21AAOCB1006A1ZN</li>
                <li>Contact: Phone – 9861047800, Whatsapp – 9861047801, e-mail – contact@thementr.com</li>
                <li>Website: www.thementr.com</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>3. SCOPE AND APPLICATION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.1 Geographic Scope</h4>
              <p>This Privacy Policy applies to all users of our Platform within India and internationally, particularly those who:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Access our website or mobile application</li>
                <li>Register as teachers or students</li>
                <li>Use our educational services</li>
                <li>Interact with our customer support</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.2 Platform Coverage</h4>
              <p>This policy covers data collection and processing across:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Website: www.thementr.com and associated domains</li>
                <li>Mobile Applications: TheMentR app (iOS and Android)</li>
                <li>Web Application: Tutoring platform</li>
                <li>Related Services: Payment processing, customer support, marketing communications</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.3 Age Restrictions</h4>
              <p>As per the DPDP Act, 2023, individuals under 18 years of age are considered children, and special protections apply to their data. Parental or guardian consent is mandatory for processing children's personal data.</p>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>4. DATA WE COLLECT</h3>
              <p>We collect minimal personal data necessary to provide our educational services effectively and safely.</p>
              
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.1 Personal Information</h4>
              <p><strong>For Teachers:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Full name, contact information (email, phone number, Location)</li>
                <li>Government-issued identification (Aadhaar, PAN, Passport)</li>
                <li>Educational qualifications and certificates</li>
                <li>Professional experience and references</li>
                <li>Bank account details for payments</li>
                <li>Profile photograph and demo lesson videos</li>
                <li>Background verification documents</li>
              </ul>
              <p><strong>For Students/Parents:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Student and parent/ guardian names, photos</li>
                <li>Contact information (email, phone number, Location)</li>
                <li>Student's academic data, school, level and subjects of interest</li>
                <li>ID Verification (Aadhaar, PAN, email, phone)</li>
                <li>Learning preferences and schedule availability</li>
                <li>Payment information for transactions</li>
                <li>Parent/guardian consent for minors</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.2 Sensitive Personal Data</h4>
              <p>In accordance with Indian data protection laws, we may collect:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Financial information (payment details, transaction history)</li>
                <li>Biometric information (for enhanced security, if applicable)</li>
                <li>Educational performance data</li>
                <li>Health information (if relevant to learning requirements)</li>
              </ul>
              <p><em>Note: Sensitive personal data is processed with enhanced security measures and explicit consent.</em></p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.3 Technical Data</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system information</li>
                <li>Usage patterns and session data</li>
                <li>Location data (with consent)</li>
                <li>App performance and crash reports</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.4 Educational Data</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Learning progress and performance metrics</li>
                <li>Assessment results and feedback</li>
                <li>Attendance records for online/offline sessions</li>
                <li>Communication between teachers and students</li>
                <li>Course materials accessed and time spent</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>5. HOW WE COLLECT YOUR DATA</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.1 Direct Collection</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Registration Forms: When you create an account as a teacher, student, or parent</li>
                <li>Profile Setup: During account completion and verification processes</li>
                <li>Payment Processing: When making payments for services</li>
                <li>Communication: Through customer support interactions, surveys and feedback</li>
                <li>Document Upload: During teacher verification or student registration</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.2 Automatic Collection</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Website Analytics: Through cookies and similar technologies</li>
                <li>App Usage: Mobile app interaction patterns and performance data</li>
                <li>Device Information: Technical specifications and settings</li>
                <li>Location Data: With explicit consent for location-based matching</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.3 Third-Party Sources</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Payment Gateways: Transaction verification and fraud prevention</li>
                <li>Background Verification Agencies: For teacher credibility checks</li>
                <li>Educational Institutions: For reference verification (with consent)</li>
                <li>Government Databases: For identity and qualification verification (where legally permitted)</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>6. WHY WE COLLECT AND USE YOUR DATA</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.1 Primary Purposes</h4>
              <p><strong>Service Delivery:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Matching teachers with appropriate students based on subjects, location and preferences</li>
                <li>Facilitating online and offline tutoring sessions</li>
                <li>Processing payments and maintaining transaction records</li>
                <li>Providing customer support and resolving disputes</li>
              </ul>
              <p><strong>Safety and Trust:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Verifying teacher credentials and conducting background checks</li>
                <li>Ensuring child safety and protection protocols</li>
                <li>Monitoring platform usage for inappropriate behavior</li>
                <li>Maintaining quality assurance and user ratings</li>
              </ul>
              <p><strong>Platform Improvement:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Developing new features and improving existing services</li>
                <li>Conducting educational research and performance analysis</li>
                <li>Optimizing matching algorithms and recommendation systems</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.2 Secondary Purposes</h4>
              <p><strong>Marketing and Communication:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Sending service updates and important notifications</li>
                <li>Promotional communications (with consent)</li>
                <li>Educational content and platform news</li>
                <li>Surveys and feedback collection</li>
              </ul>
              <p><strong>Legal and Compliance:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Meeting regulatory requirements and legal obligations</li>
                <li>Preventing fraud and ensuring platform security</li>
                <li>Responding to legal requests and court orders</li>
                <li>Maintaining records for tax and accounting purposes</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>7. CHILDREN'S PRIVACY PROTECTION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.1 DPDP Act Compliance</h4>
              <p>In accordance with the Digital Personal Data Protection Act, 2023, we provide enhanced protection for children (individuals under 18 years of age).</p>
              <p><strong>Key Protections:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Parental Consent: Mandatory verifiable consent from parents or guardians before processing any child's data</li>
                <li>No Behavioral Tracking: We do not engage in behavioral monitoring or profiling of children</li>
                <li>No Targeted Advertising: Children are not subjected to targeted advertisements</li>
                <li>Data Minimization: We collect only essential data necessary for educational services</li>
                <li>Enhanced Security: Additional security measures for children's data protection</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.2 Parental Rights</h4>
              <p>Parents and guardians have the right to:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Access their child's personal data processed by us</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent for data processing</li>
                <li>Request deletion of their child's data</li>
                <li>Receive regular updates about data processing activities</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.3 Verification of Parental Consent</h4>
              <p>We implement robust mechanisms to verify parental consent:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Government-issued ID verification</li>
                <li>Virtual tokens mapped to parental identity</li>
                <li>Secure authentication through trusted platforms</li>
                <li>Regular re-verification processes</li>
                <li>Clear documentation of consent records</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.4 Educational Institution Exemptions</h4>
              <p>As per DPDP Rules 2025, certain educational activities may be exempted from strict consent requirements when processing is necessary for:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Creating user accounts for educational communication</li>
                <li>Ensuring age-appropriate content access</li>
                <li>Confirming user age verification</li>
                <li>Providing educational services in institutional settings</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>8. CONSENT AND LEGAL BASIS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.1 Obtaining Consent</h4>
              <p>We obtain consent through clear, specific and informed processes.</p>
              <p><strong>Consent Characteristics:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Free: Given without coercion or deception</li>
                <li>Specific: Clearly stated for particular purposes</li>
                <li>Informed: Based on comprehensive information</li>
                <li>Unconditional: Not bundled with other agreements</li>
                <li>Unambiguous: Expressed through clear affirmative action</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.2 Consent Mechanisms</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Registration Process: Clear consent checkboxes during account creation</li>
                <li>Layered Notices: Progressive disclosure of data processing information</li>
                <li>Granular Consent: Separate consent for different processing purposes</li>
                <li>Language Options: Consent available in English and regional Indian languages</li>
                <li>Documentation: Maintaining records of consent with timestamps</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.3 Withdrawing Consent</h4>
              <p>The user can withdraw consent at any time through:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Account Settings: Online consent management interface</li>
                <li>Email Request: Written request to our Data Protection Officer</li>
                <li>Customer Support: Phone or chat-based consent withdrawal</li>
                <li>Mobile App: In-app consent management features</li>
              </ul>
              <p><em>Important: Withdrawing consent may limit our ability to provide certain services.</em></p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.4 Legal Basis for Processing</h4>
              <p>Beyond consent, we may process personal data based on:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Legitimate Interests: Platform security, fraud prevention, service improvement</li>
                <li>Legal Obligations: Compliance with Indian/ International laws and regulations</li>
                <li>Contractual Necessity: Fulfilling our service agreements</li>
                <li>Vital Interests: Protecting safety and well-being of users</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>9. DATA SHARING AND DISCLOSURE</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.1 When We Share Data</h4>
              <p>We may share your personal data only in the following circumstances:</p>
              <p><strong>Service Provision:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Teacher-Student Matching: Sharing relevant information to facilitate educational connections</li>
                <li>Payment Processing: With authorized payment gateways and financial institutions</li>
                <li>Educational Services: Between teachers, students and parents for learning purposes</li>
                <li>Customer Support: With support teams to resolve queries and issues</li>
              </ul>
              <p><strong>Legal and Safety Requirements:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Government Authorities: When required by law, court orders or regulatory demands</li>
                <li>Law Enforcement: For preventing crime, fraud or ensuring platform safety</li>
                <li>Legal Proceedings: During litigation, arbitration or dispute resolution</li>
                <li>Emergency Situations: To protect life, health or safety of individuals</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.2 Third-Party Service Providers</h4>
              <p>We work with trusted third-party service providers who process data on our behalf:</p>
              <p><strong>Technology Partners:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Cloud hosting and storage providers</li>
                <li>Analytics and performance monitoring services</li>
                <li>Customer communication platforms</li>
                <li>Mobile app development and maintenance partners</li>
              </ul>
              <p><strong>Verification Services:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Background check agencies for teacher verification</li>
                <li>Identity verification and KYC service providers</li>
                <li>Educational qualification verification agencies</li>
                <li>Financial institutions for payment processing</li>
              </ul>
              <p><em>All third-party partners are contractually bound to protect your data and use it only for specified purposes.</em></p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.3 Business Transfers</h4>
              <p>In the event of merger, acquisition or asset sale, personal data may be transferred to the new entity, subject to:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Continued adherence to this Privacy Policy</li>
                <li>User notification of any material changes</li>
                <li>Opt-out options where legally required</li>
                <li>Regulatory approval for data transfers</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.4 Data Not Shared</h4>
              <p>We never sell, rent or lease your personal data to third parties for their marketing purposes without your explicit consent.</p>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>10. DATA STORAGE AND SECURITY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.1 Security Measures</h4>
              <p>We implement comprehensive technical and organizational measures to protect your personal data.</p>
              <p><strong>Technical Safeguards:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Encryption: End-to-end encryption for data in transit and at rest</li>
                <li>Access Controls: Role-based access with multi-factor authentication</li>
                <li>Firewalls: Advanced network security and intrusion prevention</li>
                <li>Secure Hosting: Industry-standard data centers with physical security</li>
                <li>Regular Updates: Timely security patches and system updates</li>
              </ul>
              <p><strong>Organizational Measures:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Privacy by Design: Security integrated into system architecture</li>
                <li>Staff Training: Regular data protection and security awareness programs</li>
                <li>Background Checks: Screening of employees with data access</li>
                <li>Confidentiality Agreements: Legal obligations for all team members / partners & associated individuals/institutions</li>
                <li>Regular Audits: Internal and external security assessments</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.2 Data Storage Locations</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Primary Storage: Secure data centers within India</li>
                <li>Backup Storage: Encrypted backups in geographically diverse locations</li>
                <li>Cloud Services: Certified cloud providers meeting Indian data protection standards</li>
                <li>International Storage: Only with adequate safeguards and legal compliance</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.3 Security Incidents</h4>
              <p>In case of a data breach:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Immediate Response: Containment and assessment within 24 hours</li>
                <li>Regulatory Notification: Report to Data Protection Board within 72 hours</li>
                <li>User Notification: Inform affected users without undue delay</li>
                <li>Remedial Action: Implement measures to prevent future incidents</li>
                <li>Investigation: Thorough analysis and documentation of the incident</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>11. DATA RETENTION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.1 Retention Principles</h4>
              <p>We retain personal data only as long as necessary for:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Service Provision: Duration of active platform usage</li>
                <li>Legal Compliance: Meeting regulatory and statutory requirements</li>
                <li>Dispute Resolution: Potential legal claims and dispute resolution</li>
                <li>Business Continuity: Essential business operations and records</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.2 Specific Retention Periods</h4>
              <p><strong>User Account Data:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Active Accounts: Throughout the duration of platform usage</li>
                <li>Inactive Accounts: 3 years after last activity (with user consent)</li>
                <li>Deleted Accounts: 30 days grace period, then permanent deletion</li>
              </ul>
              <p><strong>Educational Records:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Learning Progress: 7 years for academic record keeping</li>
                <li>Assessment Data: 5 years or until student graduation</li>
                <li>Communication Records: 2 years for quality assurance</li>
              </ul>
              <p><strong>Payment Records:</strong> 7 years for financial compliance</p>
              <p><strong>Verification Documents:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Teacher Credentials: 10 years after termination of services contract</li>
                <li>Background Checks: As required by law enforcement agencies</li>
                <li>Identity Documents: 5 years after account closure</li>
                <li>Consent Records: Throughout data processing and 3 years thereafter</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.3 Secure Deletion</h4>
              <p>When retention periods expire:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Automated Deletion: Systematic removal of data through scheduled processes</li>
                <li>Secure Overwriting: Complete destruction of data using industry standards</li>
                <li>Backup Removal: Deletion from all backup systems and archives</li>
                <li>Third-Party Instruction: Direction to service providers for data deletion</li>
                <li>Verification: Confirmation of complete data removal</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>12. INTERNATIONAL DATA TRANSFER</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.1 Transfer Principles</h4>
              <p>When transferring personal data outside India, we ensure:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Adequacy Decisions: Transfers only to countries with adequate data protection</li>
                <li>Appropriate Safeguards: Contractual protections and certification schemes</li>
                <li>User Consent: Explicit consent for international transfers where required</li>
                <li>Ongoing Monitoring: Regular review of transfer destinations and safeguards</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.2 Transfer Scenarios</h4>
              <p><strong>Legitimate Transfers:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Service Providers: Cloud hosting and technical support services</li>
                <li>Payment Processing: International payment gateways and banking</li>
                <li>Educational Partners: Collaborations with international educational institutions</li>
                <li>Legal Requirements: Compliance with international legal obligations</li>
              </ul>
              <p><strong>Safeguards Applied:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Standard Contractual Clauses: EU-approved data transfer agreements</li>
                <li>Certification Programs: ISO 27001, SOC 2, and other security certifications</li>
                <li>Binding Corporate Rules: Internal data protection policies for group companies</li>
                <li>Government Approvals: Regulatory clearance for sensitive data transfers</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.3 User Rights for International Transfers</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Notification: Clear information about transfer destinations and purposes</li>
                <li>Objection Rights: Ability to object to transfers in certain circumstances</li>
                <li>Alternative Services: Local processing options where available</li>
                <li>Complaint Mechanisms: Access to dispute resolution for transfer concerns</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>13. YOUR RIGHTS UNDER DPDP ACT</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.1 Fundamental Rights</h4>
              <p>As a data principal under the Digital Personal Data Protection Act, 2023, the users have the following rights.</p>
              
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.2 Right to Information</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Processing Details: Information about how your data is being processed</li>
                <li>Purpose Clarity: Clear explanation of why your data is collected</li>
                <li>Data Categories: Specific types of personal data we process</li>
                <li>Processing Duration: How long your data will be retained</li>
                <li>Third-Party Sharing: Details of data sharing with other entities</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.3 Right to Access</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Data Portability: Receive a copy of your personal data in a structured, commonly used format</li>
                <li>Processing History: Information about past data processing activities</li>
                <li>Source Information: Details about how we obtained your data</li>
                <li>Recipient Details: Information about parties who have received your data</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.4 Right to Correction</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Data Accuracy: Request correction of inaccurate or incomplete data</li>
                <li>Update Procedures: Simple mechanisms to update your information</li>
                <li>Verification Process: Reasonable verification before making corrections</li>
                <li>Notification: Inform third parties about data corrections where necessary</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.5 Right to Erasure</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Deletion Request: Ask for deletion of your personal data</li>
                <li>Right to be forgotten: Removal of data from public access</li>
                <li>Legal Exceptions: Understanding when erasure may be refused</li>
                <li>Complete Removal: Deletion from all systems including backups</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.6 Right to Grievance Redressal</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Complaint Process: Mechanisms to raise concerns about data processing</li>
                <li>Internal Resolution: Our grievance redressal procedures</li>
                <li>External Complaints: Right to complain to the Data Protection Board</li>
                <li>Legal Remedies: Access to judicial remedies for data protection violations</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.7 Right to Nominate</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Digital Nominee: Appoint someone to exercise your rights after death or incapacity</li>
                <li>Nomination Process: Legal procedures for appointing nominees</li>
                <li>Nominee Rights: Powers and limitations of nominated individuals</li>
                <li>Succession Planning: Managing digital assets and data after death</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.8 Exercising Your Rights</h4>
              <p>To exercise any of these rights, you may:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Email: Contact our Data Protection Officer at contact@thementr.com</li>
                <li>Online Portal: Use our privacy rights management system</li>
                <li>Written Request: Send a signed letter to our registered office</li>
                <li>Phone Support: Call our dedicated privacy helpline</li>
                <li>Mobile App: Use in-app privacy rights features</li>
              </ul>
              <p><em>Response Time: We will respond to your requests within 30 days of receipt.</em></p>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>14. COOKIES AND TRACKING TECHNOLOGIES</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.1 What Are Cookies</h4>
              <p>Cookies are small text files stored on your device when you visit our website or use our mobile app. They help us provide better services and user experience.</p>
              
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.2 Types of Cookies We Use</h4>
              <p><strong>Essential Cookies:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Authentication: Keeping you logged in during sessions</li>
                <li>Security: Preventing fraud and ensuring platform safety</li>
                <li>Functionality: Remembering your preferences and settings</li>
                <li>Load Balancing: Optimizing website performance</li>
              </ul>
              <p><strong>Analytics Cookies:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Usage Statistics: Understanding how users interact with our platform</li>
                <li>Performance Monitoring: Identifying and fixing technical issues</li>
                <li>User Journey: Analyzing navigation patterns for improvement</li>
                <li>A/B Testing: Comparing different versions of features</li>
              </ul>
              <p><strong>Marketing Cookies:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Personalization: Customizing content based on interests (with consent)</li>
                <li>Advertisement: Delivering relevant ads (where applicable)</li>
                <li>Conversion Tracking: Measuring effectiveness of marketing campaigns</li>
                <li>Remarketing: Showing relevant content to returning users</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.3 Cookie Management</h4>
              <p>You can control cookies through:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Browser Settings: Blocking or deleting cookies</li>
                <li>Privacy Controls: Our cookie consent management system</li>
                <li>Mobile App Settings: In-app tracking preferences</li>
                <li>Third-Party Tools: Browser extensions and privacy tools</li>
              </ul>
              <p><em>Note: Disabling essential cookies may affect platform functionality.</em></p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.4 Third-Party Cookies</h4>
              <p>We may use third-party services that set their own cookies:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Google Analytics: Website usage analysis</li>
                <li>Payment Processors: Secure transaction processing</li>
                <li>Customer Support: Chat and help desk functionalities</li>
                <li>Social Media: Integration with social platforms (if applicable)</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>15. THIRD PARTY SERVICES AND LINKS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>15.1 Third-Party Integrations</h4>
              <p>Our platform integrates with various third-party services:</p>
              <p><strong>Payment Services:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Razorpay, PayU and other payment gateways</li>
                <li>Bank and UPI payment processing</li>
                <li>Digital wallet integrations</li>
                <li>International payment processors</li>
              </ul>
              <p><strong>Communication Tools:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Video conferencing platforms for online classes</li>
                <li>Email and SMS service providers</li>
                <li>Push notification services</li>
                <li>Customer support chat systems</li>
              </ul>
              <p><strong>Educational Tools:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Content delivery networks</li>
                <li>Learning management systems</li>
                <li>Proctoring, Assessment and Quiz platforms</li>
                <li>Digital whiteboard and collaboration tools</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>15.2 External Links</h4>
              <p>Our platform may contain links to external websites and services. But notable points are:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Independent Privacy Policies: Third-party sites have their own privacy policies</li>
                <li>No Control: We cannot control external sites' data practices</li>
                <li>User Responsibility: Please review third-party privacy policies before sharing data</li>
                <li>No Liability: We are not responsible for third-party data handling</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>15.3 Social Media Integration</h4>
              <p>If we integrate with social media platforms:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Limited Data Sharing: Only necessary information for integration</li>
                <li>User Control: User control what information is shared</li>
                <li>Platform Policies: Subject to respective social media privacy policies</li>
                <li>Opt-Out Options: User can disconnect social media accounts at any time</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>16. DATA BREACH NOTIFICATION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.1 Our Commitment</h4>
              <p>We are committed to maintaining the security of users’ personal data. However, in the unlikely event of a data breach:</p>
              
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.2 Immediate Response</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Containment: Immediate steps to stop the breach and prevent further damage</li>
                <li>Assessment: Quick evaluation of the scope and impact of the breach</li>
                <li>Investigation: Thorough analysis of the cause and extent of the incident</li>
                <li>Documentation: Detailed records of the breach and response actions</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.3 Regulatory Notification</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>72 Hour Rule: Notify the Data Protection Board within 72 hours of discovery</li>
                <li>Detailed Report: Comprehensive information about the breach and affected data</li>
                <li>Remedial Actions: Steps taken to address the breach and prevent recurrence</li>
                <li>Ongoing Updates: Regular updates to authorities as investigation progresses</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.4 User Notification</h4>
              <p>We will notify affected users if the breach is likely to result in high risk to their rights and freedoms:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Timely Notice: Notification without undue delay after discovery</li>
                <li>Clear Communication: Simple, jargon-free explanation of the incident</li>
                <li>Impact Assessment: Information about potential risks and consequences</li>
                <li>Protective Measures: Recommended actions users can take to protect themselves</li>
                <li>Contact Information: Direct line for questions and support</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.5 Breach Prevention</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Regular Security Audits: Proactive identification of vulnerabilities</li>
                <li>Staff Training: Ongoing education about data protection and security</li>
                <li>System Updates: Timely application of security patches and upgrades</li>
                <li>Incident Response Plan: Prepared procedures for handling breaches</li>
                <li>Third-Party Monitoring: Continuous assessment of vendor security practices</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>17. GRIEVANCE REDRESSAL</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.1 Internal Grievance Mechanism</h4>
              <p>We have established a comprehensive grievance redressal system to address your privacy concerns:</p>
              
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.2 Grievance Officer</h4>
              <p>
                Name: Swaroop Mohapatra
                <br />
                Designation: Data Protection Officer
                <br />
                Email: grievance@thementr.com
                <br />
                Phone: 91 9861047800
                <br />
                Address: 2nd Floor, Plot No. 2937/ 6463, Saptasati Vihar, Near ISA Diagnostic, Bhubaneswar, Khurda, Odisha – 751025
                <br />
                Working Hours: Monday to Friday, 9:30 AM to 5:30 PM IST
              </p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.3 Complaint Process</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Submit Complaint: Send detailed complaint via email, phone or written letter</li>
                <li>Acknowledgment: We will acknowledge receipt within 48 hours</li>
                <li>Investigation: Thorough investigation of the complaint within 15 days</li>
                <li>Resolution: Provide resolution or explanation within 30 days</li>
                <li>Follow-up: Ensure satisfaction with the resolution provided</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.4 Complaint Information Required</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Personal Details: Your name, contact information and user ID</li>
                <li>Issue Description: Clear description of the privacy concern</li>
                <li>Supporting Documents: Any relevant evidence or documentation</li>
                <li>Preferred Resolution: What outcome you are seeking</li>
                <li>Previous Communication: Any prior correspondence about the issue</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.5 Escalation Process</h4>
              <p>If you are not satisfied with our response:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Internal Review: Request review by senior management</li>
                <li>External Mediation: Seek third-party mediation services</li>
                <li>Regulatory Complaint: File complaint with Data Protection Board of India</li>
                <li>Legal Action: Pursue judicial remedies through appropriate courts</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.6 Data Protection Board Complaint</h4>
              <p>You have the right to file a complaint with the Data Protection Board of India:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Website: Data Protection Board URL - https://dpdpaedu.org</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>18. UPDATES TO THIS POLICY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.1 Policy Updates</h4>
              <p>We may update this Privacy Policy from time to time to reflect:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Legal Changes: New laws and regulatory requirements</li>
                <li>Service Evolution: New features and platform improvements</li>
                <li>Technology Updates: Changes in data processing technologies</li>
                <li>Best Practices: Adoption of enhanced privacy practices</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.2 Notification of Changes</h4>
              <p>We will notify you of significant changes through:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Email Notification: Direct email to registered users</li>
                <li>Website Notice: Prominent banner on our website</li>
                <li>Mobile App Alert: Push notification or in-app message</li>
                <li>Account Dashboard: Notice in your user account section</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.3 Material Changes</h4>
              <p>For material changes that affect your rights:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>30 Day Notice: Advance notice before changes take effect</li>
                <li>Explicit Consent: Request for fresh consent where required</li>
                <li>Opt-Out Options: Ability to object to new processing activities</li>
                <li>Service Alternatives: Information about alternative services if available</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.4 Version Control</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Effective Date: Each version will have a clear effective date</li>
                <li>Version History: Previous versions available upon request</li>
                <li>Change Summary: Detailed description of modifications made</li>
                <li>Archive Access: Ability to access historical policy versions</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>19. CONTACT INFORMATION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.1 General Inquiries</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Company: BUDIN Candor Private Limited</li>
                <li>Brand: TheMentR</li>
                <li>Website: www.thementr.com</li>
                <li>Email: contact@thementr.com</li>
                <li>Phone: 91 9861047800</li>
                <li>Address: 2nd Floor, Plot No. 2937/ 6463, Saptasati Vihar, Near ISA Diagnostic, Bhubaneswar, Khurda, Odisha – 751025, India</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.2 Data Protection Officer</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Name: Sagar Mohapatra</li>
                <li>Email: dpo@thementr.com</li>
                <li>Phone: 91 9237388079</li>
                <li>Address: 2nd Floor, Plot No. 2937/ 6463, Saptasati Vihar, Near ISA Diagnostic, Bhubaneswar, Khurda, Odisha – 751025, India</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.3 Legal and Compliance</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Legal Team: legal@thementr.com</li>
                <li>Compliance Officer: legal@thementr.com</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.4 Customer Support</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Support Email: support@thementr.com</li>
                <li>Help Desk: 91 9861047800</li>
                <li>Chat Support: Available on website and mobile app and Whatsapp on 9861047801</li>
                <li>Support Hours: 24/7 for urgent issues, 9.30 AM to 5.30 PM for general queries 9668562631</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.5 Physical Address</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Registered Office: 2nd Floor, Plot No. 2937/ 6463, Saptasati Vihar, Near ISA Diagnostic, Bhubaneswar, Khurda, Odisha – 751025</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>20. LEGAL COMPLIANCE</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>20.1 Applicable Laws</h4>
              <p>This Privacy Policy is designed to comply with:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Digital Personal Data Protection Act, 2023</li>
                <li>Information Technology Act, 2000</li>
                <li>Information Technology (Reasonable Security Practices) Rules, 2011</li>
                <li>Consumer Protection Act, 2019</li>
                <li>Indian Contract Act, 1872</li>
                <li>Companies Act, 2013</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>20.2 International Standards</h4>
              <p>We also strive to meet international privacy standards:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>GDPR Principles (for European users)</li>
                <li>COPPA Guidelines (for children's privacy)</li>
                <li>ISO 9001, 27001 (Quality & Information Security Management)</li>
                <li>SOC 2 (Security, Availability, and Confidentiality)</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>20.3 Regulatory Authorities</h4>
              <p>We are subject to oversight by:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Data Protection Board of India (Primary regulator for DPDP Act)</li>
                <li>Ministry of Electronics and Information Technology (IT Act compliance)</li>
                <li>Reserve Bank of India (Payment-related data)</li>
                <li>Securities and Exchange Board of India (If applicable)</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>20.4 Legal Jurisdiction</h4>
              <p>This Privacy Policy is governed by:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Indian Law: Laws of the Republic of India</li>
                <li>Jurisdiction: Courts in Odisha, India</li>
                <li>Dispute Resolution: As per our Terms of Service</li>
                <li>Arbitration: Indian Arbitration and Conciliation Act, 2015</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>20.5 Compliance Monitoring</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Regular Audits: Internal and external privacy compliance reviews</li>
                <li>Legal Updates: Continuous monitoring of regulatory changes</li>
                <li>Training Programs: Staff education on privacy laws and best practices</li>
                <li>Policy Reviews: Annual review and update of privacy policies</li>
                <li>Certification: Pursuing relevant privacy and security certifications</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>ACKNOWLEDGEMENT AND CONSENT</h3>
              <p>By using our Platform, you acknowledge that:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>You have read and understood this Privacy Policy in its entirety</li>
                <li>You consent to the collection, use, and processing of your personal data as described herein</li>
                <li>You understand your rights under the DPDP Act, 2023, and how to exercise them</li>
                <li>You are aware of the mechanisms available for grievance redressal</li>
                <li>You will be notified of any material changes to this policy</li>
              </ul>
              <p><em>For Children Under 18 years: This consent is provided by the parent or legal guardian on behalf of the child, with full understanding of the data processing activities and child protection measures implemented by TheMentR.</em></p>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />
              <p style={{ fontSize: 13, color: '#64748B' }}>
                © 2025 BUDIN Candor Private Limited for TheMentR. All rights reserved.
                <br />
                This Privacy Policy was last updated on December 1, 2025, and is effective immediately.
                <br />
                This Privacy Policy is prepared in compliance with Indian data protection laws as of September 2025 which shall be reviewed regularly and updated as necessary to ensure continued compliance.
              </p>

            </div>
          </div>
        )}

        {/* TAB 2: PARENTS TERMS & CONDITIONS */}
        {activeTab === 'parents' && (
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: '48px 40px', border: '1px solid rgba(59, 130, 246, 0.18)', boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.06)', transform: 'translateZ(0)', willChange: 'transform' }}>
            <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: 24, marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                TERMS AND CONDITIONS FOR PARENTS & STUDENTS
              </h2>
              <div style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>
                BUDIN Candor Pvt. Ltd. (For TheMentR)
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
                Effective Date: December 01, 2025 | Last Updated: December 01, 2025
              </div>
            </div>

            <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F59E0B', padding: '16px 20px', borderRadius: '0 12px 12px 0', marginBottom: 24, fontSize: 14.5, fontWeight: 600, color: '#B45309' }}>
              Disclaimer - TheMentR does not encourage a child below 18 years of age to be an independent user of its services.
            </div>

            <div style={{ color: '#334155', fontSize: 15, lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
              
              <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginTop: 24, marginBottom: 12 }}>TABLE OF CONTENTS</h4>
              <ol style={{ paddingLeft: 20, marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 14, color: '#475569', fontWeight: 500 }}>
                <li>1. Preamble</li>
                <li>2. Definitions and Interpretation</li>
                <li>3. Acceptance and Agreement</li>
                <li>4. Student Registration and Eligibility</li>
                <li>5. Parental Consent and Child Protection</li>
                <li>6. Platform Services and Features</li>
                <li>7. Payment Terms and Fee Structure</li>
                <li>8. Consumer Rights and Protection</li>
                <li>9. Data Privacy and Digital Rights</li>
                <li>10. Student and Parent Responsibilities</li>
                <li>11. Online Safety and Security</li>
                <li>12. Teacher-Student Interaction Guidelines</li>
                <li>13. Academic Progress and Quality Assurance</li>
                <li>14. Grievance Redressal and Support</li>
                <li>15. Termination and Suspension</li>
                <li>16. Legal Compliance and Criminal Law</li>
                <li>17. Limitation of Liability</li>
                <li>18. Dispute Resolution</li>
                <li>19. Amendments and Updates</li>
                <li>20. General Provisions</li>
              </ol>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>1. PREAMBLE</h3>
              <p>
                These Terms and Conditions ("Terms") constitute a legally binding agreement between BUDIN Candor Private Limited, a company incorporated under the Companies Act, 2013 ("Company" or "TheMentR" or "Platform"), parents, guardians and students using TheMentR educational technology platform.
                <br />
                TheMentR Mission Statement: "Where Learning meets its Purpose... "
                <br />
                These Terms are designed to ensure:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Complete compliance with Indian consumer protection and child safety laws</li>
                <li>Protection of student rights and parental interests in educational services</li>
                <li>Digital safety and privacy protection for all users, especially children</li>
                <li>Transparent fee structure and non-exploitative educational practices</li>
                <li>Quality educational services with accountability and redressal mechanisms</li>
              </ul>
              <p>
                By registering on TheMentR platform or allowing your child to use our services, you acknowledge that you have read, understood and agree to be bound by these Terms and all applicable laws of India.
              </p>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>2. DEFINITIONS AND INTERPRETATION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>2.1 Key Definitions</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>"Child" means any person below the age of 18 years as per Indian law</li>
                <li>"Consumer" means any person who avails educational services for consideration as per Consumer Protection Act, 2019</li>
                <li>"Educational Services" means tutoring, teaching, academic support and related learning services</li>
                <li>"Parent/ Guardian" means the natural or legal guardian of a child student</li>
                <li>"Personal Data" includes all data relating to an identifiable student or parent</li>
                <li>"Platform" means TheMentR website, mobile applications and associated digital services</li>
                <li>"Student" means any learner registered on the platform, including minors and adults</li>
                <li>"Verifiable Parental Consent" means consent that can be reasonably verified as being provided by the child's parent or guardian</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>2.2 Interpretation Guidelines</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>These Terms shall be interpreted in accordance with Indian law and consumer protection principles.</li>
                <li>In case of conflict between these Terms and applicable consumer protection law, the law shall prevail.</li>
                <li>References to "you" include parents, guardians and students as applicable.</li>
                <li>Headings are for convenience only and do not affect legal interpretation.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>3. ACCEPTANCE AND AGREEMENT</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.1 Agreement Formation</h4>
              <p>By accessing or using TheMentR services, you:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Acknowledge reading and understanding these Terms in their entirety.</li>
                <li>Agree to be bound by these Terms and our Privacy Policy.</li>
                <li>Represent that you have the legal capacity to enter into this agreement.</li>
                <li>Consent to our collection and processing of personal data as described.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.2 Parental Consent for Minors</h4>
              <p>For students under 18 years of age:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li><strong>Mandatory Parental Consent:</strong> Parent or guardian must provide verifiable consent before registration.</li>
                <li><strong>Ongoing Parental Oversight:</strong> Parents maintain the right to access, modify or delete their child's account and data.</li>
                <li><strong>Parental Responsibility:</strong> Parents are responsible for supervising their child's use of the platform.</li>
                <li><strong>Age Verification:</strong> We implement reasonable measures to verify the age of users and obtain appropriate consent.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.3 Consent Verification Process</h4>
              <p>To ensure valid parental consent, we may require:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Government-issued identification verification.</li>
                <li>OTP Based verifications, Digital signature or authenticated electronic consent.</li>
                <li>Phone or video verification calls.</li>
                <li>Signed physical consent forms where necessary.</li>
                <li>Regular re-confirmation of consent for ongoing services.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>4. STUDENT REGISTRATION AND ELIGIBILITY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.1 Registration Requirements</h4>
              <p>For All Students:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Valid contact and Identity information (email, phone number, Aadhaar).</li>
                <li>Academic level and subject requirements specification.</li>
                <li>Preferred learning mode (online/offline/both).</li>
                <li>Location and scheduling preferences.</li>
                <li>Payment capacity indication within our fee structure as applicable.</li>
              </ul>
              <p>Additional Requirements for Minors:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Verifiable parental consent and supervision.</li>
                <li>Parent/ guardian contact information for all communications.</li>
                <li>Clear academic goals and parental expectations.</li>
                <li>Agreement to platform safety protocols and monitoring.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.2 Registration Process Workflow</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Online Registration: Complete registration form via website or mobile app.</li>
                <li>Information Verification: Verify contact details through OTP or email confirmation.</li>
                <li>Profile Creation: Detailed academic profile with learning preferences and requirements.</li>
                <li>Teacher Matching: AI-powered matching with verified teachers based on criteria.</li>
                <li>Payment Setup: Secure payment method configuration for monthly billing.</li>
                <li>Service Activation: Access to full platform features and teacher connections.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.3 Eligibility Restrictions</h4>
              <p>Students may not be registered if they:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Provide false or misleading information during registration.</li>
                <li>Have been previously suspended or banned from the platform.</li>
                <li>Are under legal restrictions that prevent use of educational services.</li>
                <li>Cannot obtain required parental consent (for minors).</li>
                <li>Engage in activities that violate platform safety policies.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>5. PARENTAL CONSENT AND CHILD PROTECTION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.1 Digital Personal Data Protection Act Compliance</h4>
              <p>Mandatory Parental Consent Requirements:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Verifiable Consent: Parents must provide consent through secure verification methods.</li>
                <li>Specific Consent: Clear consent for each type of data processing activity.</li>
                <li>Informed Consent: Full disclosure of data collection, use and sharing practices.</li>
                <li>Ongoing Consent: Right to withdraw consent at any time without penalty.</li>
                <li>Regular Reconfirmation: Periodic renewal of consent for continued services.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.2 Child Protection Measures</h4>
              <p>Zero Tolerance Policy:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>No Behavioral Tracking: We do not engage in behavioral profiling of children.</li>
                <li>No Targeted Advertising: Children are not subjected to targeted advertisements.</li>
                <li>Enhanced Security: Additional security measures for children's data.</li>
                <li>Safe Communication: All teacher-student communication is monitored and recorded wherever feasible.</li>
                <li>Immediate Reporting: Any safety concerns are immediately escalated to parents and authorities.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.3 Parental Rights and Controls</h4>
              <p>Parents have the right to:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Access all personal data collected about their child.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Delete their child's account and associated data.</li>
                <li>Receive regular updates about their child's platform activity.</li>
                <li>Monitor all teacher-student interactions and communications.</li>
                <li>File complaints about any safety or privacy concerns.</li>
                <li>Withdraw consent and terminate services at any time.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.4 Child Safety Protocols</h4>
              <p>Platform Safety Features:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Secure Sessions: All online classes are encrypted and access-controlled.</li>
                <li>Recording Capability: Sessions can be recorded for safety and quality purposes.</li>
                <li>Emergency Alerts: Immediate notification system for safety incidents.</li>
                <li>Parental Dashboard: Real-time access to child's learning activities.</li>
                <li>Background Checks: All teachers undergo comprehensive verification including background checks.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>6. PLATFORM SERVICES AND FEATURES</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.1 Educational Services Offered</h4>
              <p>Academic Levels Covered:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Classes 0 to 3: All subjects with qualified teachers, Categories A1 to A13.</li>
                <li>Classes 4 to 7: All subjects with bachelor's degree holders, Categories B1 to B13.</li>
                <li>Classes 8 to 10: All subjects and individual specializations, Categories C1 to C13, D1 to D13.</li>
                <li>Classes 11 to 12: Individual subjects with advanced qualifications, Categories E1 to E13.</li>
                <li>Expert Classes 8 to 12: Subject experts for specific/ entrance exam preparation, Categories F1 to F13.</li>
              </ul>
              <p>Service Delivery Modes:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Online Sessions: Video-based interactive classes with digital tools.</li>
                <li>Offline Sessions: In-person tutoring at agreed locations.</li>
                <li>Hybrid Learning: Combination of online and offline sessions.</li>
                <li>Group Classes: Small group sessions for cost-effective learning.</li>
                <li>Individual Attention: One-on-one personalized tutoring.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.2 Platform Features and Technology</h4>
              <p>Student Learning Tools:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Progress Tracking: Real-time monitoring of academic progress and performance.</li>
                <li>Assessment System: Regular tests, evaluations and performance rankings.</li>
                <li>Doubt Clearing: 24/7 access to subject experts for query resolution with certain limitations.</li>
                <li>Digital Resources: Access to educational materials, study guides and practice tests.</li>
                <li>AI Powered Matching: Intelligent teacher-student matching based on requirements.</li>
              </ul>
              <p>Parent Engagement Features:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Progress Reports: Regular detailed reports on child's academic performance.</li>
                <li>Communication Portal: Direct communication channel with teachers through TheMentR.</li>
                <li>Payment Dashboard: Transparent billing and payment history.</li>
                <li>Feedback System: Rating and review system for quality assurance.</li>
                <li>Support Access: 24/7 customer support and grievance redressal with certain limitations.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.3 Quality Assurance Measures</h4>
              <p>Teacher Verification:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Multi-step verification including background checks, qualification verification and demo lessons.</li>
                <li>Ongoing performance monitoring through student and parent feedback.</li>
                <li>Regular re-verification and professional development requirements.</li>
                <li>Immediate suspension for any safety or quality violations.</li>
              </ul>
              <p>Service Standards:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Punctuality Guarantee: Teachers must maintain attendance and punctuality.</li>
                <li>Quality Monitoring: Regular surprise quality checks and feedback collection.</li>
                <li>Syllabus Alignment: All teaching aligned with prescribed curriculum and examination patterns.</li>
                <li>Progress Guarantee: Regular assessments and improvement tracking.</li>
                <li>Replacement Policy: 7-day teacher substitution if current teacher is unsatisfactory.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>7. PAYMENT TERMS AND FEE STRUCTURE</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.1 Transparent Fee Structure</h4>
              <p>Category-wise Monthly Fees (Including 18% GST and 2% Platform Fee):</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Classes 0 to 3 (All Subjects): ₹1,499 - ₹6,499 per month</li>
                <li>Classes 4 to 7 (All Subjects): ₹1,999 - ₹6,999 per month</li>
                <li>Classes 8 to 10 (All Subjects): ₹2,499 - ₹8,499 per month</li>
                <li>Classes 8 to 10 (Individual Subjects): ₹1,499 - ₹5,999 per month</li>
                <li>Classes 11 to 12 (Individual Subjects): ₹1,999 - ₹6,499 per month</li>
                <li>Subject Experts (Any Class/subject/Exams): ₹4,499 - ₹9,999 per month</li>
              </ul>
              <p style={{ fontStyle: 'italic', fontSize: 13.5 }}>
                * T & C Applied. This fee structure/ range is indicative only which shall in actual be based on the exact numbers of classes (1 Hour / 0.5 Hour) availed in the month and/ or category of the teacher as availed by the user so also may change as per the company’s financial status, requirements and applicable policies.
              </p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.2 Payment Terms and Schedule</h4>
              <p>Payment Processing:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Monthly Billing Cycle: Payments due in the first week of each month.</li>
                <li>Service Condition: Payment covers the current month's sessions.</li>
                <li>More Class More Pay Model: Fees calculated for hour or half an hour of classes and billed monthly proportionate to the numbers of classes availed in the month with add-ons as per subscriptions.</li>
                <li>No Hidden Charges: All costs transparently displayed upfront.</li>
                <li>GST Compliance: All payments include applicable GST and are properly invoiced.</li>
              </ul>
              <p>Accepted Payment Methods:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>UPI and digital wallets (recommended for instant processing)</li>
                <li>Credit and debit cards (Visa, MasterCard, RuPay)</li>
                <li>Net banking from all major Indian banks</li>
                <li><strong>Cash payments are strictly prohibited for security and transparency.</strong></li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.3 Consumer Protection Compliance</h4>
              <p>Under Consumer Protection Act 2019:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Right to Fair Pricing: Transparent fee structure without hidden costs.</li>
                <li>Right to Quality Service: Guaranteed educational service standards.</li>
                <li>Right to Choose: Freedom to select teachers, timings, monthly fees range and service levels.</li>
                <li>Right to Information: Complete disclosure of all terms, fees and policies.</li>
                <li>Right to Redressal: Effective grievance resolution mechanisms.</li>
                <li>Right to Safety: Secure payment processing and data protection.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.4 Refund and Cancellation Policy (in Subscription/ Online Models Only)</h4>
              <p>Refund Scenarios:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Service Failure: Full refund if promised services are not delivered.</li>
                <li>Teacher Unavailability: Pro-rata refund for missed sessions due to platform issues.</li>
                <li>Dissatisfaction: Partial refund within 7 days if not satisfied with teacher quality.</li>
                <li>Technical Issues: Full refund for sessions disrupted due to platform failures.</li>
                <li>Emergency Cancellation: Flexible refund policy for genuine emergencies.</li>
              </ul>
              <p>Refund Processing:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Timeline: All approved refunds processed within 7 to 15 business days.</li>
                <li>Method: Refunds credited to original payment method.</li>
                <li>Documentation: Clear refund policy with terms communicated upfront.</li>
                <li>Dispute Resolution: Consumer forum complaint option for refund disputes.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>8. CONSUMER RIGHTS AND PROTECTION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.1 Student as Consumer Rights</h4>
              <p>
                Under Consumer Protection Act 2019, educational services provided by TheMentR constitute "services" under the Act, making students "consumers" with the following rights:
              </p>
              <p><strong>Right to Safety:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Protection from physical and psychological harm during educational interactions.</li>
                <li>Safe learning environment free from harassment, discrimination or abuse.</li>
                <li>Immediate reporting and action mechanism for safety violations.</li>
                <li>Emergency support and intervention procedures.</li>
              </ul>
              <p><strong>Right to Information:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Complete disclosure of teacher qualifications, experience and background.</li>
                <li>Transparent fee structure and payment terms.</li>
                <li>Clear explanation of educational methodology and expected outcomes.</li>
                <li>Regular progress reports and performance feedback.</li>
              </ul>
              <p><strong>Right to Choice:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Freedom to select teachers based on qualifications, experience and teaching style.</li>
                <li>Flexibility in scheduling and learning mode preferences.</li>
                <li>Option to change teachers within 7 days if unsatisfied.</li>
                <li>Multiple payment options and service packages.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.2 Quality Assurance Guarantees</h4>
              <p>Service Quality Standards:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Qualified Teachers: All teachers undergo rigorous verification and background checks.</li>
                <li>Curriculum Compliance: All teaching aligned with prescribed syllabi and examination patterns.</li>
                <li>Performance Tracking: Regular assessments and progress monitoring.</li>
                <li>Feedback Integration: Continuous improvement based on student and parent feedback.</li>
                <li>Result Orientation: Focus on academic improvement and examination success.</li>
              </ul>
              <p>Service Reliability:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Punctuality Guarantee: Teachers maintain attendance and time compliance.</li>
                <li>Continuity Assurance: Backup teachers available for uninterrupted service (on demand & feasibility).</li>
                <li>Technical Support: 24/7 technical assistance for online sessions.</li>
                <li>Quality Monitoring: Regular surprise quality checks and feedback collection.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.3 Complaint and Redressal Mechanisms</h4>
              <p>Internal Grievance System:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Support: Customer support for immediate assistance with certain limitations.</li>
                <li>Escalation Process: Structured escalation from support staff to management.</li>
                <li>Timeline Compliance: All complaints acknowledged within 24 hours, resolved within 7 days.</li>
                <li>Documentation: Written record of all complaints and resolution actions.</li>
                <li>Follow-up: Post-resolution follow-up to ensure satisfaction.</li>
              </ul>
              <p>External Redressal Options:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Consumer Forums: Right to approach District, State, or National Consumer Commissions.</li>
                <li>Regulatory Complaints: Complaints to educational regulatory authorities where applicable.</li>
                <li>Legal Remedies: Access to civil courts for breach of contract or service deficiency.</li>
                <li>Alternative Dispute Resolution: Mediation and arbitration options for faster resolution.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>9. DATA PRIVACY AND DIGITAL RIGHTS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.1 Digital Personal Data Protection Act Compliance</h4>
              <p>Data Collection and Processing:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Lawful Basis: All data processing based on valid consent or legal obligation.</li>
                <li>Purpose Limitation: Data used only for specified educational and safety purposes.</li>
                <li>Data Minimization: Collection limited to necessary information for service delivery.</li>
                <li>Accuracy: Regular updates to ensure data accuracy and relevance.</li>
                <li>Storage Limitation: Data retained only as long as necessary for educational purposes.</li>
              </ul>
              <p>Student Digital Rights:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Right to Access: Students can access all personal data held about them.</li>
                <li>Right to Correction: Ability to correct inaccurate or incomplete data.</li>
                <li>Right to Erasure: Request deletion of personal data when no longer needed.</li>
                <li>Right to Data Portability: Receive personal data in structured, machine-readable format.</li>
                <li>Right to Restrict Processing: Limit how personal data is processed.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.2 Children's Data Protection</h4>
              <p>Enhanced Protection for Minors:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Verifiable Parental Consent: Mandatory for all children under 18.</li>
                <li>No Profiling: Prohibition of behavioral analysis or profiling of children.</li>
                <li>Safe Processing: Enhanced security measures for children's data.</li>
                <li>Limited Sharing: Strict restrictions on sharing children's data with third parties.</li>
                <li>Regular Review: Periodic assessment of data processing activities involving children.</li>
              </ul>
              <p>Parental Data Rights:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Access Rights: Parents can access all data collected about their child.</li>
                <li>Control Rights: Parents can modify, update or delete their child's data.</li>
                <li>Consent Management: Easy withdrawal of consent without penalty.</li>
                <li>Notification Rights: Immediate notification of any data breaches or incidents.</li>
                <li>Grievance Rights: Direct access to data protection officer for concerns.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.3 Platform Data Security</h4>
              <p>Technical Safeguards:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Encryption: End-to-end encryption for all data transmission and storage.</li>
                <li>Access Controls: Role-based access with multi-factor authentication.</li>
                <li>Regular Backups: Secure data backup with disaster recovery procedures.</li>
                <li>Security Audits: Regular security assessments and vulnerability testing.</li>
                <li>Incident Response: Immediate response plan for data breaches or security incidents.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>10. STUDENT AND PARENT RESPONSIBILITIES</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.1 Student Responsibilities</h4>
              <p>Academic Obligations:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Regular Attendance: Attend all scheduled sessions punctually and prepared.</li>
                <li>Active Participation: Engage actively in learning activities and discussions.</li>
                <li>Homework Completion: Complete all assigned tasks and assessments in time.</li>
                <li>Honest Assessment: Demonstrate actual knowledge without cheating or unfair assistance.</li>
                <li>Progress Monitoring: Track own learning progress and communicate concerns to parents/teachers.</li>
              </ul>
              <p>Platform Usage Responsibilities:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Account Security: Maintain confidentiality of login credentials and account information.</li>
                <li>Appropriate Behavior: Conduct themselves respectfully with teachers and platform staff.</li>
                <li>Safety Compliance: Follow all safety protocols and report any inappropriate behavior.</li>
                <li>Technology Use: Use platform features responsibly and report technical issues.</li>
                <li>Feedback Provision: Provide honest feedback about teaching quality and platform experience.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.2 Parent/Guardian Responsibilities</h4>
              <p>Supervision and Support:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Active Oversight: Monitor child's learning activities and platform usage.</li>
                <li>Educational Support: Provide necessary learning environment and resources at home.</li>
                <li>Communication: Maintain regular communication with teachers and platform administration.</li>
                <li>Safety Vigilance: Monitor child's interactions and report any safety concerns.</li>
                <li>Progress Tracking: Review child's academic progress and provide necessary support.</li>
              </ul>
              <p>Legal and Compliance Obligations:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Consent Management: Provide valid consent and keep consent preferences updated.</li>
                <li>Information Accuracy: Ensure all provided information is accurate and current.</li>
                <li>Payment Compliance: Make timely payments as per agreed terms and schedules.</li>
                <li>Policy Adherence: Comply with all platform policies and terms of service.</li>
                <li>Reporting Obligations: Report any violations, safety concerns, or technical issues.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.3 Prohibited Activities</h4>
              <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', padding: 20, borderRadius: 12, marginBottom: 16 }}>
                <strong>No Private Direct Deals:</strong> Parents must not enter into direct private financial negotiations, payouts, or tutoring arrangements with matched TheMentR teachers. Off-platform deals void all child safety monitoring, background checks, and brand guarantees.
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>11. ONLINE SAFETY AND SECURITY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.1 Child Online Safety Measures</h4>
              <p>Platform Safety Features:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Secure Communication: All teacher-student communication through monitored platform channels.</li>
                <li>Session Recording: Capability to record online sessions for safety and quality purposes.</li>
                <li>Real-time Monitoring: Live monitoring of sessions for inappropriate behavior detection.</li>
                <li>Emergency Alerts: Immediate notification system for safety incidents or concerns.</li>
                <li>Safe Content: Age-appropriate educational content with regular review and moderation.</li>
              </ul>
              <p>Cyber security Protections:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Identity Verification: Comprehensive verification of all teachers and staff.</li>
                <li>Background Checks: Criminal background verification for all teaching personnel.</li>
                <li>Secure Infrastructure: Industry-standard security measures for platform protection.</li>
                <li>Regular Audits: Ongoing security assessments and vulnerability testing.</li>
                <li>Incident Response: Immediate response protocol for security breaches or threats.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.2 Digital Safety Guidelines</h4>
              <p>For Students:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Personal Information: Never share personal details beyond what is required for educational services.</li>
                <li>Secure Passwords: Use strong, unique passwords and never share login credentials.</li>
                <li>Suspicious Activity: Immediately report any inappropriate behavior or communication.</li>
                <li>Safe Practices: Follow digital safety guidelines provided during platform orientation.</li>
                <li>Parental Communication: Keep parents informed about all platform interactions.</li>
              </ul>
              <p>For Parents:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Active Supervision: Monitor child's online activities and session participation.</li>
                <li>Safety Education: Educate children about online safety and appropriate digital behavior.</li>
                <li>Regular Check-ins: Regularly discuss online experiences and any concerns with children.</li>
                <li>Technical Security: Ensure home devices have updated security software and parental controls.</li>
                <li>Immediate Reporting: Report any safety concerns or inappropriate behavior immediately.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.3 Emergency Response Protocols</h4>
              <p>Immediate Action Items:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Safety Incident: Immediate suspension of involved parties pending investigation.</li>
                <li>Emergency Services: Contact appropriate law enforcement or child protection services.</li>
                <li>Parent Notification: Immediate notification of parents/guardians about any safety concerns.</li>
                <li>Evidence Preservation: Secure preservation of all relevant communications and session records.</li>
                <li>Support Services: Provide access to counseling and support services as needed.</li>
              </ul>
              <p>Investigation Procedures:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Professional Investigation: Qualified professionals conduct thorough investigation of incidents.</li>
                <li>Due Process: Fair investigation process with rights of all parties protected.</li>
                <li>Confidentiality: Maintain confidentiality while ensuring safety and legal compliance.</li>
                <li>Legal Compliance: Full cooperation with law enforcement and regulatory authorities.</li>
                <li>Corrective Action: Implement corrective measures to prevent future incidents.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>12. TEACHER-STUDENT INTERACTION GUIDELINES</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.1 Professional Boundaries</h4>
              <p>Appropriate Interactions:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Educational Focus: All interactions must be strictly educational and curriculum-related.</li>
                <li>Professional Communication: Respectful, age-appropriate communication at all times.</li>
                <li>Platform Channels: All communication through official platform channels only.</li>
                <li>Group Settings: Preference for group sessions or supervised individual sessions.</li>
                <li>Parental Transparency: All interactions transparent and reportable to parents.</li>
              </ul>
              <p>Prohibited Behaviors:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Personal Relationships: No personal relationships beyond professional teacher-student interaction.</li>
                <li>Private Communication: No communication through personal social media, phone or email.</li>
                <li>Inappropriate Content: No sharing of inappropriate, offensive or non-educational content.</li>
                <li>Physical Contact: Strict prohibition of inappropriate physical contact in offline sessions.</li>
                <li>Gift Exchange: No exchange of personal gifts or favors between teachers and students.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.2 Communication Protocols</h4>
              <p>Platform Communication Standards:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Recorded Sessions: All video sessions recorded for safety and quality assurance.</li>
                <li>Message Monitoring: All text communications monitored for appropriateness.</li>
                <li>Response Times: Teachers must respond to educational queries within 24 hours.</li>
                <li>Professional Language: All communication in professional, educational language.</li>
                <li>Parental Inclusion: Parents have access to all teacher-student communications.</li>
              </ul>
              <p>Offline Session Guidelines:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Location Safety: Sessions only in safe, appropriate locations with parental approval.</li>
                <li>Supervision Requirements: Adult supervision preferred for sessions with minor students.</li>
                <li>Time Boundaries: Clear start and end times with adherence to scheduled duration.</li>
                <li>Emergency Protocols: Clear emergency contact procedures for offline sessions.</li>
                <li>Safety Reporting: Immediate reporting mechanism for any safety concerns.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.3 Content and Curriculum Standards</h4>
              <p>Educational Content Guidelines:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Curriculum Alignment: All content aligned with prescribed syllabi and examination patterns.</li>
                <li>Age Appropriateness: All materials suitable for student's age and academic level.</li>
                <li>Quality Standards: High-quality, accurate and up-to-date educational content.</li>
                <li>Cultural Sensitivity: Respect for diverse cultural, religious and social backgrounds.</li>
                <li>Inclusive Education: Content accessible to students with different learning abilities.</li>
              </ul>
              <p>Assessment and Feedback:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Regular Evaluation: Periodic assessments to track student progress and understanding.</li>
                <li>Constructive Feedback: Positive, encouraging feedback focused on academic improvement.</li>
                <li>Parent Communication: Regular progress reports and parent-teacher consultations.</li>
                <li>Performance Tracking: Systematic tracking of student academic performance.</li>
                <li>Remedial Support: Additional support for students facing academic difficulties.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>13. ACADEMIC PROGRESS AND QUALITY ASSURANCE</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.1 Performance Monitoring System</h4>
              <p>Real-time Progress Tracking:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Digital Dashboard: Parents and students can access real-time academic progress reports.</li>
                <li>Regular Assessments: Weekly/monthly tests and evaluations to track learning progress.</li>
                <li>Performance Analytics: Data-driven insights into student strengths and improvement areas.</li>
                <li>Goal Setting: Clear academic goals with milestone tracking and achievement recognition.</li>
                <li>Comparative Analysis: Performance comparison with peers and academic standards.</li>
              </ul>
              <p>Quality Metrics:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Attendance Tracking: Detailed attendance records for all sessions.</li>
                <li>Assignment Completion: Monitoring of homework and assignment submission rates.</li>
                <li>Test Scores: Regular assessment results and trend analysis.</li>
                <li>Learning Outcomes: Measurement of specific learning objectives achievement.</li>
                <li>Student Satisfaction: Regular feedback on teaching quality and learning experience.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.2 Teacher Performance Standards</h4>
              <p>Quality Assurance Measures:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Student Feedback: Regular rating and review system for all teachers.</li>
                <li>Parent Evaluation: Periodic parent feedback on teacher performance and communication.</li>
                <li>Surprise Monitoring: Random quality checks and session observations.</li>
                <li>Performance Reviews: Regular evaluation of teaching effectiveness and student outcomes.</li>
                <li>Continuous Training: Ongoing professional development and skill enhancement programs.</li>
              </ul>
              <p>Performance Metrics:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Punctuality: 100% attendance and time compliance requirements.</li>
                <li>Student Progress: Measurable improvement in student academic performance.</li>
                <li>Parent Satisfaction: Minimum satisfaction rating requirements.</li>
                <li>Professional Conduct: Adherence to professional and ethical standards.</li>
                <li>Curriculum Delivery: Effective coverage of prescribed syllabus and learning objectives.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>13.3 Improvement and Remedial Measures</h4>
              <p>Student Support Services:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Extra Help: Additional support sessions for students facing academic difficulties.</li>
                <li>Specialized Attention: Customized learning plans for students with special needs.</li>
                <li>Doubt Clearing: 24/7 access to subject experts for query resolution.</li>
                <li>Study Materials: Access to additional educational resources and practice materials.</li>
                <li>Counseling Support: Academic and career counseling services for students.</li>
              </ul>
              <p>Quality Enhancement:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Teacher Substitution: 7-day replacement guarantee for unsatisfactory teachers.</li>
                <li>Curriculum Updates: Regular review and updating of teaching materials and methods.</li>
                <li>Technology Integration: Use of latest educational technology for enhanced learning.</li>
                <li>Feedback Integration: Systematic integration of student and parent feedback.</li>
                <li>Best Practices: Implementation of proven educational best practices and methodologies.</li>
              </ul>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>14. GRIEVANCE REDRESSAL AND SUPPORT</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.1 Internal Grievance Mechanism</h4>
              <p>Multi-tier Support System:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Level 1 Customer Support: 24/7 support through phone, email and chat.</li>
                <li>Level 2 Management Review: Escalation to senior management for unresolved issues.</li>
                <li>Level 3 Executive Review: CEO/MD level review for serious complaints.</li>
                <li>Dedicated Grievance Officer: Specialized officer for complaint handling and resolution.</li>
              </ul>
              <p>Grievance Categories:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Service Quality: Issues related to teaching quality, punctuality or professional conduct.</li>
                <li>Payment Disputes: Billing errors, refund issues or payment processing problems.</li>
                <li>Safety Concerns: Any safety-related incidents or inappropriate behavior.</li>
                <li>Technical Issues: Platform functionality, connectivity or technical support problems.</li>
                <li>Privacy Violations: Data protection, privacy or confidentiality concerns.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.2 Complaint Processing Timeline</h4>
              <p>Rapid Response Framework:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Immediate Acknowledgment: All complaints acknowledged within 2 hours of receipt.</li>
                <li>Initial Assessment: Preliminary evaluation and categorization within 24 hours.</li>
                <li>Investigation Process: Detailed investigation completed within 5 to 7 working days.</li>
                <li>Resolution Communication: Final resolution communicated within 10 working days.</li>
                <li>Follow-up Service: Post-resolution follow-up to ensure complete satisfaction.</li>
              </ul>
              <p>Emergency Response:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Safety Issues: Immediate response within 1 hour for safety-related concerns.</li>
                <li>Service Disruption: Technical issues resolved within 24 to 48 hours.</li>
                <li>Payment Problems: Billing disputes addressed within 72 hours.</li>
                <li>Teacher Issues: Teacher-related complaints addressed within 48 hours.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.3 External Redressal Options</h4>
              <p>Consumer Protection Remedies:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>District Consumer Commission: For complaints up to ₹1 crore in value.</li>
                <li>State Consumer Commission: For complaints between ₹1 crore and ₹10 crore.</li>
                <li>National Consumer Disputes Redressal Commission: For complaints above ₹10 crore.</li>
                <li>Online Consumer Mediation: Digital dispute resolution through government portals.</li>
              </ul>
              <p>Other Legal Remedies:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Civil Courts: Breach of contract or service deficiency cases.</li>
                <li>Criminal Courts: For any criminal law violations or safety incidents.</li>
                <li>Educational Authorities: Complaints to relevant educational regulatory bodies.</li>
                <li>Cyber Crime Cells: For digital safety or cyber security related issues.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>14.4 Support Services and Resources</h4>
              <p>Student and Parent Support:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Academic Counseling: Professional guidance for academic and career planning.</li>
                <li>Technical Support: Help with platform usage, device setup and connectivity issues.</li>
                <li>Emergency Helpline: 24/7 emergency contact for urgent safety or service concerns.</li>
                <li>Educational Resources: Access to additional study materials, practice tests and learning aids.</li>
                <li>Community Forum: Platform for parents and students to share experiences and tips.</li>
              </ul>

              {/* SECTION 15 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>15. TERMINATION AND SUSPENSION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>15.1 Voluntary Termination by Users</h4>
              <p>Student/Parent Initiated Termination:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Notice Period: 7 days advance notice required for service termination.</li>
                <li>Final Payments: Settlement of all outstanding dues and pro-rata fee adjustments.</li>
                <li>Data Handling: Clear instructions on data deletion or retention as per user preference.</li>
                <li>Feedback Collection: Exit feedback to improve services for future users.</li>
                <li>Refund Processing: Any applicable refunds processed within 15 working days.</li>
              </ul>
              <p>Reasons for Voluntary Termination:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Academic Goals Achieved: Completion of educational objectives or examination preparation.</li>
                <li>Relocation: Change of location affecting service delivery.</li>
                <li>Financial Constraints: Inability to continue due to financial reasons.</li>
                <li>Service Dissatisfaction: Unresolved quality or service issues.</li>
                <li>Alternative Arrangements: Switching to alternative educational services.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>15.2 Platform-Initiated Termination</h4>
              <p>Grounds for Termination:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Payment Default: Non-payment of fees for more than 30 days despite reminders.</li>
                <li>Policy Violations: Serious or repeated violations of platform terms and policies.</li>
                <li>Safety Concerns: Any behavior that compromises platform safety or security.</li>
                <li>Misuse of Services: Using platform for purposes other than legitimate educational activities.</li>
                <li>False Information: Providing fraudulent or misleading information during registration or usage.</li>
              </ul>
              <p>Termination Process:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Warning System: Progressive warnings for minor violations before termination.</li>
                <li>Due Process: Fair opportunity to respond to allegations before final decision.</li>
                <li>Written Notice: Formal termination notice with reasons and effective date.</li>
                <li>Data Retention: Clear policy on data handling post-termination.</li>
                <li>Appeal Rights: Right to appeal termination decision through grievance mechanism.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>15.3 Suspension Procedures</h4>
              <p>Temporary Suspension Scenarios:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Investigation Pending: Suspension during investigation of serious allegations.</li>
                <li>Safety Precaution: Temporary suspension to ensure safety of all platform users.</li>
                <li>Policy Review: Brief suspension pending clarification of policy violations.</li>
                <li>Technical Issues: Service suspension due to platform maintenance or technical problems.</li>
                <li>Payment Issues: Temporary suspension for payment verification or dispute resolution.</li>
              </ul>
              <p>Suspension Rights and Procedures:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Written Notification: Clear communication of suspension reasons and duration.</li>
                <li>Limited Access: Continued access to account information and communication features.</li>
                <li>Appeal Process: Right to appeal suspension decision through formal grievance process.</li>
                <li>Reinstatement: Clear criteria and process for service reinstatement.</li>
                <li>Compensation: Service credit or refund for wrongful suspension.</li>
              </ul>

              {/* SECTION 16 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>16. LEGAL COMPLIANCE AND CRIMINAL LAW</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.1 Consumer Protection Act 2019 Compliance</h4>
              <p>
                TheMentR acknowledges that educational services constitute "services" under the Consumer Protection Act, 2019, and students/parents are "consumers" with full legal rights.
              </p>
              <p>Statutory Rights Protected:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Right to Safety: Protection from hazardous educational practices or unsafe environments.</li>
                <li>Right to Information: Complete transparency about services, fees, teacher qualifications and policies.</li>
                <li>Right to Choose: Freedom to select teachers, timings and service levels without coercion.</li>
                <li>Right to be Heard: Effective grievance redressal and complaint mechanism.</li>
                <li>Right to Redress: Legal remedies for service deficiencies or unfair trade practices.</li>
                <li>Right to Consumer Education: Information about consumer rights and platform policies.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.2 Child Protection and Safety Laws</h4>
              <p>Criminal Law Compliance:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>POCSO Act 2012: Strict compliance with Protection of Children from Sexual Offences Act.</li>
                <li>Information Technology Act 2000: Adherence to cyber safety and child protection provisions.</li>
                <li>Juvenile Justice Act 2015: Recognition of children's rights and special protection needs.</li>
                <li>Indian Penal Code/Bharatiya Nyaya Sanhita: Prevention of all forms of child abuse and exploitation.</li>
              </ul>
              <p>Mandatory Reporting Obligations:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Child Abuse: Immediate reporting to authorities and parents of suspected abuse or exploitation.</li>
                <li>Cyber Crimes: Reporting of cyber bullying, online harassment or digital safety violations.</li>
                <li>Criminal Activity: Cooperation with law enforcement in case of any criminal investigations.</li>
                <li>Safety Incidents: Documentation and reporting of all safety-related incidents.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.3 Data Protection and Privacy Laws</h4>
              <p>Digital Personal Data Protection Act 2023:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Lawful Processing: All data processing based on valid legal grounds and consent.</li>
                <li>Children's Data: Enhanced protection with mandatory parental consent for minors.</li>
                <li>Data Subject Rights: Full implementation of access, correction, deletion and portability rights.</li>
                <li>Breach Notification: Immediate reporting of data breaches to authorities and affected users.</li>
                <li>Cross-border Transfer: Compliance with data localization and international transfer requirements.</li>
              </ul>
              <p>IT Rules 2021:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Content Moderation: Proactive identification and removal of harmful content.</li>
                <li>Grievance Redressal: Dedicated grievance officer for user complaints and concerns.</li>
                <li>Due Diligence: Regular monitoring and prompt action on reported violations.</li>
                <li>Transparency Reports: Regular reporting on content moderation and safety actions.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>16.4 Criminal Liability and Legal Consequences</h4>
              <p>Zero Tolerance for Criminal Activities:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Immediate Suspension: Any person involved in criminal activities immediately suspended.</li>
                <li>Legal Cooperation: Full cooperation with law enforcement agencies and judicial processes.</li>
                <li>Evidence Preservation: Systematic preservation of evidence for legal proceedings.</li>
                <li>Victim Support: Support and assistance to victims of criminal activities.</li>
                <li>Preventive Measures: Enhanced security measures to prevent future incidents.</li>
              </ul>
              <p>Reporting and Response:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Emergency Contacts: Direct access to police (112), child helpline (1098), and cybercrime helpline (155260).</li>
                <li>Legal Support: Access to legal assistance for serious criminal law violations.</li>
                <li>Counseling Services: Professional counseling support for affected students and families.</li>
                <li>Recovery Assistance: Help with academic continuity and emotional recovery.</li>
              </ul>

              {/* SECTION 17 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>17. LIMITATION OF LIABILITY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.1 Platform Liability Framework</h4>
              <p>
                TheMentR operates as an educational service platform connecting verified teachers with students, and accepts liability for:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Reasonable Care: Ensuring reasonable care in teacher verification and platform security.</li>
                <li>Service Standards: Maintaining promised quality standards and service delivery.</li>
                <li>Consumer Rights: Honoring all consumer rights under applicable laws.</li>
                <li>Data Protection: Protecting personal data as per legal requirements and platform policies.</li>
                <li>Safety Measures: Implementing reasonable safety measures for all users.</li>
              </ul>
              <p>Liability Limitations:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Third-Party Actions: Limited liability for independent actions of teachers or students.</li>
                <li>External Factors: No liability for issues beyond reasonable control (natural disasters, government orders).</li>
                <li>Misuse by Users: Limited liability for user misuse of platform services or violation of terms.</li>
                <li>Technical Limitations: Reasonable efforts basis for technical platform performance.</li>
                <li>Educational Outcomes: No guarantee of specific academic results or examination success.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.2 User Liability and Responsibilities</h4>
              <p>Student and Parent Liability:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Accurate Information: Responsibility for providing accurate and truthful information.</li>
                <li>Platform Misuse: Liability for damages caused by misuse of platform services.</li>
                <li>Payment Obligations: Full responsibility for timely payment of fees and charges.</li>
                <li>Safety Compliance: Compliance with safety guidelines and reporting of incidents.</li>
                <li>Third-Party Claims: Indemnification for claims arising from user violations of terms.</li>
              </ul>
              <p>Damage Limitations:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Direct Damages: Liability limited to actual financial losses directly caused.</li>
                <li>Indirect Damages: Exclusion of liability for consequential or punitive damages.</li>
                <li>Maximum Liability: Platform liability capped at total fees paid in the relevant period.</li>
                <li>Insurance Coverage: Professional indemnity insurance for platform operations.</li>
                <li>Legal Costs: Recovery of legal costs for frivolous or malicious claims.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>17.3 Force Majeure and Extraordinary Circumstances</h4>
              <p>Excused Performance Events:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Natural Disasters: Earthquakes, floods, pandemics and other natural calamities.</li>
                <li>Government Actions: Emergency declarations, lockdowns and regulatory changes.</li>
                <li>Technical Failures: Major internet outages or cyber security incidents beyond control.</li>
                <li>Legal Changes: Significant changes in applicable laws affecting service delivery.</li>
                <li>Economic Disruptions: Major economic events affecting platform operations.</li>
              </ul>
              <p>Mitigation and Continuity:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Best Efforts: Good faith efforts to minimize impact and maintain service continuity.</li>
                <li>Alternative Arrangements: Provision of alternative service delivery methods where possible.</li>
                <li>Fair Allocation: Equitable sharing of costs and losses during force majeure events.</li>
                <li>Communication: Regular communication with users about impact and recovery plans.</li>
                <li>Service Credits: Appropriate service credits or extensions for disrupted services.</li>
              </ul>

              {/* SECTION 18 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>18. DISPUTE RESOLUTION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.1 Governing Law and Jurisdiction</h4>
              <p>Legal Framework:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Governing Law: These Terms are governed by the laws of the Republic of India.</li>
                <li>Primary Jurisdiction: Courts in Bhubaneswar, Odisha, India have exclusive jurisdiction.</li>
                <li>Consumer Law Priority: Consumer Protection Act 2019 provisions supersede conflicting contract terms.</li>
                <li>Child Protection Laws: POCSO Act 2012 and other child protection laws take precedence.</li>
                <li>Constitutional Rights: Fundamental rights under the Indian Constitution cannot be waived.</li>
              </ul>
              <p>Dispute Categories:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Consumer Disputes: Matters under Consumer Protection Act jurisdiction.</li>
                <li>Contract Disputes: Breach of terms and service agreement issues.</li>
                <li>Child Safety: Issues under POCSO Act and child protection laws.</li>
                <li>Data Protection: DPDP Act 2023 and privacy-related disputes.</li>
                <li>Criminal Matters: Issues requiring law enforcement involvement.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.2 Hierarchical Dispute Resolution</h4>
              <p>Step 1: Internal Resolution (0 to 15 days)</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Direct Negotiation: Initial resolution attempt through customer support.</li>
                <li>Management Escalation: Involvement of senior management for complex issues.</li>
                <li>Mediation Attempt: Internal mediation through grievance officer.</li>
                <li>Documentation: Written record of all resolution attempts and outcomes & Settlement Agreement.</li>
              </ul>
              <p>Step 2: Consumer Forum Resolution (16 to 90 days)</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Consumer Commission: Approach appropriate consumer commission based on claim value.</li>
                <li>Legal Representation: Right to legal representation and assistance.</li>
                <li>Evidence Submission: Systematic presentation of evidence and documentation.</li>
                <li>Interim Relief: Request for interim orders to prevent ongoing harm & Final Orders.</li>
              </ul>
              <p>Step 3: Alternative Dispute Resolutions (Parallel Process)</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Mediation Services: Professional mediation through certified mediators.</li>
                <li>Arbitration Option: Binding arbitration for specific contractual disputes.</li>
                <li>Conciliation: Voluntary conciliation for relationship preservation.</li>
                <li>Online Resolution: Digital dispute resolution for qualifying disputes & Expedited Procedures.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.3 Emergency and Urgent Matters</h4>
              <p>Immediate Relief Scenarios:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Child Safety: Emergency intervention for immediate safety concerns.</li>
                <li>Service Disruption: Urgent restoration of critical educational services.</li>
                <li>Payment Disputes: Emergency financial relief for service continuity.</li>
                <li>Criminal Activities: Immediate law enforcement involvement and platform action.</li>
                <li>Data Breaches: Emergency data protection and notification procedures.</li>
              </ul>
              <p>Emergency Response Protocol:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>24/7 Availability: Round-the-clock emergency contact and SOS response system.</li>
                <li>Rapid Assessment: Immediate evaluation of urgency and required intervention.</li>
                <li>Authority Coordination: Direct coordination with relevant authorities and agencies.</li>
                <li>Interim Protection: Immediate protective measures while permanent solution is developed.</li>
                <li>Follow-up Action: Systematic follow-up to ensure effective resolution.</li>
              </ul>

              {/* SECTION 19 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>19. AMENDMENTS AND UPDATES</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.1 Amendment Authority and Process</h4>
              <p>Platform Rights:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Amendment Authority: TheMentR reserves the right to modify these Terms with proper notice.</li>
                <li>Legal Compliance: Amendments to ensure continued compliance with evolving laws.</li>
                <li>Service Improvement: Updates to reflect new features, services or policies.</li>
                <li>User Protection: Changes to enhance user safety, security or experience.</li>
                <li>Regulatory Requirements: Modifications required by regulatory authorities.</li>
              </ul>
              <p>Notice and Communication:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Advance Notice: Minimum 30 days’ notice for material changes to terms.</li>
                <li>Multi-Channel Communication: Notification through email, platform dashboard and mobile app.</li>
                <li>Clear Explanation: Simple explanation of changes and their impact on users.</li>
                <li>Opt-out Options: Right to terminate services if unable to accept new terms.</li>
                <li>Effective Date: Clear specification of when amended terms take effect.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.2 User Consent and Acceptance</h4>
              <p>Consent Mechanisms:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Express Consent: Required for significant changes affecting user rights.</li>
                <li>Implied Consent: Continued use constitutes acceptance of minor updates.</li>
                <li>Opt-in Requirements: Special consent for changes affecting data processing or privacy.</li>
                <li>Parental Consent: Additional parental consent required for changes affecting minors.</li>
                <li>Documentation: Written record of user consent to amended terms.</li>
              </ul>
              <p>User Rights during Changes:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Review Period: Adequate time to review and understand proposed changes.</li>
                <li>Clarification Rights: Right to seek clarification on any amended provisions.</li>
                <li>Objection Rights: Ability to object to changes and seek alternatives.</li>
                <li>Termination Rights: Right to terminate services without penalty if changes are unacceptable.</li>
                <li>Grandfathering: Protection of existing rights where legally and practically feasible.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>19.3 Version Control and Documentation</h4>
              <p>Document Management:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Version Numbering: Clear version control with date stamps and change logs.</li>
                <li>Archive Access: Previous versions available for reference and legal purposes.</li>
                <li>Change Tracking: Detailed documentation of all modifications and reasons.</li>
                <li>Legal Review: All amendments reviewed by legal counsel for compliance.</li>
                <li>User Communication: Summary of changes provided to all users.</li>
              </ul>

              {/* SECTION 20 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>20. GENERAL PROVISIONS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>20.1 Entire Agreement and Integration</h4>
              <p>Complete Agreement:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Comprehensive Terms: These Terms constitute the complete agreement between parties.</li>
                <li>Superseding Effect: Replaces all previous agreements, communications and understandings.</li>
                <li>Policy Integration: Incorporates Privacy Policy, Community Guidelines and other policies by reference.</li>
                <li>No Oral Modifications: Changes must be in writing and properly executed.</li>
                <li>Consistent Interpretation: All platform terms and guidelines shall be interpreted in harmony.</li>
              </ul>

            </div>
          </div>
        )}

        {/* TAB 3: TEACHERS TERMS & CONDITIONS */}
        {activeTab === 'teachers' && (
          <div style={{ background: '#FFFFFF', borderRadius: 24, padding: '48px 40px', border: '1px solid rgba(59, 130, 246, 0.18)', boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.06)', transform: 'translateZ(0)', willChange: 'transform' }}>
            
            <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: 24, marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                TERMS AND CONDITIONS FOR TEACHERS
              </h2>
              <div style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>
                WWW.THEMENTR.COM | BUDIN CANDOR PVT. LTD. For ‘TheMentR’
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
                Effective Date: December 01, 2025 | Last Updated: December 01, 2025
              </div>
            </div>

            {/* Document Body */}
            <div style={{ color: '#334155', fontSize: 15, lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>

              <h4 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginTop: 24, marginBottom: 12 }}>TABLE OF CONTENTS</h4>
              <ol style={{ paddingLeft: 20, marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 14, color: '#475569', fontWeight: 500 }}>
                <li>1. Preamble</li>
                <li>2. Definitions and Interpretation</li>
                <li>3. Teacher Registration and Eligibility</li>
                <li>4. Verification and Background Checks</li>
                <li>5. Teacher Code of Conduct</li>
                <li>6. Criminal Law Compliance</li>
                <li>7. Child Protection and Safety</li>
                <li>8. Employment Terms and Classification</li>
                <li>9. Duties and Responsibilities</li>
                <li>10. Compensation and Payment Terms</li>
                <li>11. Platform Usage and Technology</li>
                <li>12. Intellectual Property Rights</li>
                <li>13. Confidentiality and Data Protection</li>
                <li>14. Disciplinary Actions and Consequences</li>
                <li>15. Termination and Suspension</li>
                <li>16. Grievance Redressal</li>
                <li>17. Legal Compliance and Statutory Requirements</li>
                <li>18. Limitation of Liability</li>
                <li>19. Dispute Resolution</li>
                <li>20. General Provisions</li>
              </ol>

              <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '32px 0' }} />

              {/* SECTION 1 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>1. PREAMBLE</h3>
              <p>
                These Terms and Conditions ("Terms") constitute a legally binding agreement between BUDIN Candor Private Limited, a company incorporated under the Companies Act, 2013 ("Company" or "TheMentR" or "Platform") and individuals registering as part-time/ full-time teachers on the TheMentR platform ("Teacher" or "you").
                <br />
                TheMentR Mission Statement: "Where Learning meets its Purpose... " These Terms are designed to ensure:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Complete compliance with Indian criminal law and educational regulations</li>
                <li>Protection of children and students as mandated by law</li>
                <li>Professional conduct and accountability in educational services</li>
                <li>Fair and transparent working conditions for teachers</li>
                <li>Maintenance of educational quality and institutional integrity</li>
              </ul>
              <p>
                By registering on the TheMentR platform, you acknowledge that you have read, understood and agree to be bound by these Terms and all applicable laws of India.
              </p>

              {/* SECTION 2 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>2. DEFINITIONS AND INTERPRETATION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>2.1 Definitions</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>"Child" means any person below the age of 18 years as per the Juvenile Justice Act, 2015</li>
                <li>"Company" means BUDIN Candor Private Limited operating the TheMentR platform</li>
                <li>"Corporal Punishment" means physical punishment and mental harassment as prohibited under RTE Act, 2009</li>
                <li>"Criminal Activity" includes all offences under the Indian Penal Code, 2023 (Bharatiya Nyaya Sanhita) and special laws</li>
                <li>"Educational Services" means tutoring, teaching and related academic support services</li>
                <li>"Platform" means the TheMentR website, mobile applications and all associated digital infrastructure</li>
                <li>"Student" means any learner registered on the platform, including minors and adults</li>
                <li>"Teacher" means any individual registered to provide educational services through the platform in any mode - physically/ virtually</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>2.2 Interpretation</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>These Terms shall be interpreted in accordance with Indian law and judicial precedents</li>
                <li>In case of conflict between these Terms and applicable law, the law shall prevail</li>
                <li>References to statutes include amendments and successor legislation</li>
                <li>Headings are for convenience only and do not affect the interpretation</li>
              </ul>

              {/* SECTION 3 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>3. TEACHER REGISTRATION AND ELIGIBILITY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.1 Minimum Eligibility Criteria</h4>
              <p>To register as a teacher on TheMentR, you must:</p>
              <p><strong>Age and Citizenship:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Be at least 18 years of age</li>
                <li>Be an Indian citizen or have valid work authorization in India</li>
                <li>Have legal capacity to enter into contracts</li>
              </ul>

              <p><strong>Minimum Educational Qualifications:</strong> <em>(Possession of mere educational qualifications does not ensure any service guarantee from TheMentR)</em></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Category A: Classes 0 to 3 — Minimum 10+ 2 from any recognized board</li>
                <li>Category B: Classes 4 to 7 — Bachelor's degree (B.Sc., B.Com., B.A., etc.)</li>
                <li>Category C: Classes 8 to 10 — Bachelor's degrees with subject specialization</li>
                <li>Category D: Classes 8 to 10 (Individual Subjects): Master's degree in relevant subject</li>
                <li>Category E: Classes 11 & 12 — Master's degree or higher professional qualification</li>
                <li>Category F: (Subject Experts): Advanced qualifications along with Category E with minimum 5 years of teaching experience</li>
              </ul>

              <p><strong>Additional Requirements:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>B E d / M E d / Teacher Eligibility Test TET qualification for Classes 1 to 8 (preferable wherever applicable)</li>
                <li>Must appear and qualify an Expert Interview and Personality Test prior to the issue of the Letter of Agreement (LoA)</li>
                <li>No criminal record or pending criminal cases</li>
                <li>Physical and mental fitness to work with children</li>
                <li>Fluency in English, Hindi and/ or regional languages</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.2 Prohibited Categories</h4>
              <p>You are not eligible to register if you:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Have been convicted of any criminal offence, especially those involving children</li>
                <li>Have been terminated from any educational institution for misconduct</li>
                <li>Are currently facing criminal charges related to child safety or educational malpractice</li>
                <li>Have been blacklisted by any education authority</li>
                <li>Suffer from any contagious disease that may endanger student health</li>
                <li>Have been rejected or disqualified in the Expert Interview and/ or the Personality Test</li>
                <li>Have a history of substance abuse/ Drugs affecting professional capability</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>3.3 Registration Process</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Online Application: Complete the online/ offline (whichever is applicable) registration form with accurate information</li>
                <li>Document Upload: Submit all required certificates and documents</li>
                <li>Verification: Undergo multi-step verification process as detailed in Section 4</li>
                <li>Interview: Appear in a dual-round virtual or physical interview assessment (whichever is applicable)</li>
                <li>Agreement: Accept these Terms and Conditions electronically or in writing</li>
                <li>Probation: Initial appointment on LoA with probationary terms for performance evaluation</li>
              </ul>

              {/* SECTION 4 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>4. VERIFICATION AND BACKGROUND CHECKS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.1 Mandatory Verification Process</h4>
              <p>All teachers must undergo comprehensive verification:</p>
              <p><strong>Document Verification:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Government-issued photo identification (Aadhaar, PAN, Passport, Voter ID)</li>
                <li>Educational qualification certificates and mark sheets</li>
                <li>Professional experience certificates and references</li>
                <li>Address proof and contact verification</li>
                <li>Medical fitness certificate (if required)</li>
                <li>Experience certificate (if required)</li>
                <li>Compulsory e-mail, Phone number & Aadhaar verification by electronic means</li>
              </ul>
              <p><strong>Background Screening:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Police/ third party verification and background checks</li>
                <li>Previous employer reference verification & Educational institution reference checks</li>
                <li>Online presence and social media screening & Professional conduct verification</li>
              </ul>
              <p><strong>Skills Assessment:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Subject knowledge evaluation through written/ oral tests by the subject experts</li>
                <li>Demo lesson or teaching video submission</li>
                <li>Communication skills and language proficiency assessment</li>
                <li>Technology literacy and platform usage training and assessments</li>
                <li>Child interaction and safety awareness evaluation</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.2 Ongoing Verification Requirements</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Annual re-verification of all documents and credentials</li>
                <li>Periodic background checks and reference updates</li>
                <li>Continuous monitoring of criminal records and legal status</li>
                <li>Performance evaluation and feedback assessment</li>
                <li>Compliance with updated platform policies and legal requirements</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>4.3 Verification Standards and Consequences</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Successful Verification: Full platform access and teaching privileges</li>
                <li>Conditional Verification: Limited access with specific restrictions</li>
                <li>Failed Verification: Registration denial or immediate suspension</li>
                <li>False Information: Permanent ban and potential legal action</li>
                <li>Incomplete Verification: Temporary suspension until completion</li>
              </ul>

              {/* SECTION 5 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>5. TEACHER CODE OF CONDUCT</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.1 Professional Ethics and Standards</h4>
              <p><strong>Teaching Excellence:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Maintain subject matter expertise and continue professional development</li>
                <li>Prepare thoroughly for each teaching session with appropriate lesson plans</li>
                <li>Use effective teaching methodologies suitable for individual student needs</li>
                <li>Provide constructive feedback and regular progress updates to students/parents</li>
                <li>Ensure punctuality and reliability in all scheduled sessions</li>
              </ul>
              <p><strong>Professional Behavior:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Demonstrate respect, dignity and courtesy towards all students and parents</li>
                <li>Maintain professional boundaries and appropriate teacher-student relationships</li>
                <li>Dress appropriately and maintain professional appearance during sessions. (viz. Don’t wear Roundneck T-Shirts, Torn Jeans, Shorts, Tracksuits etc. during teaching sessions)</li>
                <li>Communicate clearly, effectively and respectfully at all times</li>
                <li>Maintain professional attire ensuring personal hygiene and self-grooming</li>
                <li>Avoid any behavior that may compromise your professional reputation</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.2 Interaction Guidelines</h4>
              <p><strong>Student Interaction:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Treat all students with equal respect regardless of background, ability or characteristics</li>
                <li>Maintain appropriate physical and emotional boundaries with students</li>
                <li>Never engage in any form of discrimination, harassment or favoritism</li>
                <li>Report any concerns about student welfare to appropriate authorities</li>
                <li>Respect student/ Parent privacy and confidentiality</li>
              </ul>
              <p><strong>Parent/ Guardian Communication:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Maintain professional and respectful communication with parents/ guardians</li>
                <li>Provide regular updates on student progress and performance</li>
                <li>Address parent concerns promptly and professionally</li>
                <li>Respect family values, religious and cultural sensitivities and sentiments, still strictly avoiding students’ or his/ her relatives’ family functions, religious rituals, parties etc.</li>
                <li>Maintain truth, trust & transparency in all personal, professional and educational activities</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.3 Platform Conduct Standards</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Use the platform and its resources responsibly and ethically</li>
                <li>Maintain account security and protect login credentials</li>
                <li>Report technical issues or platform abuse promptly</li>
                <li>Respect intellectual property rights of content and materials</li>
                <li>Follow all platform policies and usage guidelines with utmost respect & priority</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>5.4 Platform Uses & Geotagged Attendance</h4>
              <p>By accepting these terms and conditions, The Teacher has to:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Provide his/ her verifiable identity (Photo, Qualification, Aadhaar, PAN, Bank Account Details, Contact Number, E-mail ID, Age, Address, Location etc.) for getting registered with TheMentR and for using the platform/ app features</li>
                <li><strong>Take attendance each time he/she attends a scheduled class through TheMentR by taking his/ her geotagged photos</strong></li>
                <li>Give necessary permissions to the app for obtaining his/ her digital information as to be needed to use all features in the benefit of the self and smooth functioning of the platform</li>
                <li>Use the platform as the sole medium of contacts and communication with the Parent/ Student</li>
              </ul>

              {/* SECTION 6 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>6. CRIMINAL LAW COMPLIANCE</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.1 Prohibition of Criminal Activities</h4>
              <p>Teachers are strictly prohibited from engaging in any criminal activities as defined under Indian law:</p>
              <p><strong>Crimes Against Children (Bharatiya Nyaya Sanhita 2023):</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Section 93: Exposure and abandonment of child under twelve years</li>
                <li>Section 94: Concealment of birth by secret disposal of dead body</li>
                <li>Section 95: Hiring, employing or engaging a child to commit an offence</li>
                <li>Section 96: Procuration of child for illicit purposes</li>
              </ul>
              <p><strong>Sexual Offences (POCSO Act 2012):</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Any form of penetrative sexual assault or sexual assault against children</li>
                <li>Sexual harassment of minors through words, acts or gestures</li>
                <li>Use of children for pornographic purposes or exploitation</li>
                <li>Abetment or attempt of any sexual offence against children</li>
              </ul>
              <p><strong>Physical Violence and Assault:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Any form of corporal punishment or physical harm to students</li>
                <li>Mental harassment, intimidation or psychological abuse</li>
                <li>Criminal intimidation or threats against students or parents</li>
                <li>Assault causing hurt or grievous hurt to any child</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.2 Specific Criminal Prohibitions</h4>
              <p><strong>Child Protection Violations:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Employment of child for begging (JJ Act Section 76)</li>
                <li>Giving drugs or intoxicating substances to children (JJ Act Section 77)</li>
                <li>Using a child for drug peddling (JJ Act Section 78)</li>
                <li>Exploitation of child employee (JJ Act Section 79)</li>
                <li>Any form of cruelty to a child (JJ Act Section 75)</li>
              </ul>
              <p><strong>Educational Misconduct:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Fraudulent representation of qualifications or experience</li>
                <li>Misappropriation of student fees or platform payments</li>
                <li>Breach of confidentiality regarding student information</li>
                <li>Unauthorized use or distribution of copyrighted educational materials</li>
                <li>Providing false information to parents or platform administration</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.3 Mandatory Reporting Obligations</h4>
              <p>Teachers must immediately report:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Any criminal activity observed on or off the platform</li>
                <li>Suspected child abuse or neglect by any person</li>
                <li>Safety threats to students or other platform users</li>
                <li>Knowledge of violations of these Terms by other teachers</li>
                <li>Any legal proceedings involving themselves or affecting their ability to teach</li>
                <li>Any illicit nexus of self or any other teacher or group of teachers with any Parent/ Institution/ platform/ company that goes or may go against the platform policies or company interest</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>6.4 Legal Consequences</h4>
              <p>Violation of criminal law provisions will result in:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Immediate Suspension: From all platform activities</li>
                <li>Police Complaint: Filing of criminal complaint with law enforcement</li>
                <li>Legal Proceedings: Full cooperation with police investigation and court proceedings</li>
                <li>Civil Liability: Compensation for damages caused to students or parents</li>
                <li>Permanent Ban: Lifelong prohibition from TheMentR platform along with forfeiture of all dues and collection of all legal expenditures of the company from the delinquent teacher</li>
              </ul>

              {/* SECTION 7 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>7. CHILD PROTECTION AND SAFETY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.1 Zero Tolerance Policy</h4>
              <p>
                TheMentR maintains absolute zero tolerance for any form of child abuse, harassment, illicit relationship, illegal nexus or inappropriate behavior towards Students or Parents.
              </p>
              <p><strong>Prohibited Actions:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Physical Abuse: Any form of corporal punishment, hitting, slapping, or physical harm</li>
                <li>Mental Harassment: Humiliation, intimidation, threats or psychological abuse</li>
                <li>Sexual Misconduct: Any inappropriate sexual behavior, inappropriate touch, penetration, contact or communication</li>
                <li>Neglect: Failure to provide adequate supervision or care during teaching sessions</li>
                <li>Exploitation: Using children for personal gain or inappropriate purposes</li>
                <li><strong>No Direct Deal:</strong> TheMentR does not permit any sort of direct deal between the teachers and the parents/ institution which bypasses TheMentR platform and leads to any direct or notional gain or loss to the brand value or financial health of the company done without obtaining prior and proper permission of the Platform administration.</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.2 Child Safety Protocols</h4>
              <p><strong>Safe Environment Creation:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Ensure teaching environments are safe, appropriate and conducive to learning</li>
                <li>Maintain professional boundaries at all times during student interactions</li>
                <li>Never be alone with a child/ student/ guardian of same or opposite sex in an isolated or private settings without parent consent/ knowledge</li>
                <li>Use appropriate language and behavior suitable for the child's age and development</li>
                <li>Report any safety concerns or inappropriate behavior immediately to the parents through TheMentR</li>
              </ul>
              <p><strong>Online Safety Measures:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Use only platform-approved communication channels for student interaction every time</li>
                <li>Never share personal contact information with students or request their personal details</li>
                <li>Ensure video calls are conducted in appropriate settings with proper supervision even taken on TheMentR platform</li>
                <li>Maintain professional appearance and behavior during the online sessions</li>
                <li>Never indulge in any inappropriate online behavior in words or in content</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.3 Mandatory Child Protection Training & Awareness</h4>
              <p>All teachers must educate themselves and be aware of:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Child protection and safety awareness</li>
                <li>Recognition of signs of abuse and neglect</li>
                <li>Appropriate reporting procedures and protocols</li>
                <li>Professional boundary maintenance</li>
                <li>Age-appropriate interaction guidelines</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>7.4 Consequence Framework</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>First Violation: Minor Written Notice, Warning and mandatory retraining</li>
                <li>Second Violation: Suspension, disciplinary proceedings and formal investigation</li>
                <li>Serious Violation: Immediate termination and police complaint</li>
                <li>Criminal Violation: Immediate termination, police complaint and legal prosecution</li>
              </ul>

              {/* SECTION 8 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>8. EMPLOYMENT TERMS AND CLASSIFICATION</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.1 Employment Classification</h4>
              <p>Teachers on TheMentR are classified as:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Independent Contractors for tax and legal purposes</li>
                <li>Platform Partners for service delivery and quality maintenance</li>
                <li>Verified Professionals subject to ongoing compliance requirements</li>
              </ul>
              <p>This classification means:</p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>You are not an employee of BUDIN Candor Pvt. Ltd.</li>
                <li>You are responsible for your own tax obligations and compliance however, ‘TheMentR’ shall deduct the TDS as applicable from your monthly remuneration payable.</li>
                <li>You maintain flexibility in schedule and teaching approach within the platform guidelines</li>
                <li>You are subject to performance-based evaluation, continuous feedback collection, activity monitoring for continuation</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.2 Professional Relationship Framework</h4>
              <p><strong>Rights and Freedoms:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Choose your teaching schedule and availability within the platform constraints</li>
                <li>Determine teaching methodology within the approved educational standards</li>
                <li>Negotiate fees within platform-defined ranges based on qualifications and performance</li>
                <li>Access platform resources and support systems as allowed by ‘TheMentR’</li>
                <li>Participate in professional development programs to be conducted by ‘TheMentR’</li>
              </ul>
              <p><strong>Obligations and Responsibilities:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Maintain professional standards and platform compliance</li>
                <li>Complete mandatory training and certification programs</li>
                <li>Submit to periodic evaluations and feedback systems</li>
                <li>Maintain updated credentials and qualifications</li>
                <li>Follow platform policies and procedures</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>8.3 Structured Payment and Benefit System</h4>
              <p>Unlike informal tutoring arrangements, ‘TheMentR’ provides:</p>
              <p><strong>Formal Payment Structure:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Monthly direct bank transfers on fixed dates of the following month</li>
                <li>Digital payslips showing earnings, deductions and net pay</li>
                <li>Statutory deductions including the applicable taxes</li>
                <li>Performance-based bonuses and incentive programs</li>
                <li>Transparent fee structure with no hidden deductions</li>
              </ul>
              <p><strong>Social Security Benefits:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Group insurance coverage for accidental death and disability</li>
                <li>Banking assistance for loans and credit facilities (as per banking eligibility)</li>
                <li>Professional development and career advancement opportunities</li>
              </ul>

              {/* SECTION 9 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>9. DUTIES AND RESPONSIBILITIES</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.1 Primary Teaching Responsibilities</h4>
              <p><strong>Academic Excellence:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Deliver high-quality educational content aligned with curriculum standards</li>
                <li>Teach according to the comprehensive lesson plans and teaching materials designed for fulfilling the student & platform requirement</li>
                <li>Conduct extra classes as per the student’s need with regular assessments and provide constructive feedback</li>
                <li>Track and report student progress accurately and timely with mandatory timely completion of the course syllabi</li>
                <li>Adapt teaching methods to individual student capabilities and learning needs</li>
              </ul>
              <p><strong>Student Engagement:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Maintain punctual attendance and session reliability by taking the attendance in time, ending the class and extending the class as per the app instructions without fail</li>
                <li>Create engaging and interactive learning experiences</li>
                <li>Encourage student participation and academic curiosity</li>
                <li>Provide additional support for struggling students</li>
                <li>Celebrate and recognize student achievements appropriately</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.2 Administrative and Platform Duties</h4>
              <p><strong>Record Keeping:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Maintain accurate records of teaching sessions and student attendance as per the Platform policies</li>
                <li>Submit timely reports on student progress and performance</li>
                <li>Document any incidents or concerns promptly and accurately</li>
                <li>Update teaching schedules and availability regularly with prior intimation of absence and rescheduling of classes as per the platform policies</li>
                <li>Timely and accurately complete all required platform documentation and forms</li>
              </ul>
              <p><strong>Quality Assurance:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Participate in periodic quality reviews and evaluations</li>
                <li>Implement feedback from students, parents and platform administrators</li>
                <li>Continuously improve teaching methods and content delivery with adequate self-preparation before each class</li>
                <li>Stay updated with educational trends and subject matter developments</li>
                <li>Contribute to platform improvement through suggestions and feedback</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>9.3 Communication and Reporting Responsibilities</h4>
              <p><strong>Student and Parent Communication:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Provide regular updates on student progress and challenges</li>
                <li>Address parent concerns and questions promptly and professionally</li>
                <li>Maintain open and transparent communication channels & Schedule parent-teacher meetings as needed</li>
                <li>Document all significant communications for record keeping</li>
              </ul>
              <p><strong>Platform Communication:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Respond promptly to platform administration communications using the unique 10 character Teacher MentR ID (TMID) through the designated email ID only</li>
                <li>Report technical issues or platform malfunctions immediately</li>
                <li>Participate in mandatory training sessions and meetings</li>
                <li>Provide feedback on platform features and functionality</li>
                <li>Alert administration to any policy violations or concerns</li>
                <li>Use only Platform specified communication channels for communicating with the Parents and Students in all cases</li>
              </ul>

              {/* SECTION 10 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>10. COMPENSATION AND PAYMENT TERMS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.1 Fee Structure and Categories</h4>
              <p>
                Teachers are categorized into six distinct groups with corresponding per class fee structures with no income capping i.e. Unlimited but Proportionate pay out as per the numbers of hours of classes taken based on the Teacher’s availability and student’s flexibility.
                <br /><br />
                A Teacher may be engaged for any student who shall seek classes for a particular topic/ topics from any subject/ subjects (if he/she so desires where he/she is supposed to be weak) for which a separate fee shall be paid as per TheMentR policy decisions.
                <br /><br />
                The teacher shall be paid a separate fee for each half an hour of extra class if he/ she take it with the mutual consent of the Parent and the Teacher whenever such occasion arises. This per 0.5 Hr Class Fee shall entirely be different from that of the regular one hour of classes and shall be calculated separately and be paid on being included in the monthly Pay slip.
                <br /><br />
                There shall be an additional allowance in shape of Mobile Allowance which shall not exceed Rs. 300/- per month and shall exactly be equal to the Professional Tax as to be deducted from their monthly payouts at the standard rates as per the statutory compliance.
                <br /><br />
                In addition to the above, there shall be an accidental insurance provision for all of the teachers from the day the first pay slip is generated and paid to the Teacher against his one month of work. Except the mobile allowance and accidental insurance no other allowance shall be admissible or claimable by the Teacher on the company.
                <br /><br />
                The teacher shall be paid his fees in the third week of every month for each month of successful works, (preferably on or before the 15th day of each succeeding month) only when if he/ she have satisfactorily worked till the 10th day of the preceding month.
                <br /><br />
                There shall be a deduction of IT TDS from the payout of the teacher every month as per the applicable law and rate against which the Teacher can claim Form 16A from the company. The TDS shall be remitted to the Teacher’s PAN quarterly by the company.
                <br /><br />
                Monetary Penalties shall unconditionally be deducted from the monthly payouts of the teachers in all cases of proven violation of the accepted and applicable company policies, terms and conditions leaving no scope of remedies and appeals (specific to the case).
                <br /><br />
                The teacher can visualize his/ her received, accumulated and accrued fees in a real time basis in the Teacher’s app and can be able to download the pay slips as and when to be required by him/ her from the ‘Earnings’ section of the app.
                <br /><br />
                An additional amount only as per the company’s decision can be paid to the teacher by the company, if he/ she help the company in increasing its brand value or in furthering of its businesses by the personal referrals and efforts of the former which shall be purely discretionary and shall not be enforceable in any case.
                <br /><br />
                The company reserves the right of modifying/ removing/ changing these terms and conditions in part or in full as per the financial feasibility.
              </p>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.2 Payment Processing and Schedule</h4>
              <p><strong>Payment Methodology:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Collection Period: Parents pay in the first week of each month</li>
                <li>Processing Period: Payments processed and verified within one week</li>
                <li>Payment Date: Direct bank transfer usually in the third week of the following month with no involvement of cash in any case</li>
                <li>Payment Condition: Only if teacher has worked continuously and satisfactorily from the previous month till 10th of the succeeding month</li>
              </ul>
              <p><strong>Statutory Deductions:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Professional Tax: As applicable under state laws</li>
                <li>Income Tax: TDS as per applicable slab rates</li>
                <li>Other Deductions: Loans, advances or penalties etc. as applicable</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.3 Performance-Based Incentives</h4>
              <p><strong>Monthly Bonuses:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Exceptional student feedback ratings (above 4.5/ 5 continuous for consecutive 12 months but not applicable to the first 12 months)</li>
                <li>Consistent punctuality and reliability (100% attendance or less than 1% rescheduling of classes)</li>
                <li>Student retention rates (above 90% monthly retention and less than 10% rejection rate)</li>
                <li>New teacher or student referrals (through personal contacts and efforts only)</li>
              </ul>
              <p><strong>Annual Recognition:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Best Teacher Awards with cash prizes (optional)</li>
                <li>Performance certificates and professional recognition through website displays and SMM</li>
                <li>Career advancement opportunities within the platform</li>
                <li>Preference for high-value assignments and premium students along with institutional recommendations</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>10.4 Fee Negotiation and Adjustments</h4>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Initial fee setting shall be based on the teacher’s qualifications, experience and interview performance, which shall be the sole judgment of the company and shall be unquestionable in all cases</li>
                <li>A onetime negotiation of the fee shall be allowed in case of a deserving teacher if found deserving in the opinion of the Managing Director of the company or any person authorized by the Board of Directors on his behalf</li>
                <li>Review and adjustments of the per class fee based on performance and market rates</li>
                <li>Special consideration for teachers with exceptional qualifications, performance or results</li>
                <li>Transparent communication of all fee-related decisions and changes</li>
              </ul>

              {/* SECTION 11 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>11. PLATFORM USAGE AND TECHNOLOGY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.1 Platform Access and Account Management</h4>
              <p><strong>Account Responsibilities:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Maintain confidentiality of login credentials and account information</li>
                <li>Use strong passwords and enable two-factor authentication where available</li>
                <li>Never share account access with any third party</li>
                <li>Immediately report any suspected security breaches or unauthorized access</li>
                <li>Update profile information and contact details promptly when changes occur</li>
              </ul>
              <p><strong>Authorized Usage:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Use platform features only for legitimate educational or intended purposes</li>
                <li>Access only information and resources relevant to your teaching assignments</li>
                <li>Respect system limitations and avoid overwhelming platform infrastructure</li>
                <li>Follow all platform guidelines for content upload and communication</li>
                <li>Report technical issues or bugs promptly to support team</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.2 Digital Content and Materials</h4>
              <p><strong>Approved Content:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Original educational materials created by you</li>
                <li>Licensed content with appropriate permissions and attributions</li>
                <li>Platform-provided educational resources and templates</li>
                <li>Content that complies with copyright laws and intellectual property rights</li>
                <li>Age-appropriate and curriculum-aligned materials</li>
              </ul>
              <p><strong>Prohibited Content:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Copyrighted materials without proper licensing or fair use justification</li>
                <li>Inappropriate, offensive or harmful content</li>
                <li>Materials promoting discrimination, hatred, communalism, religious unrest or violence</li>
                <li>Content containing personal information of students or parents including contact details</li>
                <li>Unauthorized recording or distribution of student interactions and use of hidden cameras during work within the contract period</li>
              </ul>

              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>11.3 Technology Requirements and Support</h4>
              <p><strong>Minimum Technical Requirements:</strong></p>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li>Reliable internet connection with data for video calls</li>
                <li>Computer or mobile device capable of running platform modules</li>
                <li>Webcam and microphone for teaching sessions</li>
                <li>Updated browser/app with security features and backup connectivity</li>
              </ul>

              {/* SECTION 12 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>12. INTELLECTUAL PROPERTY RIGHTS</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>12.1 Ownership of Content</h4>
              <p>
                Teachers retain ownership of original educational content and grant TheMentR a non-exclusive license to use, display and distribute it on the platform. All platform-proprietary tools, structures, and software belong exclusively to BUDIN Candor Pvt. Ltd.
              </p>

              {/* SECTION 18 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>18. LIMITATION OF LIABILITY</h3>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginTop: 16 }}>18.1 Platform Limitations</h4>
              <p>
                TheMentR acts as an intermediary connecting teachers with students. The company is not liable for indirect or consequential damages. Maximum liability is capped at the last three months of average earnings (for teachers active over 12 months).
              </p>

              {/* SECTION 20 */}
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>20. GENERAL PROVISIONS</h3>
              <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
                <li><strong>Severability:</strong> If any provision is found invalid, the remaining terms remain in full force.</li>
                <li><strong>Entire Agreement:</strong> Constitutes the complete understanding between BUDIN Candor Pvt. Ltd. and the Teacher.</li>
                <li><strong>Governing Law:</strong> Governed by Indian Law, with exclusive jurisdiction of courts at <strong>Bhubaneswar, Odisha, India</strong>.</li>
              </ul>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
