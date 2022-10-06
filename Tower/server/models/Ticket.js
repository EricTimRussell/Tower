import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const TicketShcema = new Schema({
  eventId: { type: ObjectId, required: true, ref: 'TowerEvent' },
  accountId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketShcema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketShcema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})