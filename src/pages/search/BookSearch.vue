<template>
  <div>
    <search :bookList="bookList"></search>
  </div>
</template>

<script>
import axios from 'axios'
import Search from '@/common/search/Search'
import BooknameList from './components/BooknameList'
export default {
  name: 'HomeBookSearch',
  components: {
    Search,
    BooknameList
  },
  data () {
    return {
      bookList: []
    }
  },
  mounted () {
    axios.get('/api/booknames/').then(this.handleAxiosSuccess)
  },
  methods: {
    handleAxiosSuccess (res) {
      const city = res.data
      this.bookList = city
    }
  }
}
</script>

<style scoped>

</style>
