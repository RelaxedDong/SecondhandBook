<template>
  <div class="header">
    <div class="header-title">
      <input type="text" placeholder="请输入书籍名称" class="header-input">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSearch'
}
</script>

<style lang="stylus" scoped>
  .header
    top 0
    left 0
    right 0
    position fixed
    display flex
    line-height:.86rem
    background: #fff
    z-index 1000
    color: black
    .header-title
      flex: 1
      height: .64rem
      line-height: .64rem
      margin: .2rem
      padding: 0 .4rem;
      background: #f2f2f2;
      color: #212121;
      border-radius: .3rem;
      .header-input
        position: relative;
        display: block;
        width: 100%;
        height: .4rem;
        line-height: .4rem;
        padding: .1rem 0;
        background: #f2f2f2;
        border: 0;
        font-family: "Microsoft Yahei",Arial;
        font-size: .28rem;
        border-radius: .06rem;
        text-align: center;
</style>
