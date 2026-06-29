# AI Resume Builder

An intelligent, multi-agent AI system designed to parse, analyze, and optimize professional resumes against specific job descriptions. The system transforms unstructured user resumes into high-impact, tailor-made, ATS-friendly PDFs using **Gemini Structured Outputs** and React components.

**Live Demo URL:** [https://ai-resume-builder-ruby-nine.vercel.app/](https://ai-resume-builder-ruby-nine.vercel.app/)

---

## 🚀 System Architecture & Workflow

The platform leverages a specialized two-stage AI agent pipeline combined with an OCR parsing subsystem to deliver exact contextual alignment:

```
[ User Resume Upload ] ──> [ OCR Parsing Subsystem ] ──> Raw Text Extracted
                                                               │
[ Job Description ] ───────────────────────────────────────────┼
                                                               │
                                                               ▼
                                                       ┌────────────────────────┐
                                                       │  AI Agent 1 (Parser)   │
                                                       └────────────────────────┘
                                                               │
                                                               ▼ (Structured Output Schema)
                                                       ┌────────────────────────┐
                                                       │ AI Agent 2 (Optimizer) │
                                                       └────────────────────────┘
                                                               │
                                                               ▼ (Gemini Optimized Schema)
                                                       ┌────────────────────────┐
                                                       │  @react-pdf/renderer   │
                                                       └────────────────────────┘
                                                               │
                                                               ▼
                                                      [ ATS-Friendly PDF ]

```

1. **OCR Ingestion:** The user uploads an existing resume. The system utilizes an OCR module to parse the physical document formatting into a raw text string.
2. **AI Agent 1 (Schema Alignment):** The raw text along with the target Job Description (JD) is fed directly to the first Gemini-powered agent. This agent extracts current data and enforces a tightly formatted structured output schema.
3. **AI Agent 2 (Tailoring & Optimization):** The structured output maps directly to the second Gemini agent. This optimizer agent rewrites and strategically re-aligns skills, metrics, and bullet points to maximize relevance against the target job description.
4. **ATS Render Engine:** The finalized output follows a rigid JSON contract, allowing the client-side `@react-pdf/renderer` to programmatically build an authentic text-selectable, ATS-optimized PDF document.

---

## 🛠️ Tech Stack

### Frontend Architecture

- **Framework:** React 18+ with TypeScript & Vite
- **Styling:** Tailwind CSS
- **PDF Engine:** `@react-pdf/renderer` (Generates selectable text structures to prevent ATS parsing failure)
- **State & Transitions:** Framer Motion (Page Transitions), Axios, React Context API

### Backend Ecosystem

- **Core Engine:** Java / Spring Boot 3.x
- **Build Tool:** Maven
- **AI Orchestration:** Google Gemini API Integration via structured JSON schema formats
- **Deployment Friendly:** Includes local Docker multi-stage environment support

---

## 📂 Project Directory Structure

```text
AI-Resume-Builder/
├── client/                      # Vite + React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── templates/       # ClassicTemplate.tsx (ATS Print Styles)
│   │   │   ├── Evaluation.tsx   # Scoring & Matching Metrics Display
│   │   │   ├── Optimizer.tsx    # Agent configuration UI
│   │   │   └── AILoader.tsx     # Custom agent processing states
│   │   ├── context/             # ResumeContext.tsx globally managing state
│   │   └── types/               # resume.ts enforcing API schema safety
│   ├── package.json
│   └── vite.config.ts
│
└── server/                      # Spring Boot Backend REST API
    ├── src/main/java/com/khangnguyen/ai_resume_builder/
    │   ├── controller/          # ResumeController.java (Handles file upload & optimization)
    │   ├── dto/                 # OptimizeRequestDTO, ParsedResumeDTO
    │   └── service/             # ResumeAgent.java, OptimizationService.java, PdfService.java
    ├── src/main/resources/      # application.yaml containing API configuration parameters
    ├── Dockerfile               # High-efficiency multi-stage build setup
    └── pom.xml                  # Maven Dependencies

```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js:** `v18.x` or higher
- **Java SDK:** `JDK 17` or higher
- **Maven:** `3.8+`
- **Gemini API Key:** Obtainable from Google AI Studio

### Backend Installation (`/server`)

1. Navigate to the server folder:

```bash
cd server

```

2. Open `src/main/resources/application.yaml` and configure your Gemini API token profile:

```yaml
gemini:
    api:
        key: ${GEMINI_API_KEY:your_actual_api_key_here}
```

3. Compile and launch the Spring Boot microservice:

```bash
./mvnw spring-boot:run

```

The server will hook into port `8080` by default.

### Frontend Installation (`/client`)

1. Open a new terminal instance and navigate to the client folder:

```bash
cd client

```

2. Generate an environment configurations instance `.env`:

```env
VITE_API_URL=http://localhost:8080

```

3. Install required node dependencies:

```bash
npm install

```

4. Boot the localized development server environment:

```bash
npm run dev

```

---

## 📊 Core Features Implemented

> **Why Text Selectability Matters for ATS Systems:**
> Legacy and modern Application Tracking Systems (ATS) process raw text streams. Using flat canvas layers rejects candidates immediately. This platform outputs valid text strings using `@react-pdf/renderer` primitives directly inside standard standard page structures.

- **Multi-Turn Agent Workflow:** Separates data transformation parsing tasks from strategic textual generation models.
- **Granular Evaluation Metrics:** Analyzes resume coverage against targeted career fields before triggering exports.
- **Deterministic Structured JSON Format:** Enforces native type checking across both Java records and TypeScript abstractions.
