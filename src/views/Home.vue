<template>
	<div class="container-fluid pt-md-5 pt-3">
		<div class="row align-items-center">
			<div class="col">
				<h2>
					Игры
				</h2>
			</div>
			<div class="col games__count">
				<h3>
					<i class="fa fa-gamepad" aria-hidden="true"></i> {{ count }}
				</h3>
			</div>
		</div>

		<GamesViewer />

	</div>
</template>

<script>
import GamesViewer from '@/components/GamesViewer.vue'
import axios from "axios"

export default {
	name: 'Home',
	components: {
		GamesViewer
	},
	data: function () {
		return {
			count: null
		}
	},
	methods: {
		getGamesCount: function () {
			axios
				.get('http://192.168.1.229:3000/games/count')
				.then(response => ( this.count = response.data ))
		}
	},
	mounted: function () {
		this.getGamesCount();
	}
}
</script>
