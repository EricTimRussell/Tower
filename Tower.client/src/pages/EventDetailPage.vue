<template>
  <div class="container-fluid page-bg">
    <div class="row" v-for="e in events">
      <EventDetail :events="e" :key="e.id" />
      <!-- ANCHOR GET EVENT DETAIL TO DRAW TO PAGE -->
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import EventDetail from "../components/EventDetail.vue";
export default {
  setup() {
    return {
      events: computed(() => AppState.events)
    };
  },
  components: { EventDetail }
}
</script>



<style scoped lang="scss">
.page-bg {
  background-image: url(https://th.bing.com/th/id/R.dc8f14684b69cfc0d4b618cffcac86a6?rik=plXUGz%2bQ9h%2fMBQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f38TYCLK.jpg&ehk=D8qmcuStUPeNvjwN%2bDXC91b0YOqhDBg9ZKJ02Vpfe0A%3d&risl=&pid=ImgRaw&r=0);
  min-height: 110vh;
}
</style>