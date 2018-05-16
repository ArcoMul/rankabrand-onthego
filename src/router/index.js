import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Ranking from '@/components/Ranking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ranking/:id',
      name: 'Ranking',
      component: Ranking
    }
  ]
})
