import jwt from 'jsonwebtoken';

import { secret } from '../config/keys';
import { INext, IRequest, IResponse } from '../interfaces/vendors';

const isAuth = (req: IRequest, res: IResponse, next: INext) => {
  try {
    if (!req.token) {
      throw new Error('Invalid Token');
    }

    const decodedToken = jwt.verify(req.token, secret);

    if (decodedToken['id']) {
      req.userId = decodedToken['id'];
    }
  } catch (error) {
    throw new Error('Invalid Token');
  }

  next();
};

export default isAuth;
