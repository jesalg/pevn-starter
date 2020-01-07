import Vue from 'vue'
import Index from './Index.vue'
import '../css/index.css'

new Vue({
  el: '#index',
  data: {
    visitors: []
  },
  render (createElement) {
    return createElement(Index)
  },
  beforeMount() {
    this.visitors = JSON.parse(this.$el.dataset.visitorsJson)
  }
})
