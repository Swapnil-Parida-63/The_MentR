export default function EcoVisual() {
  return (
    <svg viewBox="0 0 480 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1E4FD8" stopOpacity="0.15" /><stop offset="100%" stopColor="#1E4FD8" stopOpacity="0" /></radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#059669" stopOpacity="0.12" /><stop offset="100%" stopColor="#059669" stopOpacity="0" /></radialGradient>
        <radialGradient id="glow3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" /><stop offset="100%" stopColor="#7C3AED" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="240" cy="200" r="120" fill="url(#glow1)" /><circle cx="120" cy="350" r="80" fill="url(#glow2)" /><circle cx="360" cy="360" r="80" fill="url(#glow3)" />
      <g opacity="0.3">
        <line x1="240" y1="175" x2="110" y2="300" stroke="#1E4FD8" strokeWidth="1.5" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" values="0;-20" dur="2.5s" repeatCount="indefinite" /></line>
        <line x1="240" y1="175" x2="370" y2="300" stroke="#1E4FD8" strokeWidth="1.5" strokeDasharray="6 4"><animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite" /></line>
        <line x1="240" y1="175" x2="380" y2="170" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;-16" dur="2s" repeatCount="indefinite" /></line>
        <line x1="240" y1="175" x2="100" y2="180" stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" values="0;-16" dur="2.2s" repeatCount="indefinite" /></line>
        <line x1="110" y1="300" x2="370" y2="300" stroke="#059669" strokeWidth="1" strokeDasharray="5 5" opacity="0.5"><animate attributeName="stroke-dashoffset" values="0;20" dur="4s" repeatCount="indefinite" /></line>
      </g>
      {/* Central TheMentR */}
      <g className="eco-node center-node">
        <circle cx="240" cy="175" r="54" fill="white" stroke="#E8EEFF" strokeWidth="2" /><circle cx="240" cy="175" r="48" fill="#F0F4FF" />
        <circle cx="240" cy="175" r="6" fill="#1E4FD8" /><circle cx="240" cy="155" r="4" fill="#1E4FD8" opacity="0.4" />
        <line x1="240" y1="159" x2="228" y2="183" stroke="#1E4FD8" strokeWidth="1.5" opacity="0.5" /><line x1="240" y1="159" x2="252" y2="183" stroke="#1E4FD8" strokeWidth="1.5" opacity="0.5" />
        <text x="240" y="205" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#1E4FD8">TheMentR</text>
      </g>
      {/* Teachers */}
      <g className="eco-node teacher-node">
        <circle cx="100" cy="180" r="34" fill="white" stroke="#DCFCE7" strokeWidth="2" /><circle cx="100" cy="180" r="28" fill="#ECFDF5" />
        <text x="100" y="175" textAnchor="middle" fontSize="16">👩‍🏫</text><text x="100" y="192" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="600" fill="#065F46">Verified</text><text x="100" y="203" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#059669">Teacher</text>
      </g>
      <g className="eco-node mentor-node">
        <circle cx="380" cy="170" r="34" fill="white" stroke="#DCFCE7" strokeWidth="2" /><circle cx="380" cy="170" r="28" fill="#ECFDF5" />
        <text x="380" y="165" textAnchor="middle" fontSize="16">👨‍🏫</text><text x="380" y="182" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="600" fill="#065F46">Expert</text><text x="380" y="193" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#059669">Mentor</text>
      </g>
      {/* Students */}
      <g className="eco-node student-10-node">
        <circle cx="110" cy="305" r="38" fill="white" stroke="#EEF2FF" strokeWidth="2" /><circle cx="110" cy="305" r="32" fill="#F0F4FF" />
        <text x="110" y="299" textAnchor="middle" fontSize="18">👧</text><text x="110" y="318" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="600" fill="#1E40AF">Student</text><text x="110" y="329" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#3B82F6">Class 10</text>
      </g>
      <g className="eco-node student-7-node">
        <circle cx="370" cy="305" r="38" fill="white" stroke="#EEF2FF" strokeWidth="2" /><circle cx="370" cy="305" r="32" fill="#F0F4FF" />
        <text x="370" y="299" textAnchor="middle" fontSize="18">👦</text><text x="370" y="318" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="600" fill="#1E40AF">Student</text><text x="370" y="329" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#3B82F6">Class 7</text>
      </g>
      {/* Parents */}
      <g className="eco-node parent-1-node">
        <circle cx="200" cy="415" r="30" fill="white" stroke="#F5F3FF" strokeWidth="2" /><circle cx="200" cy="415" r="24" fill="#F5F3FF" />
        <text x="200" y="410" textAnchor="middle" fontSize="14">👩</text><text x="200" y="426" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#6D28D9">Parent</text>
      </g>
      <g className="eco-node parent-2-node">
        <circle cx="280" cy="415" r="30" fill="white" stroke="#F5F3FF" strokeWidth="2" /><circle cx="280" cy="415" r="24" fill="#F5F3FF" />
        <text x="280" y="410" textAnchor="middle" fontSize="14">👨</text><text x="280" y="426" textAnchor="middle" fontFamily="Inter" fontSize="10" fill="#6D28D9">Parent</text>
      </g>
      <line x1="110" y1="343" x2="195" y2="386" stroke="#7C3AED" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
      <line x1="370" y1="343" x2="285" y2="386" stroke="#7C3AED" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
      {/* Matched badge */}
      <g className="eco-node matched-node">
        <rect x="190" y="240" width="100" height="26" rx="13" fill="#059669" opacity="0.9" />
        <text x="240" y="256" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="700" fill="white">Matched ✓</text>
      </g>
      {/* Floating dots */}
      <circle cx="170" cy="130" r="4" fill="#1E4FD8" opacity="0.15"><animate attributeName="cy" values="130;122;130" dur="3s" repeatCount="indefinite" /></circle>
      <circle cx="310" cy="125" r="3" fill="#059669" opacity="0.2"><animate attributeName="cy" values="125;133;125" dur="2.5s" repeatCount="indefinite" /></circle>
      <circle cx="200" cy="350" r="3" fill="#7C3AED" opacity="0.15"><animate attributeName="cy" values="350;344;350" dur="3.5s" repeatCount="indefinite" /></circle>
    </svg>
  );
}
