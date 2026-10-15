/**
 * @file intent.classifier.js
 * @description Conservative Intent Classifier for Mentee Conversational Fast-Path.
 * 
 * RESPONSIBILITY:
 * Determines whether an incoming user message is a simple conversational greeting,
 * persona inquiry, or polite acknowledgment that can safely bypass OpenAI embedding
 * generation and MongoDB Atlas vector search.
 * 
 * SAFETY PRINCIPLES:
 * 1. Conservative Guard: If a message contains ANY domain/business keywords
 *    (e.g., pricing, fees, AVSAR, tutor matching, classes, demo, subjects, contact info),
 *    it is NEVER classified as fast-path, even if it begins with "hello" or "thanks".
 * 2. Ambiguity Principle: If intent is ambiguous or unrecognized, always default to safe RAG.
 * 3. Zero Model Cost: Fast synchronous rule evaluation with 0ms latency overhead and $0 API cost.
 */

// Domain & business keywords that MUST trigger full RAG retrieval
const DOMAIN_GUARD_REGEX = /\b(tutor|tutors|tutoring|teacher|teachers|teaching|educator|educators|faculty|mentr|thementr|avsar|assessment|diagnostic|match|matching|matched|qualification|qualifications|verified|verification|verify|vetting|onboarding|fee|fees|cost|costs|pricing|price|prices|rate|rates|charge|charges|package|packages|ap|bp|dp|ep|plan|plans|bill|billing|subscription|refund|refunds|cancellation|cancel|payment|payments|discount|money|rupee|rupees|rs|inr|₹|class|classes|grade|grades|subject|subjects|math|maths|mathematics|science|physics|chemistry|biology|english|hindi|cbse|icse|state\s*board|curriculum|syllabus|exam|exams|homework|bhubaneswar|cuttack|puri|odisha|location|locations|city|cities|branch|office|address|phone|call|number|numbers|contact|email|whatsapp|helpline|toll-free|support|operate|operates|operating|service\s*area|book|booking|demo|trial|register|registration|join|joining|apply|applying|enroll|enrollment|hire|hiring|requirement|requirements|job|jobs|career|careers|police|criminal|background\s*check|privacy|policy|policies|terms|rule|rules|dpdp)\b/i;

// Safe conversational regex patterns
const GREETING_PATTERNS = [
  /^(hi|hello|hey|heya|howdy|greetings|namaste|hola)(\s+(there|mentee|friend|team))?$/i,
  /^(good\s+(morning|afternoon|evening|day))(\s+(mentee|there))?$/i,
  /^(hey|hi|hello)?\s*(how\s+are\s+you|how\s+are\s+you\s+doing|how's\s+it\s+going|how\s+do\s+you\s+do)(\s+today)?$/i
];

const PERSONA_PATTERNS = [
  /^(who\s+are\s+you|what\s+is\s+your\s+name|what's\s+your\s+name|what\s+are\s+you|introduce\s+yourself|tell\s+me\s+about\s+yourself|what\s+can\s+you\s+do|what\s+do\s+you\s+do)$/i
];

const ACKNOWLEDGMENT_PATTERNS = [
  /^(thank\s+you|thanks|thanks\s+a\s+lot|thank\s+you\s+so\s+much|thx|many\s+thanks)(\s+(mentee|there))?$/i,
  /^(ok|okay|got\s+it|understood|alright|all\s+right|sure|cool|great|awesome|perfect|sounds\s+good|noted)$/i,
  /^(bye|goodbye|see\s+you|cya|take\s+care|have\s+a\s+good\s+day|have\s+a\s+nice\s+day)$/i
];

/**
 * Classifies whether a user prompt qualifies for conversational fast path.
 *
 * @param {string} message - Raw user input text.
 * @returns {{ isFastPath: boolean, intent: 'greeting' | 'persona' | 'acknowledgment' | 'rag' }}
 */
function classifyIntent(message) {
  if (!message || typeof message !== 'string') {
    return { isFastPath: false, intent: 'rag' };
  }

  const raw = message.trim();
  if (raw.length === 0) {
    return { isFastPath: false, intent: 'rag' };
  }

  // 1. Guard check: If any business or MentR domain keyword is present, ALWAYS run RAG
  if (DOMAIN_GUARD_REGEX.test(raw)) {
    return { isFastPath: false, intent: 'rag' };
  }

  // 2. Length check: Conversational pleasantries are concise (< 15 words and < 100 characters)
  const words = raw.split(/\s+/);
  if (words.length > 15 || raw.length > 100) {
    return { isFastPath: false, intent: 'rag' };
  }

  // 3. Normalize for pattern matching: replace punctuation with spaces, collapse spaces
  const normalized = raw
    .replace(/[!?.,;:~`"']+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Check Greetings
  for (const pattern of GREETING_PATTERNS) {
    if (pattern.test(normalized)) {
      return { isFastPath: true, intent: 'greeting' };
    }
  }

  // Check Persona inquiry
  for (const pattern of PERSONA_PATTERNS) {
    if (pattern.test(normalized)) {
      return { isFastPath: true, intent: 'persona' };
    }
  }

  // Check Thanks / Acknowledgments
  for (const pattern of ACKNOWLEDGMENT_PATTERNS) {
    if (pattern.test(normalized)) {
      return { isFastPath: true, intent: 'acknowledgment' };
    }
  }

  // 4. Default to safe RAG path for any other query or ambiguous sentence
  return { isFastPath: false, intent: 'rag' };
}

module.exports = {
  classifyIntent,
  DOMAIN_GUARD_REGEX
};
