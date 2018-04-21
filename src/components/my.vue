<template>
  <div id="uc-my">
    <div class="header">
      <span>我</span>
    </div>
    <div class="content">
      <div v-if="isLogin" class="login">
        <ul>
          <router-link to="/my_details">
            <li class="user">
              <img :src="photo" alt="">
              <div class="info">
                <span class="name">{{realname}}</span>
                <span class="university">{{university}}</span>
              </div>
              <div class="right">
                <div></div>
              </div>
            </li>
          </router-link>
        </ul>
        <ul>
          <li class="item">
            <div class="icon check"></div>
            <div class="title">大学认证审核</div>
          </li>
        </ul>
        <ul>
          <li class="item">
            <div class="icon act"></div>
            <div class="title">活动</div>
          </li>
        </ul>
        <button @click="exit">退出登录</button>
      </div>
      <div v-else class="noLogin">
        <div class="button">
          <router-link :to="{path: '/log_reg/login'}"><button>登录</button></router-link>
          <router-link :to="{path: '/log_reg/register'}"><button>注册</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "my",
      data() {
        return {
          isLogin: false,
          account: '',
          user_id: '',
          photo: '',
          realname: '',
          university: ''
        }
      },
      created() {
        if (this.checkLocalStorage()) {
          this.isLogin = true;
          this.account = localStorage.getItem('account');
          this.user_id = localStorage.getItem('user_id');
          this.photo = localStorage.getItem('photo');
          this.realname = localStorage.getItem('realname');
          this.university = localStorage.getItem('university');
        } else {
          this.isLogin = false;
        }
      },
      methods: {
        checkLocalStorage: function () {
          let user = localStorage.getItem('user_id');
          if (user != null) {
            return true;
          } else {
            return false;
          }
        },
        exit() {
          localStorage.removeItem('account');
          localStorage.removeItem('user_id');
          localStorage.removeItem('photo');
          localStorage.removeItem('realname');
          localStorage.removeItem('university');
          this.isLogin = false;
        }
      }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-my
    width: 100%
    .header
      position: fixed
      top: 0
      background: #ffffff
      height: 50px
      width: 100%
      box-shadow:1px 0 1px 1px rgba(0,0,0,.3)
      text-align: center
      line-height: 50px
      span
        font-size 18px
        color #000
    .content
      width: 100%
      margin-top 50px
      .login
        overflow: hidden
        ul
          margin 30px 0 30px 0
          background: #fff
          li
            box-shadow:0 0 1px 0 rgba(0,0,0,.1)
          .user
            height: 70px
            img
              float left
              width: 55px
              height: 55px
              margin-top 6px
              margin-left 10px
            .info
              float left
              margin-left 25px
              margin-top 6px
              span
                display block
                margin-top 5px
              .name
                font-size 14px
              .university
                color #cccccc
            .right
              float right
              div
                transform: rotate(180deg)
                display: inline-block
                height: 30px
                width: 30px
                margin-top: 20px
                background-image: url("../assets/icon/back.png")
                background-repeat: no-repeat
                background-size: contain
          .item
            height 50px
            line-height 50px
            div
              float left
            .icon
              width: 30px
              height: 30px
              margin: 10px 20px 0 10px
              background-repeat: no-repeat
              background-size: contain
            .check
              background-image: url("../assets/icon/supplier-features.png")
            .act
              background-image: url("../assets/icon/credit-level.png")
            .title
              font-size 14px
        button
          display block
          background: #ff0000
          width: 50%
          height: 50px
          margin-left 24%
          border none
          box-shadow:0 0 1px 0 rgba(0,0,0,.1)
          font-size 16px
          color #fff
      .noLogin
        .button
          text-align center
          margin-top 170px
          button
            display: inline-block
            margin-top: 40px
            width: 240px
            height: 50px
            font-size 15px
            background: #1296db
            color: #fff
            border: none
            outline: none


</style>
