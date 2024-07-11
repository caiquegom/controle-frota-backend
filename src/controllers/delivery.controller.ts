import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateDeliveryDTO } from '../dto/delivery.dto';
import { deliveryRepository } from '../repositories/delivery.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class DeliveryController {
  async index(req: Request, res: Response) {
    try {
      const deliverysList = await deliveryRepository.find({
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
    const { destinyId, truckId, driverId, cargoId, value, hasInsurance } =
      req.body;
    const deliveryAttributes = {
      destinyId,
      truckId,
      driverId,
      cargoId,
      value,
      hasInsurance,
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
      // const isTruckAvailable = await deliveryService.validateTruckMonthTrips(
      //   Number(truckId),
      // );
    } catch (error) {
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
