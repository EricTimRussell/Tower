import { eventService } from "../services/EventsService";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)
      .get('/:id/tickets', this.getAllEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }
  async getAllEventTickets(req, res, next) {
    try {
      const tickets = await eventService.getAllEventTickets(req.params.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  editEvent(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
  async cancelEvent(req, res, next) {
    try {
      await eventService.cancelEvent(req.params.id, req.userInfo.id)
      res.send("Cancelled event.")
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const event = await eventService.getEventById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventService.getAllEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}

