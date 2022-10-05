<template>

</template>

<script>
import { eventsService } from '../services/EventsService'
import Pop from "../utils/Pop";
export default {
  setup() {

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error, 'Getting Events')
      }
    }





    return {}
  }
}
</script>

<style scoped lang="scss">

</style>
