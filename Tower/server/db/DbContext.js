import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment";
import { TicketShcema } from "../models/Ticket";
import { TowerEventSchema } from "../models/TowerEvent";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema);
  Tickets = mongoose.model('Ticket', TicketShcema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
