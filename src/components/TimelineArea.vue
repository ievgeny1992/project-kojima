<template>
  <section class="mt-4 mb-5">
    <div class="row">
      <div class="col-12">
        <div class="timeline">
          <div
            class="timeline-area"
            v-for="(year, index) in games"
            :key="index"
          >
            <div class="row">
              <div class="col-12 col-md-4 col-lg-3">
                <div class="timeline-year__pin"></div>
                <div class="timeline-year">{{ year._id }}</div>
              </div>
            </div>

            <div
              class="row timeline-content"
              v-for="(item, index) in year.items"
              :key="index"
            >
              <div class="timeline-pin"></div>
              <div class="col-12">
                <span class="timeline-date">
                  <i class="fal fa-calendar-alt"></i>
                  {{
                    (item._id.month + "." + item._id.day) | moment("DD.MM")
                  }}</span
                >
              </div>
              <GameCard
                v-for="(game, index) in item.games"
                :key="index"
                :game="game"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";

export default {
  name: "TimelineArea",
  components: {
    GameCard
  },
  data: function() {
    return {
      games: Object
    };
  },
  methods: {
    getTimelineItems: function() {
      axios
        .get(process.env.VUE_APP_SERVER_URL + "/games/timeline")
        .then(response => (this.games = response.data));
    }
  },
  computed: {},
  mounted: function() {
    this.getTimelineItems();
  }
};
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;

  &-area {
    position: relative;
    z-index: 1;
    padding-left: 20px;
    @include media-breakpoint-up(md) {
      padding-left: 60px;
    }
  }

  &-year {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0px;
    padding: 25px 5px 25px 25px;

    @include media-breakpoint-up(md) {
      font-size: 30px;
    }

    &__pin {
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 35px;

      &::before {
        position: absolute;
        width: 25px;
        height: 25px;
        border: 4px solid #212129;
        border-radius: 50%;
        background-color: #fe1453;
        content: "";
        right: 19.5px;
        z-index: 5;
      }

      &::after {
        position: absolute;
        width: 4px;
        height: 100%;
        content: "";
        background-color: #292933;
        top: 0;
        right: 30px;
        z-index: 1;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
    }
  }

  &-pin {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 35px;

    &::before {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 3px solid #212129;
      border-radius: 50%;
      background-color: #fe1453;
      content: "";
      top: 31px;
      right: 24px;
      z-index: 5;
    }

    &::after {
      position: absolute;
      width: 4px;
      height: 100%;
      content: "";
      background-color: #292933;
      top: 0;
      right: 30px;
      z-index: 1;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  &-date {
    font-size: 14px;
    font-weight: 700;
    background-color: #292933;
    border-radius: 4px;
    padding: 5px 18px;

    @include media-breakpoint-up(md) {
      font-size: 17px;
    }
  }

  &-content {
    position: relative;
    padding: 25px 5px 25px 25px;
  }
}
</style>
