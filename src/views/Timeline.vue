<template>
  <div class="container-fluid pt-md-5 pt-3">
    <div class="row align-items-center">
      <div class="col">
        <h2>
          Таймлайн
        </h2>
      </div>
    </div>
    <TimelineArea />
  </div>
</template>

<script>
import TimelineArea from "@/components/TimelineArea";

export default {
  name: "Timeline",
  components: {
    TimelineArea
  },
  data: function() {
    return {};
  },
  methods: {},
  mounted: function() {}
};
</script>
