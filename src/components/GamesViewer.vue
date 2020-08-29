<template>
	<div class="games">
		<div class="search row justify-content-end">
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<div class="search__box form-group">
					<input class="search__input form-control" v-model="search" placeholder="Найти">
					<i class="search__icon fas fa-search"></i>
				</div>
			</div>
		</div>
		<div class="row" v-if="games">
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 pt-3 pb-3" v-for="(game, index) in filtredGames" v-bind:key="index">
				<router-link :to="{ name: 'Game', params: { slug: game.slug }}">
					<div class="games__item game">
						<div class="game__top">
							<img class="game__img" v-bind:src="game.coverCrop" v-bind:alt="game.slug">
							<div class="game__user-rating">
								{{ game.userRating }}/10
							</div>
						</div>
						<div class="game__bottom">
							<div class="d-flex align-items-start">
								<h4 class="game__title">
									{{ game.name }}
									<i v-if="game.angryFlag" class="far fa-angry game__angry"></i>
									<i v-if="game.completeFlag" class="fas fa-check game__complete pl-2" title="Complete!"></i>
								</h4>
							</div>

							<div class="d-flex justify-content-between mt-2 mb-1">
								<div>
									<span class="mr-2" v-for="(platforms, index) in game.platforms" v-bind:key="index">
										<i v-if="platforms.platform.slug == 'xbox'" class="fab game__platform fa-md fa-xbox"></i>
										<i v-if="platforms.platform.slug == 'playstation'" class="fab game__platform fa-md fa-playstation"></i>
										<i v-if="platforms.platform.slug == 'pc'" class="fab game__platform fa-md fa-windows"></i>
										<i v-if="platforms.platform.slug == 'linux'" class="fab game__platform fa-md fa-linux"></i>
										<i v-if="platforms.platform.slug == 'mac'" class="fab game__platform fa-md fa-apple"></i>
										<i v-if="platforms.platform.slug == 'nintendo'" class="fab game__platform fa-md fa-nintendo-switch"></i>
									</span>
								</div>
								<span class="game__date" v-if="game.releasedDate">
									<i class="far fa-calendar-alt"></i>
									{{ game.releasedDate | moment('L')}}
								</span>
							</div>
							<div class="game__genre mt-3 mr-2"  v-for="(genre, index) in game.genres" v-bind:key="index">
								{{ genre.name }}
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
		<!-- <div v-else>
			<h1>
				<i class="games__empty-icon fas fa-ban"></i> Список пуст
			</h1>
		</div> -->
	</div>
</template>

<script>
import axios from "axios"

export default {
	name: 'GamesViewer',
	data: function () {
		return {
			games: null,
			search: ''
		}
	},
	methods: {
		getGames: function () {
			axios
				.get(process.env.VUE_APP_SERVER_URL + '/games')
				.then(response => ( this.games = response.data ))
		},
	},
	computed: {
		filtredGames: function(){
			return this.games.filter( ( game ) =>{
				return game.name.toLowerCase().match( this.search.toLowerCase() );
			})
		}
	},
	mounted: function () {
		this.getGames();
	}
}
</script>

<style lang="scss">

</style>
