<template>
  <div class="header">
    <slot />
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 2px 1px rgba(0,0,0,0.06);
  background-color: #fff;
  position: relative;
  z-index: 1;
  border-bottom: 1px solid lightgrey;
}
</style>