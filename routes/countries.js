import { Router } from 'express';
import {
  getCountries,
  getCountry,
  createCountries,
  deleteCountry,
} from '../controllers/countries';

const router = Router();

router.route('/').get(getCountries).post(createCountries);
router.route('/:id').get(getCountry).delete(deleteCountry);

export default router;
