// src/root/root.module.ts
import { Module } from '@nestjs/common';
import { RootService } from './root.service';
import { RootController } from './root.controller';

/**
 * Root module: provides RootService with utility functions and RootController
 */
@Module({
  controllers: [RootController], // 👈 반드시 추가
  providers: [RootService],
  exports: [RootService],
})
export class RootModule {}
