import { AppState } from "../AppState"
import { TowerEvent } from "../models/Event"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"


class EventsService {
  async getAllEvents(type = '') {
    let res
    if (type) {
      res = await api.get('/api/events', {
        params: {
          type: type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data.map(e => new TowerEvent(e))
  }
  async createEvent(formData) {
    const res = await api.post('/api/events', formData)
    AppState.events.unshift(res.data)
    return res.data
  }

  async getEventById(id) {
    const res = await api.get(`/api/events/${id}`)
    AppState.activeEvent = new TowerEvent(res.data)
  }
  async cancelEvent(id) {
    await api.delete(`/api/events/${id}`)
  }
  async getAttendeesByEventId(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    console.log(res.data);
    AppState.tickets = res.data
  }
  async getTicket(event) {
    const res = await api.post('/api/tickets', event)
    const attendee = res.data
    if (event.capacity == 0) {
      throw new Pop.error('Event is Sold out')
    }
    AppState.attendee.push(attendee)
  }
  async deleteTicket(attendeeId) {
    await api.delete('api/tickets/' + attendeeId)
    AppState.attendee = AppState.attendee.filter(a => a.id != attendeeId)
  }
}
export const eventsService = new EventsService()