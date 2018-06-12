<template>
  <div class="header">
    <div class="space" />
    <div class="bar">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.header .space {
  width: 100%;  
  height: 60px;
}
.header .bar {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  box-shadow: 0 2px 2px 1px rgba(0,0,0,0.06);
  background-color: #fff;
  z-index: 1;
  border-bottom: 1px solid lightgrey;
}
</style>