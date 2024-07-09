import { Router } from 'express';
import cargoController from './controllers/cargo.controller';
import regionController from './controllers/region.controller';
import truckController from './controllers/truck.controller';

const router = Router();

router.get('/cargos', cargoController.index);
router.get('/cargos/:id', cargoController.show);
router.post('/cargo', cargoController.store);
router.put('/cargo/:id', cargoController.update);
router.delete('/cargo/:id', cargoController.delete);

router.get('/regions', regionController.index);
router.get('/regions/:id', regionController.show);
router.post('/region', regionController.store);
router.put('/region/:id', regionController.update);
router.delete('/region/:id', regionController.delete);

router.get('/trucks', truckController.index);
router.get('/trucks/:id', truckController.show);
router.post('/truck', truckController.store);
router.put('/truck/:id', truckController.update);
router.delete('/truck/:id', truckController.delete);

export default router;
