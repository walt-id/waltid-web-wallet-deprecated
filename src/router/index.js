import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Credentials from '@/views/Credentials.vue'
import Credential from '@/views/Credential.vue'
import CredentialOffer from '@/views/CredentialOffer.vue'
import CredentialRequest from '@/views/CredentialRequest.vue'
import Connections from '@/views/Connections.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Credentials
  },
  {
    path: '/credentials',
    name: 'Credentials',
    component: Credentials
  },
  {
    path: '/old-home',
    name: 'OldHome',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/credential',
    name: 'Credential',
    component: Credential
  },
  {
    path: '/credential-offer',
    name: 'CredentialOffer',
    component: CredentialOffer
  },
  {
    path: '/credential-request',
    name: 'CredentialRequest',
    component: CredentialRequest
  },
  {
    path: '/connections',
    name: 'Connections',
    component: Connections
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
