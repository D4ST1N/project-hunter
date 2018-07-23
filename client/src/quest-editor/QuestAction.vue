<template>
  <div :class="{ 'quest-action': true, 'quest-action--offset': offset }">
    <div class="quest-action__content">
      <span class="quest-action__method-name">{{ action.method }}</span>
      <span class="quest-action__bracket">(</span>
      <span v-for="parameter in action.params" class="quest-action__parameter">
        <span class="quest-action__parameter-name">{{ parameter.name }}:</span>
        <span class="quest-action__parameter-value" v-if="parameter.value !== undefined">{{ parameter.value }}</span>
        <span class="quest-action__parameter-value" v-else="parameter.actions">
          <QuestAction v-for="(action, index) in parameter.actions" :key="index" :action="action" :offset="false"></QuestAction>
        </span>
      </span>
      <span class="quest-action__bracket">)</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuestAction",
    props: {
      action: {
        type: Object,
      },
      offset: {
        type: Boolean,
        default: true,
      }
    },

    methods: {
      removeAction() {
        this.$emit('removeAction');
      }
    }
  }
</script>

<style lang="scss">
 .quest-action {
   padding: 5px;
   margin: 2px 5px 2px 0;
   background: rgba(207,216,220 ,.2);
   border-radius: 5px;
   position: relative;
   display: inline-flex;
   justify-content: space-between;
   align-items: center;
   line-height: 1;

   &--offset {
     margin-bottom: 5px;
   }

   &__method-name {
     font-weight: 600;
     margin-right: 2px;
     display: inline-block;
     width: auto;
   }

   &__parameter {
     display: inline-block;
     padding: 2px 5px;
     background: rgba(207,216,220 ,.2);
     border-radius: 5px;
     margin: 2px 5px;

     &-name {
       opacity: .8;
     }

     &-value {
       display: inline-block;
       font-weight: 600;
       margin-left: 5px;
     }
   }
 }
</style>