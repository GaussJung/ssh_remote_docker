// src/fruit/fruit.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Fruit } from './fruit.entity';

import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';

@Injectable()
export class FruitService {
  constructor(
    @InjectRepository(Fruit)
    private fruitRepository: Repository<Fruit>,
  ) {}

  async findAll(): Promise<Fruit[]> {
    return this.fruitRepository.find();
  }

  async findOne(id: number): Promise<Fruit> {
    const fruit = await this.fruitRepository.findOneBy({ id });
    if (!fruit) {
      throw new NotFoundException(`Fruit with ID ${id} not found`);
    }
    return fruit;
  }

  async create(createFruitDto: CreateFruitDto): Promise<Fruit> {
    const newFruit = this.fruitRepository.create(createFruitDto);
    return this.fruitRepository.save(newFruit);
  }

  async update(id: number, updateFruitDto: UpdateFruitDto): Promise<Fruit> {
    const fruit = await this.findOne(id); // 먼저 존재하는지 확인
    Object.assign(fruit, updateFruitDto); // DTO 데이터로 업데이트
    return this.fruitRepository.save(fruit);
  }

  async remove(id: number): Promise<void> {
    const result = await this.fruitRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fruit with ID ${id} not found`);
    }
  }
}