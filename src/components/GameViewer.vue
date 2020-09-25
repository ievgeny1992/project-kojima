<template>
    <div class="game" v-if="game">
		<div class="container">
			<div class="row">
				<div class="col-12 pt-md-5 pt-3 pb-3">
					<div class="game-viewer">
						<div class="game-viewer__top">
							<img class="game-viewer__img" v-bind:src="game.cover" v-bind:alt="game.slug">
							<span class="game-viewer__user-rating">
								{{ game.userRating }}/10
							</span>
						</div>
						<div class="game-viewer__bottom mt-2 mt-md-0">
							<h1 class="game-viewer__title mb-3">
								{{ game.name }}
							</h1>
							<div class="row justify-content-between align-items-center mt-3">
								<div class="col-auto">
									<span class="ml-1 mr-1" v-for="(platforms, index) in game.platforms" v-bind:key="index">
										<i v-if="platforms.platform.slug == 'xbox'" class="fab game-viewer__platform fa-md fa-xbox"></i>
										<i v-if="platforms.platform.slug == 'playstation'" class="fab game-viewer__platform fa-md fa-playstation"></i>
										<i v-if="platforms.platform.slug == 'pc'" class="fab game-viewer__platform fa-md fa-windows"></i>
										<i v-if="platforms.platform.slug == 'linux'" class="fab game-viewer__platform fa-md fa-linux"></i>
										<i v-if="platforms.platform.slug == 'mac'" class="fab game-viewer__platform fa-md fa-apple"></i>
										<i v-if="platforms.platform.slug == 'nintendo'" class="fab game-viewer__platform fa-md fa-nintendo-switch"></i>
									</span>
								</div>
								<div class="col-auto">
									<span class="game-viewer__date">
										<i class="fal fa-calendar-alt mr-1"></i>
										{{ game.releasedDate | moment('L') }}
									</span>
								</div>
							</div>
							<div class="row mt-3">
								<div class="col">
									<div class="game-viewer__genre mr-2"  v-for="(genre, index) in game.genres" v-bind:key="index">
										{{ genre.name }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row" v-if="game.description">
				<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 game-viewer__description" v-html="game.description">

				</div>

				<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12" v-if="game.video">
					<vue-plyr>
						<video>
							<source v-bind:src="game.video" type="video/mp4" />
						</video>
					</vue-plyr>
				</div>

			</div>

			<!-- <div class="game-viewer__action row mt-3">
				<div class="col-sm-12">
					<div class="form-group">
						<button type="button" class="game-viewer__btn game-viewer__edit-btn mr-2" @click="searchGame">
							<i class="fas fa-pen"></i>

						</button>
						<button type="button" class="game-viewer__btn game-viewer__remove-btn" @click="clearData">
							<i class="fas fa-times"></i>
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
				.get(process.env.VUE_APP_SERVER_URL + '/games/game/' + this.$route.params.slug )
				.then(response => ( this.game = response.data ))
		}
    },
	mounted: function () {
		this.getGames();
	}
}
</script>

<style lang="scss" scoped>
	.container {
			width: 100%;

			@include media-breakpoint-up(sm) {
				max-width: 100%;
			}

			@include media-breakpoint-up(md) {
				max-width: 960px;
			}

			@include media-breakpoint-up(lg) {
				max-width: 1100px;
			}
	}
	.game-viewer{
		position: relative;

		&__top {
			position: relative;
			border-radius: 10px;
			overflow: hidden;
		}

		&__bottom {
			position: relative;
			padding: 10px 15px;
			background-color: $item-color;
			border-radius: 10px;

			@include media-breakpoint-up(md) {
				position: absolute;
				bottom: 0px;
				width: 100%;
				padding: 14px 20px;
				backdrop-filter: saturate(280%) blur(5px);
				background-color: rgba(38, 39, 44, 0.8);
				border-top-left-radius: 0px;
				border-top-right-radius: 0px;
			}
		}

		&__img {
			min-width: 100%;
			width: 100%;
		}

		&__title {
			font-size: 20px;

			@include media-breakpoint-up(md) {
				font-size: 23px;
			}

			@include media-breakpoint-up(lg) {
				font-size: 25px;
			}
		}

		&__user-rating {
			position: absolute;
			top: 15px;
			right: 15px;
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
			background-color: rgba(28, 27, 33, 0.5);
			backdrop-filter: saturate(120%) blur(4px);
			box-sizing: border-box;
			box-shadow: 0 16px 38px -12px rgba(0,0,0,.56),
			0 4px 25px 0 rgba(0,0,0,.12),
			0 8px 10px -5px rgba(0,0,0,.2);

			@include media-breakpoint-down(sm) {
				width: 60px;
				height: 60px;
				line-height: 60px;
				font-size: 17px;
			}

			@include media-breakpoint-up(md) {
				width: 70px;
				height: 70px;
				line-height: 70px;
				font-size: 19px;
			}

			@include media-breakpoint-up(lg) {
				width: 85px;
				height: 85px;
				line-height: 85px;
				font-size: 22px;
			}
		}

		&__date {
			display: block;
			font-size: 13px;
			font-weight: 700;

			@include media-breakpoint-up(md) {
				font-size: 16px;
			}
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
			padding: 4px 9px;
			background-color: #181818;
			border-radius: 8px;
			font-size: 12px;

			@include media-breakpoint-up(md) {
				font-size: 15px;
				padding: 4px 14px;
			}
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

		&__action {

		}

		&__btn {
			width: 45px;
			height: 45px;
			cursor: pointer;
			background-color: transparent;
			border: 2px #e9eaec solid;
			border-radius: 50%;
			transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, -webkit-box-shadow 0.3s ease-in-out;

			&:focus {
				outline: none;
			}
		}

		&__edit-btn {
			color: #44a184;

			&:hover {
				background-color: #e2fffa;
				border: 2px #e2fffa solid;
			}
		}

		&__remove-btn {
			color: #c94052;

			&:hover {
				background-color: #fdf4f5;
				border: 2px #fdf4f5 solid;
			}
		}
	}
</style>