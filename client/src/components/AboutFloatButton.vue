<template>
  <div class="about-float-button">
    <Button :squash="true" type="transparent" @buttonClick="toggle">
      <Icon slot="before" type="info"></Icon>
    </Button>
    <About v-if="show" :popup="true" @close="toggle" />
  </div>
</template>

<script>
  import About from '../views/About';

  export default {
    name: "AboutFloatButton",
    components: {
      About,
    },

    data() {
      return {
        show: false,
      };
    },

    methods: {
      toggle() {
        this.show = !this.show;
      }
    }
  }
</script>

<style scoped lang="scss">
  .about-float-button {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
</style>