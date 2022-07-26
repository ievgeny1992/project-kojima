<template>
  <section class="mt-4 mb-5">
    <div class="row align-items-center">
      <div class="col">
        <h3>
          Последние добавленные
        </h3>
      </div>
    </div>
    <div class="row">
      <GameCard v-for="(game, index) in games" :key="index" :game="game" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";

export default {
  name: "LastAdded",
  components: {
    GameCard
  },
  data: function() {
    return {
      games: Object
    };
  },
  methods: {
    getLastAddedGames: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games/last")
        .then(response => (this.games = response.data));
    }
  },
  mounted: function() {
    this.getLastAddedGames();
  }
};
</script>

<style lang="scss" scoped></style>
