<template>
  <div class="home">
    <div class="popup">
      <div class="popup__overlay">
        <div class="popup__content">
          <div class="popup__container home__container">
            <router-link to="/editor" class="nav-link home__link">
              <Button :text="$t('Routes.MapEditor')" :rectangular="true" type="white">
                <Icon slot="before" type="map" size="small" />
              </Button>
            </router-link>
            <router-link to="/quests" class="nav-link home__link">
              <Button :text="$t('Routes.QuestEditor')" :rectangular="true" type="white">
                <Icon slot="before" type="scroll" size="small" />
              </Button>
            </router-link>
            <router-link to="/about" class="nav-link home__link">
              <Button :text="$t('Routes.About')" :rectangular="true" type="white">
                <Icon slot="before" type="info" size="small" />
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
  };
</script>

<style lang="scss">
  .home {
    &__container {
      align-items: center;
    }
    &__link {
      margin-bottom: 10px;
    }
  }
</style>
