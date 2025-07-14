// src/fruit/dto/update-fruit.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // npm i @nestjs/mapped-types
import { CreateFruitDto } from './create-fruit.dto';

export class UpdateFruitDto extends PartialType(CreateFruitDto) {}