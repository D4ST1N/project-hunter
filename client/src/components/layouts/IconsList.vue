<template>
  <div class="icons-list">
    <div class="icons-list__toolbar">
      <router-link to="/" class="nav-link">
        <Button :squash="true" class="about__button" :text="$t('Routes.Home')" size="small" type="white">
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
  import $events from '../../utils/events';

  export default {
    name: "IconsList",

    data() {
      return {
        icons: [],
        size: 'large',
        sizes: [
          {
            label: this.$t('Icons.Sizes.X-Small'),
            value: 'x-small',
          },
          {
            label: this.$t('Icons.Sizes.Tiny'),
            value: 'tiny',
          },
          {
            label: this.$t('Icons.Sizes.Small'),
            value: 'small',
          },
          {
            label: this.$t('Icons.Sizes.Medium'),
            value: 'medium',
          },
          {
            label: this.$t('Icons.Sizes.Large'),
            value: 'large',
            selected: true,
          },
          {
            label: this.$t('Icons.Sizes.Huge'),
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
        .catch((error) => {
          this.$logger.log(error, 'error');
          $events.$emit('showNotification', {
            title: this.$t('Icons.Error'),
          });
        });
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