<template>
  <div class="d-flex">
    <img :src="account.picture" alt="">
  </div>
  <h6>{{account.name}}</h6>
  <p>{{comment.body}}</p>
</template>


<script>
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService"
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    const route = useRoute()
    async function getCommentsByEvent(id) {
      try {
        await commentsService.getCommentsByEvent(id)
      } catch (error) {
        Pop.error(error, 'getting comments')
      }
    }
    onMounted(() => {
      getCommentsByEvent(route.params.id)
    })
    return {
      account: computed(() => AppState.account),
      comment: computed(() => AppState.comments)
    }
  }
}





</script>


<style lang="scss" scoped>

</style>