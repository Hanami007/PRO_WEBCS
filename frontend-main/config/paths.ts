export const paths = {
  home: {
    getHref: () => "/",
  },

  department: {
    about: {
      getHref: () => `/abouts`,
    },
    facility: {
      getHref: () => "/facilities",
    },
    personnels: {
      getHref: () => "/personnels",
    },
    personnel: {
      getHref: (id: string) => `/personnels/${id}`,
    },
    alumni: {
      getHref: () => "/alumnis",
    },
  },

  programs: {
    getHref: () => "/programs",
  },

  program: {
    getHref: (id: string) => `/programs/${id}`,
  },

  projects: {
    getHref: () => "/projects",
  },

  project: {
    getHref: (id: string) => `/projects/${id}`,
  },

  contact: {
    getHref: () => "/contacts",
  },

  news: {
    getHref: () => "/newsroom",
    articles: {
      getHref: () => "/articles",
    },
    article: {
      getHref: (id: string) => `/articles/${id}`,
    },
    events: {
      getHref: () => "/events",
    },
  },

  admission: {
    getHref: () => "https://admissions.mju.ac.th/",
  },

  mis: {
    coursePending: {
      getHref: () => "/mis/course-pending",
    },
    equipmentBorrow: {
      getHref: () => "/mis/equipment-borrow",
    },
    repairRequest: {
      getHref: () => "/mis/repair-request",
    },
  },

  dashboard: {
    root: {
      getHref: () => "/dashboard",
    },
    dashboard: {
      getHref: () => "/dashboard",
    },
    carousels: {
      getHref: () => "/dashboard/carousels",
    },
    carousel: {
      getHref: (id: string) => `/dashboard/carousels/${id}`,
    },
    stats: {
      getHref: () => "/dashboard/stats",
    },
    testimonials: {
      getHref: () => "/dashboard/testimonials",
    },
    testimonial: {
      getHref: (id: string) => `/dashboard/testimonials/${id}`,
    },
    abouts: {
      getHref: () => "/dashboard/abouts",
    },
    about: {
      getHref: (id: string) => `/dashboard/abouts/${id}`,
    },
    contacts: {
      getHref: () => "/dashboard/contacts",
    },
    contact: {
      getHref: (id: string) => `/dashboard/contacts/${id}`,
    },
    personnel: {
      getHref: () => "/dashboard/personnels",
    },
    alumnis: {
      getHref: () => "/dashboard/alumnis",
    },
    alumni: {
      getHref: (id: string) => `/dashboard/alumnis/${id}`,
    },
    facilities: {
      getHref: () => "/dashboard/facilities",
    },
    buildings: {
      getHref: () => "/dashboard/buildings",
    },
    building: {
      getHref: (id: string) => `/dashboard/buildings/${id}`,
    },
    rooms: {
      getHref: () => "/dashboard/rooms",
    },
    room: {
      getHref: (id: string) => `/dashboard/rooms/${id}`,
    },
    curriculum: {
      getHref: () => "/dashboard/curriculums",
    },
    research: {
      getHref: () => "/dashboard/projects",
    },
    projects: {
      getHref: () => "/dashboard/projects",
    },
    project: {
      getHref: (id: string) => `/dashboard/projects/${id}`,
    },
    complains: {
      getHref: () => "/dashboard/complains",
    },
    resources: {
      getHref: () => "/dashboard/resources",
    },
    resource: {
      getHref: (id: string) => `/dashboard/resources/${id}`,
    },
    articles: {
      getHref: () => "/dashboard/articles",
    },
    article: {
      getHref: (id: string) => `/dashboard/articles/${id}`,
    },
    events: {
      getHref: () => "/dashboard/events",
    },
    event: {
      getHref: (id: string) => `/dashboard/events/${id}`,
    },
    programs: {
      getHref: () => "/dashboard/programs",
    },
    program: {
      getHref: (id: string) => `/dashboard/programs/${id}`,
    },
    courses: {
      getHref: () => "/dashboard/courses",
    },
    course: {
      getHref: (id: string) => `/dashboard/courses/${id}`,
    },
    settings: {
      getHref: () => "/dashboard/settings",
      account: {
        getHref: () => "/dashboard/settings/account",
      },
      appearance: {
        getHref: () => "/dashboard/settings/appearance",
      },
      sessions: {
        getHref: () => "/dashboard/settings/sessions",
      },
    },
    announcements: {
      getHref: () => "/dashboard/announcements",
    },
    announcement: {
      getHref: (id: string) => `/dashboard/announcements/${id}`,
    },
    mis: {
      coursePending: {
        getHref: () => "/dashboard/mis/course-pending",
      },
      equipmentBorrow: {
        getHref: () => "/dashboard/mis/equipment-borrow",
      },
      repairRequest: {
        getHref: () => "/dashboard/mis/repair-request",
      },
    },
  },

  auth: {
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${
          redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
        }`,
    },
  },
} as const;
