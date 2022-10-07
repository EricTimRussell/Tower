<template>
  <div class="elevation-3">
    <div class="p-3">
      <img :src="account.picture" class="profimg">
      <h6>{{account.name}}</h6>
    </div>
    <div class="px-5 py-2">
      <h6>{{comment.body}}</h6>
    </div>
    <span class="mdi mdi-delete-forever text-end fs-5 p-2 pointer"></span>
  </div>
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
      account: computed(() => AppState.account)
    }
  }
}





</script>


<style lang="scss" scoped>
.profimg {
  max-height: 7vh;
  border-radius: 50%;
}

.pointer {
  cursor: pointer;
}
</style>