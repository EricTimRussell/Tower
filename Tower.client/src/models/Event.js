export class Event {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCancelled = data.isCancelled || false
    // TODO IDK IF ENUM IS DIFFERENT ON FRONT END
    this.type = data.type
  }
}