import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Soundboard',
    component: () =>
      import(
        /* webpackChunkName: "shipmentInspectionResults" */ '../views/Soundboard.vue'
      ),
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export default createRouter({
  routes,
  history: createWebHistory(),
})
