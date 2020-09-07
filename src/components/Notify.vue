<template>
  <div>
    <transition name="notify">
      <div
        v-show="showNotify"
        class="notify"
      >
        <p class="note">
          Photo has been added to collection
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    showNotify () {
      return this.$store.state.showNotify;
    }
  }
}
</script>

<style lang='scss'>
.note{
  display: inline-block;
}

.notify{
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
  background-color: $first;
  border: 2px solid $second;
  box-shadow: 1px 1px 5px black;
  color: $third;
  @media only screen and(max-width: $medium){
    font-size: 1rem;
    padding: 0.25rem;
  }
}

.notify-enter-active{
  animation: notify 0.5s forwards;
}

.notify-leave-active{
  animation: notify 0.5s forwards reverse;
}

@keyframes notify{
  0%{
    opacity: 0;
  }

  100%{
    opacity: 100%;
  }
}
</style>
