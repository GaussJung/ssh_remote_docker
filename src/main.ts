import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // add for trust proxy 

async function bootstrap() {

  console.log("========== START Main App v1.42 =============");

  // OLD.  const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Setup for Express trust proxy ( for example to get real IP )
  app.use((req, res, next) => {
     req.headers['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
     next();
  });

  // Core block for trust proxy 
  app.set('trust proxy', true);  

  // OLD. await app.listen(process.env.PORT ?? 3000);
  await app.listen(3000);
  
}

bootstrap();
