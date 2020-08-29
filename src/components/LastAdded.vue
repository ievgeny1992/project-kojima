<template>
    <section class="mt-4 mb-5">
        <div class="row align-items-center">
            <div class="col">
                <h3>
                    Последние добавленные
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="last-game col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-md-3 mb-md-3 mt-2 mb-2" v-for="(game, index) in games" v-bind:key="index">
                <router-link :to="{ name: 'Game', params: { slug: game.slug }}" class="last-game__link">
                    <div class="last-game__item">
                        <div class="last-game__border"></div>
                        <div class="last-game__cover mr-3" v-bind:style="{ backgroundImage: 'url(' + game.coverCrop + ')' }"></div>
                        <div class="last-game__content">
                            <h4 class="last-game__title">
                                {{ game.name }}
                            </h4>
                            <div class="last-game__genre mr-1"  v-for="(genre, index) in game.genres" v-bind:key="index">
                                {{ genre.name }}
                            </div>
                            <span class="last-game__date">
                                <i class="far fa-calendar-check"></i>
                                {{ game.addedDate | moment("from", "now") }}
                            </span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios"

export default {
    name: 'LastAdded',
	data: function () {
		return {
			games: null
		}
	},
	methods: {
		getLastAddedGames: function () {
			axios
				.get(process.env.VUE_APP_SERVER_URL + '/games/last')
				.then(response => ( this.games = response.data ))
		}
	},
	mounted: function () {
		this.getLastAddedGames();
	}
}
</script>

<style lang="scss" scoped>
    .last-game {

        &__item {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            background-color: #26272c;
            border-radius: 4px;
            padding: 10px;
            transition: all .3s;
            cursor: pointer;

            @include media-breakpoint-up(md) {
                padding: 15px;
            }

            @include media-breakpoint-up(lg) {
                padding: 20px;
            }

            &:hover {
                box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
            }

            &:hover > .last-game__border{
                width: 6px;
                background-color: $primary-color;
            }
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
            transition: all .6s;
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
            margin-bottom: 0px;
            text-decoration: none;
        }

        &__cover {
            width: 70px;
            height: 70px;
            overflow: hidden;
            background-position: top center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 5px;
            box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.6);
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
            font-size: 11px;
            color: #b8b9be;
        }
    }
</style>