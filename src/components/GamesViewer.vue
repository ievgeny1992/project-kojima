<template>
  <div class="games">
    <div class="row" v-if="games.length !== 0">
      <div
        class="col-xl-3 col-lg-4 col-md-6 col-sm-12 pt-3 pb-3"
        v-for="(game, index) in games"
        v-bind:key="index"
      >
        <router-link :to="{ name: 'Game', params: { slug: game.slug } }">
          <div class="games__item game">
            <div class="game__top">
              <img
                class="game__img"
                v-bind:src="game.coverCrop"
                v-bind:alt="game.slug"
              />
              <div
                class="game__user-rating"
                :class="{
                  'game__user-rating_positive': game.userRating >= 7,
                  'game__user-rating_neutral': game.userRating < 7,
                  'game__user-rating_negative': game.userRating <= 4
                }"
              >
                {{ game.userRating }}
              </div>
            </div>
            <div class="game__bottom">
              <div class="d-flex align-items-start">
                <h4 class="game__title">
                  {{ game.name }}
                  <i v-if="game.angryFlag" class="fal fa-angry game__angry"></i>
                  <i
                    v-if="game.completeFlag"
                    class="far fa-check game__complete pl-2"
                    title="Complete!"
                  ></i>
                </h4>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <EmptyGamesList />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EmptyGamesList from "@/components/EmptyGamesList.vue";

export default {
  name: "GamesViewer",
  components: {
    EmptyGamesList
  },
  data: function() {
    return {
      games: Array
    };
  },
  methods: {
    getGames: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games")
        .then(response => (this.games = response.data));
    }
  },
  computed: {},
  mounted: function() {
    this.getGames();
  }
};
</script>

<style lang="scss" scoped></style>
