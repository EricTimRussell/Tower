import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class EventsService {
  async deleteTicket(eventId, userInfo) {
    const ticket = await dbContext.Tickets.findById(eventId)
    // @ts-ignore
    if (ticket.accountId != userInfo.id) {
      throw new Forbidden('Cannot Delete Ticket that is not yours')
    }

    // @ts-ignore
    const event = await this.getEventById(ticket.eventId)
    // @ts-ignore
    await ticket.remove()
    // @ts-ignore
    event.capacity++
    // TODO POSTMAN SAYS THIS IS STILL NOT WORKING
    return ticket
  }

  async getAllEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return tickets
  }
  async getMyTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }

  async createTicket(ticketData) {
    const event = await this.getEventById(ticketData.eventId)
    // @ts-ignore
    if (event.isCanceled) {
      throw new BadRequest('Sorry this event has been Canceled')
    }
    const isAttendee = await dbContext.Tickets.findOne({
      accountId: ticketData.accountId,
      eventId: ticketData.eventId
    })
    if (isAttendee) {
      throw new BadRequest('You are already attending event')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture'),
      await ticket.populate('event', 'name')
    // @ts-ignore
    event.capacity--
    // @ts-ignore
    await event.save()
    return ticket
  }
  async cancelEvent(id, userId) {
    const event = await dbContext.TowerEvents.findById(id)
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('This is not your event to cancel')
    }
    // @ts-ignore
    event.isCanceled = true
    // @ts-ignore
    await event.save()
    return "Event Cancelled"
  }

  async getEventById(eventId) {
    const event = dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest('Invalid Id or bad event')
    }
    return event
  }
  async getAllEvents(query) {
    const events = dbContext.TowerEvents.find(query)
    return events
  }
  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate('creator', 'name, picture')
    // TODO ADD TICKET SERVICE ATTENDEES
    return event
  }


}
export const eventService = new EventsService()