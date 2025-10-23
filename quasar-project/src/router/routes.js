const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/lol',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/lol', component: () => import('pages/ne-sto.vue') }],
  },

  {
    path: '/popis',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/popis', component: () => import('pages/PopisKnjiga.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
