import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import interFace from '@/components/interFace'
import device from '@/components/device'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/device',
      name: 'device',
      component: device
    },
    {
      path: '/index',
      name: 'interFace',
      component: interFace
    }
  ]
})
