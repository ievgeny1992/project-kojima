<template>
  <PageLayout title="Информация">
    <template v-slot:default>
      <GamesCounter />
      <LastAdded />
      <GenresCounter />
    </template>
  </PageLayout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue";
import GamesCounter from "@/components/GamesCounter.vue";
import GenresCounter from "@/components/GenresCounter.vue";
import LastAdded from "@/components/LastAdded.vue";

export default {
  name: "Info",
  components: {
    PageLayout,
    GamesCounter,
    GenresCounter,
    LastAdded
  }
};
</script>
