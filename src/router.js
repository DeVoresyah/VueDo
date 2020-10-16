import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/Create')
    },
    {
      path: '/create-category',
      name: 'create-category',
      component: () => import('./views/CreateCategory')
    },
    {
      path: '/edit/:taskId',
      name: 'edit',
      component: () => import('./views/Edit')
    },
  ]
})
