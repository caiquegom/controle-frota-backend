import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateTruckDTO, UpdateTruckDTO } from '../dto/truck.dto';
import { truckRepository } from '../repositories/truck.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class TruckController {
  async index(req: Request, res: Response) {
    try {
      const trucksList = await truckRepository.find({ withDeleted: false });
      return res.status(200).json({
        status: 'success',
        data: trucksList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async show(req: Request, res: Response) {
    const truckId = req.params.id;

    try {
      const truck = await truckRepository.findOne({
        where: {
          id: Number(truckId),
        },
        withDeleted: false,
      });

      if (!truck) {
        return res.status(404).json({
          status: 'error',
          message: 'Truck not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: truck,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { name, brand, model, year, capacity } = req.body;
    const createTruckDTO = new CreateTruckDTO();
    createTruckDTO.name = name;
    createTruckDTO.brand = brand;
    createTruckDTO.model = model;
    createTruckDTO.year = year;
    createTruckDTO.capacity = capacity;

    const errors = await validate(createTruckDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const newTruck = truckRepository.create({
        name,
        brand,
        model,
        year,
        capacity,
      });
      truckRepository.save(newTruck);
      return res.status(201).json({
        status: 'success',
        data: newTruck,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async update(req: Request, res: Response) {
    const truckId = req.params.id;
    const { name, brand, model, year, capacity } = req.body;

    const updateTruckDTO = new UpdateTruckDTO();
    updateTruckDTO.name = name;
    updateTruckDTO.brand = brand;
    updateTruckDTO.model = model;
    updateTruckDTO.year = year;
    updateTruckDTO.capacity = capacity;

    const errors = await validate(updateTruckDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const truck = await truckRepository.findOne({
        where: { id: Number(truckId) },
        withDeleted: false,
      });

      if (!truck) {
        return res.status(404).json({
          status: 'error',
          message: 'Truck not found',
        });
      }

      const editedTruck = await truckRepository.save({
        id: Number(truckId),
        name,
        brand,
        model,
        year,
        capacity,
      });
      return res.status(201).json({
        status: 'success',
        data: editedTruck,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const truckId = req.params.id;

    try {
      const truck = await truckRepository.findOne({
        where: {
          id: Number(truckId),
        },
        withDeleted: false,
      });

      if (!truck) {
        return res.status(404).json({
          status: 'error',
          message: 'Truck not found',
        });
      }

      await truckRepository.softDelete({ id: Number(truckId) });
      return res.status(200).json({
        status: 'success',
        data: 'Truck deleted',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}

export default new TruckController();
