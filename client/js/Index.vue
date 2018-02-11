<template>
    <div>
        <h1>Hello World</h1>
        <p>Welcome to PostgreSQL, Express, VueJS, NodeJS starter</p>
        <p>Here are the last 10 visitors:</p>
        <table>
          <thead>
            <th>ID</th>
            <th>IP</th>
            <th>User Agent</th>
          </thead>
          
          <tr v-for="(visitor, index) in visitors" :key="index">
              <td>{{ visitor.id }}</td>
              <td>{{ visitor.ip }}</td>
              <td>{{ visitor.user_agent }}</td>
          </tr>          
        </table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      visitors: []
    }
  },
  methods: {

  },
  created() {
    this.visitors = this.$parent.visitors;
  }
}
</script>