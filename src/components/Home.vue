<template>
    <div class="wrapper">
      <div class="logo"><img src="/static/img/rank-a-brand-logo.png" alt="logo"></div>
      <div class="resultaat">  
        <li v-for="(result, index) in results" :key="index" class="search-result">
          <router-link :to="`/ranking/${result._id}`" v-html="highlight(result.name, query)"></router-link>
        </li>
      </div>  
      <form class="search">
        <div>
          <input type="search"
            :value="query"
            @input="e => onQuery(e.target.value)"
            @keypress="e => onQuery(e.target.value)"
            autocomplete="off" />
        </div>
      </form>
    </div>
</template>

<script>
import { request } from 'graphql-request'

const delay = (function () {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()

export default {
  name: 'home',
  data () {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    async onQuery (query) {
      query = query.trim()
      this.query = query

      delay(async () => {
        // No query anymore? Clear result list
        if (!query || query === '') {
          this.results = []
          return
        }

        this.results = (await request('http://rankabrand-api.arcomul.nl/graphql',
          `{
                queryRankings(query: "${query}") {
                    _id
                    name
                }
          }`)).queryRankings
      }, 100)
    },
    highlight (text, highlight) {
      const t = text.replace(new RegExp(highlight, 'i'), `<span>$&</span>`)
      return t
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
    height:100vh;
    background-color: lightgray;
    display: grid;
    grid-template-columns: 0fr 1fr 0fr;
    grid-template-rows: 1fr 2fr 0fr;
    grid-template-areas: 
      ". a ."
      ". b ."
      ". c ."
   ;
  }

.logo {
    grid-area: a;
    align-self: center;
    justify-self: center;
    font-style: oblique;
    font-size: xx-large;
}

.resultaat {
    display: flex;
      flex-flow: column-reverse;

    grid-area: b;
    overflow: auto;
    height: 75vh;

}

li {
    list-style: none;
}

a {
    display: block;
    background: white;
    text-align: left;
    padding: 1em;
    border: .5px solid lightgrey;
    text-decoration: none;
    color: grey;
    font-weight: 700;
}

.search {
    grid-area: c;
    align-self: center;
    border: 2px solid #72bcd1;
    background-color:#41afd1;
    padding: .5em;
    color: white;
  }

input[type=search] {
    border-radius: 3em;
    padding: 1em;
    width: 100%;
}
</style>

<style>
li.search-result a span {
    color: black;
}
</style>
