<template>
  <div class="game-viewer" v-if="game">
    <div class="container">
      <div class="row mt-md-5 mt-1 mb-4">
        <div class="col-12">
          <div class="game-viewer__inner">
            <div class="game-viewer__top">
              <img
                class="game-viewer__img"
                v-bind:src="game.cover"
                v-bind:alt="game.slug"
              />
              <span class="game-viewer__user-rating">
                {{ game.userRating }}/10
              </span>
            </div>
            <div class="game-viewer__bottom mt-2 mt-md-0">
              <h1 class="game-viewer__title">
                {{ game.name }}
              </h1>
              <div class="row justify-content-between align-items-center mb-3">
                <div class="col-auto">
                  <span
                    v-for="(platforms, index) in game.platforms"
                    v-bind:key="index"
                  >
                    <i
                      v-if="platforms.platform.slug == 'xbox'"
                      class="ml-1 mr-1 fab game-viewer__platform fa-md fa-xbox"
                    ></i>
                    <i
                      v-if="platforms.platform.slug == 'playstation'"
                      class="ml-1 mr-1 fab game-viewer__platform fa-md fa-playstation"
                    ></i>
                    <i
                      v-if="platforms.platform.slug == 'pc'"
                      class="ml-1 mr-1 fab game-viewer__platform fa-md fa-windows"
                    ></i>
                    <i
                      v-if="platforms.platform.slug == 'linux'"
                      class="ml-1 mr-1 fab game-viewer__platform fa-md fa-linux"
                    ></i>
                    <i
                      v-if="platforms.platform.slug == 'mac'"
                      class="ml-1 mr-1 fab game-viewer__platform fa-md fa-apple"
                    ></i>
                    <i
                      v-if="platforms.platform.slug == 'nintendo'"
                      class="ml-1 mr-1 fab game-viewer__platform fa-md fa-nintendo-switch"
                    ></i>
                  </span>
                </div>
                <div class="col-auto">
                  <span class="game-viewer__date">
                    <i class="fal fa-calendar-alt mr-1"></i>
                    {{ game.releasedDate | moment("L") }}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div
                    class="game-viewer__genre mr-2"
                    v-for="(genre, index) in game.genres"
                    v-bind:key="index"
                  >
                    {{ genre.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row game-viewer__content no-gutters mb-4"
        v-if="game.description"
      >
        <div class="col-12">
          <div class="game-viewer__description" v-html="game.description"></div>
        </div>

        <div class="col-xl-7 col-lg-8 col-md-12 col-sm-12" v-if="game.video">
          <vue-plyr>
            <video>
              <source v-bind:src="game.video" type="video/mp4" />
            </video>
          </vue-plyr>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-auto">
          <!-- <button
            type="button"
            class="game-viewer__btn game-viewer__edit-btn mr-2"
          >
            <i class="fal fa-pen"></i>
          </button> -->
          <button
            type="button"
            class="game-viewer__btn game-viewer__remove-btn"
            @click="callDeleteDialog"
          >
            <i class="fal fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <transition name="fade">
      <ModalConfirm
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
import ModalConfirm from "@/components/ModalConfirm.vue";

export default {
  name: "GameViewer",
  data: function() {
    return {
      game: null,
      confirmModal: false
    };
  },
  components: {
    ModalConfirm
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
          if (response.status == 200) this.$router.push("/");
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
    padding: 10px 15px;
    background-color: $item-color;
    border-radius: 10px;

    @include media-breakpoint-up(md) {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 14px 20px;
      backdrop-filter: saturate(280%) blur(5px);
      background-color: rgba(38, 39, 44, 0.8);
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
    }
  }

  &__img {
    min-width: 100%;
    width: 100%;
  }

  &__title {
    font-size: 20px;

    @include media-breakpoint-up(md) {
      font-size: 23px;
    }

    @include media-breakpoint-up(lg) {
      font-size: 25px;
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
    border: 2px solid;
    border-radius: 12px;
    border: none;
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

    @include media-breakpoint-up(md) {
      padding: 18px 20px;
      background-color: $item-color;
    }
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
    background-color: #181818;
    border-radius: 8px;
    font-size: 12px;

    @include media-breakpoint-up(md) {
      font-size: 15px;
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
    width: 53px;
    height: 53px;
    cursor: pointer;
    background-color: $item-color;
    border: 2px $item-color solid;
    border-radius: 14px;
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out,
      border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out,
      -webkit-box-shadow 0.25s ease-in-out;

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
      border: 2px #44a184 solid;
    }
  }

  &__remove-btn {
    color: #c94052;

    &:hover {
      border: 2px #c94052 solid;
    }
  }
}
</style>
