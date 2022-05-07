import { Request } from 'express';

import { IUser } from '../models/User';

export interface IRequest extends Request {
  userId?: string;
}
