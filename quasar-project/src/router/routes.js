const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/noveknjige',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/noveknjige', component: () => import('pages/NoveKnjigePage.vue') }],
  },

  {
    path: '/popisknjiga',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/popisknjiga', component: () => import('pages/PopisKnjigaPage.vue') }],
  },

  {
    path: '/pretrazivanjeknjiga',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/pretrazivanjeknjiga', component: () => import('pages/PretrazivanjeKnjigaPage.vue') }],
  },

  {
    path: '/lokacijapage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/lokacijapage', component: () => import('pages/LokacijaPage.vue') }],
  },
  {
    path: '/loginpage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/loginpage', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/registracijapage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/registracijapage', component: () => import('pages/RegistracijaPage.vue') }],
  },
  {
    path: '/testpage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/testpage', component: () => import('pages/TestPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
