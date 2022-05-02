import jwt from 'jsonwebtoken';

import { secret } from '../config/keys';
import User from '../models/User.model';
import { INext, IRequest, IResponse } from '../interfaces/vendors';

const userExtractor = async (req: IRequest, res: IResponse, next: INext) => {
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

export default userExtractor;
