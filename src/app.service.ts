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

  // Get IP Basic 
  getIP(req: Request): string {

    let finalIp : any; // Final return IP; 

    const forwardedIp = req.headers['x-forwarded-for'];
    // console.log("AppService L10. forwardedIp=" + forwardedIp, "type="  + typeof forwardedIp ); 

    if( forwardedIp  == undefined ) {
      if ( req.ip == undefined) {
        finalIp = ""; 
      }
      else {
        finalIp = req.ip;
      }; 
      console.log("AppService L20-A. RequestIp"); 
    }
    else {
      finalIp = forwardedIp;   
      console.log("AppService L20-B. ForwardedIp"); 
    }; 
    
    // remove the quirk of ipv6 : ex) ::ffff:121.166.96.173 
    if (finalIp.startsWith('::ffff:')) { finalIp = finalIp.substring(7) }; 

    console.log("AppService L25. IP=" + finalIp); 

    return finalIp; 

  };

  // Get Date 
  getDate(): string {
    const dateString  = new Date().toISOString(); 
    const versionString = "V1.37"; 
    console.log("AppService L30. " + versionString + " Now : " + dateString ); 
    return versionString + " >> Now : " + dateString;
  };

 
};



