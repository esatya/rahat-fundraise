import { Router } from 'express';
import { IRequest, IResponse } from '../interfaces/vendors';

const router = Router();

// @Route   GET api/content/education/
// @desc    Get all educations
// @access  Public
router.get('/', async (req: IRequest, res: IResponse) => {
  try {
    return res.json({ message: 'Done!' });
  } catch (err) {
    return res.status(401).json({ msg: 'Could not fetch data' });
  }
});

// Export the routes of person
export default router;
