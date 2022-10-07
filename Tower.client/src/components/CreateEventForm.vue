<template>
  <form @submit.prevent="handleSubmit">

    <div>
      <label for="EventType">What Kind of Event?</label>
      <select name="EventType" v-model="editable.type">
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sports</option>
        <option value="digital">Digital</option>
      </select>
    </div>

    <!-- TODO ADD ARIA LABELS -->
    <div>
      <div class="form-group">
        <label for="name">Event Name</label>
        <input type="text" v-model="editable.name" placeholder="name" required class="form-control">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="editable.description" placeholder="description" class="form-control" style="height: 100px"
          required minlength="1" maxlength="500"></textarea>
      </div>
      <div class="form-group">
        <label for="coverImg">Event Image</label>
        <input type="url" v-model="editable.coverImg"
          placeholder="https://th.bing.com/th/id/R.17502cb38ba111f3a64fac3e24fe2def?rik=ZGzhlgoUXnLYjQ&pid=ImgRaw&r=0"
          class="form-control">
      </div>
      <div class="form-group">
        <label for="location">Event Location?</label>
        <input type="string" v-model="editable.location" placeholder="Location" required class="form-control"
          minlength="1" maxlength="100">
      </div>
      <div class="form-group">
        <label for="capacity">Event Capacity</label>
        <input type="number" v-model="editable.capacity" placeholder="Capacity" required class="form-control"
          minlength="1" maxlength="10">
      </div>
      <div class="form-group">
        <label for="startDate">Event Start Date</label>
        <input type="date" v-model="editable.startDate" placeholder="StartDate" required class="form-control"
          minlength="1" maxlength="25">
      </div>
    </div>

    <div class="my-3  cursor">
      <button class="btn btn-secondary" type="submit">Post Event</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { eventsService } from "../services/EventsService";
import Pop from "../utils/Pop";

export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          debugger
          await eventsService.createEvent(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error, "Submitting Form")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.cursor {
  cursor: pointer;
}
</style>