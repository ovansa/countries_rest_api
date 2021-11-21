import { Router } from 'express';
import {
  getCountries,
  getCountry,
  createCountries,
  deleteCountries,
  uploadCountries,
} from '../controllers/countries';

const router = Router();

router
  .route('/')
  .get(getCountries)
  .post(createCountries)
  .delete(deleteCountries);
router.route('/:id').get(getCountry);
router.route('/upload').post(uploadCountries);

export default router;
