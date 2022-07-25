import jwt, { JwtPayload } from 'jsonwebtoken';

import { secret } from '../config/keys';
import { INext, IRequest, IResponse } from '../interfaces/vendors';
import User from "../models/User.model";

const isAuth =  (req: IRequest, res: IResponse, next: INext) => {
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
    req.userEmail = decodedToken['email'];
    if (decodedToken['email']) {
      return User.findOne({email: req.userEmail}).then(user => {
        if (user && user?.isAgency) {
          req.userId = user.id;
        }
        next();
      })
    }
    next();
  } catch (error) {
    throw new Error('Invalid Token');

  }
};

export default isAuth;
