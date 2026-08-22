import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Reusable visual breadcrumb navigation component.
 * Provides accessible, semantic breadcrumb navigation matching JSON-LD BreadcrumbList schema.
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '13px',
        fontWeight: 500,
        color: '#64748B',
        marginBottom: '20px',
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.url || index}>
            {index > 0 && <ChevronRight size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />}
            {isLast ? (
              <span 
                style={{ color: '#0F172A', fontWeight: 600 }}
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url} 
                style={{ 
                  color: '#64748B', 
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4F7CFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
