<template>
  <div class="home">
    <h1>HOME PAGE</h1>
    <div class="border-gradient"><div class="box">SECTION 1</div></div>
    <div class="border-gradient"><div class="box">SECTION 2</div></div>
    <div class="border-gradient"><div class="box">SECTION 3</div></div>
    <div class="border-gradient"><div class="box">SECTION 4</div></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
}
</style>
