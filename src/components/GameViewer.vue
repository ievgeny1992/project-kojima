<template>
    <div class="game" v-if="game">
		<div class="container-fluid pt-md-5 pt-3">
			<div class="row">
				<div class="col-xl-5 col-lg-7 col-md-12 col-sm-12">
					<img class="game__img" v-bind:src="game.cover" v-bind:alt="game.slug">
					<span class="game__user-rating">
						{{ game.userRating }}/10
					</span>
				</div>
				<div class="col">
					<h1 class="mt-3 mb-3 mt-lg-0">
						{{ game.name }}
					</h1>
					<div class="game__genre mr-2"  v-for="(genre, index) in game.genres" v-bind:key="index">
						{{ genre.name }}
					</div>
					<div class="mt-3">
						<span class="mr-2" v-for="(platforms, index) in game.platforms" v-bind:key="index">
							<i v-if="platforms.platform.slug == 'xbox'" class="fab game__platform fa-md fa-xbox"></i>
							<i v-if="platforms.platform.slug == 'playstation'" class="fab game__platform fa-md fa-playstation"></i>
							<i v-if="platforms.platform.slug == 'pc'" class="fab game__platform fa-md fa-windows"></i>
							<i v-if="platforms.platform.slug == 'linux'" class="fab game__platform fa-md fa-linux"></i>
							<i v-if="platforms.platform.slug == 'mac'" class="fab game__platform fa-md fa-apple"></i>
							<i v-if="platforms.platform.slug == 'nintendo'" class="fab game__platform fa-md fa-nintendo-switch"></i>
						</span>
					</div>
					<span class="game__date mt-3">
						<i class="far fa-calendar-alt mr-1"></i>
						{{ game.releasedDate | moment('L') }}
					</span>
					<span class="game__date mt-1">
						<i class="far fa-calendar-check mr-1"></i>
						{{ game.addedDate | moment("from", "now") }}
					</span>
				</div>
			</div>
			<div class="row mt-3" v-if="game.description">
				<div class="col-sm-12">
					<h2 class="game-info__title">
						Об игре
					</h2>
				</div>
				<div class="col game__description" v-html="game.description">

				</div>
			</div>
			<div class="row mt-3" v-if="game.video">
				<div class="col-sm-12">
					<h2 class="game-info__title">
						Видео
					</h2>
				</div>
				<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-2 mb-4">
					<vue-plyr>
						<video>
							<source v-bind:src="game.video" type="video/mp4" />
						</video>
					</vue-plyr>
				</div>
			</div>
			<!-- <div class="row mt-3">
				<div class="col-sm-12">
					<div class="form-group">
						<button type="button" class="btn btn-outline-primary mr-2" @click="searchGame">
							<i class="far fa-edit"></i>
							Редактировать
						</button>
						<button type="button" class="btn btn-outline-danger" @click="clearData">
							<i class="far fa-trash-alt"></i>
							Удалить
						</button>
					</div>
				</div>
			</div> -->
		</div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'GameViewer',
	data: function () {
		return {
			game: null
		}
	},
	methods: {
		getGames: function () {
			axios
				.get( 'http://192.168.1.229:3000/games/game/' + this.$route.params.slug )
				.then(response => ( this.game = response.data ))
		}
    },
	mounted: function () {
		this.getGames();
	}
}
</script>

<style lang="scss" scoped>
	.game{
		&__img {
			min-width: 100%;
			width: 100%;
			border-radius: 14px;
		}

		&__user-rating {
			position: absolute;
			top: 15px;
			right: 33px;
			width: 60px;
			height: 60px;
			line-height: 60px;
			text-align: center;
			font-size: 17px;
			box-sizing: border-box;
			font-weight: 700;
			text-align: center;
			color: $text;
			border: 2px solid;
			border-radius: 12px;
			border: none;
			background-color: rgba(28, 27, 33, 0.7);
			box-sizing: border-box;
			box-shadow: 0 16px 38px -12px rgba(0,0,0,.56),
			0 4px 25px 0 rgba(0,0,0,.12),
			0 8px 10px -5px rgba(0,0,0,.2);
		}

		&__date {
			display: block;
			font-size: 16px;
			font-weight: 700;
		}

		&__description {
			font-size: 16px;

			@include media-breakpoint-up(md) {
				font-size: 16px;
			}

			@include media-breakpoint-up(lg) {
				font-size: 16px;
			}

			@include media-breakpoint-up(xl) {
				font-size: 17px;
			}
		}

		&__genre {
			display: inline-block;
			font-weight: 700;
			padding: 4px 14px;
			background-color: #26272c;
			border-radius: 8px;
		}

		&-info {
			&__title {
				font-size: 21px;
				&:before {
					content: '|';
					color: #009cff;
				}
			}
		}
	}
</style>