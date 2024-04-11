<template>
  <section class="mt-4 mb-5">
    <div class="row">
      <div class="col-auto">
        <div class="row align-items-center">
          <div class="col">
            <h3>
              Всего
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col mt-3">
            <div class="games-counter">
              <span class="games-counter__digit">{{ countAllGames }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-auto col-xs-12">
        <div class="row align-items-center">
          <div class="col">
            <h3>
              Пройдено
            </h3>
          </div>
        </div>
        <div class="row">
          <div class="col mt-3">
            <div class="games-counter games-counter_complete">
              <span class="games-counter__digit"
                >{{ countCompleteGames
                }}<span class="games-counter__digit_percent"
                  >({{ getPercent + "%" }})</span
                ></span
              >
              <div
                class="box"
                :style="{
                  left: getPercent + '%'
                }"
              >
                <div class="wave -one"></div>
                <div class="wave -two"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "GamesCounter",
  data: function() {
    return {
      countAllGames: 0,
      countCompleteGames: 0
    };
  },
  methods: {
    getGamesCount: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games/count")
        .then(response => (this.countAllGames = response.data));
    },

    getCompleteCount: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games/complete-games")
        .then(response => (this.countCompleteGames = response.data));
    }
  },
  mounted: function() {
    this.getGamesCount();
    this.getCompleteCount();
  },
  computed: {
    getPercent: function() {
      return Math.ceil((this.countAllGames / 100) * this.countCompleteGames);
    }
  }
};
</script>

<style lang="scss" scoped>
.games-counter {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 110px;
  height: 110px;
  text-align: center;
  background-color: $item-color;
  border-radius: 10px;
  overflow: hidden;

  &_complete {
    width: 100%;
    border: 4px solid #4c8c33;

    @include media-breakpoint-up(sm) {
      width: 370px;
    }
  }

  &__digit {
    position: relative;
    z-index: 10;
    font-size: 38px;
    font-weight: 900;

    &_percent {
      padding-left: 5px;
      color: #4c8c33;
      font-size: 20px;
    }
  }
}

.box {
  position: absolute;
  top: -200px;
  transform: rotate(90deg);
}

.wave {
  position: absolute;
  opacity: 0.4;
  width: 600px;
  height: 580px;
  margin-top: 0px;
  border-radius: 50%;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  from {
    transform: rotate(360deg);
  }
}

.wave.-one {
  animation: rotate 10000ms infinite linear;
  opacity: 0.15;
  background: #4c8c33;
}

.wave.-two {
  animation: rotate 9000ms infinite linear;
  opacity: 0.4;
  background: #4c8c33;
}
</style>
