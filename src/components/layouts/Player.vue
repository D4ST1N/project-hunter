<template>
  <canvas ref="player" class="layout"></canvas>
</template>

<script>
  import renderRectangle from '../../utils/renderRectangle';
  import $events         from '../../utils/events';
  import capitalize      from '../../utils/capitalize';
  import getDirection    from '../../utils/getDirection';

  export default {
    name: "Player",

    data() {
      return {
        playerArea: null,
        player:     null,
        ctx:        null,
        isMoving:   false,
        gameTick:   null,
        lastTime:   performance.now(),
        raf:        null,
        direction:  null,
      };
    },

    created() {
      this.player = this.$store.state.player.player;
      $events.$on('startPlayerMove', this.startMoving);
      $events.$on('endPlayerMove', this.stopMoving);
      $events.$on('initGame', this.renderPlayer);
    },

    mounted() {
      this.playerArea = this.$refs.player;
      this.ctx = this.playerArea.getContext('2d');
      this.playerArea.width = this.$store.state.game.view.width;
      this.playerArea.height = this.$store.state.game.view.height;
      this.main(performance.now());
    },

    methods: {
      renderPlayer() {
        renderRectangle(this.ctx, this.player);
      },

      clear() {
        this.ctx.clearRect(
          0,
          0,
          this.$store.state.game.view.width,
          this.$store.state.game.view.height,
        );
      },

      startMoving() {
        this.direction = getDirection(this.player.pos, this.player.path[0]);

        if (!this.isMoving) {
          this.isMoving = true;
          this.main(performance.now());
        }
      },

      stopMoving() {
        this.direction = null;
        this.isMoving = false;
      },

      main(now) {
        if (this.isMoving) {
          this.gameTick = now - this.lastTime;
          this.lastTime = now;
          this.update(now);
          this.render(now);
          this.raf = requestAnimationFrame(this.main);
        }
      },

      update() {
        if (this.player.pos.x !== this.player.path[0].x
          || this.player.pos.y !== this.player.path[0].y
        ) {
          this.$store.commit(`move${capitalize(this.direction)}`);
        } else {
          this.$store.commit('shiftPath');

          if (this.player.path.length > 0) {
            this.startMoving();
          } else {
            $events.$emit('endPlayerMove');
          }
        }
      },

      render() {
        this.clear();
        this.renderPlayer();
      },
    }
  }
</script>

<style scoped>

</style>