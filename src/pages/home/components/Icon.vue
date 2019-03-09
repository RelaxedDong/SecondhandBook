<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(page,key) in pages" :key="key">
      <div class="icons">
        <div class="icon" v-for="item in page" :key="item+10">
          <div class="icon-img">
            <img class="icon-img-content" :src="'../../../../static/iconimg/'+item+'.png'" alt="">
          </div>
          <p class="icon-desc">
            {{item}}
          </p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'HomeIcon',
  data () {
    return {
      swiperOption: {
      },
      iconList: ['四六级', '医学农学', '计算机考试', '英语', '数学', '法律', '计算机', '经济学', '考研', '其他']
    }
  },
  computed: {
    pages: function () {
      const res = []
      for (let i in this.iconList) {
        const k = Math.floor(i / 8)
        if (!res[k]) {
          res[k] = []
        }
        res[k].push(this.iconList[i])
      }
      return res
    }
  }
}
</script>

<style scoped lang="stylus">
  .icons
    background white
    height:0
    width 100%
    padding-bottom 50%
    overflow hidden
    .icon
      position relative
      overflow hidden
      float left
      height 0
      width 25%
      padding-bottom 25%
      .icon-img
        position absolute
        top 0
        box-sizing border-box
        padding .1rem
        left 0
        right 0
        bottom .40rem
        .icon-img-content
          display block
          margin 0 auto
          height 85%
    .icon-desc
      position absolute
      bottom 0
      line-height .44rem
      height .44rem
      left 0
      right 0
      margin-top: .1rem;
      color: #212121;
      font-size: .28rem;
      text-align center
</style>
