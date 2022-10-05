import { dbContext } from "../db/DbContext"

class EventsService {
  async getAllEvents() {
    const events = dbContext.TowerEvents.find()
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