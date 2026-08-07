import React from 'react';
import SEO from '../components/common/SEO';
import ShowcaseSection from '../components/home/ShowcaseSection';

export default function EcosystemPage() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '100px' }}>
      <SEO 
        title="The MentR Ecosystem | Apps & Sourcing"
        description="Explore The MentR parent, teacher, and Olympiad apps that drive our unified educational ecosystem."
      />
      <ShowcaseSection />
    </div>
  );
}
