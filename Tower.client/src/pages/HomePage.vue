<template>
  <div class="container-fluid page-bg">
    <div class="row">
      <div class="col-12 text-shadow">
        <h1>TowerEvents</h1>
      </div>
      <div class="col-12">
        <img src="https://th.bing.com/th/id/R.17502cb38ba111f3a64fac3e24fe2def?rik=ZGzhlgoUXnLYjQ&pid=ImgRaw&r=0"
          alt="arena" class="img-fluid homeimg">
      </div>
      <div class="col-md-12 d-flex justify-content-evenly my-4 bg-secondary elevation-3">
        <button @click="filterCategory('')" class="btn btn-primary fs-3 text-shadow">All</button>
        <button @click="filterCategory('concert')" class="btn btn-primary fs-3 text-shadow">Concert</button>
        <button @click="filterCategory('convention')" class="btn btn-primary fs-3 text-shadow">Convention</button>
        <button @click="filterCategory('sport')" class="btn btn-primary fs-3 text-shadow">Sport</button>
        <button @click="filterCategory('digital')" class="btn btn-primary fs-3 text-shadow">Digital</button>
      </div>
      <div class="row">
        <div class="col-md-4 p-3" v-for="e in events" :key="e.id">
          <EventCard :event="e" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { eventsService } from '../services/EventsService'
import Pop from "../utils/Pop";
import EventCard from "../components/EventCard.vue";
import { AppState } from "../AppState";
import { computed } from "@vue/reactivity";
export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error, "Getting Events");
      }
    }
    onMounted(() => {
      getAllEvents();
    });

    return {
      events: computed(() => AppState.events),
      async filterCategory(type) {
        try {
          await eventsService.getAllEvents(type)
        } catch (error) {
          Pop.error(error, 'Filter Categories')
        }
      }
    };
  },
  components: { EventCard }
}






</script>





<style scoped lang="scss">
.homeimg {
  max-height: 40vh;
  min-width: 100%;
}

.page-bg {
  background-image: url(https://th.bing.com/th/id/R.dc8f14684b69cfc0d4b618cffcac86a6?rik=plXUGz%2bQ9h%2fMBQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f38TYCLK.jpg&ehk=D8qmcuStUPeNvjwN%2bDXC91b0YOqhDBg9ZKJ02Vpfe0A%3d&risl=&pid=ImgRaw&r=0);
}

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}
</style>
