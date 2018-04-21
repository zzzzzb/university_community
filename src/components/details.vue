<template>
  <div id="uc-detail">
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
      </a>
    </div>
    <div class="wrapper">
      <div class="msg">
        <div class="head">
          <div class="photo">
            <img :src="photo" alt="">
          </div>
          <div class="title">
            <span class="name">{{realname}}</span>
            <span class="school">{{university}}</span>
          </div>
        </div>
        <div class="content">{{content}}</div>
        <div class="foot">
          <div class="like">
            <i></i>
            <span>{{like}}</span>
          </div>
          <div class="comment">
            <i></i>
            <span>{{comment}}</span>
          </div>
        </div>
      </div>
      <div class="comments">
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
            <div class="content">{{item.content}}</div>
          </li>
        </ul>
      </div>
      <div class="input">
        <input type="text" v-model="comContent">
        <button @click="submit">评论</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: "detial",
      data() {
        return {
          isLogin: false,
          user_id: '',
          content: '',
          like: '',
          comment: '',
          photo: '',
          realname: '',
          university: '',
          time: '',
          comment_list: [],
          comContent: ''
        }
      },
      created() {
        let msg_id = this.$route.params.id;
        let _self = this;
        // axios.get('http://localhost/index.php?/message/get_msg')
        axios.get('http://www.zhuzhibo.net/index.php?/message/get_message_details?id=' + msg_id)
          .then(function (res) {
            let data = res.data.data;
            _self.content = data.content;
            _self.like = data.like;
            _self.comment = data.comment;
            _self.photo = data.photo;
            _self.realname = data.realname;
            _self.university = data.university;
            _self.time = data.time;
          })
          .catch(function (error) {
            console.log(error);
          });
        axios.get('http://www.zhuzhibo.net/index.php?/message/get_message_comment?id=' + msg_id)
          .then(function (res) {
            let data = res.data.data;
            _self.comment_list = data;
          })
          .catch(function (error) {
            console.log(error);
          });
        if (this.checkLocalStorage()) {
          this.isLogin = true;
          this.user_id = localStorage.getItem('user_id');
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
        submit() {
          let _self = this;
          if (this.isLogin) {
            let comment = this.comContent;
            let user_id = this.user_id;
            let msg_id = this.$route.params.id;
            axios.post('http://www.zhuzhibo.net/index.php?/message/save_comment', {
              content: comment,
              user_id: user_id,
              msg_id: msg_id
            })
              .then(function (response) {
                if (response.data.errormsg !== '') {
                  alert(response.data.errormsg);
                } else {
                  axios.get('http://www.zhuzhibo.net/index.php?/message/get_message_comment?id=' + msg_id)
                    .then(function (res) {
                      let data = res.data.data;
                      _self.comment_list = data;
                      _self.comContent = '';
                      _self.comment++;
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                }
              })
              .catch(function (error) {
                console.log('error');
              });
          } else {
            alert('请先登录');
            _self.$router.push({
              path: '/my'
            })
          }

        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-detail
    width: 100%
    background: #e0e0e0
    .header
      width: 100%
      height: 50px
      background: #ffffff
      box-shadow:1px 0 1px 1px rgba(0,0,0,.3)
      display: flex
      position: fixed
      top: 0
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
    .wrapper
      margin-top 50px
      .msg
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
            height: 50px
            margin-left 10px
            margin-top 6px
            float: left
            .name
              display block
              font-size 14px
            .school
              display block
              color #cccccc
        .content
          width: 94%
          padding 10px
          overflow: hidden
          font-size 14px
        .foot
          height: 30px
          i
            float left
            height: 20px
            background-repeat: no-repeat
            background-position: center

          .like
            float right
            height: 30px
            width: 60px
            i
              width: 23px
              background-size 23px 20px
              background-image: url("../assets/icon/favorites.png")
            span
              float left
              margin-left 8px
              margin-top 3px
          .comment
            float right
            height: 30px
            width: 60px
            i
              width: 20px
              background-size 20px 20px
              background-image: url("../assets/icon/comments.png")
            span
              float left
              margin-left 8px
              margin-top 3px
      .comments
        margin-bottom 42px
        ul
          margin-top 5px
          li
            width: 100%
            height: 120px
            background: #fff
            margin-bottom 1px
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
              height: 50px
              margin-left 10px
              margin-top 6px
              float: left
              .name
                display block
                font-size 14px
              .school
                display block
                color #cccccc
            .content
              height: 75px
              width: 94%
              padding 10px
              overflow: hidden
              font-size 14px
      .input
        height: 40px
        width: 100%
        position: fixed
        bottom: 0
        box-shadow:1px 0 1px 1px rgba(0,0,0,.2)
        input
          width: 75%
          height: 100%
          border 0
          outline none
          float left
          padding 0 4% 0 4%
        button
          width: 17%
          height: 100%
          float left
          border 0
          box-shadow:1px 0 1px 1px rgba(0,0,0,.3)
          background: #1296db
          outline none
          font-size 14px
          color: #ffffff
</style>
