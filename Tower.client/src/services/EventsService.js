import { AppState } from "../AppState"
import { api } from "./AxiosService"

class EventsService {
  async getAllEvents(type = '') {
    let res
    if (type) {
      res = await api.get('/api/events', {
        params: {
          category: type
        }
      })
    } else {
      res = await api.get('/api/events')
    }
    AppState.events = res.data.map(e => new Event(e))
  }
  // TODO FIX FILTER
  async getAllEvents() {
    const res = await api.get('/api/events')
    console.log(res.data);
    AppState.events = res.data
  }
  async createEvent(formData) {
    const res = await api.post('/api/events', formData)
    AppState.events.push(res.data)
  }
}
export const eventsService = new EventsService()