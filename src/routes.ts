import { Router } from 'express';
import CargoController from './controllers/cargo.controller';
import RegionController from './controllers/region.controller';

const router = Router();

router.get('/cargos', CargoController.index);
router.get('/cargos/:id', CargoController.show);
router.post('/cargo', CargoController.store);
router.put('/cargo/:id', CargoController.update);
router.delete('/cargo/:id', CargoController.delete);

router.get('/regions', RegionController.index);
router.get('/regions/:id', RegionController.show);
router.post('/region', RegionController.store);
router.put('/region/:id', RegionController.update);
router.delete('/region/:id', RegionController.delete);

export default router;
