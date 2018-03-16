import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index'
// import AttendanceData from '@/components/pages/AttendanceData'
// import User from '@/components/pages/User'
// import UserAdd from '@/components/pages/UserAdd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    // }, {
    //   path: '/attendance',
    //   name: 'AttendanceData',
    //   component: AttendanceData
    // }, {
    //   path: '/user',
    //   name: 'User',
    //   component: User
    // }, {
    //   path: '/user/add',
    //   name: 'UserAdd',
    //   component: UserAdd
    }
  ]
})
