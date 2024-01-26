import { ADMIN_ROUTES, USER_ROUTES } from '@/constants/routes';

export const USER_LINKS = [
  {
    label: 'Inicio',
    link: USER_ROUTES.HOME,
  },
  {
    label: 'Microemprendimientos',
    link: USER_ROUTES.MICROENTREPRENEURSHIPS.ROUTER_ROUTE,
  },
  {
    label: 'Publicaciones',
    link: USER_ROUTES.POSTS,
  },
];

export const ADMIN_LINKS = [
  {
    label: 'Dashboard Administrador',
    link: ADMIN_ROUTES.DASHBOARD,
  },
  {
    label: 'Microemprendimientos',
    link: ADMIN_ROUTES.MICROENTREPRENEURSHIPS.ROUTER_ROUTE,
  },
  {
    label: 'Solicitudes de contacto',
    link: ADMIN_ROUTES.CONTACT_REQUESTS.ROUTER_ROUTE,
  },
  {
    label: 'Publicaciones',
    link: ADMIN_ROUTES.POSTS.ROUTER_ROUTE,
  },
];
