import { Router } from 'express';
import {
  getCountries,
  getCountry,
  createCountries,
  deleteCountries,
} from '../controllers/countries';

const router = Router();

router
  .route('/')
  .get(getCountries)
  .post(createCountries)
  .delete(deleteCountries);
router.route('/:id').get(getCountry);

export default router;
