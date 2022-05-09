import jwt, { JwtPayload } from 'jsonwebtoken';

import { secret } from '../config/keys';
import { INext, IRequest, IResponse } from '../interfaces/vendors';

const isAuth = (req: IRequest, res: IResponse, next: INext) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('Authorization Header is missing.');
    }

    const jwtToken = authorizationHeader.split(' ')[1];

    if (!jwtToken) {
      throw new Error('Empty Token');
    }

    const decodedToken = jwt.verify(jwtToken, secret) as JwtPayload;

    req.userId = decodedToken['id'];
  } catch (error) {
    throw new Error('Invalid Token');
  }

  next();
};

export default isAuth;
