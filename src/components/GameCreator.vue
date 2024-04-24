<template>
  <div class="row">
    <div class="col-xl-3 col-lg-4 col-md-6 pt-3">
      <!--Serach Form-->
      <div class="search-form">
        <div class="form-group pb-3">
          <input
            class="search-form__input form-control"
            name="name"
            type="text"
            placeholder="Название"
            v-model="insertGame"
            @keyup.enter="searchGame"
          />

          <div class="mt-3 alert alert-danger" role="alert" v-if="empty">
            <span class="search-form__message_error"
              ><i class="fas fa-exclamation-triangle"></i> {{ empty }}</span
            >
          </div>
        </div>

        <button
          type="button"
          class="btn search-form__button btn-primary"
          @click="searchGame"
        >
          <div
            class="spinner-border spinner-border-sm"
            role="status"
            v-if="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <!-- <i class="fal fa-search"></i> -->
          Найти
        </button>
        <button
          type="button"
          class="btn search-form__button btn-danger"
          @click="clearData"
        >
          <!-- <i class="fal button-icon fa-trash-alt"></i> -->
          Очистить
        </button>
      </div>
      <!--!Serach Form-->

      <!--Error-->
      <div class="mt-3 alert alert-danger" role="alert" v-if="error">
        <span class="search-form__message_error"
          ><i class="fas fa-exclamation-triangle"></i> {{ error }}</span
        >
      </div>
      <!--!Error-->
    </div>

    <!--Game items-->
    <div class="col-xl-4 col-lg-5 col-md-6 pt-3">
      <transition name="fade">
        <div class="found-games" v-if="games">
          <div
            class="found-games__item mb-3"
            v-for="(game, index) in games"
            v-bind:key="index"
            v-bind:class="{
              'found-games__item_active': selectGameIndex === index
            }"
            v-bind:style="{
              backgroundImage: 'url(' + game.background_image + ')'
            }"
            v-on:click="selectGame(index)"
          >
            <div class="found-games__overlay"></div>
            <div class="found-games__content">
              <div class="row">
                <div class="col-12">
                  <h4 class="found-games__title">
                    {{ game.name }}
                  </h4>
                </div>
              </div>
              <div class="row" v-if="selectGameIndex === index">
                <div class="col-12">
                  <div class="input-group mb-3 mt-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01"
                        >Оценка</label
                      >
                    </div>
                    <select
                      v-model="currentGame.my_rating"
                      class="form-control"
                      id="selectMyRating"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="completeGameCheckbox"
                        value="option1"
                        v-model="currentGame.complete_flag"
                      />

                      <label class="form-check-label" for="completeGameCheckbox"
                        >Пройдена</label
                      >
                    </div>
                  </div>
                  <div
                    class="mt-3 alert alert-success"
                    role="alert"
                    v-if="added"
                  >
                    <span class="search-form__message_success"
                      ><i class="fas fa-check"></i> Добавлено</span
                    >
                  </div>
                  <div class="form-group" v-else>
                    <button
                      type="button"
                      class="btn btn-success search-form__button"
                      @click="addGame"
                    >
                      <!-- <i class="fal fa-plus"></i> -->
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!--!Game items-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GameCreator",
  components: {},
  data: function() {
    return {
      games: {},
      loading: false,
      currentGame: {},
      insertGame: null,
      error: null,
      added: null,
      empty: null,
      selectGameIndex: null,
      rawgApiKey: process.env.VUE_APP_RAWG_API_KEY
    };
  },
  methods: {
    searchGame: async function() {
      this.clearData();

      if (!this.insertGame) {
        this.empty = "Введите название игры!";
      } else {
        this.loading = true;

        const url =
          "https://api.rawg.io/api/games?key=" +
          this.rawgApiKey +
          "&page_size=5&search=" +
          this.insertGame;

        const response = await axios.get(url);
        this.games = response.data["results"];

        this.loading = false;
      }
    },

    selectGame: function(index) {
      if (this.selectGameIndex !== index) {
        this.currentGame = this.games[index];
        this.selectGameIndex = index;
        this.currentGame.my_rating = 1;
        this.currentGame.complete_flag = false;
        this.currentGame.background_image__crop = this.getCropImage(
          this.currentGame.background_image
        );

        const url =
          "https://api.rawg.io/api/games/" +
          this.currentGame.slug +
          "?key=" +
          this.rawgApiKey;

        axios
          .get(url)
          .then(response => {
            Object.assign(this.currentGame, response.data);
          })
          .catch(error => (this.error = error));
      }
    },

    addGame: async function() {
      const video = this.currentGame.clip
        ? this.currentGame.clip.clips.full
        : null;

      const addedGame = {
        name: this.currentGame.name,
        slug: this.currentGame.slug,
        userRating: this.currentGame.my_rating,
        releasedDate: this.currentGame.released,
        addedDate: new Date(),
        description: this.currentGame.description,
        cover: this.currentGame.background_image,
        coverCrop: this.currentGame.background_image__crop,
        video: video,
        metacritic: this.currentGame.metacritic,
        completeFlag: this.currentGame.complete_flag,
        angryFlag: this.currentGame.angry_flag,
        platforms: this.currentGame.parent_platforms,
        genres: this.currentGame.genres,
        screenshots: this.currentGame.short_screenshots
      };

      // try {
      //   const response = axios.post(
      //     process.env.VUE_APP_SERVER_URL + "/games",
      //     addedGame
      //   );
      //   // this.added = response;
      //   console.log("Response: " + response);
      // } catch (error) {
      //   this.error = error;
      // }

      axios
        .post(process.env.VUE_APP_SERVER_URL + "/games", addedGame)
        .then(response => {
          this.added = response;
        })
        .catch(error => (this.error = error));
    },

    getCropImage: function(image) {
      if (image) {
        const arrayOfStrings = image.split("media/");
        const cropImage =
          arrayOfStrings[0] + "media/crop/600/400/" + arrayOfStrings[1];
        return cropImage;
      } else {
        return "http://via.placeholder.com/400";
      }
    },

    clearData: function() {
      this.games = {};
      this.currentGame = null;
      this.selectGameIndex = null;
      this.empty = null;
      this.error = null;
      this.added = null;
    }
  }
};
</script>

<style lang="scss"></style>
