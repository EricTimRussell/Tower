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
}
export const commentsService = new CommentsService()
