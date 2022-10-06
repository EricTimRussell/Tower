import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getComments)
  }
  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getComments(req.query)
      res.send(comments)
    } catch (error) {
      next(error)

    }
  }
}