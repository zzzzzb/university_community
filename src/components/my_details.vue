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
          <img :src="img" alt="" @click="Show">
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
    <div v-if="show" class="cropper" >
      <div class="close" @click="unShow">X</div>
      <vueCropper
        ref="cropper"
        :img="imgData"
        :autoCrop="autoCrop"
        :autoCropWidth="autoCropWidth"
        :autoCropHeight="autoCropHeight"
        :fixedBox="fixedBox"
        :canScale="canScale"
        :outputType="outputType"
        :outputSize="outputSize"
        class="view"
      ></vueCropper>
      <div class="btn">
        <label class="item" for="uploads">打开图片</label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <button @click="finish" class="item">上传头像</button>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  import axios from 'axios'
    export default {
      name: "my_details",
      data() {
        return {
          isLogin: false,
          account: '',
          user_id: '',
          realname: '',
          university: '',
          show: false,
          img:'',
          imgData: '',
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true,
          canScale: true,
          outputType: 'png',
          outputSize: 0.6
          }
      },
      components: {
        VueCropper
      },
      created() {
        this.account = localStorage.getItem('account');
        this.user_id = localStorage.getItem('user_id');
        this.img = localStorage.getItem('photo');
        this.realname = localStorage.getItem('realname');
        this.university = localStorage.getItem('university');
      },
      methods: {
        Show () {
          this.show = true;
        },
        unShow () {
          this.show = false;
        },
        // 实时预览函数
        realTime (data) {
          this.previews = data;
        },
        finish () {
          // 输出
          this.$refs.cropper.getCropData((data) => {
            // axios.post('http://localhost/index.php?/user/upload_portrait', {
            axios.post('http://www.zhuzhibo.net/index.php?/user/upload_portrait', {
              imgData: data,
              user_id: this.user_id
            })
              .then(function (response) {
                console.log(response);
                if (response.data.errormsg !== '') {
                  alert(response.data.errormsg);
                } else {
                  alert('头像修改成功');
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            this.img = data;
            this.unShow();
          })
        },

        uploadImg (e) {
          //上传图片
          // this.option.img
          let file = e.target.files[0]
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          let reader = new FileReader()
          reader.onload = (e) => {
            let data
            if (typeof e.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([e.target.result]))
            } else {
              data = e.target.result
            }
            this.imgData = data
          }
          // 转化为base64
          reader.readAsDataURL(file)
          // 转化为blob
          // reader.readAsArrayBuffer(file)
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #uc-md
    width: 100%
    height: 100%
    background: #f0f0f08c
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
    .cropper
      position absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: #cccccc8c
      text-align center
      .view
        display inline-block
        height: 50%
        width: 70%
        margin-top 100px
      .btn
        display block
        width: 100%
        height: 50px
        text-align center
        .item
          display inline-block
          width: 120px
          height: 50px
          background: #1296db
          border 0
          text-align center
          line-height 50px
          margin-top 10px
          margin-left 5px
      .close
        position absolute
        right: 50px
        top: 70px






</style>
