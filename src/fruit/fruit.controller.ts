// src/fruit/fruit.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FruitService } from './fruit.service';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { Fruit } from './fruit.entity';

@Controller('fruits') // /fruits 경로
export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  @Get()
  async findAll(): Promise<Fruit[]> {
    return this.fruitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fruit> {
    return this.fruitService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // 201 Created 응답
  async create(@Body() createFruitDto: CreateFruitDto): Promise<Fruit> {
    return this.fruitService.create(createFruitDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFruitDto: UpdateFruitDto,
  ): Promise<Fruit> {
    return this.fruitService.update(id, updateFruitDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content 응답
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.fruitService.remove(id);
  }
}