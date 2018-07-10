<template>
  <div class="tabs">
    <header class="tabs__header">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ 'tabs__button': true, 'tabs__button--active': tab.active }"
        @click="selectTab(tab)"
      >
        {{ tab.name }}
      </div>
    </header>
    <section class="tabs__wrapper">
      <div
        v-for="tab in tabs"
        v-if="tab.active"
        :key="tab.name"
        class="tabs__content"
      >
        <div
          v-for="item in tab.items"
          :key="item.name"
          :class="{ 'tabs__content-item': true, 'tabs__content-item--selected': item.selected }"
          :style="{ 'background': `url(/img/tiles/${item.name}.png) no-repeat center` }"
          @click="selectItem(item)"
        >
          <span class="tabs__content-item-label">{{ item.label }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Tabs",
    props: {
      tabs: {
        type: Array,
      },
    },
    computed: {
      selectedTab() {
        return this.tabs.find(t => t.active);
      },
    },
    methods: {
      selectTab(tab) {
        if (this.selectedTab) {
          this.selectedTab.active = false;
        }

        tab.active = true;
      },

      selectItem(item) {
        const selectedItem = this.selectedTab.items.find(i => i.selected);

        if (selectedItem) {
          selectedItem.selected = false;
        }

        this.$set(item, 'selected', true);
        item.selected = true;
        item.action();
      }
    },
  }
</script>

<style lang="scss">
  @import "../../assets/styles/variables";
  .tabs {
    &__header {
      display: flex;
    }

    &__button {
      padding: 8px 16px;
      cursor: pointer;
      margin-right: 8px;
      transition: all .375s;
      color: transparentize($base-text-color, .4);
      border-bottom: 4px solid rgba(207,216,220 ,1);

      &--active {
        color: $base-text-color;
        border-bottom-color: rgba(66,165,245 ,1);
      }

      &:hover {
        box-shadow: 0 0 4px 0 rgba(207,216,220 ,1);
      }
    }

    &__content {
      padding: 16px;
      display: flex;
      flex-wrap: wrap;

      &-item {
        width: 96px;
        height: 96px;
        margin-right: 8px;
        margin-bottom: 32px;
        border-radius: 4px;
        cursor: pointer;
        transition: all .375s;
        position: relative;
        border: 2px solid transparent;

        &--selected::after {
          content: '';
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,138,101 ,1);
          background-color: rgba(255,241,118 ,1);
          border-radius: 50%;
          position: absolute;
          top: 4px;
          right: 4px;
        }

        &:hover {
          box-shadow: 0 0 8px 0 rgba(96,125,139 ,1);
        }

        &-label {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: -24px;
          font-size: 16px;
        }
      }
    }
  }
</style>