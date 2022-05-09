import { createRouter, createWebHistory } from '@ionic/vue-router';
import store from '@/store'

import HomePage from '../views/HomePage.vue'
import SignupPage from '../views/SignupPage.vue'
import FichePage from '../views/FichePage.vue'
import DashPage from '../views/DashPage.vue'
import OperationPage from '../views/OperationPage.vue'
import CartesPage from '../views/CartesPage.vue'
import RechargePage from '../views/RechargePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/fiche',
    name: 'Fiche',
    component: FichePage,
    meta: { 
      requireLogin: true
    }
  },

  {
    path: '/dash',
    name: 'Dash',
    component: DashPage,
    meta: { 
      requireLogin: true
    }
  },

  {
    path: '/operation/:slug',
    name: 'Operation',
    component: OperationPage,
    meta: { 
      requireLogin: true
    }
  },

  {
    path: '/cartes',
    name: 'Cartes',
    component: CartesPage,
    meta: { 
      requireLogin: true
    }
  },

  {
    path: '/recharger/:slug',
    name: 'Recharger',
    component: RechargePage,
    meta: { 
      requireLogin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
