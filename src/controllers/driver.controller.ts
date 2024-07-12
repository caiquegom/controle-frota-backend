import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Not } from 'typeorm';
import { CreateDriverDTO, UpdateDriverDTO } from '../dto/driver.dto';
import { driverRepository } from '../repositories/driver.repository';
import { formatValidatorErrors } from '../utils/dataValidation';

class DriverController {
  async index(req: Request, res: Response) {
    try {
      const driversList = await driverRepository.find({ withDeleted: false });
      return res.status(200).json({
        status: 'success',
        data: driversList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async show(req: Request, res: Response) {
    const driverId = req.params.id;

    try {
      const driver = await driverRepository.findOne({
        where: {
          id: Number(driverId),
        },
        withDeleted: false,
      });

      if (!driver) {
        return res.status(404).json({
          status: 'error',
          message: 'Driver not found',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: driver,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async store(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const createDriverDTO = new CreateDriverDTO();
    createDriverDTO.name = name;
    createDriverDTO.email = email;
    createDriverDTO.phone = phone;

    const errors = await validate(createDriverDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const driverByEmail = await driverRepository.findOne({
        where: { email },
        withDeleted: false,
      });
      if (driverByEmail) {
        return res.status(409).json({
          status: 'error',
          message: 'E-mail já cadastrado',
        });
      }

      const driverByPhone = await driverRepository.findOne({
        where: { phone },
        withDeleted: false,
      });
      if (driverByPhone) {
        return res.status(409).json({
          status: 'error',
          message: 'Telefone já cadastrado',
        });
      }

      const newDriver = driverRepository.create({
        name,
        email,
        phone,
      });

      await driverRepository.save(newDriver);

      return res.status(201).json({
        status: 'success',
        data: newDriver,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async update(req: Request, res: Response) {
    const driverId = req.params.id;
    const { name, email, phone } = req.body;

    const updateDriverDTO = new UpdateDriverDTO();
    updateDriverDTO.name = name;
    updateDriverDTO.email = email;
    updateDriverDTO.phone = phone;

    const errors = await validate(updateDriverDTO);
    if (errors.length >= 1) {
      return res.status(404).json({
        status: 'error',
        message: formatValidatorErrors(errors),
      });
    }

    try {
      const driver = await driverRepository.findOne({
        where: { id: Number(driverId) },
        withDeleted: false,
      });

      if (!driver) {
        return res.status(404).json({
          status: 'error',
          message: 'Driver not found',
        });
      }

      const otherDriverByEmail = await driverRepository.findOne({
        where: { id: Not(Number(driverId)), email },
        withDeleted: false,
      });
      if (otherDriverByEmail) {
        return res.status(409).json({
          status: 'error',
          message: 'E-mail já cadastrado',
        });
      }

      const otherDriverByPhone = await driverRepository.findOne({
        where: { id: Not(Number(driverId)), phone },
        withDeleted: false,
      });
      if (otherDriverByPhone) {
        return res.status(409).json({
          status: 'error',
          message: 'Telefone já cadastrado',
        });
      }

      const editedDriver = await driverRepository.save({
        id: Number(driverId),
        name,
        email,
        phone,
      });
      return res.status(201).json({
        status: 'success',
        data: editedDriver,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const driverId = req.params.id;

    try {
      const driver = await driverRepository.findOne({
        where: {
          id: Number(driverId),
        },
        withDeleted: false,
      });

      if (!driver) {
        return res.status(404).json({
          status: 'error',
          message: 'Driver not found',
        });
      }

      await driverRepository.softDelete({ id: Number(driverId) });
      return res.status(200).json({
        status: 'success',
        data: 'Driver deleted',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

  async getAvailables(req: Request, res: Response) {
    try {
      const driversList = await driverRepository.find({
        withDeleted: false,
      });
      return res.status(200).json({
        status: 'success',
        data: driversList,
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}

export default new DriverController();
