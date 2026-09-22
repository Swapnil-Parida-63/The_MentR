import React from 'react';

/**
 * Claymorphic TheMentR Logo Component.
 * - Supports claymorphic 3D emblem.
 * - Supports white claymorphic background container (default / standalone / footer)
 *   or transparent background for the navbar.
 * - Crisp, highly legible TM trademark badge.
 */
export default function Logo({ 
  height, 
  scrolled = false, 
  onClick, 
  style = {}, 
  className = '', 
  showTm = true,
  hasBackground = false,
  variant = 'default' // 'navbar' | 'clay' | 'default'
}) {
  // Increase emblem size for better prominence
  const isNavbar = variant === 'navbar' || (!hasBackground && variant !== 'clay' && !style.background);
  const defaultHeight = isNavbar ? (scrolled ? 42 : 50) : (height || 48);
  const logoHeight = height || defaultHeight;
  const logoWidth = Math.round(logoHeight * 1.05);
  const logoUrl = `${import.meta.env.BASE_URL}mentR_Logo.webp`;

  const shouldUseBackground = hasBackground || variant === 'clay';

  return (
    <div
      onClick={onClick}
      className={`thementr-logo-container ${shouldUseBackground ? 'claymorphic-logo-card' : 'clean-logo-wrapper'} ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(shouldUseBackground
          ? {
              background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
              borderRadius: 20,
              padding: '8px 14px',
              border: '1.5px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '6px 6px 18px rgba(163, 177, 210, 0.35), -6px -6px 18px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9), inset -2px -2px 4px rgba(79, 124, 255, 0.08)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          : {
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '2px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }),
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style
      }}
    >
      {/* 3D Claymorphic Deep-Blue to Violet Gradient Logo Emblem */}
      <div
        className="logo-emblem-fill"
        style={{
          height: logoHeight,
          width: logoWidth,
          background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 35%, #4F46E5 70%, #7C3AED 100%)',
          WebkitMaskImage: `url("${logoUrl}")`,
          maskImage: `url("${logoUrl}")`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          filter: 'drop-shadow(0 4px 10px rgba(37, 99, 235, 0.35)) drop-shadow(0 1px 2px rgba(255, 255, 255, 0.6))',
          transition: 'all 0.3s ease'
        }}
      />

      <img
        src={logoUrl}
        alt="TheMentR Logo"
        style={{ display: 'none' }}
      />

      {/* Clearer, Crisp TM Trademark Badge */}
      {showTm && (
        <span
          className="tm-badge-circle"
          style={{
            position: 'absolute',
            top: shouldUseBackground ? 7 : 1,
            right: shouldUseBackground ? 9 : 0,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1px solid #2563EB',
            color: '#1D4ED8',
            fontSize: '5.5px',
            fontWeight: 850,
            fontFamily: 'var(--font-sans, system-ui, sans-serif)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1.5px 4px rgba(37, 99, 235, 0.22)',
            lineHeight: 1,
            zIndex: 3,
            transition: 'all 0.2s ease',
            pointerEvents: 'none'
          }}
          title="Registered Trademark"
        >
          TM
        </span>
      )}
    </div>
  );
}
