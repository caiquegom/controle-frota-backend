import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateCargoDTO, UpdateCargoDTO } from '../dto/cargo.dto';
import { cargoRepository } from '../repositories/cargo.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class CargoController {
  async index(req: Request, res: Response) {
    try {
      const cargosList = await cargoRepository.find({
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: cargosList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async show(req: Request, res: Response) {
    const cargoId = req.params.id;

    try {
      const cargo = await cargoRepository.findOne({
        where: {
          id: Number(cargoId),
        },
        withDeleted: false,
      });

      if (!cargo) {
        return res.status(404).json({
          status: 'error',
          message: 'Cargo not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: cargo,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { name, type, description } = req.body;
    const createCargoDTO = new CreateCargoDTO();
    createCargoDTO.name = name;
    createCargoDTO.type = type;
    createCargoDTO.description = description;

    const errors = await validate(createCargoDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const newCargo = cargoRepository.create({
        name,
        type,
        description,
      });
      await cargoRepository.save(newCargo);
      return res.status(201).json({
        status: 'success',
        data: newCargo,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async update(req: Request, res: Response) {
    const cargoId = req.params.id;
    const { name, type, description } = req.body;

    const updateCargoDTO = new UpdateCargoDTO();
    updateCargoDTO.name = name;
    updateCargoDTO.type = type;
    updateCargoDTO.description = description;

    const errors = await validate(updateCargoDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const cargo = await cargoRepository.findOne({
        where: { id: Number(cargoId) },
        withDeleted: false,
      });

      if (!cargo) {
        return res.status(404).json({
          status: 'error',
          message: 'Cargo not found',
        });
      }

      const editedCargo = await cargoRepository.save({
        id: Number(cargoId),
        name: name,
        type,
        description,
      });
      return res.status(201).json({
        status: 'success',
        data: editedCargo,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const cargoId = req.params.id;

    try {
      const cargo = await cargoRepository.findOne({
        where: {
          id: Number(cargoId),
        },
        withDeleted: false,
      });

      if (!cargo) {
        return res.status(404).json({
          status: 'error',
          message: 'Cargo not found',
        });
      }

      await cargoRepository.softDelete({ id: Number(cargoId) });
      return res.status(200).json({
        status: 'success',
        data: 'Cargo deleted',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async getNotDelivered(req: Request, res: Response) {
    try {
      const cargosList = await cargoRepository.find({
        relations: ['deliveries'],
        where: {
          delivered: false,
          deliveries: null,
        },
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: cargosList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}

export default new CargoController();
