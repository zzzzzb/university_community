<template>
  <div id="uc-lr">
    <div class="header">
      <router-link to="/my" class="back">
        <div>
          <span></span>
        </div>
      </router-link>
      <a class="title">
        <div>
          <span>{{ title }}</span>
        </div>
      </a>
      <a class="sub">
        <div v-if="isLogin">
          <span @click="login">登录</span>
        </div>
        <div v-else>
          <span @click="register">注册</span>
        </div>
      </a>
    </div>
    <div class="content">
      <div v-if="isLogin" class="log">
        <div class="input">
          <input type="number" placeholder="输入手机号" v-model="phone">
          <i class="phone"></i>
        </div>
        <div class="input">
          <input type="password" placeholder="输入密码" v-model="password">
          <i class="password"></i>
        </div>
      </div>
      <div v-else class="reg">
        <div class="phone-code">
          <input type="number" placeholder="输入手机号" v-model="phone">
          <i class="phone"></i>
          <button @click="checkphone" v-if="flag">发送验证码</button>
          <button v-else>已发送</button>
        </div>
        <div class="input">
          <input type="password" placeholder="输入密码" v-model="password">
          <i class="password"></i>
        </div>
        <div class="input">
          <input type="password" placeholder="确认密码" v-model="repassword">
          <i class="password"></i>
        </div>
        <div class="input">
          <input type="text" placeholder="输入你的真实姓名" v-model="realname">
          <i class="name"></i>
        </div>
        <div class="input">
          <input type="number" placeholder="输入验证码" v-model="code">
          <i class="code"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: "log_reg",
      data() {
        return {
          title: "注册",
          isLogin: false,
          phone: '',
          password: '',
          repassword: '',
          code: '',
          realname: '',
          flag: true
        }
      },
      created() {
        let routerParams = this.$route.params.isLogin;
        if (routerParams === 'login' ) {
          this.title = '登录';
          this.isLogin = true;
        } else if (routerParams === 'register') {
          this.title = '注册';
          this.isLogin = false;
        }
      },
      methods: {
        login () {
          let _self = this;
          // axios.post('http://localhost/index.php?/user/login', {
          axios.post('http://www.zhuzhibo.net/index.php?/user/login', {
            phone: this.phone,
            password: this.password
          })
            .then(function (response) {
              if (response.data.errormsg !== '') {
                alert(response.data.errormsg);
              } else {
                let account = response.data.data.account;
                let id = response.data.data.id;
                let photo = response.data.data.photo;
                let realname = response.data.data.realname;
                let university = response.data.data.university;
                localStorage.setItem('user_id',id);
                localStorage.setItem('photo',photo);
                localStorage.setItem('account',account);
                localStorage.setItem('realname',realname);
                localStorage.setItem('university',university);
                _self.$router.push({
                  path: '/my',
                })
              }
            })
            .catch(function (error) {
              console.log('error');
            });
        },
        register () {
          let _self = this;
          if (this.phone.length !== 11) {
            alert('请输入正确手机号');
            return false;
          }
          if( this.password === this.repassword ) {
            // axios.post('http://localhost/index.php?/user/register', {
            axios.post('http://www.zhuzhibo.net/index.php?/user/register', {
              phone: this.phone,
              password: this.password,
              realname: this.realname,
              code: this.code
            })
              .then(function (response) {
                if (response.data.errormsg !== '') {
                  alert(response.data.errormsg);
                } else {
                  alert('注册成功');
                  _self.$router.push({
                    path: '/home/comp'
                  })
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            alert('两次密码不一致！');
          }
        },
        checkphone() {
          let _self = this;
          if (this.phone.length !== 11) {
            alert('请输入正确手机号');
            return false;
          }
          axios.post('http://www.zhuzhibo.net/index.php?/check', {
            phone: this.phone,
          })
            .then(function (response) {
              console.log(response);
              if (response.data.errormsg !== '') {
                alert(response.data.errormsg);
              } else {
                alert('发送成功');
                _self.flag = false;
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-lr
    width: 100%
    height: 100%
    background: #fff
    .header
      width: 100%
      height: 50px
      background: #ffffff
      box-shadow:1px 0 1px 1px rgba(0,0,0,.3)
      display: flex
      a
        div
          width: 100%
          height: 100%
          text-align: center
          line-height: 50px
      .back
        flex 1
        div
          display: inline-block
          height: 22px
          width: 22px
          margin-top: 14px
          background-image: url("../assets/icon/back.png")
          background-repeat: no-repeat
          background-size: contain
      .title
        flex 3
        div
          font-size 18px
          color #000
      .sub
        flex 1
        div
          font-size 16px
          color #1296db
    .content
      .log
        display block
        text-align: center
        margin-top: 50px
        .input
          position relative
          display inline-block
          height: 40px
          width: 76%
          margin-top 30px
          input
            height: 100%
            width: 80%
            padding: 0 2% 0 17%
            border 1px solid #ccc
            outline-color: #1296db
          i
            position absolute
            left: 0
            top: 0
            width: 40px
            height: 40px
            background-repeat: no-repeat
            background-size 25px 25px
            background-position: center
          .phone
            background-image: url("../assets/icon/phone.png")
          .password
            background-image: url("../assets/icon/password.png")
      .reg
        text-align: center
        margin-top: 50px
        .input
          position relative
          display inline-block
          height: 40px
          width: 76%
          margin-top 30px
          input
            height: 100%
            width: 80%
            padding: 0 2% 0 17%
            border 1px solid #ccc
            outline-color: #1296db
          i
            position absolute
            left: 0
            top: 0
            width: 40px
            height: 40px
            background-repeat: no-repeat
            background-size 25px 25px
            background-position: center
          .password
            background-image: url("../assets/icon/password.png")
          .code
            background-image: url("../assets/icon/code.png")
          .name
            background-image: url("../assets/icon/name.png")

        .phone-code
          position relative
          display inline-block
          height: 40px
          width: 76%
          input
            height: 100%
            width: 62%
            margin-top 0
            float left
            padding: 0 2% 0 16%
            border 1px solid #ccc
            border-right: none
            outline-color: #1296db
          button
            float left
            height: 42px
            width: 19%
            border 0
            background: #1296db
            color #fff
          i
            position absolute
            left: 0
            width: 40px
            height: 40px
            background-repeat: no-repeat
            background-size 25px 25px
            background-position: center
          .phone
            background-image: url("../assets/icon/phone.png")




</style>
