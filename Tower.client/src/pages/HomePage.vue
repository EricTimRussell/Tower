<template>
  <div class="container-fluid page-bg">
    <div class="row justify-content-center mx-3">
      <div class="col-12">
        <img src="https://th.bing.com/th/id/R.17502cb38ba111f3a64fac3e24fe2def?rik=ZGzhlgoUXnLYjQ&pid=ImgRaw&r=0"
          alt="arena" class="img-fluid homeimg">
      </div>
      <div class="col-md-10 my-4">
        <div class=" d-flex justify-content-evenly bg-secondary rounded p-3">
          <button aria-label="Sort All" @click="filterCategory('')" class="btn fs-3 text-shadow">All</button>
          <button aria-label="Sort Concerts" @click="filterCategory('concert')"
            class="btn fs-3 text-shadow">Concert</button>
          <button aria-label="Sort Conventions" @click="filterCategory('convention')"
            class="btn fs-3 text-shadow">Convention</button>
          <button aria-label="Sort Sports" @click="filterCategory('sport')" class="btn fs-3 text-shadow">Sport</button>
          <button aria-label="Sort Digital" @click="filterCategory('digital')"
            class="btn fs-3 text-shadow">Digital</button>
        </div>
      </div>
      <div class="row nopad padL">
        <div class="col-md-4 p-3" v-for="e in events" :key="e.id" title="Event Details">
          <EventCard :events="e" />
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
      },
    };
  },
  components: { EventCard }
}

</script>

<style scoped lang="scss">
.homeimg {
  max-height: 40vh;
  min-width: 99.9%;
  object-fit: cover;
  border: 1px #3be8ff solid;
}

:hover.buttonbg {
  background-color: #b1fcdd;
}

.page-bg {
  background-color: #2A2D3A;
  min-height: 100vh;
}

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}

.nopad {
  padding: 0%;
}

.padL {
  padding-left: 1rem;
}
</style>
