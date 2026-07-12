import { FadeUp } from '../../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowUpRight } from 'lucide-react';

export default function BlogsPreview() {
  return (
    <section id="blogs" className="section" style={{ background: '#fafafc', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header Block */}
        <div className="journal-header">
          <div className="journal-header-left">
            <FadeUp><div className="journal-eyebrow">THEMENTR JOURNAL</div></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="journal-title">
                Learning, backed by <span className="serif-italic">insight.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="journal-subtitle">
                Research, expert advice and practical learning strategies for students, parents and educators.
              </p>
            </FadeUp>
          </div>
          <div className="journal-header-right">
            <FadeUp delay={0.15}>
              <Link to="/blogs" className="journal-view-all-btn">
                View All <span className="arrow">→</span>
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="journal-grid">
          
          {/* LEFT COLUMN: Featured Article */}
          <FadeUp>
            <div style={{ position: 'relative' }}>
              {/* Subtle radial glow background behind featured article */}
              <div style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.035) 0%, transparent 70%)',
                top: '-20%',
                left: '-20%',
                pointerEvents: 'none',
                zIndex: 0
              }} />

              <div className="journal-featured-card" style={{ position: 'relative', zIndex: 1 }}>
                {/* Image Area with abstract geometric learning artwork & noise grain */}
                <div className="featured-image-container">
                  <div className="noise-grain" />
                  <div className="abstract-glow" />
                  
                  {/* Premium Abstract SVG Composition */}
                  <svg className="abstract-svg" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="120" r="100" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1.5" />
                    <circle cx="200" cy="120" r="70" stroke="rgba(79, 124, 255, 0.05)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="200" cy="120" r="130" stroke="rgba(99, 102, 241, 0.03)" strokeWidth="1" />
                    
                    <path d="M120 70 L122 75 L127 77 L122 79 L120 84 L118 79 L113 77 L118 75 Z" fill="#6366F1" opacity="0.4" />
                    <path d="M280 160 L281.5 164 L286 165.5 L281.5 167 L280 171 L278.5 167 L274 165.5 L278.5 164 Z" fill="#10B981" opacity="0.4" />
                    
                    {/* 3D abstract open book drawing */}
                    <g transform="translate(145, 80)">
                      <path d="M10 50 Q 30 45 55 52 L 55 12 Q 30 5 10 10 Z" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" />
                      <path d="M55 52 Q 80 45 100 50 L 100 10 Q 80 5 55 12 Z" fill="#FFFFFF" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" />
                      <path d="M18 20 H 45 M18 28 H 45 M18 36 H 38" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M62 20 H 90 M62 28 H 90 M62 36 H 82" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="55" y1="12" x2="55" y2="52" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    </g>

                    <path d="M90 150 A 60 60 0 0 1 310 150" stroke="rgba(79, 124, 255, 0.08)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="200" y1="50" x2="200" y2="190" stroke="rgba(99, 102, 241, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>
                </div>
                
                <div className="featured-card-content">
                  <span className="featured-pill">FEATURED</span>
                  <h3 className="featured-card-title">
                    Why the teacher–student match matters more than the teacher's qualification
                  </h3>
                  <p className="featured-card-desc">
                    We analysed 3,200 parent feedback reports. The strongest predictor of learning outcomes wasn't the teacher's credentials, but the personal connection and rapport.
                  </p>
                  
                  <div className="featured-card-divider" />
                  
                  <div className="featured-card-metadata">
                    <span className="meta-item">
                      <User size={13} className="meta-icon" /> By TheMentR Research
                    </span>
                    <span className="meta-dot">•</span>
                    <span className="meta-item">
                      <Clock size={13} className="meta-icon" /> 8 min read
                    </span>
                    <span className="meta-dot">•</span>
                    <span className="meta-item">
                      <Calendar size={13} className="meta-icon" /> June 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* RIGHT COLUMN: Supporting Articles */}
          <FadeUp delay={0.1}>
            <div className="supporting-articles-stack">
              {[
                { 
                  tagClass: 'tag-olympiad', 
                  tagText: 'Olympiad', 
                  title: 'How to prepare for IMO Stage 1 in 60 days', 
                  desc: 'A structured week-by-week plan for Math Olympiad prep.', 
                  time: '5 min read' 
                },
                { 
                  tagClass: 'tag-parents', 
                  tagText: 'Parents', 
                  title: 'The assessment visit: what to expect', 
                  desc: 'Before we match any student, we listen.', 
                  time: '4 min read' 
                },
                { 
                  tagClass: 'tag-teachers', 
                  tagText: 'Teachers', 
                  title: 'Building a teaching practice: advice from top educators', 
                  desc: 'Our highest-rated teachers share how they build student trust.', 
                  time: '6 min read' 
                },
              ].map((b) => (
                <div key={b.title} className="journal-supporting-card">
                  <div className="supporting-card-inner">
                    <div className="supporting-card-header">
                      <span className={`supporting-tag ${b.tagClass}`}>{b.tagText}</span>
                      <ArrowUpRight size={16} className="card-arrow-icon" />
                    </div>
                    
                    <h4 className="supporting-card-title">{b.title}</h4>
                    <p className="supporting-card-desc">{b.desc}</p>
                    
                    <div className="supporting-card-divider" />
                    
                    <div className="supporting-card-metadata">
                      <Clock size={12} className="meta-icon" />
                      <span>{b.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>

      {/* Premium Stylesheet */}
      <style>{`
        .journal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
        }
        .journal-header-left {
          max-width: 600px;
          text-align: left;
        }
        .journal-eyebrow {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #6366F1;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .journal-title {
          font-family: var(--font-hero);
          font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .serif-italic {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #4F7CFF;
          font-size: 1.05em;
        }
        .journal-subtitle {
          font-family: var(--font-sans);
          font-size: 16px;
          color: #64748B;
          line-height: 1.6;
          max-width: 520px;
        }
        .journal-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: #FFFFFF;
          color: #0F172A;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          border-radius: 99px;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          margin-bottom: 8px;
        }
        .journal-view-all-btn:hover {
          border-color: rgba(79, 124, 255, 0.3);
          box-shadow: 0 4px 14px rgba(79, 124, 255, 0.06);
          color: #4F7CFF;
        }
        .journal-view-all-btn .arrow {
          transition: transform 0.2s ease;
        }
        .journal-view-all-btn:hover .arrow {
          transform: translateX(4px);
        }

        /* Layout Grid */
        .journal-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* Featured Card */
        .journal-featured-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.015);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }
        .journal-featured-card:hover {
          border-color: rgba(99, 102, 241, 0.15);
          box-shadow: 0 12px 30px rgba(99, 102, 241, 0.03);
        }

        /* Premium image placeholder with noise & glow */
        .featured-image-container {
          position: relative;
          height: 280px;
          background: linear-gradient(135deg, #F3F6FF 0%, #E8EDFF 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(15, 23, 42, 0.03);
        }
        .noise-grain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.07;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .abstract-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
          filter: blur(20px);
          top: 15%;
          left: 30%;
          pointer-events: none;
        }
        .abstract-svg {
          width: 100%;
          height: 100%;
          max-height: 240px;
          z-index: 2;
        }

        /* Content block */
        .featured-card-content {
          padding: 40px;
        }
        .featured-pill {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #6366F1;
          margin-bottom: 20px;
        }
        .featured-card-title {
          font-family: var(--font-hero);
          font-size: 26px;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.3;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .featured-card-desc {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .featured-card-divider {
          height: 1px;
          background: rgba(15, 23, 42, 0.05);
          margin-bottom: 20px;
        }
        .featured-card-metadata {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-sans);
          font-size: 13px;
          color: #94A3B8;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .meta-icon {
          color: #94A3B8;
        }
        .meta-dot {
          color: #CBD5E1;
        }

        /* Supporting stack */
        .supporting-articles-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .journal-supporting-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 20px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.01);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }
        .supporting-card-inner {
          padding: 24px;
        }
        .journal-supporting-card:hover {
          transform: translateY(-6px);
          border-color: rgba(79, 124, 255, 0.4);
          box-shadow: 0 10px 24px rgba(79, 124, 255, 0.05);
          background: #FFFFFF;
        }
        .supporting-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .supporting-tag {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.02em;
        }
        .tag-olympiad {
          background: #ECFDF5;
          color: #059669;
        }
        .tag-parents {
          background: #F5F3FF;
          color: #7C3AED;
        }
        .tag-teachers {
          background: #EFF6FF;
          color: #2563EB;
        }
        .card-arrow-icon {
          color: #94A3B8;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .journal-supporting-card:hover .card-arrow-icon {
          color: #4F7CFF;
          transform: translate(2px, -2px);
        }
        .supporting-card-title {
          font-family: var(--font-sans);
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .supporting-card-desc {
          font-family: var(--font-sans);
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .supporting-card-divider {
          height: 1px;
          background: rgba(15, 23, 42, 0.04);
          margin-bottom: 14px;
        }
        .supporting-card-metadata {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 12px;
          color: #94A3B8;
        }

        /* Responsive Media Queries */
        @media (max-width: 1024px) {
          .journal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            margin-bottom: 40px;
          }
          .journal-view-all-btn {
            margin-bottom: 0;
          }
          .journal-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .featured-image-container {
            height: 220px;
          }
          .featured-card-content {
            padding: 28px 24px;
          }
        }
      `}</style>
    </section>
  );
}
