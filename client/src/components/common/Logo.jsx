import React from 'react';

/**
 * Premium Glossy Glassmorphic Logo component with a subtle blue hue.
 * - Even larger gradient emblem inside.
 * - Card size kept compact (minimal padding so emblem fills out the card).
 * - Circular TM badge with transparent/glass background (no solid color background).
 */
export default function Logo({ 
  height, 
  scrolled = false, 
  onClick, 
  style = {}, 
  className = '', 
  showTm = true 
}) {
  // Larger logo height so emblem fills the card without increasing outer card size
  const logoHeight = height || (scrolled ? 36 : 48);
  const logoWidth = Math.round(logoHeight * 1.05);
  const logoUrl = `${import.meta.env.BASE_URL}mentR_Logo.png`;

  return (
    <div
      onClick={onClick}
      className={`glass-logo-badge ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Minimal padding to maximize emblem size without enlarging card
        padding: scrolled ? '3px 6px' : '4px 8px',
        borderRadius: 14,
        // Glossy glassmorphic background with a subtle blue hue & specular top light
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(239, 246, 255, 0.7) 50%, rgba(219, 234, 254, 0.6) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(191, 219, 254, 0.75)',
        boxShadow: `
          0 8px 24px rgba(37, 99, 235, 0.12),
          0 2px 8px rgba(15, 23, 42, 0.04),
          inset 0 1.5px 2px rgba(255, 255, 255, 0.95),
          inset 0 -1.5px 2px rgba(59, 130, 246, 0.15)
        `,
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Larger Deep-Blue to Violet Gradient Logo Emblem */}
      <div
        className="logo-emblem-fill"
        style={{
          height: logoHeight,
          width: logoWidth,
          background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 35%, #6366F1 70%, #7C3AED 100%)',
          WebkitMaskImage: `url("${logoUrl}")`,
          maskImage: `url("${logoUrl}")`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          filter: 'drop-shadow(0 2px 6px rgba(37, 99, 235, 0.2))',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />

      {/* Fallback image for accessibility / SSR */}
      <img
        src={logoUrl}
        alt="TheMentR Logo"
        style={{
          display: 'none'
        }}
      />

      {/* Transparent / Glass Circular TM Badge at top right (No solid color background) */}
      {showTm && (
        <span
          className="tm-badge-circle"
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 17,
            height: 17,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1.2px solid #2563EB',
            color: '#1E3A8A',
            fontSize: '8.5px',
            fontWeight: 800,
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.15)',
            lineHeight: 1,
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2
          }}
          title="Registered Trademark"
        >
          ™
        </span>
      )}
    </div>
  );
}
