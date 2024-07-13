import { Router } from 'express';
import cargoController from './controllers/cargo.controller';
import deliveryController from './controllers/delivery.controller';
import driverController from './controllers/driver.controller';
import regionController from './controllers/region.controller';
import settingsController from './controllers/settings.controller';
import truckController from './controllers/truck.controller';

const router = Router();

router.get('/cargos/availables', cargoController.getAvailables);
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

router.get('/trucks/availables', truckController.getAvailables);
router.get('/trucks/amount', truckController.getAmount);
router.get('/trucks', truckController.index);
router.get('/trucks/:id', truckController.show);
router.post('/truck', truckController.store);
router.put('/truck/:id', truckController.update);
router.delete('/truck/:id', truckController.delete);

router.get('/drivers/availables', driverController.getAvailables);
router.get('/drivers/amount', driverController.getAmount);
router.get('/drivers', driverController.index);
router.get('/drivers/:id', driverController.show);
router.post('/driver', driverController.store);
router.put('/driver/:id', driverController.update);
router.delete('/driver/:id', driverController.delete);

router.get('/deliveries/day', deliveryController.getOfDay);
router.get('/deliveries', deliveryController.index);
router.get('/deliveries/:id', deliveryController.show);
router.post('/delivery', deliveryController.store);
router.delete('/delivery/:id', deliveryController.delete);

router.get('/settings', settingsController.show);
router.put('/settings', settingsController.update);

export default router;
