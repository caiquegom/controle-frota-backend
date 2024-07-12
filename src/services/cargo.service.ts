import { IsNull, MoreThanOrEqual, Not } from 'typeorm';
import { cargoRepository } from '../repositories/cargo.repository';
import { deliveryRepository } from '../repositories/delivery.repository';

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

  async canDelete(id: number): Promise<boolean> {
    const deliveryWithCargo = await deliveryRepository.findOne({
      relations: ['cargo'],
      where: {
        cargo: {
          id,
        },
        deliveryDate: MoreThanOrEqual(new Date()),
      },
      withDeleted: false,
    });

    return !deliveryWithCargo;
  }
}

export default new CargoService();
