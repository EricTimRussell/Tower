import { Schema } from "mongoose";

export const TicketShcema = new Schema({
  eventId: { type: ObjectId, required: true },
  accountId: { type: ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketShcema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TicketShcema.virtual('towerEvent', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'TowerEvent'
})