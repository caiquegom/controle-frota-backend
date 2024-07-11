import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTruckDTO {
  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsNumber()
  driverId: number;
}

export class UpdateTruckDTO {
  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsString()
  year: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsNumber()
  driverId: number;
}
