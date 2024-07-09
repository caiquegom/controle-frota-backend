import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CargoType } from '../entities/cargo.entity';

export class CreateCargoDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CargoType)
  type: CargoType;

  @IsOptional()
  description?: string;
}

export class UpdateCargoDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(CargoType)
  type: CargoType;

  @IsOptional()
  description?: string;
}
