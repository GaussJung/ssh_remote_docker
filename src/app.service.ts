import { Injectable, Logger } from '@nestjs/common';

/**
 * AppService
 * - Application-level service
 * - Responsible for health checks and simple hello message
 */
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor() {
    this.logger.log(`AppService initialized.`);
  }

  /**
   * Return a hello message with version
   */
  getHello(): string {
    const versionInfo = process.env.VERSION || 'Initial';
    this.logger.log(`getHello called - VERSION: ${versionInfo}`);
    return `Hello! App version: ${versionInfo}`;
  }

  /**
   * Health check
   */
  getHealthStatus(): string {
    this.logger.log(`Health check OK`);
    return 'OK';
  }
}
