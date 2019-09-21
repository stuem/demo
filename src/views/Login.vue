<template>
  <div class="about">
    <div class="about-Sign">
      <div class="box-frame">
        <el-container>
          <div class="box-left">
            <el-aside width="220px">
              <img src="../../public/favicon.jpg" />
              <h3>智学无忧后台系统</h3>
              <p>做最有态度，责任，良心的IT教育</p>
            </el-aside>
          </div>
          <ul class="box-rintg">
            <li>
              <el-input placeholder="请输入账号" v-model="stuMobile"></el-input>
            </li>
            <li>
              <el-input placeholder="请输入密码" show-password v-model="stuPassword"></el-input>
            </li>
            <li>
              <el-checkbox>记住密码</el-checkbox>
            </li>
            <li>
              <el-button type="primary" @click="primarg()">登录</el-button>
            </li>
          </ul>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      stuMobile: "",
      stuPassword:""
    };
  },

  methods: {
    primarg() {
      let _this = this;
      console.log(_this.stuMobile)
      console.log(_this.stuPassword)
      //通过点击事件实现axios接口调用请求数据
      _this.axios.get("/api/OAuth/authenticate?"+'stuMobile='+_this.stuMobile+'&'+'stuPassword='+_this.stuPassword).then(res =>{
        // console.log(res.data)
        //本地存储 sessionStorage
        const info = { 
          key:res.data 
        }
        sessionStorage.setItem('name',JSON.stringify(info)) //通过点击事件将axios请求到的数据暂时储存到本地
        _this.$router.push("/") //储存后跳转页面

        _this.$message({  //登录成功后提示
          message: '登录成功！',
          type: 'success'
        });
      },res=>{
        _this.$message.error('您输入的账号或密码错误！');  //登录失败后提示
      })
    }
  }
};
</script>

<style lang="less">
ul,
li {
  list-style-type: none;
  padding: 10px 0px;
}
.about {
  background: url("../../public/background.jpg") no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  zoom: 1;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.about-Sign{
   position: relative;
  top: 50%;
  margin-top: -150px;
}
.box-frame {
  width: 500px;
  height: 200px;
  padding: 80px;
  margin: 0px auto;
  background-color: #d8ecf5;
  border-radius: 10px;
  box-shadow: #807e00 0px 0px 10px 10px;
}
.el-aside img {
  position: relative;
  top: 20px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  background-color: #ffffff;
}
.box-rintg {
  float: right;
  padding-left: 50px;
}
</style>