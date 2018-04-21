import Vue from 'vue'
import Router from 'vue-router'
import container from '@/components/container'
import home from '@/components/home'
import message from '@/components/message'
import my from '@/components/my'
import comp from '@/components/comp'
import secret from '@/components/secret'
import submit from '@/components/submit'
import log_reg from '@/components/log_reg'
import my_details from '@/components/my_details'
import details from '@/components/details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'container',
      component: container,
      children: [
        {
          path: '/',
          name: 'home',
          component: home,
          children: [
            {
              path: '/',
              name: 'comp',
              component: comp
            },
            {
              path: 'secret',
              name: 'secret',
              component: secret
            }
          ]
        },
        {
          path: 'message',
          name: 'message',
          component: message
        },
        {
          path: 'my',
          name: 'my',
          component: my
        }
      ]
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit
    },
    {
      path: '/log_reg/:isLogin',
      name: 'log_reg',
      component: log_reg,
    },
    {
      path: '/my_details',
      name: 'my_details',
      component: my_details
    },
    {
      path: '/details/:id',
      name: details,
      component: details
    }
  ]
})



