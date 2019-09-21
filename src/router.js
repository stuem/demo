import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Base from './router/base'
// import Test from './router/test'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children:[
        {
          path:'/TestSetter',
          name:'老师出卷',
          component: resolve => require(['./views/test/TestSetter.vue'],resolve)
        },
        {
          path:'/TestPaperManage',
          name:'试卷管理',
          component: resolve => require(['./views/test/TestPaperManage.vue'],resolve)
        },
        {
          path:'/MakeTestPaper',
          name:'安排测试',
          component: resolve => require(['./views/test/MakeTestPaper.vue'],resolve)
        },
        {
          path:'/ViewTestPaper',
          name:'批阅试卷',
          component: resolve => require(['./views/test/ViewTestPaper.vue'],resolve)
        },
        {
          path:'/TestResult',
          name:'测试成绩',
          component: resolve => require(['./views/test/TestResult.vue'],resolve)
        },
        //基础数据
        {
          path:'/ClassManage',
          name:'班级管理',
          component: resolve => require(['./views/base/ClassManage.vue'],resolve)
        },
        {
          path:'/StudentManage',
          name:'学生管理',
          component: resolve => require(['./views/base/StudentManage.vue'],resolve)
        },
        {
          path:'/TeacherManage',
          name:'老师管理',
          component: resolve => require(['./views/base/TeacherManage.vue'],resolve)
        },
        {
          path:'/Modifypassword',
          name:'修改密码',
          component: resolve => require(['./views/base/Modifypassword.vue'],resolve)
        }
      ]
    },
    {
      path: "/Login",
      name: "Login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    }
  ]
});
