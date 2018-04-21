<template>
  <div class="container">
    <div id="uc-body">
      <router-view></router-view>
    </div>
    <div id="uc-foot">
      <router-link to="/">
        <div class="home">
          <i></i>
          <span>首页</span>
        </div>
      </router-link>
      <router-link to="/message">
        <div class="msg">
          <i></i>
          <span>消息</span>
        </div>
      </router-link>
      <router-link to="/my">
        <div class="my">
          <i></i>
          <span>我</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
      name: "container",
      created() {

      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .container
    width: 100%
    #uc-body
      width: 100%
      margin-bottom: 50px
    #uc-foot
      position: fixed
      bottom: 0
      display: flex
      width: 100%
      height: 50px
      background: #fff
      box-shadow:2px 2px 2px 2px rgba(0,0,0,.3)
      text-align: center
      a
        flex: 1
        div
          height: 100%
          width: 100%
          i
            display block
            height: 23px
            margin-top 7px
            background-repeat: no-repeat
            background-size 23px 23px
            background-position: center
          span
            color: #1296db
        .home
          i
            background-image: url("../assets/icon/all.png")
        .msg
          i
            background-image: url("../assets/icon/form.png")
        .my
          i
            background-image: url("../assets/icon/account.png")
</style>
