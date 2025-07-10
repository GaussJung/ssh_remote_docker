import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // add for trust proxy

async function bootstrap() {
  console.log("========== START Main App =============");

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Setup for Express trust proxy (for example to get real IP)
  app.use((req, res, next) => {
    req.headers['x-forwarded-for'] =
      req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    next();
  });

  // Core block for trust proxy
  app.set('trust proxy', true);

  // ✅ CORS 설정 추가
  const allowedOrigins = [
    'https://front.fandom.live',
    'https://www.fandom.live',
    'https://wwwdev.fandom.live',
    'http://localhost:3000', // for localhost:3000
    'http://localhost', // for localhost (80포트)
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true); // 비어 있으면 허용
      }

      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost')
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS: Origin ${origin} is not allowed`));
    },
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
