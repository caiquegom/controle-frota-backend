import { Router } from 'express';
import CargoController from './controllers/cargo.controller';

const router = Router();

router.get('/cargos', CargoController.index);
router.get('/cargos/:id', CargoController.show);
router.post('/cargo', CargoController.store);
router.put('/cargo/:id', CargoController.update);
router.delete('/cargo/:id', CargoController.delete);

export default router;
