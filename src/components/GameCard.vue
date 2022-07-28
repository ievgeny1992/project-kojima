<template>
  <div
    class="game-card col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-md-3 mb-md-3 mt-2 mb-2"
  >
    <router-link
      :to="{ name: 'Game', params: { slug: game.slug } }"
      class="game-card__link"
    >
      <div class="game-card__item">
        <img
          :src="game.coverCrop"
          class="game-card__cover-img"
          :alt="game.slug"
        />
        <div class="game-card__overlay"></div>
        <div class="game-card__content">
          <h4 class="game-card__title">
            {{ game.name }}
          </h4>
          <span class="game-card__date">
            <i class="fal fa-calendar-check"></i>
            {{ game.addedDate | moment("from", "now") }}
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.game-card {
  &__item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: $item-color;
    border-radius: 7px;
    padding: 25px 18px;
    transition: all 0.3s;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
    }

    &:hover > .game-card__border {
      width: 4px;
      background-color: $primary-color;
    }

    &:hover .game-card__cover-img {
      transform: scale($scale);
    }
  }

  &__content {
    position: relative;
  }

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    background: rgba(41, 41, 51, 0.5);
  }

  &__border {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 4px;
    background-color: #2a2b30;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    transition: all 0.3s;
  }

  &__link {
    color: $text;
    text-decoration: none;

    &:hover {
      color: $text;
      text-decoration: none;
    }
  }

  &__title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-weight: 700;
    margin-bottom: 0px;
    text-decoration: none;
  }

  &__cover-img {
    position: absolute;
    left: 0px;
    width: 100%;
    transition: all 0.25s ease;
  }

  &__genre {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 5px;
    background-color: #1c1b21;
    border-radius: 4px;
    margin-right: 3px;
  }

  &__date {
    padding-top: 5px;
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #b8b9be;
  }
}
</style>
