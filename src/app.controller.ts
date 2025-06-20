/*
- App Contoller with App Service ( file : app.service.js ) 
- Logic is processed in App Service after triggered by main.js 
*/
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
 
@Controller()
export class AppController {

  // Initial construction 
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  };

  /*
  HealthCheck Direct Method 
  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }
  */ 

  // HealthCheck using import service library 
  // Show Health Status : request path >> http://example.com:3000/health 
  // if 'OK' then status is normal 
  @Get('/health')
  healthCheck(): string {
    return this.appService.getHealthStatus();  
  };
 
  // Show  IP  : request path >> http://example.com:3000/ip
  @Get('/ip')
  getIP(@Req() req: Request): string {
    return this.appService.getIP(req);
  };

  // Show Date : request path >> http://example.com:3000/date 
  @Get('/date')
  getDate(): string {
    return this.appService.getDate();
  };
 
}
 