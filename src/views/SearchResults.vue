<template>
  <div class="searchRes-limit">
    <PhotoWall />
  </div>
</template>

<script>
import PhotoWall from '@/components/PhotoWall.vue';
export default {
  components: {
    PhotoWall
  }
}
</script>

<style lang="scss">
.searchRes-limit{
  max-width: 1200px;
  margin: 0 auto;
}
</style>
