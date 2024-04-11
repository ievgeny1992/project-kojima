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
          :title="genre._id + ' ' + getPrecent(genre.percent) + '%'"
          @mouseover="$event.target.classList.toggle('genre_active')"
          @mouseleave="$event.target.classList.toggle('genre_active')"
        ></div>
      </div>
    </div>
    <div class="row">
      <div class="genres__tags">
        <div
          class="genre-tag"
          v-for="(genre, index) in genres"
          v-bind:key="index"
        >
          <div
            class="genre-tag__circle"
            :style="{ backgroundColor: colors[index] }"
          ></div>
          <span class="genre-tag__name">
            {{ genre._id }}
          </span>
          <span class="genre-tag__percent">
            {{ getPrecent(genre.percent) }}%
          </span>
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
    colors: Array
  },

  data: function() {
    return {
      hover: false
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
  cursor: pointer;
  height: 11px;
  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &_active {
    &:hover {
      box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 10px;
    }
  }

  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &-tag {
    display: flex;
    align-items: center;
    margin-right: 7px;
    margin-bottom: 7px;
    background-color: #181818;
    border-radius: 8px;
    padding: 0px 10px;
    font-size: 14px;

    &__circle {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      margin-right: 5px;
    }

    &__name {
      padding: 5px 5px;
    }

    &__percent {
      font-weight: 900;
      padding: 5px 0px 5px 3px;
      margin-left: 5px;
      // border-left: 3px solid #292933;
    }
  }
}
</style>
