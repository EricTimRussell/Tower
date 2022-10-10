<template>
  <div class="container-fluid page-bg text-shadow" v-if="account?.id">
    <div class="row">
      <h2>My Upcoming Events</h2>
      <div class="col-md-4 p-3" v-for="e in events" title="Event Details">
        <EventCard :events="e.event" :key="e.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, } from 'vue'
import { AppState } from '../AppState'
import EventCard from "../components/EventCard.vue";
import { accountService } from "../services/AccountService";
import Pop from "../utils/Pop";
export default {
  setup() {
    onMounted(() => {
      accountService.getMyTickets()
    })
    return {
      // TODO DELETE TICKETS ONCE I GET TICKETS TO POPULATE
      account: computed(() => AppState.account),
      events: computed(() => AppState.events),
      attendee: computed(() => AppState.attendee),

      async getMyTickets() {
        try {
          await accountService.getMyTickets()
        } catch (error) {
          Pop.error(error, 'getting my events')
        }
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.page-bg {
  background-image: url(https://th.bing.com/th/id/R.dc8f14684b69cfc0d4b618cffcac86a6?rik=plXUGz%2bQ9h%2fMBQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f38TYCLK.jpg&ehk=D8qmcuStUPeNvjwN%2bDXC91b0YOqhDBg9ZKJ02Vpfe0A%3d&risl=&pid=ImgRaw&r=0);
  min-height: 110vh;
}

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}
</style>
