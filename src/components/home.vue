<template>
  <div class="container">
    <div id="uc-head">
      <router-link to="/">
        <div class="search">
          <span></span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="comp">
          <span>社区</span>
        </div>
      </router-link>
      <router-link to="/secret">
        <div class="secret">
          <span>匿名</span>
        </div>
      </router-link>
      <router-link to="/submit">
        <div class="sub">
          <span></span>
        </div>
      </router-link>
    </div>
    <div id="uc-home">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
      name: "home"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-head
    position: fixed
    top: 0
    display: flex
    width: 100%
    height: 50px
    background: #1296db
    a
      flex: 1
      div
        width: 100%
        height: 100%
        text-align: center
        line-height: 50px
      .search
        span
          display: inline-block
          height: 25px
          width: 25px
          margin-top: 12px
          background-image: url("../assets/icon/search.png")
          background-repeat: no-repeat
          background-size: contain
      .sub
        span
          display: inline-block
          height: 25px
          width: 25px
          margin-top: 12px
          background-image: url("../assets/icon/edit.png")
          background-repeat: no-repeat
          background-size: contain
      .comp, .secret
        span
          font-size: 17px
          font-weight: bold
          color: #fff
  #uc-home
    margin-top: 50px
    width: 100%
</style>
