<template>
  <div class="drop-down">
    <Button @buttonClick="openDropDown" :text="label" type="white" class="drop-down__button">
      <Icon slot="after" type="select_arrow_down" size="tiny" class="drop-down__arrow"></Icon>
    </Button>
    <ul :class="{ 'drop-down__items-wrapper': true, 'drop-down__items-wrapper--visible': show }">
      <li v-for="(item, index) in items" class="drop-down__item" @click="select(item, index)">
        <Icon
          :type="item.icon"
          size="tiny"
          :class="{ 'drop-down__item-icon': true, 'drop-down__item-icon--no-icon': !item.icon }"
        />
        <div class="drop-down__item-content">
          <span class="drop-down__item-label">{{ item.label }}</span>
          <span v-if="item.description" class="drop-down__item-description">{{ item.description }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "DropDown",
    props: {
      items: {
        type: Array,
      }
    },

    data() {
      return {
        show: false,
        selectedIndex: null,
      };
    },

    computed: {
      label() {
        if (this.items.length === 0) {
          return 'Немає варіантів';
        }

        if (this.selectedIndex === null) {
          return 'Виберіть варіант...';
        }

        return this.items[this.selectedIndex].label;
      }
    },

    methods: {
      openDropDown() {
        this.show = true;
      },

      select(item, index) {
        this.selectedIndex = index;
        this.show = false;
        this.$emit('select', item);
      },
    },
  }
</script>

<style lang="scss">
  .drop-down {
    position: relative;

    &__button {
      min-width: 200px;
      justify-content: space-between;
    }

    &__arrow {
      background: #000;
    }

    &__items-wrapper {
      position: absolute;
      margin: 0;
      top: 0;
      left: 0;
      padding: 10px;
      background: #fff;
      width: 200px;
      border-radius: 5px;
      z-index: 1;
      box-shadow: 2px 2px 12px 0 rgba(160, 160, 160, .4);
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transition: all .375s;

      &--visible {
        opacity: 1;
        pointer-events: all;
      }
    }

    &__item {
      display: flex;
      color: rgba(69,90,100 ,1);
      align-items: center;
      margin-bottom: 5px;
      padding: 0 5px;

      &:hover {
        background: rgba(236,239,241 ,1);
      }
    }

    &__item-icon {
      background: rgba(38,50,56 ,1);
      min-width: 16px;

      &--no-icon {
        background: transparent;
      }
    }

    &__item-content {
      padding: 5px 0;
      cursor: pointer;
      flex-grow: 1;
      margin-left: 10px;
    }

    &__item-label {
      font-weight: 600;
    }

    &__item-description {
      margin-top: 5px;
      padding: 5px;
      background: rgba(96,125,139 ,.1);
      border-radius: 4px;
      display: block;
    }
  }
</style>