<template>
  <div class="ranking">

    <page-header class="page-header">
      <div>
        <h1>{{ ranking.name }}</h1>
      </div>
      <div>
        <router-link to="/search" class="search-button">
          <img src="/static/img/search.svg" />
        </router-link>
      </div>
    </page-header>

    <div class="content">

      <img :src="ranking.img" />

      <p>Score: {{ ranking.score || 'Geen score bekend' }}</p>
      <p>Points: <span v-if="ranking.score">{{ ranking.points }}/{{ ranking.pointsTotal }}</span><span v-else>Geen punten bekend</span></p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Merk</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(r, index) in ranking.sameSectorRankings"
            :class="{ current: r._id === ranking._id}"
            :key="r._id">
            <td>
              {{index+1}}.
            </td>
            <td>
              <router-link
                :to="`/ranking/${r._id}`"
                @click.native="() => setRanking(r._id)">
                  {{ r.name }}
              </router-link>
            </td>
            <td>{{ r.score }}</td>
            <td><span class="score-bar"><span :style="{ width: `${r.points / r.pointsTotal * 100}%`}"></span></span></td>
          </tr>

          <tr v-if="ranking.sameSectorRankings.filter(r => r._id === ranking._id).length === 0"
            class="current">
            <td>
              ...
            </td>
            <td>
              <router-link
                :to="`/ranking/${ranking._id}`"
                @click.native="() => setRanking(ranking._id)">
                  {{ ranking.name }}
              </router-link>
            </td>
            <td>{{ ranking.score || '?' }}</td>
            <td>
              <span v-if="!ranking.score">?</span>
              <span v-else class="score-bar">
                <span :style="{ width: `${ranking.points / ranking.pointsTotal * 100}%`}"></span>
              </span>
            </td>
          </tr>

          <tr class="load-more">
            <td colspan="4">
              <a v-if="previousNumberOfSameSectorRankings !== ranking.sameSectorRankings.length"
                href="#"
                @click.prevent="increaseLimit(10)">
                  Meer laden
              </a>
            </td>
          </tr>

        </tbody>
      </table>
      <a :href="ranking.url" target="_blank">Bezoek {{ ranking.name }} op rankabrand.org</a><br />
      <br />
      <router-link to="/">Terug naar zoeken</router-link>
    </div>
  </div>
</template>

<script>
import { request } from 'graphql-request'
import config from '../../config/client'
import PageHeader from './PageHeader.vue'

export default {
  name: 'search',
  components: {
    PageHeader
  },
  data () {
    return {
      ranking: {},
      previousNumberOfSameSectorRankings: -1,
      limit: 10
    }
  },
  async created () {
    const { id } = this.$route.params
    this.setRanking(id)
  },
  methods: {
    async setRanking (id) {
      if (id !== this.ranking._id) {
        this.limit = 10
        this.previousNumberOfSameSectorRankings = -1
      } else {
        this.previousNumberOfSameSectorRankings = this.ranking.sameSectorRankings ? this.ranking.sameSectorRankings.length : -1
      }
      this.ranking = (await request(`${config.api.url}/graphql`,
        `{
            ranking(_id: "${id}") {
              _id
              name
              url
              score
              points
              pointsTotal
              img
              sameSectorRankings(excludeNoScore: true, limit: ${this.limit}) {
                _id
                name
                score
                points
                pointsTotal
              }
            }
        }`)).ranking
    },
    increaseLimit (n) {
      this.limit += n
      this.setRanking(this.ranking._id)
    }
  }
}
</script>

<style scoped>

.page-header {
  display: flex;
}
.page-header div:nth-child(1) {
  flex: 1;
  flex-grow: 2;
}
.page-header div:nth-child(2) {
  flex: 1;
  flex-grow: 1;
  text-align: right;
  padding-right: 58px;
}
.page-header .search-button {
  margin: 15px;
  display: inline-block;
}
.page-header .search-button img {
  width: 30px;
  height: 30px;
}
.page-header h1 {
  margin: 0;
  padding: 0;
  font-size: 19px;
  line-height: 60px;
  margin-left: 25px;
}

.content {
  padding: 30px;
  background-color: white;
  text-align: center;
}
.content img {
  margin-bottom: 30px;
}

a span {
  font-weight: bold;
}
table {
  margin: 15px auto 30px auto;
  text-align: left;
}
table tr.current td {
  font-weight: bold;
}
table tr.load-more {
  text-align: center;
}

.score-bar {
  display: block;
  height: 20px;
  width: 150px;
  background-color: #eee;
}
.score-bar span {
  display: block;
  height: 20px;
  background-color: #999;
}
</style>
