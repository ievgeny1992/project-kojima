<template>
  <div class="row">
    <div
      class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 mt-md-3 mb-md-3 mt-2 mb-2"
      v-for="(genre, index) in genres"
      v-bind:key="index"
    >
      <div class="genre__item">
        <div class="row justify-content-between">
          <div class="col-auto">
            <span class="genre__title">
              <i class="far fa-bookmark"></i> {{ genre._id }}
            </span>
          </div>
          <div class="col">
            <div class="genre__percent">{{ getPrecent(genre.percent) }}%</div>
          </div>
        </div>
        <div class="genre__progress-bar mt-3 mb-3">
          <div
            class="genre__progress-bar_load"
            v-bind:style="{ width: getPrecent(genre.percent) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenresPercentItems",
  props: {
    genres: Array
  },
  methods: {
    getPrecent: function(count) {
      return Math.ceil(count);
    }
  },

  mounted: function() {}
};
</script>

<style lang="scss" scoped>
.genre {
  overflow: hidden;

  &__item {
    background-color: $item-color;
    border-left: 10px solid #2a2b30;
    border-radius: 4px;
    padding: 10px;
    transition: all 0.3s;
    cursor: pointer;

    @include media-breakpoint-up(md) {
      padding: 20px;
    }

    &:hover {
      box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
      border-left: 15px solid #2a2b30;
    }
  }

  &__title {
    font-size: 16px;
  }

  &__percent {
    font-weight: 900;
    text-align: right;
  }

  &__progress-bar {
    background-color: #6b7282;
    border-radius: 10px;

    &_load {
      width: 0px;
      transition: all 2s;
      background-color: $primary-color;
      border-radius: 10px;
      height: 6px;
    }
  }
}

.fa-bookmark {
  color: $primary-color;
  padding-right: 5px;
}
</style>
