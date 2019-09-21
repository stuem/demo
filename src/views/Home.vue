<template>
  <div id="vue-Home">
    <el-container style="height: 100%;position: relative;">
      <!-- 左边 -->
      <el-aside width="WiDthS" style="height=100%" class="aside-el">
        <el-row class="pic">
          <p>
            <img src="../assets/favicon.png">
          </p>
          <span v-show="!isCollapse">教学管理系统</span>
        </el-row>
        <el-menu
          :default-active="sugmdugm"
          class="el-menu-vertical-demo"
          router
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <el-menu-item :class="isCollapse?'':'el_item'" index="/home" @click="addTab('首页')">
            <i class="el-icon-s-home" style="color:#fff !important;"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="child in item.children"
                :key="child.childtitle"
                :index="child.url"
                @click="addTab(child.childtitle,child.url)"
              >{{child.childtitle}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 顶部 -->
      <el-container>
        <el-header class="sugmtog">
          <div class="shrink" @click="isCollapse=!isCollapse">
            <i class="Triangle"></i>
          </div>
          <div class="Tab-page">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              @tab-remove="removeTab"
              @tab-click="Correspondence(editableTabsValue)"
              closable
            >
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div class="boungs">
            <div class="block">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="Sign-out" @click="Signmgs">
              <i class="el-icon-s-custom"></i>退出
            </div>
          </div>
        </el-header>
        <el-main>
          <!-- 内容显示 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data() {
    return {
      WiDthS:'',
      sugmdugm: "",
      isCollapse: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      menuList: [
        {
          id: "test",
          title: "在线测试",
          children: [
            { url: "TestSetter", childtitle: "老师出卷" },
            { url: "TestPaperManage", childtitle: "试卷管理" },
            { url: "MakeTestPaper", childtitle: "安排测试" },
            { url: "ViewTestPaper", childtitle: "批阅试卷" },
            { url: "TestResult", childtitle: "测试成绩" }
          ]
        },
        {
          id: "base",
          title: "基础数据",
          children: [
            { url: "ClassManage", childtitle: "班级管理" },
            { url: "StudentManage", childtitle: "学生管理" },
            { url: "TeacherManage", childtitle: "老师管理" },
            { url: "Modifypassword", childtitle: "修改密码" }
          ]
        }
      ],
      editableTabsValue: "1",
      editableTabsRoute: "/",
      //创建标签页数组
      editableTabs: [
        {
          title: "首页",
          name: "1",
          path: "/"
        }
      ],
      tabIndex: 1
    };
  },
  name: "home",
  //生命周期 创建前
  beforeCreate:function(){
      console.log("------创建前------")
      let name = sessionStorage.getItem("name")
      console.log(name) 
      //钩子函数创建前进行判断本地存储sessionStorage里面是否有值！
      if (!name) { //如果没有值就跳转到登录页面，有的话就直接进入主页
        this.$router.push("/Login")
      }
  },
  components: {
    HelloWorld
  },
  methods: {
    //点击跳到登录页面
    Signmgs() {
      //退出登录提示！
      this.$message({
        message: '成功退出登录！',
        type: 'success'
      });
      this.$router.push("/Login");
    },
    //点击出现顶部标签页
    addTab(childtitle, url) {
      // console.log(childtitle)
      let _this = this;
      for (let i = 0; i < _this.editableTabs.length; i++) { //循环editableTabs的所有值
        if (childtitle == _this.editableTabs[i].title) {    //如果传递过来的值等于editableTabs循环出的值相同
          this.editableTabsValue = _this.editableTabs[i].title + ""; //那么
          return;
        }
      }
      let newTabName = ++_this.tabIndex + "";
      _this.editableTabs.push({
        title: childtitle,
        name: newTabName,
        path: url
      });
      _this.editableTabsValue = newTabName;
      console.log(_this.editableTabsValue);
    },
    //删除按钮
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.title === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    //头部导航跳转
    Correspondence(e) { //e是头部标签页的下标
      let _this = this;
      let path = _this.editableTabs[e - 1].path; //显示对应的路由名字
      _this.sugmdugm = path;  //把对应的路由名字赋值给sugmdugm
      _this.$router.push("/" + _this.sugmdugm); //在用字符串拼接
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  mutations: {}
};
</script>

<style lang="less">
#vue-Home {
  display: flex;
  height: 100%;
}
body {
  margin: 0px;
  padding: 0px;
}
#vue-Home {
  height: 100%;
  .pic {
    background: #FFEB3A;
    display: flex;
    justify-content: center;
    position: relative;
    padding: 0px 20px;
    height: 60px;
    line-height: 60px;
    color: #079787;
    p {
      width: 60px;
      height: 60px;
      display: inline-block;
      margin-top:10px;
    }
    img {
      width:35px;
      box-shadow: #008080 0px 0px 10px 4px;
      border-radius:50%; 
      max-width: 100%;
    }
  }
}

.el-menu-vertical-demo,.el-menu--collapse,.el-menu{
  margin: 0px;
  width: 100%;
  border: 0px !important;
}
.el-menu--collapse{
  width: 100% !important;
}
.el-header,
.el-footer {
  border-bottom: 1px solid #ccc;
  text-align: center;
  line-height: 60px;
  padding: 0px 0px !important;
}

.el-main {
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.block {
  float: right;
}

.Sign-out {
  float: right;
  padding-right: 10px;
}
.worries {
  float: left;
  background-color: #ffeb3a;
  width: 100%;
  font-size: 25px;
}
.shrink {
  width: 30px;
  background-color: #008181;
}
.Triangle {
  width: 0px;
  height: 0px;
  border: solid 8px transparent;
  border-right-color: #ffffff;
  display: inline-block;
}
.Tab-page {
  width: 100%;
  padding-left: 50px;
  padding-top: 14px;
  flex: 1;
  line-height: 45px;
}

.left-box {
  display: flex;
  height: 100%;
  // background-color: #545C64;
}
.boungs {
  padding-right: 15px;
  flex: 1;
  margin: 0px auto;
}
el-container {
  display: flex;
}
.el-col {
  height: 100% !important;
}
.sugmtog {
  display: flex;
}
.aside-el{
  background-color:#545c64;
}
</style>
