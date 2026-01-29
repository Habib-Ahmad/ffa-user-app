# FFA User Application

A modern, fully-featured React TypeScript application for the FFA (French Alumni Association) platform. This is the user-facing frontend application that enables users to browse projects, submit applications, and manage their profile within the FFA ecosystem.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Internationalization](#internationalization)
- [Theming](#theming)
- [Development Guidelines](#development-guidelines)
- [Build & Deployment](#build--deployment)

## Overview

A comprehensive web platform for browsing FFA projects, submitting applications, managing submissions, and communicating with coordinators. Features include multi-language support (EN/FR), light/dark theme, and JWT-based authentication.

## Features

- JWT Authentication with login/register
- Multi-language (EN/FR) and theme support (light/dark)
- 40+ shadcn/ui components with Tailwind CSS
- React Router v6 with route guards
- TanStack Query for server state management
- Axios with interceptors and error handling
- Dual form validation (Formik + Yup / React Hook Form + Zod)
- Toast notifications and charts (Recharts)
- Full TypeScript support

## Tech Stack

### Frontend Framework

- React 18.3.1 - UI library
- TypeScript 5.8.3 - Type safety
- Vite 5.4.19 - Build tool and dev server
- React Router 6.30.1 - Client-side routing

### UI & Styling

- Tailwind CSS 3.4.17 - Utility-first CSS framework
- shadcn/ui - 40+ unstyled, accessible components
- Radix UI - Underlying primitive components
- Lucide React 462 icons - Consistent icon library
- Next Themes 0.3.0 - Theme management

### State Management & Data

- TanStack Query 5.83.0 - Server state management
- Axios 1.13.2 - HTTP client
- Formik 2.4.8 - Form state management
- React Hook Form 7.61.1 - Performant form handling

### Form Validation

- Yup 1.7.1 - Schema validation
- Zod 3.25.76 - TypeScript-first schema validation

### Utilities

- date-fns 3.6.0 - Date utilities
- clsx/tailwind-merge 2.6.0 - Conditional class names
- recharts 2.15.4 - Charts and graphs
- sonner 1.7.4 - Toast notifications
- vaul 0.9.9 - Drawer animations
- embla-carousel 8.6.0 - Carousel component

### Development Tools

- ESLint 9.32.0 - Code linting
- PostCSS 8.5.6 - CSS processing
- Autoprefixer 10.4.21 - CSS vendor prefixes

## Project Structure

```
ffa-user-app/
├── public/                      # Static assets
│   └── robots.txt
├── src/
│   ├── api/                     # API integration layer
│   │   ├── config.ts           # Axios instance with interceptors
│   │   ├── urls.ts             # API endpoint constants
│   │   ├── auth.ts             # Authentication API calls
│   │   ├── applications.ts      # Applications API calls
│   │   ├── projects.ts          # Projects API calls
│   │   ├── messages.ts          # Messages API calls
│   │   └── index.ts             # API exports
│   │
│   ├── components/              # React components
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx    # Main app layout wrapper
│   │   │   ├── Header.tsx       # Top header component
│   │   │   └── Sidebar.tsx      # Navigation sidebar
│   │   └── ui/                  # shadcn/ui components (40+)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       └── ... (40+ more)
│   │
│   ├── contexts/                # React Context for state management
│   │   ├── AuthContext.tsx      # Authentication state
│   │   ├── ThemeContext.tsx     # Light/Dark theme state
│   │   └── LanguageContext.tsx  # i18n language state
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile detection hook
│   │   └── use-toast.ts         # Toast notification hook
│   │
│   ├── interfaces/              # TypeScript interfaces
│   │   └── index.ts             # User, Institution, Location types
│   │
│   ├── lib/                     # Utility functions and configs
│   │   ├── i18n.ts             # Translation strings (EN/FR)
│   │   └── utils.ts             # Helper functions (cn, classname utils)
│   │
│   ├── pages/                   # Application pages/screens
│   │   ├── Home.tsx             # Home page
│   │   ├── Projects.tsx         # Projects listing page
│   │   ├── ProjectDetail.tsx    # Individual project details
│   │   ├── ApplyToProject.tsx   # Project application form
│   │   ├── Applications.tsx     # User applications listing
│   │   ├── ApplicationDetail.tsx # Individual application details
│   │   ├── Messages.tsx         # Messaging interface
│   │   ├── Index.tsx            # Index/landing page
│   │   └── auth/                # Authentication pages
│   │       ├── Login.tsx        # Login page
│   │       └── Register.tsx     # Registration page
│   │
│   ├── router/                  # Routing configuration
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # React DOM render entry point
│   ├── App.css                  # Global app styles
│   └── index.css                # Global CSS
│
├── components.json              # shadcn/ui configuration
├── eslint.config.js             # ESLint configuration
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript base configuration
├── tsconfig.app.json            # TypeScript app configuration
├── tsconfig.node.json           # TypeScript Node configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9+
- Git

### Installation

```bash
git clone https://github.com/Habib-Ahmad/ffa-user-app.git
cd ffa-user-app
npm install
```

Create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080/ffaAPI
```

Start development server:

```bash
npm run dev
```

Application runs at http://localhost:8080

## Available Scripts

| Command           | Description                                     |
| ----------------- | ----------------------------------------------- |
| npm run dev       | Start development server with hot module reload |
| npm run build     | Build for production (optimized bundle)         |
| npm run build:dev | Build for development environment               |
| npm run lint      | Run ESLint to check code quality                |
| npm run preview   | Preview the production build locally            |

## API Integration

API client configured in `src/api/config.ts`:

- Base URL: `VITE_API_BASE_URL` (env variable)
- Auth: Bearer token injection from localStorage
- Timeout: 30 seconds
- Errors: Auto toast notifications
- Session: Auto-redirect to login on 401

API modules in `src/api/`:

- auth.ts - Authentication
- projects.ts - Projects
- applications.ts - Applications
- messages.ts - Messaging
- config.ts - Axios configuration

## Authentication

**Flow:**

1. Register at `/register` with name, email, username, password
2. Login at `/login` with email/password
3. JWT tokens (accessToken, refreshToken) stored in localStorage

**Protected Routes:**

- ProtectedRoute: Auth required; redirects to /login if not authenticated
- PublicRoute: Auth users redirected to /
- Tokens auto-included in API requests via interceptors

## Internationalization

Supported languages: English (en), French (fr)

Translations in `src/lib/i18n.ts`. Access via:

```tsx
const { t } = useLanguage();
<button>{t("common.submit")}</button>;
```

Add translations to both en/fr objects in i18n.ts and reference via dot notation.

## Theming

Light/dark mode support with next-themes library.

```tsx
const { theme, setTheme } = useTheme();
setTheme(theme === "dark" ? "light" : "dark");
```

Theme colors use CSS variables in `src/index.css` referenced in `tailwind.config.ts`.

## Development Guidelines

**Code Organization:**

- `src/components/` - Reusable UI components
- `src/pages/` - Full-page views
- `src/contexts/` - Global state
- `src/hooks/` - Custom hooks
- `src/api/` - Backend integration
- `src/lib/` - Utilities

**Naming:**

- Components: PascalCase (Button.tsx)
- Hooks: camelCase with use prefix (useToast.ts)
- Pages: PascalCase (HomePage.tsx)

**TypeScript:**

- Interfaces in `src/interfaces/index.ts`
- Use strict typing; avoid any
- Type component props explicitly
- Use type for aliases, interface for objects

**Forms:**
Choose React Hook Form + Zod or Formik + Yup. Both have resolvers configured in the project.

**Styling:**
Use Tailwind CSS utility classes. Global styles in `src/index.css`. Use `cn()` utility from `src/lib/utils.ts` for conditional classes.

## Build & Deployment

```bash
npm run build          # Production build
npm run build:dev      # Development build
npm run preview        # Preview production build
```

Output in `dist/` folder with minified, tree-shaken code.
