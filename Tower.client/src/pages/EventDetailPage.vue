<template>
  <div class="container-fluid page-bg">
    <div class="row mx-5">
      <div class="page-bg">
        <div class="card col-12 d-flex glass text-shadow">
          <img :src="event.coverImg" class="img-fluid event-img py-3"
            alt="https://th.bing.com/th/id/R.17502cb38ba111f3a64fac3e24fe2def?rik=ZGzhlgoUXnLYjQ&pid=ImgRaw&r=0">
          <div class="text-center">
            <h2>{{ event.name }} || {{ new Date(event.startDate).toLocaleDateString('en-us', {
                month:
                  'short', day:
                  '2-digit'
              })
            }}
            </h2>
          </div>
          <div class="text-center">
            <h3>{{ event.type }}</h3>
          </div>
          <div class="px-3">
            <h6>{{ event.description }}</h6>
          </div>
          <div class="card-footer">
            <h5 class="text-end">{{ event.capacity }} Spots Left</h5>
            <h1 v-if="event.isCancelled == true" class="text-danger">CANCELLED</h1>
            <div v-if="event.capacity > 0" class="d-flex justify-content-between my-3">
              <button aria-label="Buy Ticket" @click="getTicket()" :disabled="event.isCancelled || isAttending"
                class="btn buttonbg mdi mdi-human text-shadow">Attend</button>
              <button aria-label="Delete Ticket" @click="deleteTicket()" v-if="isAttending"
                class="btn btn-danger">CancelTicket</button>
              <button aria-label="Cancel Event" @click="cancelEvent()" :disabled="event.isCancelled"
                class="btn btn-danger mx-3" v-if="event.creatorId == account.id">Cancel
                Event</button>
            </div>
            <div v-else>
              <h1>Event is Sold Out</h1>
            </div>
          </div>
          <h4 class="px-3">Who's Coming?</h4>
          <div class="row">
            <div class="col-12 d-flex">
              <div class="text-shadow m-1" v-for="a in attendee">
                <img :src="a.profile?.picture" :title="a.profile?.name" class="prof-img">
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 card glass my-3" v-if="account.id">
          <form @submit.prevent="handleSubmit">
            <div class="p-3">
              <label for="body"></label>
              <textarea v-model="editable.body" placeholder="comments" class="form-control" style="height: 100px"
                required minlength="1" maxlength="500" :disabled="event.isCancelled"></textarea>
            </div>
            <div class="d-flex justify-content-end p-2">
              <button class="btn btn-secondary">Post</button>
            </div>
          </form>
          <CommentsCard :comment="c" v-for="c in comment" :key="c.id" />
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
import { commentsService } from "../services/CommentsService";
import CommentsCard from "../components/CommentsCard.vue";
export default {
  setup() {
    const editable = ref({ eventId: '' })
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

    async function getCommentsByEvent() {
      try {
        await commentsService.getCommentsByEvent(route.params.id)
      } catch (error) {
        Pop.error(error)
      }
    }

    onMounted(() => {
      getEventById()
      getAttendeesByEventId()
      getCommentsByEvent()
    })
    return {
      editable,
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      attendee: computed(() => AppState.tickets),
      comment: computed(() => AppState.comments),
      events: computed(() => AppState.events),
      isAttending: computed(() => AppState.tickets.find(a => a.accountId == AppState.account.id)),

      async handleSubmit() {
        try {
          editable.value.eventId = route.params.id
          await commentsService.createComment(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error, "Submitting Form")
        }
      },
      async cancelEvent() {
        try {
          await eventsService.cancelEvent(route.params.id)
          Pop.success('Event Cancelled')
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
      },
      async deleteTicket() {
        try {
          const yes = await Pop.confirm('Delete Ticket?')
          if (!yes) { return }
          const attendee = AppState.tickets.find(a => a.accountId == AppState.account.id && a.eventId == AppState.activeEvent.id)
          await eventsService.deleteTicket(attendee.id)
          Pop.success('Ticket Deleted')
        } catch (error) {
          Pop.error(error, 'Deleting Ticket')
        }
      }
    };
  },
  components: { EventDetail, CommentsCard }
}
</script>



<style scoped lang="scss">
.prof-img {
  max-height: 5vh;
  border-radius: 50%;
}

.page-bg {
  background-color: #2A2D3A;
  min-height: 110vh;
}

.event-img {
  max-height: 60vh;
  object-fit: cover;
  object-position: center;
}

.glass {
  background: #99c5fd9a;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.8px);
  -webkit-backdrop-filter: blur(4.8px);
}

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}

.buttonbg {
  background-color: #1e0c97;
}

:hover.buttonbg {
  background-color: #00ffaab9;
}

.nopad {
  padding: 0%;
}
</style>