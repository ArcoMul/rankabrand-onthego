<template>
  <div class="ranking">
    <img :src="ranking.img" />
    <h1>{{ ranking.name }}</h1>
    <p>Score: {{ ranking.score || 'Geen score bekend' }}</p>
    <p>Points: <span v-if="ranking.score">{{ ranking.points }}/{{ ranking.pointsTotal }}</span><span v-else>Geen punten bekend</span></p>
    <a :href="ranking.url" target="_blank">Bezoek {{ ranking.name }} op rankabrand.org</a><br />
    <router-link to="/">Terug naar zoeken</router-link>
  </div>
</template>

<script>
import { request } from 'graphql-request'

export default {
  name: 'search',
  data () {
    return {
      ranking: {}
    }
  },
  async created () {
    const { id } = this.$route.params
    this.ranking = (await request('http://rankabrand-api.arcomul.nl/graphql',
      `{
          ranking(_id: "${id}") {
            _id
            name
            url
            score
            points
            pointsTotal
            img
          }
      }`)).ranking
  },
  methods: {
    async onQuery () {
    }
  }
}
</script>

<style>
a span {
  font-weight: bold;
}
</style>
