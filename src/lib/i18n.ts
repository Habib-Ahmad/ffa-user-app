export const translations = {
  en: {
    common: {
      save: "Save",
      submit: "Submit",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      export: "Export",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      loading: "Loading...",
      noData: "No data available",
      confirm: "Confirm",
      actions: "Actions",
      status: "Status",
      date: "Date",
    },
    nav: {
      home: "Home",
      docs: "Documentation",
      settings: "Settings",
    },
    home: {
      welcome: "Welcome to Your App",
      description:
        "A modern foundation built with React, TypeScript, and Tailwind CSS",
      getStarted: "Get Started",
      feature1: {
        title: "Theme Support",
        description: "Light and dark mode with beautiful transitions",
      },
      feature2: {
        title: "Internationalization",
        description: "Multi-language support built-in (EN/FR)",
      },
      feature3: {
        title: "Component Library",
        description: "Full shadcn/ui component system ready to use",
      },
    },
  },
  fr: {
    common: {
      save: "Enregistrer",
      submit: "Soumettre",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      search: "Rechercher",
      filter: "Filtrer",
      export: "Exporter",
      close: "Fermer",
      back: "Retour",
      next: "Suivant",
      previous: "Précédent",
      loading: "Chargement...",
      noData: "Aucune donnée disponible",
      confirm: "Confirmer",
      actions: "Actions",
      status: "Statut",
      date: "Date",
    },
    nav: {
      home: "Accueil",
      docs: "Documentation",
      settings: "Paramètres",
    },
    home: {
      welcome: "Bienvenue dans votre application",
      description:
        "Une base moderne construite avec React, TypeScript et Tailwind CSS",
      getStarted: "Commencer",
      feature1: {
        title: "Support de thème",
        description: "Mode clair et sombre avec de belles transitions",
      },
      feature2: {
        title: "Internationalisation",
        description: "Support multilingue intégré (EN/FR)",
      },
      feature3: {
        title: "Bibliothèque de composants",
        description: "Système complet de composants shadcn/ui prêt à l'emploi",
      },
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
