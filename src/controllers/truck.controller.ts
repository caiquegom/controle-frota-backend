import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Not } from 'typeorm';
import { CreateTruckDTO, UpdateTruckDTO } from '../dto/truck.dto';
import { truckRepository } from '../repositories/truck.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class TruckController {
  async index(req: Request, res: Response) {
    try {
      const trucksList = await truckRepository.find({
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: trucksList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
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
        message: 'Erro interno no servidor',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { plate, brand, model, year, capacity } = req.body;
    const createTruckDTO = new CreateTruckDTO();
    createTruckDTO.plate = plate;
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
      const truckByPlate = await truckRepository.findOne({
        where: { plate },
        withDeleted: false,
      });
      if (truckByPlate) {
        return res.status(409).json({
          status: 'error',
          message: 'Placa já cadastrada',
        });
      }

      const newTruck = truckRepository.create({
        plate,
        brand,
        model,
        year,
        capacity,
      });

      await truckRepository.save(newTruck);
      return res.status(201).json({
        status: 'success',
        data: newTruck,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
      });
    }
  }

  async update(req: Request, res: Response) {
    const truckId = req.params.id;
    const { plate, brand, model, year, capacity } = req.body;

    const updateTruckDTO = new UpdateTruckDTO();
    updateTruckDTO.plate = plate;
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

      const otherTruckByPlate = await truckRepository.findOne({
        where: { plate, id: Not(Number(truckId)) },
        withDeleted: false,
      });
      if (otherTruckByPlate) {
        return res.status(409).json({
          status: 'error',
          message: 'Placa já cadastrada',
        });
      }

      if (!truck) {
        return res.status(404).json({
          status: 'error',
          message: 'Truck not found',
        });
      }

      const editedTruck = await truckRepository.save({
        id: Number(truckId),
        plate,
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
        message: 'Erro interno no servidor',
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
        message: 'Erro interno no servidor',
      });
    }
  }

  async getAvailables(req: Request, res: Response) {
    try {
      const trucksList = await truckRepository.find({
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: trucksList,
      });
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  }
}

export default new TruckController();
