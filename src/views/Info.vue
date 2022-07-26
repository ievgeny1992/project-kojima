<template>
  <div class="container-fluid pt-md-5 pt-3">
    <div class="row align-items-center">
      <div class="col">
        <h2>
          Статистика
        </h2>
      </div>
    </div>
    <GamesCounter />
    <LastAdded />
    <GenresCounter />
  </div>
</template>

<script>
import GamesCounter from "@/components/GamesCounter.vue";
import GenresCounter from "@/components/GenresCounter.vue";
import LastAdded from "@/components/LastAdded.vue";

export default {
  name: "Info",
  components: {
    GamesCounter,
    GenresCounter,
    LastAdded
  }
};
</script>
