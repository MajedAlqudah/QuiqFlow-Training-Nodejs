import { Router } from 'express';
import {
  add,
  getAll,
  getById,
  remove,
  update,
} from '../controllers/stock.controller';
const router = Router();

// Stock routes would be mounted here

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', add);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
