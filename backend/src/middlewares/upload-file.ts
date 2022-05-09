import path from 'path';
import multer, { FileFilterCallback } from 'multer';

import { IRequest } from '../interfaces/vendors';
import { DestinationCallback, FileNameCallback } from '../interfaces/multer';

const fileStorage = multer.diskStorage({
  destination: (
    req: IRequest,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) => {
    cb(null, path.join(__dirname, '../../images/users'));
  },

  filename: (
    req: IRequest,
    file: Express.Multer.File,
    cb: FileNameCallback,
  ) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (
  req: IRequest,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    return cb(null, true);
  }

  cb(null, false);
};

const uploadFile = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single('image');

export default uploadFile;
