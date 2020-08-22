import Vue from 'vue'
import VueRouter from 'vue-router'
import Container from '../Container/Container'
import Companies from '../views/Companies'

import Profile from '../views/Profile'
import ChangePassword from '../views/ChangePassword'


import Help from '../views/Help'
import Logout from '../views/Logout'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'
import CurrentStockPrice from "../views/CurrentStockPrice";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Container,
    redirect: '/companies',
    children: [
      {
        path: '/companies',
        name: 'Companies',
        component: Companies
      },
      {
        path: '/current-stock-price',
        name: 'CurrentStockPrice',
        component: CurrentStockPrice
      },
      {
        path: '/current-stock-price/:company_id',
        name: 'CurrentStockPrice',
        component: CurrentStockPrice
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/change-password',
        name: 'ChangePassword',
        component: ChangePassword
      },

      {
        path: '/help',
        name: 'Help',
        component: Help
      },
      {
        path: '/logout',
        name: 'Logout',
        component: Logout
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
