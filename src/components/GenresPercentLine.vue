<template>
  <div
    class="genre"
    :style="{ backgroundColor: color, width: getPercent + '%' }"
  ></div>
</template>

<script>
import axios from "axios";

export default {
  name: "GenresPercentLine",
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
      return Math.round((this.genreCount * 100) / this.count);
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
  height: 9px;

  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
</style>
