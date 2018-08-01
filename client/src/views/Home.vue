<template>
  <div class="home">
    <div class="popup">
      <div class="popup__overlay">
        <div class="popup__content">
          <router-link to="/editor" class="nav-link">
            <Button :text="$t('Routes.MapEditor')"></Button>
          </router-link>
          <router-link to="/quests" class="nav-link">
            <Button :text="$t('Routes.QuestEditor')"></Button>
          </router-link>
          <router-link to="/about" class="nav-link">
            <Button :text="$t('Routes.About')"></Button>
          </router-link>
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
