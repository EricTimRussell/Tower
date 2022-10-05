import { Schema } from "mongoose";


export const TowerEventSchema = new Schema({
  creatorId: { type: ObjectId, required: true },
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
  description: { type: String, required: true, minlength: 10, maxlength: 500 },
  coverImg: { type: String, required: true, maxlength: 250 },
  location: { type: String, required: true, minlength: 1, maxlength: 50 },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true, maxlength: 25 },
  isCanceled: { type: Boolean },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justone: true,
  ref: 'Account'
})