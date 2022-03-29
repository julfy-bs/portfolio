import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: '',
        redirect: '/admin/login'
      },
      {
        path: '/admin/login',
        name: 'Login to Admin',
        component: () => import('@/views/AdminLogin.vue')
      },
      {
        path: '/admin/works',
        name: 'Admin works',
        component: () => import('@/views/AdminWorks.vue')
      }
      ,
      {
        path: '/admin/about',
        name: 'Admin about',
        component: () => import('@/views/AdminAbout.vue')
      },
      {
        path: '/admin/reviews',
        name: 'Admin reviews',
        component: () => import('@/views/AdminReviews.vue')
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
