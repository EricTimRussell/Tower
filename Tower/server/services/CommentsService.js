import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CommentsService {
  async deleteComment(commentData, userInfo) {
    const comment = await dbContext.Comments.findById(commentData.id)
    // @ts-ignore
    if (comment.creatorId.toString() != userInfo.id) {
      throw new Forbidden('Not your Comment')
    }
    // @ts-ignore
    await comment.remove()
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }

}
export const commentsService = new CommentsService()