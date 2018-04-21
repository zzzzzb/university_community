<template>
  <div id="uc-md">
    <div class="header">
      <router-link to="/my" class="back">
        <div>
          <span></span>
        </div>
      </router-link>
      <a class="title">
        <div>
          <span>个人信息</span>
        </div>
      </a>
      <a class="sub"></a>
    </div>
    <div class="content">
      <ul>
        <li class="photo">
          <span class="tag">头像</span>
          <img :src="photo" alt="">
        </li>
        <li>
          <span class="tag">账号</span>
          <span class="info">{{account}}</span>
        </li>
        <li>
          <span class="tag">姓名</span>
          <span class="info">{{realname}}</span>
        </li>
        <li>
          <span class="tag">大学</span>
          <span class="info">{{university}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: "my_details",
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
        this.account = localStorage.getItem('account');
        this.user_id = localStorage.getItem('user_id');
        this.photo = localStorage.getItem('photo');
        this.realname = localStorage.getItem('realname');
        this.university = localStorage.getItem('university');
      },
      methods: {

      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-md
    width: 100%
    height: 100%
    background: #F0F0F0
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
    .content
      ul
        margin-top 20px
        box-shadow:0 0 1px 0 rgba(0,0,0,.2)
        padding 0 10px 0 10px
        background: #fff
        li
          border-bottom 1px solid #E0E0E0
          height 50px
          line-height 50px
          .info
            color #cccccc
            float right
        .photo
          height 70px
          line-height 70px
          img
            width: 60px
            height: 60px
            float right
            margin-top 5px





</style>
