<template>
  <div class="genre">
    <div class="genre__circle" :style="{ backgroundColor: color }"></div>
    {{ genre }} ({{ getPercent }}%)
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GenresPercentTag",
  props: {
    genre: String,
    color: String
  },
  data: function() {
    return {
      count: Number,
      genreCount: Number
    };
  },
  methods: {
    getGenresCount: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games/genres-count")
        .then(response => (this.count = response.data));
    },

    getGenreCount: function() {
      axios
        .get(
          process.env.VUE_APP_SERVER_URL + "/games/genres-count/" + this.genre
        )
        .then(response => (this.genreCount = response.data));
    }
  },
  computed: {
    getPercent: function() {
      return Math.ceil((this.genreCount * 100) / this.count);
    }
  },
  mounted: function() {
    this.getGenresCount();
    this.getGenreCount();
  }
};
</script>

<style lang="scss" scoped>
.genre {
  display: flex;
  align-items: center;
  margin-right: 7px;
  margin-bottom: 7px;
  background-color: #181818;
  border-radius: 8px;
  padding: 3px 10px;
  font-size: 14px;
  &__circle {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
