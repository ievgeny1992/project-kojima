<template>
    <PageLayout title="Игры">
        <template v-slot:header>
			<div class="col games__count">
				<h3>
					<i class="fal fa-gamepad" aria-hidden="true"></i> {{ count }}
				</h3>
			</div>
        </template>
        <template v-slot:default>
            <GamesViewer />
        </template>
    </PageLayout>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'
import GamesViewer from '@/components/GamesViewer.vue'
import axios from "axios"

export default {
	name: 'Home',
	components: {
        PageLayout,
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
				.get(process.env.VUE_APP_SERVER_URL + '/games/count')
				.then(response => ( this.count = response.data ))
		}
	},
	mounted: function () {
		this.getGamesCount();
	}
}
</script>
