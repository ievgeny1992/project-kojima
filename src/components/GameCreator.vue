<template>
  <div class="row">
    <div class="col-xl-3 col-lg-4 col-md-6 pt-3">
      <div class="search-game">
        <div class="form-group pb-3">
          <label class="search-game__label" for="name">Название игры</label>
          <input
            class="search-game__input form-control"
            name="name"
            type="text"
            v-model="insertGame"
            @keyup.enter="searchGame"
          />

          <div class="mt-3 alert alert-danger" role="alert" v-if="empty">
            <span class="search-game__message_error"
              ><i class="fas fa-exclamation-triangle"></i> {{ empty }}</span
            >
          </div>
        </div>
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="searchGame"
        >
          <i class="fal fa-search"></i>
          Найти
        </button>
        <button type="button" class="btn btn-outline-danger" @click="clearData">
          <i class="fal fa-trash-alt"></i>
          Очистить
        </button>
      </div>

      <div class="mt-3 alert alert-danger" role="alert" v-if="error">
        <span class="search-game__message_error"
          ><i class="fas fa-exclamation-triangle"></i> {{ error }}</span
        >
      </div>

      <div class="d-flex justify-content-center d-md-none mt-2 mb-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.51489 8.465L11.9999 16.95L20.4849 8.465L19.0709 7.05L11.9999 14.122L4.92889 7.05L3.51489 8.465Z"
            fill="#fdfcff"
          ></path>
        </svg>
      </div>
    </div>

    <div class="col-xl-4 col-lg-4 col-md-6 pt-3">
      <transition name="fade">
        <div class="found-games" v-if="games">
          <div
            class="found-games__item mb-3"
            v-for="(game, index) in games"
            v-bind:key="index"
            v-bind:class="{
              'found-games__item_active': selectGameIndex === index
            }"
            v-on:click="selectGame(index)"
          >
            <div
              class="found-games__cover mr-2"
              v-bind:style="{
                backgroundImage: 'url(' + game.background_image + ')'
              }"
              v-if="game.background_image"
            ></div>
            <div class="found-games__content">
              <h4 class="found-games__title">
                {{ game.name }}
              </h4>
              <h5 class="found-games__date">
                <i class="fal fa-calendar-alt"></i>
                {{ game.released | moment("L") }}
              </h5>
            </div>
            <div class="found-games__arrow">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.46495 20.485L16.95 12L8.46495 3.515L7.04995 4.929L14.122 12L7.04995 19.071L8.46495 20.485Z"
                  fill="#fdfcff"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </transition>
      <div class="d-flex justify-content-center d-md-none mt-2 mb-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.51489 8.465L11.9999 16.95L20.4849 8.465L19.0709 7.05L11.9999 14.122L4.92889 7.05L3.51489 8.465Z"
            fill="#fdfcff"
          ></path>
        </svg>
      </div>
    </div>

    <div class="col-xl-4 col-lg-4 col-md-6 pt-3" v-if="currentGame">
      <transition name="fade">
        <div class="found-game">
          <img
            class="found-game__img"
            :src="currentGame.background_image__crop"
            :alt="currentGame.slug"
          />
          <div class="card-body">
            <h3 class="pt-2">
              {{ currentGame.name }}
            </h3>
            <div class="form-group">
              <label for="selectMyRating">My rating</label>
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
                  v-model="currentGame.complete_flag"
                  class="form-check-input"
                  type="checkbox"
                  id="completeGameCheckbox"
                  value="option1"
                />
                <label class="form-check-label" for="completeGameCheckbox"
                  >Игра пройдена</label
                >
              </div>
            </div>

            <div class="form-group">
              <div class="form-check">
                <input
                  v-model="currentGame.angry_flag"
                  class="form-check-input"
                  type="checkbox"
                  id="angryGameCheckbox"
                  value="option2"
                />
                <label class="form-check-label" for="angryGameCheckbox"
                  >Взбесила</label
                >
              </div>
            </div>

            <div class="mt-3 alert alert-success" role="alert" v-if="added">
              <span class="search-game__message_success"
                ><i class="fas fa-check"></i> Добавлено</span
              >
            </div>
            <div class="form-group" v-else>
              <button
                type="button"
                @click="addGame"
                class="btn btn-outline-primary"
              >
                <i class="fal fa-plus"></i>
                Добавить
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GameCreator",
  data: function() {
    return {
      games: null,
      insertGame: null,
      error: null,
      added: null,
      empty: null,
      currentGame: null,
      selectGameIndex: null,
      rawgApiKey: process.env.VUE_APP_RAWG_API_KEY
    };
  },
  methods: {
    searchGame: function() {
      this.clearData();

      if (!this.insertGame) {
        this.empty = "Введите название игры!";
      } else {
        const url =
          "https://api.rawg.io/api/games?key=" +
          this.rawgApiKey +
          "&page_size=7&search=" +
          this.insertGame;

        axios
          .get(url)
          .then(response => (this.games = response.data.results))
          .catch(error => console.log(error));
      }
    },

    selectGame: function(index) {
      this.currentGame = null;
      this.selectGameIndex = index;

      const game = this.games[index];
      const url =
        "https://api.rawg.io/api/games/" +
        game.slug +
        "?key=" +
        this.rawgApiKey;

      axios
        .get(url)
        .then(response => {
          this.currentGame = response.data;
          this.currentGame.my_rating = 1;
          this.currentGame.complete_flag = false;
          this.currentGame.background_image__crop = this.getCropImage(
            this.currentGame.background_image
          );
        })
        .catch(error => (this.error = error));
    },

    addGame: function() {
      let video = this.currentGame.clip
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
        genres: this.currentGame.genres
      };

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
      this.games = null;
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
