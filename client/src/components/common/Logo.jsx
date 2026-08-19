import React from 'react';

/**
 * Clean Logo component without background card.
 * - Displays the pure emblem directly.
 * - TM badge circle in matching blue color.
 */
export default function Logo({ 
  height, 
  scrolled = false, 
  onClick, 
  style = {}, 
  className = '', 
  showTm = true 
}) {
  const logoHeight = height || (scrolled ? 36 : 44);
  const logoWidth = Math.round(logoHeight * 1.05);
  const logoUrl = `${import.meta.env.BASE_URL}mentR_Logo.webp`;

  return (
    <div
      onClick={onClick}
      className={`clean-logo-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: '2px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Deep-Blue to Violet Gradient Logo Emblem */}
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
          filter: 'drop-shadow(0 2px 6px rgba(37, 99, 235, 0.25))',
          transition: 'all 0.3s ease'
        }}
      />

      <img
        src={logoUrl}
        alt="TheMentR Logo"
        style={{ display: 'none' }}
      />

      {/* TM Badge Circle matching logo blue color */}
      {showTm && (
        <span
          className="tm-badge-circle"
          style={{
            position: 'absolute',
            top: -4,
            right: -10,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'transparent',
            border: '1.2px solid #2563EB',
            color: '#2563EB',
            fontSize: '9px',
            fontWeight: 800,
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.15)',
            lineHeight: 1,
            zIndex: 2
          }}
          title="Registered Trademark"
        >
          TM
        </span>
      )}
    </div>
  );
}
