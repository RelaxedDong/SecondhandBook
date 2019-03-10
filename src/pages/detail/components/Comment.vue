<template>
    <div>
      <div style="padding-bottom: 1.5rem;" id="startpage"></div>
      <div class="commentBox">
        回应(<span ref="counter">{{comments.length}}</span>)
        <div class="addBtn" @click="showcommentBox">
          <span class="iconfont addicon">&#xe602;</span>
        </div>
        <div class="addcomment" v-show="isshowArea">
          <div class="emotionbox" v-show="ishowemotion">
            <span v-for="(emotion,index) in emotions" :key="index">
              <img @click="emotionimgclick" :src="emotion.icon" alt="" :title="emotion.value">
            </span>
          </div>
          <alert class="alertbox"></alert>
            <span @click="returnreplay" class="iconfont xunhuan">&#xe604;</span>
            <span @click="emotionBtnclick" class="iconfont">&#xe61d;</span>
            <span @click="closeareashow" class="iconfont close">&#xe613;</span>
          <textarea :placeholder="placeholder" v-model="textareainput"></textarea>
          <button ref="replay" @click="replaynow">添加回应</button>
        </div>
        <div class="comment-item" v-for="(comment, index) in comments" :key="comment.id">
          <img :src="comment.author.avatar" alt="">
          <div class="comment-group">
            <div class="co-time">
              <a href="">{{comment.author.username}}</a>
              <span>{{comment.create_time}}</span>
            </div>
            <div class="comemnt-content">
              <span v-html="$options.filters.filemotion(comment.content)"></span>
            </div>
            <div v-if="comment.origin_comment.author.username" class="quto">
              引用： <a href="">@{{comment.origin_comment.author.username}}</a>的评论
              <p>{{comment.origin_comment.content}}</p>
            </div>
          </div>
          <div class="duoji-comment">
            <button @click="delcomment" :index="index" :comment-id="comment.id" v-if="current_userid === comment.author.id">删除</button>
            <button @click="replayBtnclick(comment.author.username,comment.id)">回复</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Alert from 'common/alert/Alert'
import axios from 'axios'
export default {
  name: 'DetailComment',
  components: {Alert},
  props: ['bookid', 'comments'],
  comments: {
    Alert
  },
  filters: {
    filemotion (value) {
      value = value.replace(/##(.+?)##/g, (e, e1) => {
        return '<img src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/' + e1 + '">'
      })
      return value
    }
  },
  data () {
    return {
      placeholder: '输入评论......',
      textareainput: '',
      commentId: '',
      current_userid: '',
      isshowArea: false,
      ishowemotion: false,
      emotions: []
    }
  },
  methods: {
    emotionimgclick (e) {
      const url = e.target.getAttribute('src')
      const emotiontag = url.split('http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/')[1]
      this.textareainput += '##' + emotiontag + '##'
    },
    emotionBtnclick () {
      this.ishowemotion = true
    },
    closeareashow () {
      this.isshowArea = false
      this.ishowemotion = false
    },
    showcommentBox () {
      this.isshowArea = true
    },
    handleemit (message, color) {
      this.$store.commit('msgchange', {message: message, color: color})
    },
    replayBtnclick (username, commentid) {
      this.$refs.replay.innerHTML = '回复:' + username
      this.placeholder = '回复' + username + '的评论......'
      this.commentId = commentid
    },
    returnreplay () {
      this.$refs.replay.innerHTML = '添加回应'
      this.textareainput = ''
      this.placeholder = '输入评论......'
    },
    handleaxiosPost (token, commentid = null) {
      axios.post('/api/comment/', {token: token, comment: this.textareainput, bookid: this.bookid, commentid: commentid}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(this.HandleaxiosDone)
    },
    replaynow () {
      var oldToken = JSON.parse(localStorage.getItem('token')).data
      if (oldToken) {
        if (this.$refs.replay.innerHTML === '添加回应') {
          this.handleaxiosPost(oldToken)
        } else {
          this.handleaxiosPost(oldToken, this.commentId)
        }
      }
    },
    HandleaxiosDone (res) {
      this.comments.splice(0, 0, res.data)
      document.querySelector('#startpage').scrollIntoView(true)
      var value = this.$refs.counter.innerHTML
      this.$refs.counter.innerHTML = parseInt(value) + 1
      this.$refs.replay.innerHTML = '添加回应'
      this.textareainput = ''
      this.placeholder = '输入评论......'
    },
    delcomment (e) {
      var cur = e.target.parentElement.parentElement
      cur.parentNode.removeChild(cur)
      var clickcommentid = e.target.getAttribute('comment-id')
      var index = e.target.getAttribute('index')
      this.comments.splice(index, 1)
      this.$refs.counter.innerHTML -= 1
      var oldToken = JSON.parse(localStorage.getItem('token')).data
      axios.post('/api/delcomment/', {token: oldToken, commentid: clickcommentid}).then((res) => {
        this.handleemit('删除成功~', '#b1ff5b')
      })
    },
    currentUser (res) {
      const data = res.data
      if (data) {
        this.current_userid = data.id
      }
    }
  },
  mounted () {
    axios.get('/api/emotions/').then((res) => {
      this.emotions = res.data.data
    })
    var oldToken = localStorage.getItem('token')
    if (oldToken) {
      axios.post('/api/userinfo/', {token: oldToken}).then(this.currentUser)
    }
  }
}
</script>

<style scoped lang="stylus">
  .commentBox
    .addBtn
      padding .1rem
      position fixed
      right .3rem
      bottom .3rem
      background #ffc043
      border-radius 50%
      .addicon
        color #ffffff
        font-size .5rem
    .addcomment
      background #ffffff
      position fixed
      padding .2rem
      left 0
      right 0
      font-weight bold
      bottom 0
      box-sizing border-box
      .emotionbox
        padding .1rem
        z-index 999
        span
          margin .02rem
      .iconfont
        font-size .5rem
      .close
        float right
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
        width .6rem
        height .6rem
        margin-top: .1rem
        border-radius 60%
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
