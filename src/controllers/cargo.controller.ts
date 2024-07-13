import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { IsNull } from 'typeorm';
import { CreateCargoDTO, UpdateCargoDTO } from '../dto/cargo.dto';
import { cargoRepository } from '../repositories/cargo.repository';
import cargoService from '../services/cargo.service';
import { formatValidatorErrors } from '../utils/dataValidation';

class CargoController {
  async index(req: Request, res: Response) {
    try {
      const cargosList = await cargoRepository.find({
        order: {
          createdAt: 'ASC',
        },
        relations: ['delivery'],
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: cargosList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
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
        message: 'Erro interno no servidor',
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
        message: 'Erro interno no servidor',
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
        message: 'Erro interno no servidor',
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

      const canDeleteCargo = await cargoService.canDelete(Number(cargoId));
      if (!canDeleteCargo) {
        return res.status(409).json({
          status: 'error',
          message: 'Carga está cadastrada em uma entrega',
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
        message: 'Erro interno no servidor',
      });
    }
  }

  async getAvailables(req: Request, res: Response) {
    try {
      const cargosList = await cargoRepository.find({
        relations: ['delivery'],
        where: {
          delivered: false,
          delivery: {
            id: IsNull(),
          },
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
        message: 'Erro interno no servidor',
      });
    }
  }
}

export default new CargoController();
