import Vue from 'vue'
import Index from './Index.vue'

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
