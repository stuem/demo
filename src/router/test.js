import Vue from 'vue'
import Router from 'vue-router'
import MakeTestPaper from '../views/test/MakeTestPaper.vue'
import TestPaperManage from '../views/test/TestPaperManage.vue'
import TestResult from '../views/test/TestResult.vue'
import TestSetter from '../views/test/TestSetter.vue'
import ViewTestPaper from '../views/test/ViewTestPaper.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/MakeTestPaper',
            name:'MakeTestPaper',
            component:MakeTestPaper
        },{
            path:'/',
            name:'TestPaperManage',
            component:TestPaperManage
        },{
            path:'/',
            name:'TestResult',
            component:TestResult
        },{
            path:'/',
            name:'TestSetter',
            component:TestSetter
        },{
            path:'/',
            name:'ViewTestPaper',
            component:ViewTestPaper
        }
    ]
})