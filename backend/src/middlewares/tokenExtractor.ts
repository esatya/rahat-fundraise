import { INext, IRequest, IResponse } from '../interfaces/vendors';

const tokenExtractor = (req: IRequest, res: IResponse, next: INext) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.token = authorization.substring(7);
  }

  next();
};

export default tokenExtractor;
