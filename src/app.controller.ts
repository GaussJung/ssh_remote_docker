/*
- App Contoller with App Service ( file : app.service.js ) 
- Logic is processed in App Service after triggered by main.js 
*/
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { JsonWebKeyInput } from 'crypto';
 
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
  getIP(@Req() req: Request): { clientIp: string } {
    return this.appService.getIP(req);
  }

  // Show Date : request path >> http://example.com:3000/date 
  @Get('/date')
  getDate(): string {
    return this.appService.getDate();
  };


  /* Auto Format : Simple 
  @Get('/time')
  getDateTime() {
    return this.appService.getDateTime();
  }
  */ 
  
  // Sample Date :   {"TimeZone": "Asia/Seoul", "DateTime": "20250601-123309", "UTC": "20250601-033309"}
 
  // Show Time : request path >> http://example.com:3000/time 
  @Get('/time')
  getDateTime(): { TimeZone: string; DateTime: string; UTC: string } {
    return this.appService.getDateTime();
  }

}
 