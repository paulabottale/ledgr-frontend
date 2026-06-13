# Ledgr · Frontend

> Multi-tenant SaaS for financial management — **Phase 1: live**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Frontend web application for **Ledgr**, a multi-tenant SaaS designed to manage financial operations for organizations. Built with React + TypeScript and connected to a Node.js + Express + MongoDB backend.

🔗 **[Live Demo](https://ledgr-frontend-nine.vercel.app)** · **[Backend Repository](https://github.com/paulabottale/ledgr-backend)**

---

## About Ledgr

Ledgr is a multi-tenant SaaS for financial management, designed from the ground up to scale. The core architecture is built around **organization-based data isolation**: every record is strictly scoped to its company at the model level — the foundation that separates a real SaaS from a standard app.

## Phase 1 — What's Live

Complete full-stack authentication flow with:

- **Multi-tenant data isolation** at the model level — every record strictly scoped to its company
- **JWT-based session management** with secure token persistence
- **Automatic session validation** against the backend on app load
- **Protected routes** guarding the dashboard from unauthenticated access
- **React + TypeScript frontend** deployed independently from the backend

## Tech Stack

- **React 18** with **TypeScript** + **Vite** as build tool
- **Tailwind CSS v4** for utility-first styling
- **React Router v7** for client-side routing
- **Context API** with a custom `useAuth` hook for global auth state
- **localStorage** for token persistence across sessions

## Architecture

```
src/
├── components/
│   └── ProtectedRoute.tsx       — Route guard for authenticated-only access
├── context/
│   └── AuthContext.tsx          — Global auth state (login, register, logout)
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── services/
│   └── auth.ts                  — HTTP client abstracting backend integration
├── types/
│   └── auth.ts                  — Shared types matching backend payloads
└── App.tsx                      — Routes with isLoading guard
```

### Key architectural decisions

- **Service layer**: HTTP calls are abstracted in `services/`, decoupled from UI components. The frontend never talks to the backend directly from a component.
- **Context API + custom hook**: global auth state is exposed via a `useAuth` hook for consumer ergonomics. Components consume `useAuth()` instead of importing the context directly.
- **Token persistence**: JWT is stored in `localStorage` and validated against `/api/auth/me` on app load, restoring sessions transparently after refresh.
- **Protected routes**: unauthenticated visitors to `/dashboard` are redirected to `/login` via React Router's `<Navigate replace />` pattern.
- **Errors bubble up**: the auth context never silences errors — they propagate to the component, which decides how to display them in the UI.

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A running backend (see [backend repository](https://github.com/paulabottale/ledgr-backend))

### Installation

```bash
git clone https://github.com/paulabottale/ledgr-frontend.git
cd ledgr-frontend
npm install
```

### Environment variables

Create a `.env` file at the root of the project:

```bash
VITE_API_URL=https://ledgr-backend-s49u.onrender.com
```

> Replace this URL with `http://localhost:3000` (or the port your backend runs on) if you're running the backend locally.

### Run locally

```bash
npm run dev
```

The app starts at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

The optimized output goes to `dist/`.

## Roadmap

- 🚧 Financial dashboard with real-time metrics
- 🚧 Stripe payments integration with webhooks for balance top-ups and subscriptions
- 🚧 AI financial agent powered by the **Claude API (Anthropic)** for natural language reporting and spending pattern detection

## Author

**Paula Bottale**  
Full Stack Developer · Buenos Aires, Argentina · Open to full-time & contract roles

- 🌐 [Portfolio](https://paulabottale-portfolio.vercel.app)
- 💼 [LinkedIn](https://linkedin.com/in/paula-bottale)
- 📧 paulabottale.dev@gmail.com

---

⭐ If you find this project interesting, consider giving it a star.
