<template>
  <div class="meet-popup popup" v-show="show">
    <div class="popup__overlay">
      <div class="popup__content">
        <h2 class="popup__title">Хало!</h2>
        <div class="popup__container meet-popup__container">
          <div class="meet-popup__item" @click="showMaps">
            <Icon type="map" class="meet-popup__icon" />
            <span>Відкрити карту</span>
          </div>
          <div class="meet-popup__item" @click="createMap">
            <Icon type="map_mono" class="meet-popup__icon" />
            <span>Створити нову карту</span>
          </div>
        </div>
        <Button text="Ще одну нотифікацію" @buttonClick="showNotification" />
      </div>
    </div>
  </div>
</template>

<script>
  import Icon      from '../../components/ui/Icon';
  import $events   from '../../utils/events';
  import '../../assets/styles/popup.scss';
  import randomInt from '../../utils/randomInt';

  export default {
    name: "MeetPopup",
    components: {
      Icon,
    },

    data() {
      return {
        show: true,
        titles: [
          'Помилка!',
          'Сталась якась біда!',
          'Ну тут явно ти щось натворив(ла)',
          'Ой, біда!',
          'От, халепа',
          'Трясця!',
          'Овва!',
        ],
        texts: [
          'Тут типу опис помилки...',
          'Ще не пізно щось виправити!',
          'Наступного разу в тебе все вийде!',
          'За моєї молодості такого не було...',
          'За інших обставин все могло бути добре, проте...',
          'В мене для тебе погані новини...'
        ]
      };
    },

    mounted() {
      $events.$on('showMeetPopup', () => {
        this.show = true;
      });
    },

    methods: {
      showNotification() {
        $events.$emit('showNotification', {
          text: this.texts[randomInt(0, this.texts.length - 1)],
          title: this.titles[randomInt(0, this.titles.length - 1)],
          time: randomInt(2500, 8000),
        });
      },

      showMaps() {
        $events.$emit('showOpenMaps');
        this.show = false;
      },

      createMap() {
        $events.$emit('showCreateMap');
        this.show = false;
      },
    }
  }
</script>

<style lang="scss">
  .meet-popup {

    &__container {
      flex-direction: row;
    }

    &__item {
      display: flex;
      flex-direction: column;
      color: #fff;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, .2);
      }
    }

    &__icon {
      width: 96px;
      height: 96px;
      margin-bottom: 8px;
    }
  }
</style>