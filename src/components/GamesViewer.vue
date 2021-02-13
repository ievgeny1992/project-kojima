<template>
	<div class="games">
		<div class="search row justify-content-end">
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<div class="search__box form-group">
					<input class="search__input form-control" v-model="search" placeholder="Найти игру">
					<span class="search__icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(2 2)"><circle cx="9.767" cy="9.767" r="8.989"/><path d="M16.018 16.485L19.542 20"/></g></svg>
					</span>
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
									<i v-if="game.angryFlag" class="fal fa-angry game__angry"></i>
									<i v-if="game.completeFlag" class="far fa-check game__complete pl-2" title="Complete!"></i>
								</h4>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
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

<style lang="scss" scoped>

</style>
