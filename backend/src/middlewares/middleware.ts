import jwt, { JwtPayload } from 'jsonwebtoken';

import { secret } from '../config/keys';
import { INext, IRequest, IResponse } from '../interfaces/vendors';

import User from '../models/User.model';

export const tokenExtractor = (req: IRequest, res: IResponse, next: INext) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  }

  next();
};

export const userExtractor = async (
  req: IRequest,
  res: IResponse,
  next: INext,
) => {
  try {
    const token = req.headers.token as string;

    if (token) {
      const decodedToken = jwt.verify(token, secret);

      if (decodedToken['id']) {
        const user = await User.findById(decodedToken['id']);

        if (user) {
          req.user = user;
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ ok: false, msg: error.message });
    }

    res.status(401).send({ ok: false, msg: 'Invalid token.' });
  }

  next();
};
