<template>
  <div class="genres col mt-md-3 mb-md-3 mt-2 mb-2">
    <div class="row">
      <div class="genres__lines">
        <div
          class="genre"
          v-for="(genre, index) in genres"
          v-bind:key="index"
          :style="{
            width: getPrecent(genre.percent) + '%'
          }"
        >
          <div class="genre-text" v-if="genre.percent > 10">
            <span class="genre-text__percent">
              {{ getPrecent(genre.percent) }}%
            </span>
            <span class="genre-text__name">
              {{ genre._id }}
            </span>
          </div>
          <div
            class="genre__area"
            :style="{
              backgroundColor: colors[index]
            }"
            :title="genre._id + ' ' + getPrecent(genre.percent) + '%'"
            @mouseover="$event.target.classList.toggle('genre_active')"
            @mouseleave="$event.target.classList.toggle('genre_active')"
          ></div>
        </div>
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

  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 0 0 100%;
    max-width: 100%;
  }

  &__lines {
    display: flex;
    flex: 0 0 100%;
    max-width: 100%;
  }
}
.genre {
  display: flex;
  min-width: 5px;
  flex-direction: column;
  justify-content: end;
  padding-top: 40px;
  padding-bottom: 30px;
  margin-left: 4px;
  margin-right: 4px;

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    margin-right: 0px;
  }

  &-text {
    display: flex;
    align-items: flex-end;
    font-size: 14px;

    &__name {
      display: none;
      padding: 5px 5px;
      @include media-breakpoint-up(md) {
        display: block;
      }
    }

    &__percent {
      font-weight: 900;
      padding: 5px 0px 5px 1px;
    }
  }

  &__area {
    cursor: pointer;
    box-sizing: border-box;
    max-width: 100%;
    height: 50px;
    border-radius: 7px;
  }

  &_active {
    &:hover {
      box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 10px;
    }
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
