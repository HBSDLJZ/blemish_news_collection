import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import BlemishTag from '../components/BlemishTag.vue'
import BlemishNews from '../components/BlemishNews.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    redirect: '/blemish_news'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/blemish_tag',
        name: 'blemish_tag',
        component: BlemishTag
      },
      {
        path: '/blemish_news',
        name: 'blemish_news',
        component: BlemishNews
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
