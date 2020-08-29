<template>
    <section class="mt-4 mb-5">
        <div class="row align-items-center">
            <div class="col">
                <h3>
                    Жанры
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-md-3 mb-md-3 mt-2 mb-2" v-for="(genre, index) in genres" v-bind:key="index">
                <GenresPercent :genre="genre" />
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios"
import GenresPercent from '@/components/GenresPercent.vue'

export default {
    name: 'GenresCounter',
	components: {
		GenresPercent
	},
	data: function () {
		return {
            genres: null
		}
	},
	methods: {
		getGenres: function () {
			axios
				.get(process.env.VUE_APP_SERVER_URL + '/games/genres')
				.then(response => ( this.genres = response.data ))
		}
	},
	mounted: function () {
		this.getGenres();
	}
}
</script>

<style lang="scss" scoped>

</style>