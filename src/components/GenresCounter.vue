<template>
  <section class="mt-4 mb-5">
    <div class="row align-items-center">
      <div class="col">
        <h3>
          Жанры
        </h3>
      </div>
      <div class="col text-right">
        <button
          class="genres__buttom mr-2"
          @click="setCurrentType('items')"
          v-bind:class="[{ genres__buttom_active: currentType === 'items' }]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              stroke="#fdfcff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M16.285 2h3.267A2.46 2.46 0 0122 4.47v3.294c0 1.363-1.096 2.47-2.448 2.47h-3.267a2.46 2.46 0 01-2.448-2.47V4.47A2.46 2.46 0 0116.285 2zM4.449 2h3.265a2.46 2.46 0 012.45 2.47v3.294a2.46 2.46 0 01-2.45 2.47H4.45A2.46 2.46 0 012 7.764V4.47A2.46 2.46 0 014.449 2zM4.449 13.766h3.265a2.46 2.46 0 012.45 2.47v3.294A2.46 2.46 0 017.713 22H4.45A2.46 2.46 0 012 19.53v-3.293a2.46 2.46 0 012.449-2.471zM16.285 13.766h3.267c1.352 0 2.448 1.106 2.448 2.47v3.294A2.46 2.46 0 0119.552 22h-3.267a2.46 2.46 0 01-2.448-2.47v-3.293a2.46 2.46 0 012.448-2.471z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          class="genres__buttom"
          @click="setCurrentType('line')"
          v-bind:class="[{ genres__buttom_active: currentType === 'line' }]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              stroke="#fdfcff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M21.524 9.753a8.311 8.311 0 00-7.963-6.975.714.714 0 00-.742.687v.064l.449 6.709c.03.452.417.795.87.769l6.727-.449a.714.714 0 00.659-.769v-.036z"
              clip-rule="evenodd"
            />
            <path
              stroke="#fdfcff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M8.902 6.769a.915.915 0 011.043.522.824.824 0 01.082.302c.092 1.3.284 4.146.394 5.684a1.043 1.043 0 001.117.97v0l5.647-.348a.916.916 0 01.97.916v0A7.698 7.698 0 013.73 18.009a7.323 7.323 0 01-.915-2.8 4.725 4.725 0 01-.055-.916 7.707 7.707 0 016.132-7.524"
            />
          </svg>
        </button>
      </div>
    </div>
    <transition name="fade">
      <div class="row" v-if="currentType == 'items'">
        <div
          class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 mt-md-3 mb-md-3 mt-2 mb-2"
          v-for="(genre, index) in genres"
          v-bind:key="index"
        >
          <GenresPercentItems :genre="genre" />
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div class="row" v-if="currentType == 'line'">
        <div class="col-12">
          <div class="genres col mt-md-3 mb-md-3 mt-2 mb-2">
            <div class="row">
              <div class="genres__lines">
                <GenresPercentLine
                  :color="colors[index]"
                  :genre="genre"
                  v-for="(genre, index) in genres"
                  v-bind:key="index"
                />
              </div>
            </div>
            <div class="row">
              <div class="genres__tags">
                <GenresPercentTag
                  :color="colors[index]"
                  :genre="genre"
                  v-for="(genre, index) in genres"
                  v-bind:key="index"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import VueCookies from "vue-cookies";
import axios from "axios";
import GenresPercentItems from "@/components/GenresPercentItems.vue";
import GenresPercentLine from "@/components/GenresPercentLine.vue";
import GenresPercentTag from "@/components/GenresPercentTag.vue";

export default {
  name: "GenresCounter",
  components: {
    GenresPercentItems,
    GenresPercentLine,
    GenresPercentTag
  },
  data: function() {
    return {
      genres: Array,
      currentType: VueCookies.get("type") ? VueCookies.get("type") : "items",
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
    },

    setCurrentType: function(type) {
      this.currentType = type;
      VueCookies.set("type", type);
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
  background-color: #292933;
  border-radius: 4px;

  &__lines {
    display: flex;
    flex: 0 0 100%;
    max-width: 100%;
    padding: 45px 20px 35px 20px;
  }

  &__tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0px 20px 20px 20px;
  }
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

    &_active {
      opacity: 1;
    }
  }
}
</style>
