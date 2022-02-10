import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AdminLoginPage.vue'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    redirect: '/admin/login',
    children: [
      {
        path: '/admin/login',
        name: 'Login to Admin',
        component: () => import(/* webpackChunkName: "about" */ '@/views/AdminLoginPage.vue')
      },
      {
        path: '/admin/works',
        name: 'Admin works',
        component: () => import(/* webpackChunkName: "about" */ '@/views/AdminLoginPage.vue')
      }
    ]
  }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  }
)

export default router
