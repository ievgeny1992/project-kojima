<template>
  <section class="mt-4 mb-5">
    <div class="row align-items-center">
      <div class="col">
        <h3>
          Жанры
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <GenresPercentLine :genres="genres" :colors="colors" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GenresPercentLine from "@/components/GenresPercentLine.vue";

export default {
  name: "GenresCounter",
  components: {
    GenresPercentLine
  },
  data: function() {
    return {
      genres: Array,
      colors: [
        "#f78085",
        "#c52a52",
        "#ffdcc6",
        "#dd4c65",
        "#3e67ae",
        "#79a9c9",
        "#618fbf",
        "#5681b9",
        "#b61849",
        "#ffeed3",
        "#93003a",
        "#a60741",
        "#00429d",
        "#4a74b4",
        "#a1d1d7",
        "#85b7ce",
        "#6d9cc4",
        "#ffb8ab",
        "#c3ebde",
        "#e75d6f",
        "#93c4d2",
        "#f06f7a",
        "#305ba9",
        "#ffcab9",
        "#1f4ea3",
        "#ffa59e",
        "#fd9291",
        "#daf7e1",
        "#d23b5b",
        "#b1dfdb"
      ]
    };
  },
  methods: {
    getGenres: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games/genres")
        .then(response => (this.genres = response.data));
    }
  },
  mounted: function() {
    this.getGenres();
  }
};
</script>

<style lang="scss" scoped>
.genres {
  width: 100%;

  &__buttom {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none !important;
    box-shadow: none;
    width: 39px;
    height: 39px;
    background-color: $item-color;
    padding: 9px;
    border-radius: 10px;
    opacity: 0.5;

    & > svg {
      vertical-align: baseline;
    }

    &_active {
      opacity: 1;
    }
  }
}
</style>
