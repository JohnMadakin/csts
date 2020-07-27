import {ObjectID} from 'mongodb';

export interface IUserRequest {
  subject: string,
  user: ObjectID,
  description: string,
  status: string,
  ticketType: string,
  ticketCategory: ObjectID;
}
