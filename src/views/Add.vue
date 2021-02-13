<template>
    <PageLayout title="Добавить игру">
        <template v-slot:default>
            <GameCreator />
        </template>
    </PageLayout>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'
import GameCreator from '@/components/GameCreator.vue'

export default {
	name: 'Add',
	components: {
        PageLayout,
        GameCreator
	}
}
</script>