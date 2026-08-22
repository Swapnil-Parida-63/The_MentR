import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SCHEMAS } from '../config/schema.config';
import Breadcrumbs from '../components/common/Breadcrumbs';
import AvsarSection from '../components/home/AvsarSection';

export default function AvsarPage() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '100px', background: 'transparent' }}>
      <SEO 
        title="AVSAR (Assessment Visits & Student Assessment Reports) | The MentR"
        description="Education must start with an assessment. We evaluate the students, understand the requirements and personalize the approach with AVSAR."
        schema={PAGE_SCHEMAS.avsar}
      />
      
      {/* Sleek Floating Back to Home button */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '10px', marginBottom: '-60px' }}>
        <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'AVSAR Assessment', url: '/avsar' }]} />
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 18px',
          borderRadius: '99px',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid rgba(79, 124, 255, 0.2)',
          color: '#1E293B',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateX(-3px)';
          e.currentTarget.style.borderColor = 'rgba(79, 124, 255, 0.4)';
          e.currentTarget.style.color = '#2563EB';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateX(0)';
          e.currentTarget.style.borderColor = 'rgba(79, 124, 255, 0.2)';
          e.currentTarget.style.color = '#1E293B';
        }}
        >
          <ArrowLeft size={16} color="#2563EB" />
          <span>Back to Home</span>
        </Link>
      </div>

      <AvsarSection isStandalonePage={true} />
    </div>
  );
}
