<template>
  <div id="uc-sub">
    <div class="header">
      <router-link to="/" class="back">
        <div>
          <span></span>
        </div>
      </router-link>
      <a class="title">
        <div>
          <span>发状态</span>
        </div>
      </a>
      <a class="sub">
        <div>
          <span @click="submit">发布</span>
        </div>
      </a>
    </div>
    <textarea class="content" maxlength="200" v-model="content"></textarea>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: "submit",
      data() {
        return {
          isLogin: false,
          content: '',
          user_id: ''
        }
      },
      methods: {
        //检查LocalStorage
        checkLocalStorage: function () {
          let user = localStorage.getItem('user_id');
          if (user != null) {
            return true;
          } else {
            return false;
          }
        },
        submit() {
          const _self = this;
          if (this.isLogin) {
            // axios.post('http://localhost/index.php?/message/save_message', {
            axios.post('http://www.zhuzhibo.net/index.php?/message/save_message', {
              content: this.content,
              user_id: this.user_id,
            })
              .then(function (response) {
                if (response.data.errormsg !== '') {
                  alert(response.data.errormsg);
                } else {
                  _self.$router.push({
                    path: '/home/comp'
                  })
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            alert('请先登录');
            _self.$router.push({
              path: '/my'
            })
          }
        }
      },
      created() {
        if (this.checkLocalStorage()) {
          this.isLogin = true;
          this.user_id = localStorage.getItem('user_id');
        } else {
          this.isLogin = false;
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-sub
    width: 100%
    height: 100%
    background: #e0e0e0
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
      width: 92.7%
      height: 300px
      padding 20px 15px 20px 15px
      background: #F0F0F0
      font-size: 15px
</style>
