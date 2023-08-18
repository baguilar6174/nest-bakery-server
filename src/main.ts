import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { CORS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS);
  app.setGlobalPrefix(AppModule.apiPrefix);
  app.useGlobalFilters(new AllExceptionFilter());
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new TimeOutInterceptor(),
    new ClassSerializerInterceptor(reflector),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(AppModule.port);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
