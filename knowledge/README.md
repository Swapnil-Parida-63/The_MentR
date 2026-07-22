# Mentee Knowledge Management System (KMS)

The **Knowledge Management System (KMS)** serves as the single source of truth for all domain knowledge, policies, pricing, methodologies, FAQs, and educational workflows used by **Mentee AI** and TheMentR platform.

---

## Directory Architecture & Categories

All knowledge documents are stored cleanly inside standard category subfolders under `knowledge/`:

```
knowledge/
├── company/       # Corporate background, executive overview, leadership, mission
├── services/      # Tuitions, diagnostic home visits, Olympiad prep, online courses
├── parents/       # Parent onboarding, KG-to-PG guidance, child tracking
├── teachers/      # Teacher verification, contractual terms, onboarding steps
├── students/      # Exam prep strategies, study plans, student FAQs
├── pricing/       # Subscription plans, fee structure, payment policies
├── policies/      # Terms of service, privacy policy, refund policy, safety rules
├── methodology/   # AVSAR Intelligence framework, diagnostic assessment steps
├── blogs/         # Published articles, research studies, whitepapers
├── faqs/          # Curated Q&A pairs for high-intent matching
├── career/        # Career tracks, teacher growth opportunities
└── workflows/     # Operational procedures (e.g., booking an assessment visit)
```

---

## Document Metadata Specification

Each document supports rich metadata (frontmatter or JSON structure) matching `KmsDocument`:

```json
{
  "$schema": "https://thementr.com/schemas/knowledge-document.v1.json",
  "metadata": {
    "title": "Document Title",
    "slug": "unique-document-slug",
    "category": "pricing",
    "tags": ["tuition", "rates", "monthly"],
    "description": "Short summary description of the document.",
    "author": "TheMentR Content Team",
    "version": "1.0.0",
    "status": "published",
    "language": "en",
    "lastUpdated": "2026-07-20T00:00:00Z",
    "source": "file_system",
    "visibility": "public",
    "priority": 1,
    "format": "json",
    "embeddingId": null,
    "vectorId": null
  },
  "content": "Raw document text content goes here..."
}
```

---

## How to Add New Knowledge Documents

To add new domain knowledge to Mentee:

1. **Choose Category**: Select the appropriate category subfolder (e.g. `knowledge/pricing/`).
2. **Drop-in File**: Place your document file (`.md`, `.json`, `.txt`, `.pdf`, `.docx`, `.html`) directly in that directory.
3. **Run Indexer**: Run `npm run index:knowledge`. The automated indexing pipeline will discover, validate, chunk, generate embeddings, and index the vector store automatically.

---

## Knowledge Indexing Pipeline Architecture

```
Document File
      │
      ▼
DocumentLoader (discovers & loads files)
      │
      ▼
DocumentValidator (validates schema & duplicate slugs)
      │
      ▼
FormatParserRegistry (parses markdown / json / pdf / docx / html / cms)
      │
      ▼
ChunkGenerator (splits into semantic overlapping text chunks)
      │
      ▼
EmbeddingGenerator (computes vector embeddings)
      │
      ▼
VectorRepository (upserts vectors into vector DB index)
      │
      ▼
Retriever (provides RAG context match to Mentee AI)
```

---

## Document Status & Versioning Lifecycle

- **`draft`**: In development, ignored by live RAG retrieval.
- **`published`**: Active document indexed into vector store and consumed by Mentee.
- **`archived`**: Superseded version, removed from live vector queries.

---

## Multilingual Support

The metadata supports a `language` parameter (`en`, `hi`, `or`, etc.), allowing future language-specific vector namespaces and multi-lingual RAG response generation.
