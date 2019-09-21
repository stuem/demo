import Vue from 'vue'
import Router from 'vue-router'
import ClassManage from '../views/base/ClassManage.vue'
import Modifypassword from '../views/base/Modifypassword.vue'
import StudentManage from '../views/base/StudentManage.vue'
import TeacherManage from '../views/base/TeacherManage.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/ClassManage',
            name:'ClassManage',
            component:ClassManage
        },{
            path:'/',
            name:'Modifypassword',
            component:Modifypassword
        },{
            path:'/',
            name:'StudentManage',
            component:StudentManage
        },{
            path:'/',
            name:'TeacherManage',
            component:TeacherManage
        }
    ]
})