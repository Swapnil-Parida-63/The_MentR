# Mentee Conversation Memory & Session Management

The **Conversation Memory Subsystem** manages active, multi-turn chat sessions for Mentee across Website, iOS, Android, and Desktop clients.

---

## Memory Architecture

```
Client App (Web / iOS / Android / Desktop)
      │
      ▼
POST /api/v1/ai/chat
      │
      ▼
ConversationManager (Restores/Creates session via AIConversation & AIMessage models)
      │
      ├───────────────────────┐
      ▼                       ▼
EntityExtractor       Message Database Persistence
(Extracts Grade, Board,    (Appends User & Assistant messages
City, Role, Subjects)      to AIMessage collection)
      │
      ▼
ContextIntegrator (Assembles Persona + Entities + Workflow State + RAG Context + History)
      │
      ▼
AI Provider (Groq / OpenAI inference)
```

---

## Session Lifecycle

1. **Session Creation**: Client passes a `sessionId` (e.g. `session_174000000_abc`). If no session exists, `ConversationManager` creates a record in the `AIConversation` database collection.
2. **Multi-Turn Restoration**: Subsequent messages under the same `sessionId` restore the active session, memory history, and extracted parameters.
3. **Session Timeout Expiration**: Inactive sessions automatically expire after `SESSION_TIMEOUT_MINUTES` (default: 60 minutes). Subsequent requests under an expired session restart context safely.
4. **Cross-Platform Parity**: Web, iOS, Android, and Desktop apps share the exact same `ConversationManager` API contracts without changes.

---

## Entity Extraction (`EntityExtractor`)

`EntityExtractor` automatically parses incoming user messages to extract structured educational parameters:

| Entity Field | Example User Inputs | Extracted Value |
|---|---|---|
| **Role** | "I am a parent looking for a tutor" / "I study in class 10" | `parent` / `student` / `teacher` |
| **Grade / Class** | "Class 10", "Grade 8", "12th std", "KG" | `Grade 10`, `Grade 8`, `Grade 12`, `Grade KG` |
| **Board** | "CBSE board", "ICSE syllabus", "IB diploma" | `CBSE`, `ICSE`, `IB` |
| **Subjects** | "Maths and Physics", "Chemistry and Biology" | `["Maths", "Physics"]`, `["Chemistry", "Biology"]` |
| **City** | "Bhubaneswar", "Delhi", "Bangalore" | `Bhubaneswar`, `Delhi`, `Bangalore` |
| **Tuition Mode** | "Home tutor at my place" / "Online classes" | `Home Tuition` / `Online Tuition` |
| **Phone & Email** | "9876543210", "parent@example.com" | `9876543210`, `parent@example.com` |

---

## Context Integrator (`ContextIntegrator`)

`ContextIntegrator` assembles all active context streams before dispatching requests to the AI engine:

1. **System Persona**: Mentee's warm educational tone & non-hallucination rules.
2. **Known User Details**: Reuses extracted entities (Parent Name, Grade, Board, Subjects, City) so Mentee never asks the user to repeat themselves.
3. **Active Workflow State**: Guides the user through steps (e.g. `booking_flow`, `teacher_onboarding`).
4. **RAG Knowledge Context**: Injects relevant knowledge chunks from MongoDB Atlas Vector Search.
5. **Recent Conversation History**: Passes the last $N$ turns from database memory.

---

## Future Extension Points

- **Long-Term User Memory**: `AIConversation.userId` links to authenticated user profiles to carry preferences across distinct chat sessions.
- **Conversation Summarization**: Long conversations exceeding threshold token limits can trigger automatic background summarization to compress old turns into `session.summary`.
