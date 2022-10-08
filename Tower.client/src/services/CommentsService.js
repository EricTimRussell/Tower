import { AppState } from "../AppState"
import { api } from "./AxiosService"

class CommentsService {
  async getCommentsByEvent(id) {
    const res = await api.get(`api/events/${id}/comments`)
    AppState.comments = res.data
  }
  async createComment(editable) {
    const res = await api.post('/api/comments', editable)
    AppState.comments.unshift(res.data)
    return res.data
  }
  async deleteComment(commentId) {
    await api.delete(`/api/comments/` + commentId)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }
}
export const commentsService = new CommentsService()
