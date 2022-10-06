<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>


  <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="addEventCanvas"
    aria-labelledby="eventCanvasLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="addEventCanvasLabel">Add Event</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <CreateEventForm />
    </div>
  </div>

</template>


<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import CreateEventForm from "./components/CreateEventForm.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account)
    }
  },
  components: { Navbar, CreateEventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
