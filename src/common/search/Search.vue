<template>
  <div>
    <div class="header">
      <div class="header-title">
        <input type="text" placeholder="请输入书籍名称" class="header-input" v-model="keyword">
      </div>
    </div>
    <div class="booknameslist" v-if="booknames.length>0">
        <ul>
          <router-link tag="li" :to="'/detail/' + book.id" v-for="book in booknames" :key="book.id" class="item border-bottom">
            <span>{{book.name}}</span>
          </router-link>
        </ul>
    </div>
    <div class="booknameslist" v-if="current_page && booknames.length===0">
      <div class="item">
        没有找到该书籍
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['bookList'],
  data () {
    return {
      keyword: '',
      booknames: [],
      // 函数节流
      timer: null
    }
  },
  computed: {
    current_page () {
      if (this.$route.path === '/search') {
        return true
      }
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (!this.keyword) {
          this.booknames = []
          return
        }
        const result = []
        for (let i in this.bookList) {
          if (this.bookList[i].name.toLowerCase().indexOf(this.keyword) > -1) {
            result.push({'name': this.bookList[i].name, 'id': this.bookList[i].id})
          }
        }
        this.booknames = result
      }, 200)
    }
  }
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
    background #fff
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
  .booknameslist
    margin-top 1.1rem
    text-align center
    .item
      margin-top .1rem
      border-bottom .01rem solid #ccc
      height .64rem
      line-height .64rem
      color #7874c4
      font-weight bold
</style>
