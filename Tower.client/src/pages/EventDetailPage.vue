<template>
  <div class="container-fluid page-bg">
    <div class="row">
      <div class="page-bg">
        <div class="card col-12 d-flex glass">
          <img :src="event.coverImg" class="img-fluid event-img"
            alt="https://th.bing.com/th/id/R.17502cb38ba111f3a64fac3e24fe2def?rik=ZGzhlgoUXnLYjQ&pid=ImgRaw&r=0">
          <h2>{{event.name}}||{{event.date}}</h2>
          <h3>{{event.type}}</h3>
          <h6>{{event.description}}</h6>
          <div class="card-footer">
            <h5>{{event.capacity}}</h5>
            <button @click="getTicket()" class="btn btn-info mdi mdi-human">Attend</button>
          </div>
          <div class="text-success" v-for="a in attendee">
            <h4>{{attendee[0].profile.name}}</h4>
          </div>
        </div>
        <div class="col-12 card">
          <form @submit.prevent="handleSubmit">
            <div>
              <label for="comments"></label>
              <textarea v-model="editable.comment" placeholder="comments" class="form-control" style="height: 100px"
                required minlength="1" maxlength="500"></textarea>
            </div>
            <div class="d-flex justify-content-end p-2">
              <button class="btn btn-secondary">Post</button>
            </div>
          </form>
          <CommentsForm :comment="c" v-for="c in comment" :key="c.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import EventDetail from "../components/EventDetail.vue";
import { AuthService } from "../services/AuthService";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";
import CommentsForm from "../components/CommentsForm.vue";
import { commentsService } from "../services/CommentsService";
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.id)
      } catch (error) {
        Pop.error(error, 'Getting event by Id')
      }
    }
    async function getAttendeesByEventId() {
      try {
        await eventsService.getAttendeesByEventId(route.params.id)
      } catch (error) {
        Pop.error(error, 'Getting Attendees')
      }
    }

    onMounted(() => {
      getEventById(route.params.id);
      getAttendeesByEventId(route.params.id)
    })
    return {
      editable,
      event: computed(() => AppState.activeEvent),
      attendee: computed(() => AppState.tickets),
      comment: computed(() => AppState.comments),
      async handleSubmit() {
        try {
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error, "Submitting Form")
        }
      },
      async cancelEvent() {
        try {
          await eventsService.cancelEvent(route.params.id)
        } catch (error) {
          Pop.error(error, 'cancelling event')
        }
      },
      async getTicket() {
        try {
          if (!AppState.account.id) {
            return AuthService.loginWithRedirect()
          }
          await eventsService.getTicket({
            eventId: AppState.activeEvent.id || route.params.id
          })
          Pop.success('Ticket Purchased')
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { EventDetail, CommentsForm }
}
</script>



<style scoped lang="scss">
.page-bg {
  background-image: url(https://th.bing.com/th/id/R.dc8f14684b69cfc0d4b618cffcac86a6?rik=plXUGz%2bQ9h%2fMBQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f38TYCLK.jpg&ehk=D8qmcuStUPeNvjwN%2bDXC91b0YOqhDBg9ZKJ02Vpfe0A%3d&risl=&pid=ImgRaw&r=0);
  min-height: 110vh;
}

.event-img {
  max-height: 60vh;
  object-fit: cover;
  object-position: center;
}

.glass {
  background: #aed1ff7e;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
}
</style>