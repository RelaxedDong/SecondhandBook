<template>
  <div>
    <div class="bookinfo">
      <div class="user_info">
          <img class="avatar" :src="book.owner.avatar" alt="">
          <div class="author_box">
            <p class="username">{{book.owner.username}}</p>
            <p class="update_time">{{book.upload_time}}</p>
          </div>
      </div>
      <div class="author_info">
        <div class="item">
          <span class="item_name">邮箱: </span>
          <div class="item_value">
            <span class="iconfont">&#xe68b;</span>{{book.owner.email}}</div>
        </div>
        <div class="item border-bottom">
          <span class="item_name">出版:</span>
          <div class="item_value"><span class="iconfont">&#xe9e3;</span>{{book.Publishing}}</div>
        </div>
        <div class="item border-bottom">
          <span class="item_name">价格:</span>
          <div class="item_value"><span class="iconfont">&#xe641;</span>{{book.price}}</div>
        </div>
        <div class="item border-bottom">
          <span class="item_name">作者:</span>
          <div class="item_value"><span style="color: #72c462" class="iconfont">&#xe67b;</span>{{book.author}}</div>
        </div>
      </div>
      <div class="sell_desc">
        <div class="item">
          <div class="item_name">简介:</div></div>
        <p class="desc">
          {{book.desc}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBook',
  props: {
    book: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
  .bookinfo
    margin.1rem
    font-weight lighter
    .user_info
      width 100%
      height 1.5rem
      float left
      marginp 0 .2rem
      font-weight bold
      font-size .4rem
      .avatar
        width 1rem
        height 1rem
        float left
        border-radius 50%
      .author_box
        margin-top .15rem
        float left
        font-weight lighter
        font-size .4rem
        margin-left .2rem
        .username
          color #f35dff
        .update_time
          margin-top .1rem
          font-size .3rem
    .author_info
      margin-top .2rem
      .item
        margin-top .2rem
        .item_value
          display inline
          .iconfont
            margin-right .1rem
        .item_name
          font: 12px Arial, Helvetica, sans-serif;
          line-height: 150%;
          font-size .3rem
          margin-right .2rem
    .sell_desc
      margin-top .2rem
      padding-bottom 1rem
      overflow hidden
      .desc
        margin-top .2rem
        word-break: break-all;
        word-wrap: break-word;
        line-height: .42rem;
        font-size: .28rem;
        color: #616161;
        text-indent .2rem
</style>
