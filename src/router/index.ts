import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dataSource',
    },
    {
      path: '/dataSource',
      name: 'dataSource',
      component: defineAsyncComponent(() => import('../views/DataSourceView.vue')),
    },
    {
      path: '/layout',
      name: 'layout',
      component: defineAsyncComponent(() => import('../views/LayoutView.vue')),
    },
    {
      path: '/actions',
      name: 'actions',
      component: defineAsyncComponent(() => import('../views/ActionsVIew.vue')),
    },
  ],
})

export default router
