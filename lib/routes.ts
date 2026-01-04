
export const ROUTES = {
  api: {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      signup: '/auth/signup',
      refresh: '/auth/refresh',
    },
    users: {
      list: '/users',
    },
    assets: {
      list: '/assets',
      create: '/assets',
      update: '/assets',
      assetDelete: (assetId: string) => `/assets/${assetId}`,
      unitsList: (assetId: string) => `/assets/${assetId}/units`,
      unitsCreate: (assetId: string) => `/assets/${assetId}/units`,
      unitUpdate: '/assets/units',
      unitDelete: (unitId: string) => `/assets/units/${unitId}`,
      rentals: {
        list: '/assets/rentals',
        detail: (rentalId: string) => `/assets/rentals/${rentalId}`,
        create: '/assets/rentals',
        return: '/assets/rentals',
      },
    },
    category: {
      list: '/category',
      create: '/category',
      delete: '/category',
    },
    locations: {
      list: '/location',
      create: '/location',
      delete: '/location',
    },
  },

  route: {
    home: '/',
    auth: {
      forgotPassword: '/forgot-password',
      login: '/login',
    },
    admin: {
      home: '/admin',
      users: '/admin/users',
      assets: {
        list: '/admin/assets',
        detail: (assetId: string) => `/admin/assets/${assetId}`,
        detailUnit: (assetId: string, unitId: string) => `/admin/assets/${assetId}/${unitId}`,
      },
    },
    assets: {
      list: '/assets',
    },
    rentals: {
      list: '/rentals/list',
      detail: (rentalId: string) => `/rentals/${rentalId}`,
      create: '/rentals',
      return: '/rentals/return',
    },
  },
} as const;
