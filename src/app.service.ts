import { Injectable } from '@nestjs/common';
import { Request } from 'express';
 
@Injectable()
export class AppService {

  // Say Hello! 
  getHello(): string {
    const currentTimeMilliseconds = Date.now();
    console.log("AppService L1. Request TimeMill=" + currentTimeMilliseconds);
    return 'Hello My Nest! ';
  };

  // Health Check 
  getHealthStatus(): string {
    return 'OK';
  };

  
  // Get IP and return JSON
  getIP(req: Request): { clientIp: string } {

    let finalIp: string = ""; // Final return IP

    const forwardedIp = req.headers['x-forwarded-for'];
    // console.log("AppService L10. forwardedIp=" + forwardedIp, "type="  + typeof forwardedIp ); 

    if (forwardedIp === undefined) {
      if (req.ip !== undefined) {
        finalIp = req.ip;
      }
      console.log("AppService L20-A. RequestIp");
    } else {
      // x-forwarded-for can be a comma-separated list — take first if so
      if (typeof forwardedIp === 'string') {
        finalIp = forwardedIp.split(',')[0].trim();
      }
      console.log("AppService L20-B. ForwardedIp");
    }

    // remove the quirk of ipv6 : ex) ::ffff:121.166.96.173
    if (finalIp.startsWith('::ffff:')) {
      finalIp = finalIp.substring(7);
    }

    console.log("AppService L25. IP=" + finalIp);

    return { clientIp: finalIp };
  }

  // Get Date Simple (with version) 
  getDate(): string {
    const dateString  = new Date().toISOString(); 
    const versionString = "V1.6.7"; 
    console.log("AppService L30. " + versionString + " Now : " + dateString ); 
    return versionString + " >> Now : " + dateString;
  };

  // Get DateTime and return JSON with system TimeZone and UTC
  getDateTime(): { TimeZone: string, DateTime: string, UTC: string } {
    const now = new Date();

    // Formatter 함수
    const formatDateTime = (date: Date): string => {
      const pad = (n: number) => n.toString().padStart(2, '0');
      return (
        date.getFullYear().toString() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        '-' +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
      );
    };

    // Local TimeZone 이름
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 현재 시스템 로컬 시간
    const localDateTime = formatDateTime(now);

    // 현재 UTC 시간
    const utcDateTime = formatDateTime(new Date(now.getTime() + now.getTimezoneOffset() * 60000));
 
    console.log(`AppService L30. TimeZone=${timeZone} DateTime=${localDateTime} UTC=${utcDateTime}`);

    return {
      TimeZone: timeZone,
      DateTime: localDateTime,
      UTC: utcDateTime
    };
  }

};



