import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateDeliveryDTO {
  @IsNotEmpty()
  @IsNumber()
  destinyId: number;

  @IsNotEmpty()
  @IsNumber()
  truckId: number;

  @IsNotEmpty()
  @IsNumber()
  driverId: number;

  @IsNotEmpty()
  @IsNumber()
  cargoId: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDateString()
  deliveryDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  hasInsurance: boolean;
}

export class UpdateDeliveryDTO {
  @IsNotEmpty()
  @IsNumber()
  destinyId: number;

  @IsNotEmpty()
  @IsNumber()
  truckId: number;

  @IsNotEmpty()
  @IsNumber()
  driverId: number;

  @IsNotEmpty()
  @IsNumber()
  cargoId: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDate()
  deliveryDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  hasInsurance: boolean;
}
