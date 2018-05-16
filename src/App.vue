<template>
  <div id="app">
    <main>
      <router-view></router-view>
      <div class="pagina"></div>
      <div class="search">
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
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.search {
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
