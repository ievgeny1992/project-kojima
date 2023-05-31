<template>
  <div class="genres col mt-md-3 mb-md-3 mt-2 mb-2">
    <div class="row">
      <div class="genres__lines">
        <div
          class="genre"
          v-for="(genre, index) in genres"
          v-bind:key="index"
          :style="{
            backgroundColor: colors[index],
            width: getPrecent(genre.percent) + '%'
          }"
        ></div>
      </div>
    </div>
    <div class="row">
      <div class="genres__tags">
        <div
          class="genre__tag"
          v-for="(genre, index) in genres"
          v-bind:key="index"
        >
          <div
            class="genre__circle"
            :style="{ backgroundColor: colors[index] }"
          ></div>
          {{ genre._id }} ({{ getPrecent(genre.percent) }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenresPercentLine",
  props: {
    genres: Array,
    color: String
  },
  data: function() {
    return {
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
    getPrecent: function(percent) {
      return Math.ceil(percent);
    }
  }
};
</script>

<style lang="scss" scoped>
.genres {
  width: 100%;
  background-color: #292933;
  border-radius: 4px;

  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0px 20px 20px 20px;
  }

  &__lines {
    display: flex;
    flex: 0 0 100%;
    max-width: 100%;
    padding: 45px 20px 35px 20px;
  }
}
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

  &__tag {
    display: flex;
    align-items: center;
    margin-right: 7px;
    margin-bottom: 7px;
    background-color: #181818;
    border-radius: 8px;
    padding: 3px 10px;
    font-size: 14px;
  }

  &__circle {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
