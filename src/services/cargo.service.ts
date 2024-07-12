import { IsNull, Not } from 'typeorm';
import { cargoRepository } from '../repositories/cargo.repository';

class CargoService {
  async verifyIfIsOnDelivery(id: number) {
    const cargo = await cargoRepository.findOne({
      relations: ['delivery'],
      where: {
        id,
        delivery: {
          id: Not(IsNull()),
        },
      },
    });

    return !!cargo;
  }
}

export default new CargoService();
