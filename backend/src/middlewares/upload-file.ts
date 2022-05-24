import multer, { FileFilterCallback, StorageEngine } from 'multer';

import { IRequest } from '../interfaces/vendors';

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

const uploadFile = (fileStorage: StorageEngine) =>
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single('image');

export default uploadFile;
