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
          <span class="item_name">价格:</span>
          <span class="item_value">￥{{book.price}}</span>
        </div>
        <div class="item">
          <span class="item_name">作者:</span>
          <span class="author_name">{{book.author}}</span>
        </div>
        <div class="item">
          <span class="item_name">邮箱:</span>
          <span class="item_value">{{book.owner.email}}</span>
        </div>
        <div class="item border-bottom">
          <span class="item_name">出版社:</span>
          <span class="item_value">{{book.Publishing}}</span>
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
        .item_name
          font: 12px Arial, Helvetica, sans-serif;
          line-height: 150%;
          color: #666666;
          font-size .3rem
        .author_name
          color #38ff82
    .sell_desc
      margin-top .2rem
      padding-bottom 1rem
      overflow hidden
      .desc
        margin-top .2rem
        letter-spacing:1px;
</style>
