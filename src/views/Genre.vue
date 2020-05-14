<template>
	<section class="games">
		<div class="container-fluid pt-md-5 pt-3">
			<div class="row align-items-center">
				<div class="col">
					<h2>
						Игры в жанре {{ genre }}
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
	</section>
</template>

<script>
import GamesViewer from '@/components/GamesViewer.vue'
import axios from "axios"

export default {
	name: 'Home',
	components: {
		GamesViewer
    },
    props: {
        genre: null
    },
	data: function () {
		return {
			count: null
		}
	},
	methods: {
		getGenreCount: function () {
			axios
				.get('http://localhost:3000/games/genres-count/' + this.genre)
				.then(response => ( this.genreCount = response.data ))
        }
	},
	mounted: function () {
		this.getGenreCount();
	}
}
</script>
