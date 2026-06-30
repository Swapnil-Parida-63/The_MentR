import { useState } from 'react';

const chatReplies = {
  'book an assessment visit': "Great! To book an Assessment Visit, please fill in the parent form on our Contact page, or call us at +91 98765 43210. We'll schedule a visit at your convenience — usually within 3 business days.",
  'how does teacher matching work?': "After your Assessment Visit, we analyse your child's learning profile and shortlist verified teachers who match on subject expertise, board experience, and teaching style.",
  'tell me about the olympiad programme': "TheMentR Olympiad prepares students for IMO, NSO, SOF, and other major competitions. We have dedicated Olympiad faculty, structured mock tests, and stage-wise preparation tracks.",
  'help me apply as a teacher': "To apply, fill in the Teacher Application form on our Contact page. Our onboarding team reviews all applications within 5–7 business days.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi there! 👋 I'm Mentee your personal assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const sendMsg = (msg) => {
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setShowSuggestions(false);
    setTimeout(() => {
      const reply = chatReplies[msg.toLowerCase()] || "Thanks for your message! Our team will follow up shortly. For urgent queries, call us at +91 98765 43210.";
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    }, 600);
  };

  const sendFromInput = () => {
    if (!input.trim()) return;
    sendMsg(input.trim());
    setInput('');
  };

  const suggestions = [
    ['📋', 'Book an Assessment Visit'],
    ['🤝', 'How does teacher matching work?'],
    ['🏆', 'Tell me about the Olympiad programme'],
    ['👩‍🏫', 'Help me apply as a teacher'],
  ];

  return (
    <div className="chatbot-container" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 2000 }}>
      {open && (
        <div className="chatbot-card" style={{
          position: 'absolute', bottom: 68, right: 0, width: 340, background: 'white',
          border: '1px solid var(--color-border)', borderRadius: 20,
          boxShadow: '0 20px 60px rgba(10,22,40,0.18)', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', animation: 'chatPop 0.25s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {/* Header */}
          <div style={{ background: 'var(--color-navy)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎓</div>
            <div>
              <h5 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, color: 'white', margin: 0 }}>Mentee</h5>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Usually replies instantly</span>
            </div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-emerald-mid)', marginLeft: 'auto', animation: 'pulse 2s infinite' }} />
          </div>

          {/* Body */}
          <div style={{ flex: 1, padding: 20, maxHeight: 360, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: '80%', alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end' }}>
                <div style={{
                  padding: '10px 14px', borderRadius: 16, fontSize: 13, lineHeight: 1.6,
                  background: m.from === 'bot' ? 'var(--color-neutral)' : 'var(--color-blue)',
                  color: m.from === 'bot' ? 'var(--color-text-primary)' : 'white',
                  borderBottomLeftRadius: m.from === 'bot' ? 4 : 16,
                  borderBottomRightRadius: m.from === 'user' ? 4 : 16,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {suggestions.map(([icon, text]) => (
                <button key={text} onClick={() => sendMsg(text)} style={{
                  background: 'var(--color-neutral)', border: '1px solid var(--color-border)', borderRadius: 8,
                  padding: '8px 12px', fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease', fontFamily: 'var(--font-sans)',
                }}>
                  {icon} {text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 8 }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendFromInput()}
              placeholder="Ask anything..."
              style={{ flex: 1, padding: '8px 12px', border: '1.5px solid var(--color-border-mid)', borderRadius: 8, fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none' }}
            />
            <button onClick={sendFromInput} style={{
              background: 'var(--color-blue)', color: 'white', border: 'none', borderRadius: 8,
              padding: '8px 14px', fontSize: 14, cursor: 'pointer',
            }}>→</button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(!open)} aria-label="Chat" style={{
        width: 56, height: 56, borderRadius: '50%', background: 'var(--color-blue)',
        boxShadow: '0 4px 20px rgba(30,79,216,0.4)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        transition: 'all 0.3s ease', color: 'white',
      }}>
        {open ? '✕' : '💬'}
      </button>

      <style>{`
        @media (max-width: 768px) {
          .chatbot-container {
            bottom: 96px !important;
            right: 16px !important;
          }
          .chatbot-card {
            width: 290px !important;
            max-height: 340px !important;
            bottom: 64px !important;
            right: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
