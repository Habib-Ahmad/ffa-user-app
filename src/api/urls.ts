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
    COUNTRIES: "/ffaAPI/user/countries",
  },

  USER: {
    PROFILE: "/ffaAPI/user/profile",
  },

  PROJECTS: {
    LIST: "/ffaAPI/user/projects",
    DETAIL: (id: number) => `/ffaAPI/user/projects/${id}`,
    SEARCH: "/ffaAPI/user/projects/search",
    CHECK_APPLIED: (id: number) => `/ffaAPI/user/projects/${id}/applied`,
    APPLY: (id: number) => `/ffaAPI/user/projects/${id}/apply`,
    DRAFT_APPLICATION: (id: number) =>
      `/ffaAPI/user/projects/${id}/applications/draft`,
    DOCUMENT_TYPES: (id: number) =>
      `/ffaAPI/user/projects/${id}/document-types`,
    DOCUMENT_REQUIREMENTS: (id: number) =>
      `/ffaAPI/user/projects/${id}/document-requirements`,
  },

  APPLICATIONS: {
    LIST: "/ffaAPI/user/applications",
    DETAIL: (id: number) => `/ffaAPI/user/applications/${id}`,
    SUBMIT: (id: number) => `/ffaAPI/user/applications/${id}/submit`,
    SAVE_STEP: "/ffaAPI/user/applications/steps",
    DOCUMENTS: (id: number) => `/ffaAPI/user/applications/${id}/documents`,
    VALIDATE_DOCUMENTS: (id: number) =>
      `/ffaAPI/user/applications/${id}/documents/validate`,
    DELETE: (id: number) => `/ffaAPI/user/applications/${id}`,
  },

  MESSAGES: {
    LIST: "/ffaAPI/user/messages",
    UNREAD_COUNT: "/ffaAPI/user/messages/unread-count",
    CONVERSATION: (userId: number) =>
      `/ffaAPI/user/messages/conversation/${userId}`,
    SEND: "/ffaAPI/user/messages",
    REPLY: (messageId: number) => `/ffaAPI/user/messages/${messageId}/reply`,
    MARK_READ: (messageId: number) => `/ffaAPI/user/messages/${messageId}/read`,
    MARK_ALL_READ: "/ffaAPI/user/messages/read-all",
  },

  DOCUMENTS: {
    DELETE: (documentId: number) => `/ffaAPI/user/documents/${documentId}`,
    DOWNLOAD: (documentId: number) =>
      `/ffaAPI/user/documents/${documentId}/download`,
  },
} as const;
