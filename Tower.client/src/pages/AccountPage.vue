<template>
  <div class="container-fluid">
    <div class="row">
      <h2>My Events</h2>
      <div class="col-md-4 p-3" v-for="e in event" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import EventCard from "../components/EventCard.vue";
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.events)

    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
