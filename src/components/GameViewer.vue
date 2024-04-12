<template>
  <div class="game-viewer" v-if="game">
    <div class="container">
      <div class="row mt-md-5 mt-1 mb-md-3 mb-2">
        <div class="col-12">
          <div class="game-viewer__inner">
            <div class="game-viewer__top">
              <img
                class="game-viewer__img"
                v-bind:src="game.cover"
                v-bind:alt="game.slug"
              />
              <div class="game-viewer__complete-badge" v-if="game.completeFlag">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="max-h-[80%]"
                >
                  <path
                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>complete</span>
              </div>
              <span class="game-viewer__user-rating">
                {{ game.userRating }}/10
              </span>
            </div>
            <div class="game-viewer__bottom mt-2 mt-md-0">
              <div class="row justify-content-between align-items-center">
                <div class="col-auto">
                  <h1 class="game-viewer__title">
                    {{ game.name }}
                  </h1>
                </div>
                <div class="col-auto"></div>
              </div>
              <div class="row align-items-end">
                <div class="col">
                  <div
                    class="game-viewer__genre mr-2"
                    v-for="(genre, index) in game.genres"
                    v-bind:key="index"
                  >
                    {{ genre.name }}
                  </div>
                </div>

                <div class="col">
                  <div class="row justify-content-end">
                    <div class="col-auto">
                      <button
                        type="button"
                        class="game-viewer__btn game-viewer__edit-btn mr-2"
                      >
                        <i class="fal fa-pen"></i>
                      </button>
                      <button
                        type="button"
                        class="game-viewer__btn game-viewer__remove-btn"
                        @click="callDeleteDialog"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <div class="game-viewer__content" v-if="game.description">
            <div class="row">
              <div class="col-12">
                <div
                  class="game-viewer__description"
                  v-html="game.description"
                ></div>
              </div>
              <div class="col-12" v-if="game.screenshots">
                <div class="row">
                  <div class="col-12">
                    <h3>
                      Скриншоты
                    </h3>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-xl-3 col-lg-4 col-md-6 col-sm-12 pb-4"
                    v-for="(screenshot, index) in game.screenshots"
                    v-bind:key="index"
                  >
                    <img
                      :src="screenshot.image"
                      class="game-viewer__screenshot"
                      alt="game.slug"
                    />
                  </div>
                </div>
              </div>

              <div
                class="col-xl-7 col-lg-8 col-md-12 col-sm-12"
                v-if="game.video"
              >
                <vue-plyr>
                  <video>
                    <source v-bind:src="game.video" type="video/mp4" />
                  </video>
                </vue-plyr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="rebound">
      <ModalWindow
        :name="game.name"
        v-if="confirmModal"
        @confirm="deleteGame"
        @cancel="cancelDeleteDialog"
      />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  name: "GameViewer",
  data: function() {
    return {
      game: Object,
      confirmModal: false
    };
  },
  components: {
    ModalWindow
  },
  methods: {
    getGames: function() {
      axios
        .get(
          process.env.VUE_APP_SERVER_URL +
            "/games/game/" +
            this.$route.params.slug
        )
        .then(response => (this.game = response.data));
    },

    callDeleteDialog: function() {
      this.confirmModal = true;
    },

    cancelDeleteDialog: function() {
      this.confirmModal = false;
    },

    deleteGame: function() {
      axios
        .delete(process.env.VUE_APP_SERVER_URL + "/games/game/" + this.game._id)
        .then(response => {
          if (response.status == 200) this.$router.go(-1);
        })
        .catch(error => console.log(error));
    }
  },
  mounted: function() {
    this.getGames();
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  @include media-breakpoint-up(sm) {
    max-width: 100%;
  }

  @include media-breakpoint-up(md) {
    max-width: 960px;
  }

  @include media-breakpoint-up(lg) {
    max-width: 1100px;
  }
}
.game-viewer {
  position: relative;

  &__inner {
    position: relative;
  }

  &__top {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
  }

  &__bottom {
    position: relative;
    padding: 15px;
    background-color: $item-color;
    border-radius: 10px;

    @include media-breakpoint-up(md) {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 30px 20px;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.95));
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }

  &__img {
    min-width: 100%;
    width: 100%;
  }

  &__screenshot {
    width: 100%;
    border-radius: 8px;
  }

  &__title {
    font-size: 20px;

    @include media-breakpoint-up(md) {
      font-size: 25px;
    }

    @include media-breakpoint-up(lg) {
      font-size: 27px;
    }
  }

  &__complete-badge {
    position: absolute;
    display: flex;
    align-items: center;
    top: 9px;
    left: 9px;
    color: #18c964;
    background-color: hsl(146deg 79% 44% / 20%);
    backdrop-filter: saturate(120%) blur(4px);
    padding: 0px 5px;
    border: 2px #4c8c33 solid;
    border-radius: 12px;
    font-size: 14px;

    @include media-breakpoint-up(md) {
      top: 15px;
      left: 15px;
      font-size: 18px;
      padding: 1px 10px;
    }

    & > span {
      padding-left: 3px;
      font-weight: 500;
    }
  }

  &__user-rating {
    position: absolute;
    top: 9px;
    right: 9px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 17px;
    box-sizing: border-box;
    font-weight: 700;
    text-align: center;
    color: $text;
    border: none;
    border-radius: 12px;
    background-color: rgba(28, 27, 33, 0.5);
    backdrop-filter: saturate(120%) blur(4px);
    box-sizing: border-box;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56),
      0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);

    @include media-breakpoint-down(sm) {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-size: 17px;
      top: 9px;
      right: 9px;
    }

    @include media-breakpoint-up(md) {
      width: 70px;
      height: 70px;
      line-height: 70px;
      font-size: 19px;
      top: 15px;
      right: 15px;
    }

    @include media-breakpoint-up(lg) {
      width: 85px;
      height: 85px;
      line-height: 85px;
      font-size: 22px;
    }
  }

  &__date {
    display: block;
    font-size: 13px;
    font-weight: 700;

    @include media-breakpoint-up(md) {
      font-size: 16px;
    }
  }

  &__content {
    padding: 0px;
    border-radius: 10px;
    padding: 18px 20px;
    background-color: $item-color;
  }

  &__description {
    font-size: 16px;

    @include media-breakpoint-up(md) {
      font-size: 16px;
    }

    @include media-breakpoint-up(lg) {
      font-size: 16px;
    }

    @include media-breakpoint-up(xl) {
      font-size: 17px;
    }
  }

  &__genre {
    display: inline-block;
    font-weight: 700;
    padding: 4px 9px;
    background-color: rgba(28, 27, 33, 0.6);
    backdrop-filter: saturate(250%) blur(5px);
    border-radius: 8px;
    font-size: 12px;

    @include media-breakpoint-up(md) {
      font-size: 13px;
      padding: 4px 14px;
    }
  }

  &-info {
    &__title {
      font-size: 21px;
      &:before {
        content: "|";
        color: #009cff;
      }
    }
  }

  &__btn {
    width: 43px;
    height: 43px;
    cursor: pointer;
    box-sizing: border-box;
    background-color: rgba(28, 27, 33, 0.6);
    backdrop-filter: saturate(250%) blur(5px);
    border: none;
    border-radius: 14px;
    transition: transform 0.25s ease;

    @include media-breakpoint-up(md) {
      width: 53px;
      height: 53px;
    }

    & > span {
      display: none;
    }

    &:focus {
      outline: none;
    }
  }

  &__edit-btn {
    color: #44a184;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -10px #44a184;
      border: 2px #44a184 solid;
    }
  }

  &__remove-btn {
    color: #c94052;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -10px #c94052;
      border: 2px #c94052 solid;
    }
  }
}
</style>
