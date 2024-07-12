import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateDeliveryDTO } from '../dto/delivery.dto';
import { deliveryRepository } from '../repositories/delivery.repository';
import cargoService from '../services/cargo.service';
import deliveryService from '../services/delivery.service';
import { formatValidatorErrors } from '../utils/dataValidation';
import { formatTimeForDatabase } from '../utils/dateFormatDatabase';

class DeliveryController {
  async index(req: Request, res: Response) {
    try {
      const deliverysList = await deliveryRepository.find({
        order: {
          createdAt: 'ASC',
        },
        relations: ['driver', 'cargo', 'truck', 'destiny'],
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: deliverysList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
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
        message: 'Erro interno no servidor',
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

      const validationMessage = await deliveryService.validateDriverAndTruck(
        driverId,
        truckId,
        destinyId,
        deliveryDate,
      );
      if (validationMessage) {
        return res.status(409).json({
          status: 'error',
          message: validationMessage,
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
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async delete(req: Request, res: Response) {
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
          message: 'Delivery not found',
        });
      }

      await deliveryRepository.delete({ id: Number(deliveryId) });
      return res.status(200).json({
        status: 'success',
        data: 'Delivery deleted',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async getOfDay(req: Request, res: Response) {
    const date = req.query.date as string;
    const formattedDate = formatTimeForDatabase(new Date(date));

    try {
      const deliveriesByDate = await deliveryRepository.find({
        relations: ['driver', 'cargo', 'truck', 'destiny'],
        where: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          deliveryDate: formattedDate,
        },
        withDeleted: false,
      });

      return res.status(200).json({
        status: 'success',
        data: deliveriesByDate,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
}

export default new DeliveryController();
