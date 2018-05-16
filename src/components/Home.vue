<template>
    <div class="wrapper">
      <div class="logo"><img src="/static/img/rank-a-brand-logo.png" alt="logo"></div>
      <div class="resultaat">  
        <li v-for="(result, index) in results" :key="index" class="search-result">
          <a :href="`/ranking/${result._id}`" v-html="highlight(result.name, query)"></a>
        </li>
      </div>  
      <form class="search">
        <div>
          <input type="search" v-model="query" @input="onQuery" id="mySearch" name="q">
        </div>
      </form>
    </div>
</template>

<script>
import { request } from 'graphql-request'

export default {
  name: 'home',
  data () {
    return {
      query: '',
      results: []
    }
  },
  methods: {
    async onQuery () {
      const { query } = this
      this.results = (await request('http://rankabrand-api.arcomul.nl/graphql',
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
    height: 15vh;
    grid-area: a;
    align-self: center;
    justify-self: center;
    font-style: oblique;
    font-size: xx-large;
}

.resultaat {
    align-self: flex-end;
    grid-area: b;
    height: 75vh;
    overflow: auto;

}

li {
    background: white;
    padding: 1em;
    border: .5px solid lightgrey;
    list-style: none;
    text-align: left;
}

a {
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
    height: 5vh;
  }

input[type=search] {
    border-radius: 3em;
    padding: 1em;
    width: 100%;
}
</style>

<style>
li.search-result a span {
  font-weight: bold;
}
</style>
