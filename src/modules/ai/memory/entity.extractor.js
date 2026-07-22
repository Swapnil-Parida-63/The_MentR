/**
 * @file entity.extractor.js
 * @description Automatic Entity Extractor for Mentee Conversation Memory.
 * 
 * RESPONSIBILITY:
 * Parses incoming user messages to extract structured educational parameters (Grade, Board, Subjects,
 * Parent Name, Student Name, City, Tuition Mode, Phone, Email, Role) using high-precision pattern matching.
 * 
 * FEATURES:
 * - Stores extracted entities separately from raw chat transcripts.
 * - Allows workflow engines and AI prompt context integrators to reuse collected parameters without re-asking.
 * 
 * CONNECTIONS:
 * - Called by `ConversationManager` and `ChatService`.
 */

class EntityExtractor {
  /**
   * Extracts structured entity parameters from a user message string.
   * 
   * @param {string} text - Raw user text message.
   * @param {Object} [existingEntities={}] - Previously collected entities to update/merge.
   * @returns {Object} Extracted entities object.
   */
  extractEntities(text = '', existingEntities = {}) {
    if (!text || typeof text !== 'string') {
      return { ...existingEntities };
    }

    const cleanText = text.trim();
    const extracted = { ...existingEntities };

    // 1. Role Detection (Parent / Student / Teacher)
    if (/\b(parent|mother|father|mom|dad|son|daughter|my child|my kid)\b/i.test(cleanText)) {
      extracted.role = 'parent';
    } else if (/\b(teacher|tutor|faculty|educator|apply as a teacher|teaching)\b/i.test(cleanText)) {
      extracted.role = 'teacher';
    } else if (/\b(student|i am studying|i am in class|i am in grade|my exam|my homework)\b/i.test(cleanText)) {
      if (extracted.role !== 'parent') {
        extracted.role = 'student';
      }
    }

    // 2. Grade / Class Detection (Class 1-12, Grade 1-12, 10th, 12th, KG, PG)
    const gradeMatch = cleanText.match(/\b(class|grade|std|standard)\s*([0-9]{1,2}|kg|pg|nursery|lkg|ukg)\b/i) ||
                       cleanText.match(/\b([0-9]{1,2})(st|nd|rd|th)?\s*(class|grade|standard|std)\b/i) ||
                       cleanText.match(/\b(class|grade)\s*(i{1,3}|iv|v|vi{0,3}|ix|x|xi{0,2})\b/i);
    if (gradeMatch) {
      extracted.grade = `Grade ${gradeMatch[2] || gradeMatch[1]}`.toUpperCase();
    }

    // 3. Educational Board Detection (CBSE, ICSE, IB, IGCSE, State Board)
    const boardMatch = cleanText.match(/\b(cbse|icse|isc|ib|igcse|state board|state)\b/i);
    if (boardMatch) {
      extracted.board = boardMatch[1].toUpperCase();
    }

    // 4. Subjects Detection
    const subjectKeywords = [
      'maths', 'mathematics', 'math', 'physics', 'chemistry', 'biology', 'science',
      'english', 'computer', 'social science', 'history', 'geography', 'economics', 'accountancy'
    ];
    const foundSubjects = new Set(extracted.subjects || []);
    for (const subj of subjectKeywords) {
      const regex = new RegExp(`\\b${subj}\\b`, 'i');
      if (regex.test(cleanText)) {
        foundSubjects.add(subj.charAt(0).toUpperCase() + subj.slice(1).toLowerCase());
      }
    }
    if (foundSubjects.size > 0) {
      extracted.subjects = Array.from(foundSubjects);
    }

    // 5. City Detection
    const cityMatch = cleanText.match(/\b(bhubaneswar|cuttack|delhi|mumbai|bangalore|bengaluru|kolkata|pune|hyderabad|chennai|ahmedabad)\b/i);
    if (cityMatch) {
      extracted.city = cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1).toLowerCase();
    }

    // 6. Tuition Mode (Home / Online)
    if (/\b(home tuition|home visit|offline|at home|in-person)\b/i.test(cleanText)) {
      extracted.mode = 'Home Tuition';
    } else if (/\b(online|remote|zoom|digital class)\b/i.test(cleanText)) {
      extracted.mode = 'Online Tuition';
    }

    // 7. Contact Details (Phone & Email)
    const phoneMatch = cleanText.match(/\b[6-9]\d{9}\b/);
    if (phoneMatch) {
      extracted.phone = phoneMatch[0];
    }

    const emailMatch = cleanText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
    if (emailMatch) {
      extracted.email = emailMatch[0];
    }

    // 8. Name Extraction (Parent / Student Name patterns)
    const parentNameMatch = cleanText.match(/(?:i am|my name is|parent name is|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (parentNameMatch && !['Class', 'Grade', 'CBSE', 'ICSE', 'Home', 'Online'].includes(parentNameMatch[1])) {
      extracted.parentName = parentNameMatch[1].trim();
    }

    const studentNameMatch = cleanText.match(/(?:son|daughter|child|student)\s+(?:name is\s+)?([A-Z][a-z]+)/i);
    if (studentNameMatch) {
      extracted.studentName = studentNameMatch[1].trim();
    }

    return extracted;
  }
}

const entityExtractor = new EntityExtractor();

module.exports = { EntityExtractor, entityExtractor };
