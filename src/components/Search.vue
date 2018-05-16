<template>
  <div class="search">
    <input v-model="query" @input="onQuery" />
    <ul>
      <li v-for="(result, index) in results" :key="index">
        <a :href="`/ranking/${result._id}`" v-html="highlight(result.name, query)"></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { request } from 'graphql-request'

export default {
  name: 'search',
  data () {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    async onQuery () {
      const { query } = this
      this.results = (await request('http://localhost:3000/graphql',
        `{
            queryRankings(query: "${query}") {
                _id
                name
            }
        }`)).queryRankings
    },
    highlight (text, highlight) {
      const t = text.replace(new RegExp(highlight, 'i'), `<span>$&</span>`)
      return t
    }
  }
}
</script>

<style>
a span {
  font-weight: bold;
}
</style>
