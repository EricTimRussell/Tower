import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { api } from "./AxiosService"

class CommentsService {
  async getCommentsByEvent(id) {
    const res = await api.get(`api/events/${id}/comments`)
    AppState.comments = res.data.comments.map(c => new Comment(c))
  }
  async createComment() {
    const res = await api.post('/api/comments')
    // TODO FINISH THIS
  }
}
export const commentsService = new CommentsService()