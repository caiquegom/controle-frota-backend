import { IsDecimal, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateRegionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  tax: number;
}

export class UpdateRegionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  tax: number;
}
