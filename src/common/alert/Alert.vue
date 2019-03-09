<template>
    <div>
      <div v-show="isshow" class="alertBox" :style="{background:this.$store.state.color}">
        {{mymessage}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      isshow: false
    }
  },
  computed: {
    mymessage () {
      return this.$store.state.message
    }
  },
  watch: {
    mymessage (e) {
      this.isshow = true
    }
  }
}
</script>

<style scoped lang="stylus">
  .alertBox
    height .64rem
    line-height .65rem
    text-align center
    font-weight bold
    color white
    border-radius .1rem
</style>
