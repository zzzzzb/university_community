<template>
  <div id="uc-comp">
    <ul>
      <li v-for="msg in massages">
        <div class="head">
          <div class="photo">
            <img :src="msg.photo" alt="">
          </div>
          <div class="title">
            <span class="name">{{msg.realname}}</span>
            <span class="school">{{msg.university}}</span>
          </div>
        </div>
        <router-link :to="'/details/'+msg.id"><div class="content">{{msg.content}}</div></router-link>
        <div class="foot">
          <div class="like">
            <i></i>
            <span>{{msg.like}}</span>
          </div>
          <div class="comment">
            <i></i>
            <span>{{msg.comment}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from "axios"
    export default {
      name: "comp",
      data() {
        return {
          massages: []
        }
      },
      created() {
        let _self = this;
        // axios.get('http://localhost/index.php?/message/get_msg')
        axios.get('http://www.zhuzhibo.net/index.php?/message/get_msg')
          .then(function (res) {
            let data = res.data.data;
            _self.massages = data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-comp
    width: 100%
    background: #fff
    ul
      li
        height: 190px
        border-bottom 5px solid #F0F0F0
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
        .foot
          height: 30px
          margin-top 10px
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



</style>
