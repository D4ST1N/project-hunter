<template>
  <div class="add-params-window">
    <div class="add-params-window__overlay">
      <div class="add-params-window__content">
        <h2 class="add-params-window__title">{{ action.method }}</h2>
        <div class="add-params-window__params-wrapper">
          <div v-for="parameter in action.params" class="add-params-window__parameter">
            <div class="add-params-window__parameter-name">{{ parameter.name }} ({{ parameter.type }}):</div>
            {{ items(parameter) }}
            <div class="add-params-window__value-wrapper">
              <DropDown v-if="parameter.items" :items="parameter.items(quest)" @select="selectItem(parameter, ...arguments)" />
              <div v-else-if="parameterType(parameter.type) === 'function'" class="add-params-window__actions-list">
                <div v-for="action in parameter.actions" class="add-params-window__action">
                  <QuestAction :action="action" />
                </div>
                <Button
                  :text="$t('QuestEditor.Action.Add')"
                  type="white"
                  size="small"
                  @buttonClick="showAddActionWindow(parameter)"
                >
                  <Icon slot="before" type="add" size="tiny"></Icon>
                </Button>
              </div>
              <input v-else v-model="parameter.value" :type="parameterType(parameter.type)" class="add-params-window__parameter-value" title="value">
            </div>
          </div>
        </div>
        <Button :text="$t('Action.Add')" type="green" size="small"  @buttonClick="submit">
          <Icon slot="before" type="add_mono" size="tiny"></Icon>
        </Button>
        <Button :text="$t('Action.Cancel')" type="red" size="small" @buttonClick="cancel">
          <Icon slot="before" type="cancel_mono" size="tiny"></Icon>
        </Button>
      </div>
    </div>
    <AddActionWindow v-if="showAddAction" :quest="quest" :inner="true" @onActionSelect="addAction" @onWindowClose="closeAddActionWindow" />
  </div>
</template>

<script>
  import QuestAction from './QuestAction';

  export default {
    name: "AddParamsWindow",
    props: {
      action: {
        type: Object,
      },
      quest: {
        type: Object,
      },
    },
    components: {
      QuestAction,
    },

    data() {
      return {
        showAddAction: false,
        selectedParameter: null,
      }
    },

    computed: {
    },

    methods: {
      submit() {
        const action = Object.assign({}, this.action);
        action.params.forEach((param) => {
          delete param.description;
          delete param.name;
          delete param.items;
          delete param.multiple;

          if (param.type === 'Number') {
            param.value = parseFloat(param.value);
          }
        });
        this.$emit('submit', action);
      },

      cancel() {
        this.$emit('cancel');
      },

      parameterType(type) {
        switch (type) {
          case 'Number':
            return 'number';
          case 'Function':
            return 'function';
          default:
            return 'text';
        }
      },

      items(parameter) {
        if (parameter.items) {
          parameter.items(this.quest);
        }
      },

      selectItem(parameter, item) {
        const index = this.action.params.indexOf(parameter);

        if (index !== undefined) {
          this.action.params[index].value = item.value;
        }
      },

      addAction(action) {
        const index = this.action.params.indexOf(this.selectedParameter);

        if (index) {
          if (!Array.isArray(this.action.params[index].actions)) {
            this.action.params[index].actions = [];
          }

          this.action.params[index].actions.push(action)
        }

        this.closeAddActionWindow();
      },

      showAddActionWindow(parameter) {
        this.selectedParameter = parameter;
        this.showAddAction = true;
      },

      closeAddActionWindow() {
        this.showAddAction = false;
      },
    }
  }
</script>

<style lang="scss">
  .add-params-window {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &__overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__content {
      background: rgba(144,164,174 ,.8);
      padding: 20px;
      border-radius: 10px;
      min-width: 500px;
    }

    &__title {
      margin-top: 0;
    }

    &__params-wrapper {
      display: flex;
      flex-direction: column;
    }

    &__parameter {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__parameter-name {
      width: 50%;
    }

    &__value-wrapper {
      width: 50%;
    }
  }
</style>