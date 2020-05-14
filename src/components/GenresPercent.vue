<template>
    <!-- <router-link :to="{ name: 'Genre', params: { genre: genre }}" :genre="genre"> -->
        <div class="genre__item">
            <span class="genre__title">
                <i class="far fa-bookmark"></i> {{ genre }}
            </span>
            <div class="genre__percent">
                {{ getPercent }}%
            </div>
            <div class="genre__progress-bar mt-3 mb-3">
                <div class="genre__progress-bar_load" v-bind:style="{ width: getPercent + '%' }"></div>
            </div>
        </div>
    <!-- </router-link> -->
</template>

<script>
import axios from "axios"

export default {
    name: 'GenresPercent',
    props: {
        genre: null
    },
	data: function () {
		return {
            count: null,
            genreCount: null
		}
	},
	methods: {
		getGenresCount: function () {
			axios
				.get('http://192.168.1.229:3000/games/genres-count')
				.then(response => ( this.count = response.data ))
        },

		getGenreCount: function () {
			axios
				.get('http://192.168.1.229:3000/games/genres-count/' + this.genre)
				.then(response => ( this.genreCount = response.data ))
        }
    },
    computed: {
        getPercent: function () {
            return Math.round( this.genreCount * 100 / this.count );
        }
    },
	mounted: function () {
        this.getGenresCount();
        this.getGenreCount();
	}
}
</script>

<style lang="scss" scoped>
    .genre {
        overflow: hidden;

        &__item {
            background-color: #26272c;
            border-left: 10px solid #2a2b30;
            border-radius: 4px;
            padding: 10px;
            transition: all .3s;
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

            @include media-breakpoint-up(md) {
                font-size: 17px;
            }

            @include media-breakpoint-up(lg) {
                font-size: 18px;
            }
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