# AI-Powered Code Review Assistant

The **AI-Powered Code Review Assistant** is a full-stack application designed to automate, enhance, and streamline the code review process. By analyzing GitHub repositories using advanced Large Language Models (LLMs), it provides developers with instant, actionable feedback, identifies potential bugs, suggests improvements, and visualizes code quality metrics.

The application features a sleek, developer-focused interface inspired by Supabase's dark-mode design system.

---

## ✨ Features

- **Automated Repository Analysis**: Input a GitHub repository URL to automatically clone and analyze the codebase.
- **AI Code Review**: Leverages multiple LLM providers (Google GenAI, OpenAI, OpenRouter) to generate deep, context-aware code reviews.
- **Interactive Code Editor**: View analyzed files directly in the browser via an integrated Monaco Editor.
- **Data Visualization**: Clear, graphical representations of codebase metrics and review scores using Recharts.
- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a fluid, responsive, premium dark-mode developer experience.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Code Editor**: `@monaco-editor/react`
- **Charts**: Recharts
- **Markdown Rendering**: Streamdown
- **Icons**: Lucide React
- **Network Requests**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Integrations**: `@google/genai`, `openai`, `@openrouter/sdk`
- **Git Operations**: `simple-git`
- **File System**: `fs-extra`
- **Other utilities**: `cors`, `dotenv`, `uuid`

---

## 📂 Project Structure

```text
ai-revierer/
├── design.md                  # Detailed Supabase-inspired UI/UX design guidelines
├── README.md                  # Project documentation (You are here)
│
├── backend/                   # Node.js + Express Backend
│   ├── index.js               # Application entry point & server setup
│   ├── package.json           # Backend dependencies and scripts
│   ├── nodemon.json           # Nodemon configuration for dev environment
│   ├── controllers/           # Route logic handlers
│   │   ├── analysisController.js # Handles LLM code analysis requests
│   │   └── repoController.js     # Handles repository cloning and processing
│   ├── routes/                # Express API routes
│   │   └── analysisRoutes.js     # API endpoints mapping
│   └── services/              # Core business logic
│       ├── llmService.js         # Integration with Google/OpenAI/OpenRouter APIs
│       └── repoService.js        # Git cloning and file parsing algorithms
│
└── frontend/                  # React + Vite Frontend
    ├── index.html             # Main HTML template
    ├── package.json           # Frontend dependencies and scripts
    ├── vite.config.js         # Vite bundler configuration
    ├── tailwind.config.js     # Tailwind CSS theme and styling configuration
    ├── eslint.config.js       # ESLint rules
    ├── public/                # Static assets
    └── src/
        ├── App.jsx            # Main React Application component
        ├── main.jsx           # React DOM rendering entry point
        ├── App.css            # App-specific styling
        ├── index.css          # Global styles & Tailwind directives
        ├── assets/            # Component assets (images, icons)
        ├── components/        # Reusable functional components
        │   ├── Editor.jsx        # Monaco Editor wrapper for code viewing
        │   ├── RepoInput.jsx     # Input component for GitHub URLs
        │   └── ResultsPanel.jsx  # Displays AI analysis results and charts
        ├── pages/             # Route pages
        │   └── Home.jsx          # Main landing and interface page
        └── services/          # Frontend logic and API calls
            └── api.js            # Axios configuration for backend communication
```

---

## ⚙️ Prerequisites

Ensure you have the following installed to run the application locally:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher recommended)
- **Git** (for cloning repositories natively via `simple-git`)

---

## 🚀 Installation & Setup

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <your-repository-url>
   cd ai-revierer
   ```

2. **Set up the Backend**:

   ```bash
   cd backend
   npm install
   ```

3. **Set up the Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory and populate it with your necessary API keys:

```env
# Server Configuration
PORT=3001

# AI Provider API Keys (Add the ones you intend to use)
GOOGLE_API_KEY=your_google_genai_api_key
OPENAI_API_KEY=your_openai_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## 💻 Running the Application

You will need two terminal windows to run both the frontend and backend concurrently.

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

_The backend will start processing on `http://localhost:3001`._

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

_The frontend will be available at `http://localhost:5173` (or the port Vite automatically assigns)._

---

## 🎨 Design System

The frontend heavily utilizes a design language inspired by Supabase:

- **Atmosphere**: Deep black backgrounds (`#0f0f0f`, `#171717`) giving it a premium code editor feel.
- **Accents**: Specific emerald green touches (`#3ecf8e`, `#00c573`).
- **Typography**: Smooth sans-serif for main content and monospace (`Source Code Pro`) for technical labels.
- **Shapes**: Pill-shaped primary action buttons (9999px radius) for distinct visual hierarchy.
  For more details, refer to `design.md`.
