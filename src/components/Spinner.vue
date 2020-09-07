<template>
  <div
    class="spinner-wrapper"
    v-show="load"
  >
    <div class="spinner-align">
      <div class="loader">
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    load () {
      return this.$store.state.load;
    }
  }
}
</script>

<style lang='scss'>
@import '../styles/spinner.scss';
.spinner-align{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.spinner-wrapper{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
