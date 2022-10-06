import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { eventService } from "../services/EventsService";
import BaseController from "../utils/BaseController";

export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.deleteTicket)
  }
  async deleteTicket(req, res, next) {
    try {
      const ticket = await eventService.deleteTicket(req.params.id, req.userInfo)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await eventService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }


}