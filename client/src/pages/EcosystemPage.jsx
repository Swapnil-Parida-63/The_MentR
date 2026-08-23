import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SCHEMAS } from '../config/schema.config';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ShowcaseSection from '../components/home/ShowcaseSection';

export default function EcosystemPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: isMobile ? '85px' : '110px', background: 'transparent' }}>
      <SEO 
        title="The MentR Ecosystem | Apps & Sourcing"
        description="Explore The MentR parent, teacher, and Olympiad apps that drive our unified educational ecosystem."
        schema={PAGE_SCHEMAS.ecosystem}
      />
      
      {/* Top Header Navigation */}
      <div className="container" style={{ position: 'relative', zIndex: 10, marginBottom: 12 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '4px 0'
        }}>
          <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Ecosystem', url: '/ecosystem' }]} />
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '99px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(79, 124, 255, 0.2)',
            color: '#1E293B',
            fontSize: '12.5px',
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
            <ArrowLeft size={15} color="#2563EB" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      <ShowcaseSection isStandalonePage={true} />
    </div>
  );
}
