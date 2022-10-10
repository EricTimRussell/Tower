<template>
  <div class="elevation-1 text-shadow">
    <div class="p-3">
      <img :src="comment.creator.picture" class="profimg">
      <h6>{{comment.creator.name}}</h6>
    </div>
    <div class="px-5 py-2">
      <h6>{{comment.body}}</h6>
    </div>
    <span @click="deleteComment()" title="Delete Comment?" aria-label="Delete Comment?"
      class=" delete mdi mdi-delete-forever text-end fs-5 p-2 pointer"></span>
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
      account: computed(() => AppState.account),
      // TODO need function that deletes comment....make sure to pass the id for the comment
      async deleteComment() {
        try {
          const yes = await Pop.confirm('Delete Ticket?')
          if (!yes) { return }
          const comment = AppState.comments.find(a => a.creatorId == AppState.account.id && a.eventId == AppState.activeEvent.id)
          await commentsService.deleteComment(comment.id)
        } catch (error) {
          Pop.error(error, 'deleting comment')
        }
      }
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

.text-shadow {
  color: #b1fcdd;
  text-shadow: 0px 0px 5px #272525d7;
  font-weight: bold;
  letter-spacing: 0.08rem;
}

.delete {
  color: black;
}

.delete:hover {
  color: red;
}
</style>