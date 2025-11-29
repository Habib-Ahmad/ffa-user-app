export const API_URLS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    CHANGE_PASSWORD: "/auth/change-password",
    ME: "/auth/me",
  },

  PUBLIC: {
    INSTITUTIONS: "/public/institutions",
    CITIES: "/public/cities",
  },

  PROJECTS: {
    LIST: "/intervener/projects",
    DETAIL: (id: number) => `/intervener/projects/${id}`,
    SEARCH: "/intervener/projects/search",
  },

  APPLICANT: {
    APPLICATIONS: "/applicant/applications",
    APPLICATION: (id: number) => `/applicant/applications/${id}`,
  },
} as const;
