<template>
  <div class="icons-list">
    <div class="icons-list__toolbar">
      <router-link to="/" class="nav-link">
        <Button :squash="true" class="about__button" text="На головну" size="small" type="white">
          <Icon slot="before" size="small" type="castle"></Icon>
        </Button>
      </router-link>
      <DropDown :items="sizes" :squash="false" size="small" class="icons-list__select" @select="selectSize" />
    </div>
    <Button v-for="icon in icons" :key="icon" :title="icon" class="icons-list" :squash="true" type="transparent">
      <Icon slot="before" :size="size" :type="icon"></Icon>
    </Button>
  </div>
</template>

<script>
  import API from '../../services/API';

  export default {
    name: "IconsList",

    data() {
      return {
        icons: [],
        size: 'large',
        sizes: [
          {
            label: 'Tiny',
            value: 'tiny',
          },
          {
            label: 'Small',
            value: 'small',
          },
          {
            label: 'Medium',
            value: 'medium',
          },
          {
            label: 'Large',
            value: 'large',
            selected: true,
          },
          {
            label: 'Huge',
            value: 'huge',
          },
        ]
      };
    },

    mounted() {
      API()
        .get('/icon-list')
        .then((response) => {
          this.icons = response.data.map(icon => icon.split('.svg')[0]);
        })
        .catch(console.error);
    },

    methods: {
      selectSize(size) {
        this.size = size.value;
      }
    }
  }
</script>

<style scoped lang="scss">
  .icons-list {

    &__toolbar {
      padding: 5px;
      border-radius: 5px;
      background: rgba(120,144,156 ,.2);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }

    &__select {
      display: inline-flex;
    }
  }
</style>