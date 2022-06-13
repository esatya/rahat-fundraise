import { Request } from 'express';

export interface IRequest extends Request {
  userId?: string;
  campaignId?: string;
}
