<template>
    <section>
        <div class="container-fluid pt-md-5 pt-3 pb-3">
            <div class="row">
                <div class="col">
                    <h2>
                        Добавить игру
                    </h2>
                </div>
            </div>

			<GameCreator />

        </div>
    </section>
</template>

<script>
import GameCreator from '@/components/GameCreator.vue'

export default {
	name: 'Add',
	components: {
		GameCreator
	}
}
</script>