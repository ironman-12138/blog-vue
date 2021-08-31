import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Blogs from '@/views/Blogs'
import BlogDetail from '@/views/BlogDetail'
import BlogEdit from '@/views/BlogEdit'
import Message from '@/views/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Blogs'
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path: '/Blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/BlogDetail',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/Blog/Edit',
      name: 'BlogEdit',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Blog/add',
      name: 'BlogAdd',
      component: BlogEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Blog/message',
      name: 'Message',
      component: Message,
      meta: {
        requireAuth: true
      }
    }
  ],
  mode: 'history'  //改变url地址的风格（#/ ==> /）
})
