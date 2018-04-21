<template>
  <div id="uc-msg">
    <div class="header">
      <span>消  息</span>
    </div>
    <div class="content">
      <div class="login" v-if="isLogin">
        <ul>
          <li v-for="item in comment_list">
            <div class="head">
              <div class="photo">
                <img :src="item.photo" alt="">
              </div>
              <div class="title">
                <span class="name">{{item.realname}}</span>
                <span class="school">{{item.university}}</span>
              </div>
            </div>
            <router-link :to="'/details/'+item.msg_id" class="comment">
              <span>回复道：</span>
              <div>{{item.content}}</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="noLogin" v-else>
        请先登录
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "message",
      data() {
        return {
          isLogin: false,
          comment_list: []
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
        }
      },
      created() {
        let _self = this;
        if (this.checkLocalStorage()) {
          this.isLogin = true;
          this.user_id = localStorage.getItem('user_id');
        } else {
          this.isLogin = false;
        }
        if (this.isLogin) {
          axios.get('http://www.zhuzhibo.net/index.php?/message/get_comment_to_me?user_id=' + _self.user_id)
            .then(function (res) {
              let data = res.data.data;
              _self.comment_list = data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-msg
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
      margin-top: 50px
      .login
        ul
          li
            height: 140px
            border-bottom 1px solid #F0F0F0
            background: #fff
            .head
              height: 50px
              .photo
                width: 40px
                height: 40px
                border-radius 50%
                margin-top 5px
                margin-left 10px
                float: left
                overflow hidden
                img
                  height: 100%
                  width: 100%
              .title
                margin-left 10px
                margin-top 6px
                float: left
                .name
                  display block
                  font-size 14px
                .school
                  display block
                  color #cccccc
            .comment
              display block
              height: 75px
              width: 94%
              padding 0 10px 10px 10px
              overflow: hidden
              span
                display block
                margin-bottom 15px
                color #c0c0c0
                font-size 14px
              div
                padding-left 20px
                font-size 15px
      .noLogin
        text-align center
        padding-top 100px
        font-size: 20px
</style>
