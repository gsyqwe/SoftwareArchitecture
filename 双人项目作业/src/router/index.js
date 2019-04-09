import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Wordreader from '@/components/onlinereaders/Wordreader'
import Pdfreader from '@/components/onlinereaders/Pdfreader'
import Epubreader from '@/components/onlinereaders/Epubreader'
import AdminHome from '@/components/admin/AdminHome'
import AdminPersonal from '@/components/admin/AdminPersonal'
import StudentHome from '@/components/student/StudentHome'
import StudentPersonal from '@/components/student/StudentPersonal'
import TeacherHome from '@/components/teacher/TeacherHome'
import TeacherPersonal from '@/components/teacher/TeacherPersonal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/wordreader',
      name: 'wordreader',
      component: Wordreader,
    },
    {
      path:'/pdfreader',
      name:'pdfreader',
      component:Pdfreader,
    },
    {
      path:'/epubreader',
      name:'epubreader',
      component:Epubreader,
    },
    {
      path:'/adminhome',
      name:'adminhome',
      component:AdminHome,
    },
    {
      path:'/adminpersonal',
      name:'adminpersonal',
      component:AdminPersonal,
    },
    {
      path:'/studenthome',
      name:'studenthome',
      component:StudentHome,
    },
    {
      path:'/studentpersonal',
      name:'studentpersonal',
      component:StudentPersonal,
    },
    {
      path:'/teacherhome',
      name:'teacherhome',
      component:TeacherHome,
    },
    {
      path:'/teacherpersonal',
      name:'teacherpersonal',
      component:TeacherPersonal,
    }
  ]
})
