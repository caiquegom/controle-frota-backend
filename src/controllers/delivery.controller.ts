import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateDeliveryDTO } from '../dto/delivery.dto';
import { deliveryRepository } from '../repositories/delivery.repository';
import cargoService from '../services/cargo.service';
import deliveryService from '../services/delivery.service';
import { formatValidatorErrors } from '../utils/dataValidation';

class DeliveryController {
  async index(req: Request, res: Response) {
    try {
      const deliverysList = await deliveryRepository.find({
        relations: ['driver', 'cargo', 'truck'],
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: deliverysList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async show(req: Request, res: Response) {
    const deliveryId = req.params.id;

    try {
      const delivery = await deliveryRepository.findOne({
        where: {
          id: Number(deliveryId),
        },
        withDeleted: false,
      });

      if (!delivery) {
        return res.status(404).json({
          status: 'error',
          message: 'Entrega não encontrada',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: delivery,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async store(req: Request, res: Response) {
    const {
      destinyId,
      truckId,
      driverId,
      cargoId,
      value,
      hasInsurance,
      deliveryDate,
    } = req.body;
    const deliveryAttributes = {
      destinyId,
      truckId,
      driverId,
      cargoId,
      value,
      hasInsurance,
      deliveryDate,
    };

    const createDeliveryDTO = new CreateDeliveryDTO();
    Object.keys(deliveryAttributes).forEach((item) => {
      createDeliveryDTO[item] = deliveryAttributes[item];
    });
    const errors = await validate(createDeliveryDTO);

    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const isCargoAvailable = await cargoService.verifyIfIsOnDelivery(cargoId);

      if (isCargoAvailable) {
        return res.status(409).json({
          status: 'error',
          message: 'Carga está cadastrada em outra entrega',
        });
      }

      const deliveryObject =
        await deliveryService.createNewDeliveryObject(createDeliveryDTO);
      const newDelivery = deliveryRepository.create(deliveryObject);
      await deliveryRepository.save(newDelivery);

      return res.status(200).json({
        status: 'success',
        data: newDelivery,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new DeliveryController();
