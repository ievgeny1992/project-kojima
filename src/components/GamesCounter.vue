<template>
    <section class="mt-4 mb-5">
        <div class="row align-items-center">
            <div class="col">
                <h3>
                    Количество
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col mt-3">
                <div class="games__count">{{ count }}</div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from "axios"

export default {
    name: 'GamesCounter',
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

<style lang="scss" scoped>
    .games {
        &__count {
            width: 110px;
            height: 110px;
            line-height: 110px;
            text-align: center;
            font-size: 38px;
            font-weight: 900;
            background-color: #26272c;
            border-radius: 10px;
        }
    }
</style>