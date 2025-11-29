# React + TypeScript App Foundation

A modern, production-ready foundation for building React applications with TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎯 What's Included

This is a **bare minimum foundation** designed to be shared across multiple applications. It includes:

### Core Features

- ✅ **Theme System**: Light/Dark mode with smooth transitions
- ✅ **Internationalization**: Multi-language support (EN/FR) - easily extensible
- ✅ **Component Library**: Full shadcn/ui component system (40+ components)
- ✅ **Routing**: React Router v6 with layout system
- ✅ **API Structure**: Organized API layer with Axios and TanStack Query
- ✅ **Form Handling**: Formik + Yup and React Hook Form + Zod
- ✅ **Styling**: Tailwind CSS with custom design system
- ✅ **Type Safety**: Full TypeScript support

### Project Structure

```
src/
├── api/              # API configuration and endpoints
│   ├── config.ts     # Axios instance and interceptors
│   ├── urls.ts       # API URL constants
│   └── index.ts      # Export all API functions
├── components/
│   ├── layout/       # Layout components (Header, Sidebar, AppLayout)
│   └── ui/           # shadcn/ui components (40+ components)
├── contexts/         # React contexts
│   ├── ThemeContext.tsx      # Light/Dark theme management
│   └── LanguageContext.tsx   # i18n support
├── hooks/            # Custom React hooks
├── interfaces/       # TypeScript interfaces
├── lib/
│   ├── i18n.ts      # Translation definitions
│   └── utils.ts     # Utility functions (cn, etc.)
└── pages/           # Application pages
    └── Home.tsx     # Example home page
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Package manager: npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization Guide

### 1. Update Branding

Edit `src/components/layout/Header.tsx`:

```tsx
<span className="font-semibold text-lg">Your App Name</span>
```

### 2. Configure Navigation

Edit `src/components/layout/Sidebar.tsx` to add your routes:

```tsx
const links = [
  { to: "/", icon: Home, label: t("nav.home"), end: true },
  { to: "/your-route", icon: YourIcon, label: "Your Label" },
];
```

### 3. Add Translations

Edit `src/lib/i18n.ts` to add your app-specific translations:

```tsx
export const translations = {
  en: {
    common: {
      /* ... */
    },
    yourFeature: {
      title: "Your Feature",
      // ...
    },
  },
  fr: {
    /* ... */
  },
};
```

### 4. Add Pages

Create new pages in `src/pages/` and update routing in `src/App.tsx`:

```tsx
<Route
  path="/your-page"
  element={
    <AppLayout>
      <YourPage />
    </AppLayout>
  }
/>
```

### 5. API Configuration

Configure your API base URL in `src/api/config.ts`:

```tsx
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});
```

Create `.env` file:

```bash
VITE_API_BASE_URL=https://your-api.com/api
```

### 6. Add API Endpoints

Add your API functions in `src/api/`:

```tsx
// src/api/users.ts
export const getUsers = () => api.get("/users");
export const createUser = (data: User) => api.post("/users", data);
```

## 🎯 Available Components

The project includes the full shadcn/ui component library:

- Forms: Input, Textarea, Select, Checkbox, Radio, Switch, etc.
- Data Display: Table, Card, Badge, Avatar, etc.
- Feedback: Alert, Toast, Dialog, Sheet, etc.
- Navigation: Tabs, Breadcrumb, Pagination, etc.
- Layout: Separator, Scroll Area, Resizable, etc.
- And many more...

See `src/components/ui/` for all available components.

## 🔧 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6
- **State Management**: TanStack Query
- **Forms**: Formik + Yup, React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📦 Key Dependencies

- `react` & `react-dom`: UI library
- `react-router-dom`: Routing
- `@tanstack/react-query`: Server state management
- `axios`: HTTP client
- `tailwindcss`: Utility-first CSS
- `@radix-ui/*`: Accessible component primitives
- `lucide-react`: Icon library
- `formik` & `yup`: Form handling & validation
- `react-hook-form` & `zod`: Alternative form handling

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## 🤝 Usage Across Multiple Apps

This foundation is designed to be cloned and customized for different applications:

1. Clone this repository
2. Remove the `.git` folder to start fresh
3. Update `package.json` name and version
4. Customize branding, colors, and features
5. Add your application-specific pages and logic
6. Keep the core infrastructure (theme, i18n, components)

## 📄 License

This is a foundation template - use it however you like for your projects.

---

**Built with ❤️ for rapid application development**
