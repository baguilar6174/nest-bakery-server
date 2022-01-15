import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(AppModule.apiPrefix);
    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalInterceptors(new TimeOutInterceptor());
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
}
bootstrap();
