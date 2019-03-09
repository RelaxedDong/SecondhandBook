<template>
    <div>
      <div class="commentBox">
        回应(123)
        <div class="addcomment">
          <span @click="returnreplay">切换回默认回复</span>
          <textarea :placeholder="placeholder" v-model="textareainput"></textarea>
          <button ref="replay" @click="replaynow">添加回应</button>
        </div>
        <div class="comment-item">
          <img src="https://donghaocms.oss-cn-beijing.aliyuncs.com/avater/20190105210459K.jpg" alt="">
          <div class="comment-group">
            <div class="co-time">
              <a href="">最美的烟火</a>
              <span>2019/12/22</span>
            </div>
            <div class="comemnt-content">
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
            </div>
          </div>
        </div>
        <div class="comment-item">
          <img src="https://donghaocms.oss-cn-beijing.aliyuncs.com/avater/20190105210459K.jpg" alt="">
          <div class="comment-group">
            <div class="co-time">
              <a href="">最美的烟火1</a>
              <span>2019/12/22</span>
            </div>
            <div class="comemnt-content">
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
            </div>
            <div class="quto">
              引用： <a href="">@最美的烟火1</a>的评论
              <p>666</p>
            </div>
          </div>
          <div class="duoji-comment">
            <button @click="delcomment">删除</button>
            <button @click="replayBtnclick('最美的烟火')">回复</button>
          </div>
        </div>
        <div class="comment-item">
          <img src="https://donghaocms.oss-cn-beijing.aliyuncs.com/avater/20190105210459K.jpg" alt="">
          <div class="comment-group">
            <div class="co-time">
              <a href="">最美的烟火2</a>
              <span>2019/12/22</span>
            </div>
            <div class="comemnt-content">
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
            </div>
            <div class="quto">
              引用： <a href="">@最美的烟火1</a>的评论
              <p>666</p>
            </div>
          </div>
          <div class="duoji-comment">
            <button @click="delcomment">删除</button>
            <button @click="replayBtnclick('最美的烟火')">回复</button>
          </div>
        </div>
        <div class="comment-item">
          <img src="https://donghaocms.oss-cn-beijing.aliyuncs.com/avater/20190105210459K.jpg" alt="">
          <div class="comment-group">
            <div class="co-time">
              <a href="">最美的烟火3</a>
              <span>2019/12/22</span>
            </div>
            <div class="comemnt-content">
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
            </div>
            <div class="quto">
              引用： <a href="">@最美的烟火1</a>的评论
              <p>666</p>
            </div>
          </div>
          <div class="duoji-comment">
            <button @click="delcomment">删除</button>
            <button @click="replayBtnclick('最美的烟火')">回复</button>
          </div>
        </div>
        <div class="comment-item">
          <img src="https://donghaocms.oss-cn-beijing.aliyuncs.com/avater/20190105210459K.jpg" alt="">
          <div class="comment-group">
            <div class="co-time">
              <a href="">最美的烟火4</a>
              <span>2019/12/22</span>
            </div>
            <div class="comemnt-content">
              demo:账号（邮箱: user10@qq.com 密码：111111 ）
            </div>
            <div class="quto">
              引用： <a href="">@最美的烟火1</a>的评论
              <p>666</p>
            </div>
          </div>
          <div class="duoji-comment">
            <button @click="delcomment">删除</button>
            <button @click="replayBtnclick('最美的烟火')">回复</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DetailComment',
  data () {
    return {
      placeholder: '输入评论......',
      textareainput: ''
    }
  },
  methods: {
    replayBtnclick (username) {
      this.$refs.replay.innerHTML = '回复:' + username
    },
    returnreplay () {
      this.$refs.replay.innerHTML = '添加回应'
    },
    replaynow () {
      console.log(this.$refs.replay.innerHTML)
      if (this.$refs.replay.innerHTML === '添加回应') {
        console.log('我是默认回复', this.textareainput)
      } else {
        console.log('我是回复other', this.textareainput)
      }
    },
    delcomment (e) {
      var cur = e.target.parentElement.parentElement
      cur.parentNode.removeChild(cur)
    }
  }
}
</script>

<style scoped lang="stylus">
  .commentBox
    .addcomment
      background #ffffff
      position fixed
      padding .2rem
      left 0
      right 0
      font-weight bold
      bottom 0
      box-sizing border-box
      textarea
        height 2rem
        border .1rem solid #fcfcfc
        width 100%
        padding .1rem
        box-sizing border-box
        border-radius .1rem
        background #FBEEE6
        margin-bottom .1rem
        text-indent .1rem
      button
        float right
        width 100%
        border-radius .1rem
        background #F5B041
        padding .1rem
        color white
        box-sizing border-box
    padding .1rem
    margin-bottom  4rem
    box-sizing border-box
    .comment-item
      border-bottom .01rem solid #e6e6e6
      padding-bottom .1rem
      overflow hidden
      margin-top .05rem
      width 100%
      img
        float: left;
        width: 10%
        margin-top: .1rem
        border-radius 50%
      .comment-group
        float: left;
        width: 85%
        margin-top: 10px;
        margin-left .1rem
        .co-time
          color: #bbb;
          font-size: .3rem
          margin-left .1rem
        .quto
          width: 100%;
          background #f6f6f6
          margin-top: .3rem;
          padding .1rem
          border-radius: .1rem
          color: #666;
          p
            margin-top .1rem
        .comemnt-content
          padding-top: .1rem
          font-size: .3rem;
          font-weight lighter
          margin-left: .1rem;
      .duoji-comment
        float right
        margin-right .1rem
        margin-top .1rem
        color #ffffff
        button
          color #ffffff
          background #7ec49e
          padding .1rem
          margin-right .1rem
          border-radius .1rem
</style>
