import { MoreThanOrEqual } from 'typeorm';
import { deliveryRepository } from '../repositories/delivery.repository';

class RegionsService {
  async canDelete(id: number): Promise<boolean> {
    const deliveryWithRegion = await deliveryRepository.findOne({
      relations: ['destiny'],
      where: {
        destiny: {
          id,
        },
        deliveryDate: MoreThanOrEqual(new Date()),
      },
      withDeleted: false,
    });

    return !deliveryWithRegion;
  }
}

export default new RegionsService();
