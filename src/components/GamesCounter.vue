<template>
    <section class="mt-4 mb-5">
        <div class="row">
            <div class="col-auto">
                <div class="row align-items-center">
                    <div class="col">
                        <h3>
                            Всего
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-3">
                        <div class="games-counter">
                            <span class="games-counter__digit">{{ countAllGames }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="row align-items-center">
                    <div class="col">
                        <h3>
                            Пройдено
                        </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col mt-3">
                        <div class="games-counter games-counter_complete">
                            <span class="games-counter__digit">{{ countCompleteGames }}</span>
                        </div>
                    </div>
                </div>
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
			countAllGames: null,
			countCompleteGames: null
		}
	},
	methods: {
		getGamesCount: function () {
			axios
				.get(process.env.VUE_APP_SERVER_URL + '/games/count')
				.then(response => ( this.countAllGames = response.data ))
        },

		getCompleteCount: function () {
			axios
				.get(process.env.VUE_APP_SERVER_URL + '/games/complete-games')
				.then(response => ( this.countCompleteGames = response.data ))
		}
	},
	mounted: function () {
		this.getGamesCount();
		this.getCompleteCount();
	}
}
</script>

<style lang="scss" scoped>
    .games-counter {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 110px;
        height: 110px;
        text-align: center;
        background-color: $item-color;
        border-radius: 10px;

        &_complete {
            border: 4px solid #4c8c33;
        }

        &__digit {
            font-size: 38px;
            font-weight: 900;
        }
    }
</style>