import React from 'react';
import SEO from '../components/common/SEO';
import AvsarSection from '../components/home/AvsarSection';

export default function AvsarPage() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '100px' }}>
      <SEO 
        title="AVSAR (Assessment Visits & Student Assessment Reports) | The MentR"
        description="Education must start with an assessment. We evaluate the students, understand the requirements and personalize the approach with AVSAR."
      />
      <AvsarSection />
    </div>
  );
}
