import { dbContext } from "../db/DbContext"

class CommentsService {
  async getComments(query) {
    const comments = await dbContext.Comments.find(query)
    return comments
    // TODO FINISH COMMENTS
  }

}
export const commentsService = new CommentsService()