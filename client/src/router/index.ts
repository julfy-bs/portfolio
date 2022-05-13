import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/index.vue'),
    children: [
      {
        path: '',
        redirect: '/admin/login'
      },
      {
        path: '/admin/login',
        name: 'Login to Admin',
        component: () => import('@/views/admin/AdminLoginPage.vue')
      },
      {
        path: '/admin/skills',
        name: 'Admin skills',
        component: () => import('@/views/admin/AdminSkillsPage.vue')
      },
      {
        path: '/admin/profile',
        name: 'Admin profile',
        component: () => import('@/views/admin/AdminProfilePage.vue')
      },
      {
        path: '/admin/works',
        name: 'Admin works',
        component: () => import('@/views/admin/AdminWorksPage.vue')
      },
      {
        path: '/admin/about',
        name: 'Admin about',
        component: () => import('@/views/admin/AdminAboutPage.vue')
      },
      {
        path: '/admin/reviews',
        name: 'Admin reviews',
        component: () => import('@/views/admin/AdminReviewsPage.vue')
      }
    ]
  }
]

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else if (to.name === 'Home' && to.hash === '#hero') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              el: to.hash,
              top: 55,
              behavior: 'smooth'
            })
          }, 150)
        })
      } else if (to.name === 'Home' && to.hash !== '#hero') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              el: to.hash,
              top: 0,
              behavior: 'smooth'
            })
          }, 150)
        })
      } else {
        return {
          behavior: 'smooth'
        }
      }
    },
    history: createWebHistory(process.env.BASE_URL),
    routes
  }
)

export default router
