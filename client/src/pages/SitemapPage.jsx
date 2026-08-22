import { Link } from 'react-router-dom';
import { Compass, BookOpen, ShieldCheck, ArrowRight, Home, CreditCard, Stethoscope, Layers, MessageSquare, FileText } from 'lucide-react';
import SEO from '../components/common/SEO';
import { PAGE_SEO } from '../config/seo.config';
import { PAGE_SCHEMAS } from '../config/schema.config';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function SitemapPage() {
  const sitemapSections = [
    {
      title: 'Core Platform & Services',
      description: 'Main offerings, home tutor matching, and diagnostic learning tools.',
      icon: Compass,
      links: [
        {
          name: 'Home',
          path: '/',
          description: 'Platform overview, 100% background-checked tutors, and core learning values.',
          icon: Home
        },
        {
          name: 'Tuition Pricing & Plans',
          path: '/pricing',
          description: 'Transparent, monthly tuition fees across Classes 1–12, CBSE, ICSE, IGCSE & State Boards.',
          icon: CreditCard
        },
        {
          name: 'AVSAR Assessment Visits',
          path: '/avsar',
          description: 'In-home 60–90 min diagnostic assessment visits and student evaluation reports.',
          icon: Stethoscope
        },
        {
          name: 'Learning Ecosystem',
          path: '/ecosystem',
          description: 'Unified ecosystem connecting Parent, Teacher, and Olympiad prep mobile apps.',
          icon: Layers
        }
      ]
    },
    {
      title: 'Resources & Community',
      description: 'Educational insights, parenting advice, and support channels.',
      icon: BookOpen,
      links: [
        {
          name: 'Educational Journal & Blog',
          path: '/blogs',
          description: 'Articles on study tips, parent-teacher alignment, and K-12 curriculum guidance.',
          icon: BookOpen
        },
        {
          name: 'Contact & Support',
          path: '/contact',
          description: '24/7 support lines, toll-free helpline (1800 889 2388), and assessment booking.',
          icon: MessageSquare
        }
      ]
    },
    {
      title: 'Legal & Policy Center',
      description: 'Terms of service, privacy policy, and code of conduct.',
      icon: ShieldCheck,
      links: [
        {
          name: 'Terms of Service & Privacy Policy',
          path: '/terms',
          description: 'Teacher agreements, parent code of conduct, and data privacy policies.',
          icon: FileText
        }
      ]
    }
  ];

  return (
    <div className="section subpage-wrapper" style={{ background: 'transparent', minHeight: '100vh', paddingTop: '140px', position: 'relative', overflow: 'hidden' }}>
      <SEO {...PAGE_SEO.sitemap} schema={PAGE_SCHEMAS.sitemap} />

      {/* Background atmosphere */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto' }}>
        <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: 'Sitemap', url: '/sitemap' }]} />

        {/* Header */}
        <div style={{ textAlign: 'left', marginBottom: 48 }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#4F7CFF',
            background: 'rgba(79, 124, 255, 0.08)',
            padding: '6px 14px',
            borderRadius: '99px',
            display: 'inline-block',
            marginBottom: 16
          }}>
            Website Directory
          </span>
          <h1 style={{
            fontFamily: 'var(--font-hero)',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em'
          }}>
            HTML Sitemap
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: '#64748B',
            lineHeight: 1.7,
            maxWidth: '640px',
            margin: 0
          }}>
            Navigate through all public sections, tuition services, learning resources, and legal policies across TheMentR platform.
          </p>
        </div>

        {/* Directory Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {sitemapSections.map((section, sIdx) => {
            const SectionIcon = section.icon;
            return (
              <div 
                key={`section-${sIdx}`}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(79, 124, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4F7CFF'
                  }}>
                    <SectionIcon size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      {section.title}
                    </h2>
                    <p style={{ fontSize: 13, color: '#64748B', margin: '2px 0 0 0' }}>
                      {section.description}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 16,
                  marginTop: 24
                }}>
                  {section.links.map((link, lIdx) => {
                    const LinkIcon = link.icon;
                    return (
                      <Link
                        key={`link-${lIdx}`}
                        to={link.path}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          padding: '20px',
                          borderRadius: '16px',
                          background: '#F8FAFC',
                          border: '1px solid rgba(15, 23, 42, 0.04)',
                          textDecoration: 'none',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.background = '#FFFFFF';
                          e.currentTarget.style.borderColor = 'rgba(79, 124, 255, 0.3)';
                          e.currentTarget.style.boxShadow = '0 12px 24px rgba(79, 124, 255, 0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = '#F8FAFC';
                          e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.04)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4F7CFF', fontWeight: 600, fontSize: 15 }}>
                              <LinkIcon size={16} />
                              <span>{link.name}</span>
                            </div>
                            <ArrowRight size={14} style={{ color: '#94A3B8' }} />
                          </div>
                          <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                            {link.description}
                          </p>
                        </div>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: '#94A3B8',
                          marginTop: 14,
                          display: 'block'
                        }}>
                          {link.path}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
