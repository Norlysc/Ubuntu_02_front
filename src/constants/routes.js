export const USER_ROUTES = {
  HOME: '/',
  LOGIN: '/ingresar',
  MICROENTREPRENEURSHIPS: {
    ROUTER_ROUTE: '/microemprendimientos',
    ROOT: '/',
    BY_CATEGORY: ':categoryId',
    CONTACT: ':categoryId/:id/contacto',
  },
  POSTS: '/publicaciones',
  SEARCH: '/buscar',
};

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  MICROENTREPRENEURSHIPS: {
    ROUTER_ROUTE: '/admin/microemprendimientos',
    ROOT: '/',
    BY_ID: ':id',
    LOAD: 'cargar',
    EDIT: 'editar',
  },
  POSTS: {
    ROUTER_ROUTE: '/admin/publicaciones',
    ROOT: '/',
    LOAD: 'cargar',
    EDIT: 'editar',
    
  },
  CONTACT_REQUESTS: {
    ROUTER_ROUTE: '/admin/solicitudes-de-contacto',
    ROOT: '/',
    MANAGED: 'gestionadas',
    UNMANAGED: 'no-gestionadas',
    BY_ID: ':id',

  },
};
