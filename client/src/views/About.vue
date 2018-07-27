<template>
  <div class="about">
    <div class="popup">
      <div class="popup__overlay">
        <div class="popup__content">
          <div class="about__wrapper">
            <div class="about__item">
              <span class="about__item-label">Версія клієнту:</span>
              <span class="about__item-value">{{ client.version }}</span>
            </div>
            <div class="about__item">
              <span class="about__item-label">Версія серверу:</span>
              <span class="about__item-value">{{ server.version }}</span>
            </div>
            <Button text="Інформація про версії" size="medium" type="white" @buttonClick="getInfo">
              <Icon slot="before" size="small" type="info"></Icon>
              <Spinner v-show="showLoader" slot="after" color="blue" />
            </Button>
            <Button v-if="popup" class="about__button" text="Закрити" size="medium" type="white" @buttonClick="close">
              <Icon slot="before" size="small" type="cancel"></Icon>
            </Button>
            <router-link v-else to="/" class="nav-link">
              <Button class="about__button" text="На головну" size="medium" type="white">
                <Icon slot="before" size="small" type="castle"></Icon>
              </Button>
            </router-link>
            <div v-if="versionInfo.length > 0" class="about__version-info popup">
              <div class="popup__overlay">
                <div class="popup__content">
                  <div class="about__commit-wrapper">
                    <div v-for="commit in versionInfo" class="about__commit">
                      <div class="about__commit-content">{{ commit.commit.message }}</div>
                      * * * * * * * * * * * * * * *  * * * * * *
                    </div>
                  </div>
                  <Button text="Закрити" type="white" size="small" @buttonClick="versionInfo = []">
                    <Icon slot="before" size="small" type="cancel"></Icon>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import client from '../../package';
  import server from '../../../server/package';
  import Spinner from '../components/ui/Spinner';

  export default {
    name: 'About',
    components: {
      Spinner,
    },
    props: {
      popup: {
        type: Boolean,
        default: false,
      }
    },

    data() {
      return {
        client,
        server,
        showLoader: false,
        versionInfo: [],
      }
    },

    methods: {
      close() {
        this.$emit('close');
      },

      getInfo() {
        this.showLoader = true;
        axios
          .get('https://api.github.com/repos/D4ST1N/project-hunter/commits?sha=develop')
          .then((response) => {
            this.showLoader = false;
            this.versionInfo = response.data;
          })
          .catch((error) => {
            this.showLoader = false;
            console.error(error);
          });
      }
    }
  }
</script>

<style scoped lang="scss">
  .about {
    color: #fff;

    &__wrapper {
    }

    &__button {
      margin-top: 10px;
    }

    &__item {
      margin-bottom: 10px;
      font-size: 24px;

      &-label {
        margin-right: 10px;
      }

      &-value {
        margin-right: 10px;
        font-weight: 600;
        font-family: Consolas, monospace;
      }
    }

    &__commit-wrapper {
      max-height: calc(100vh - 150px);
      overflow: auto;
      padding-right: 10px;
      margin-bottom: 20px;
    }

    &__commit {
      margin-bottom: 20px;
    }

    &__commit-content {
      white-space: pre-wrap;
      margin-bottom: 10px;
    }
  }
</style>