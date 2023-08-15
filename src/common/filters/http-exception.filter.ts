import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const error =
      exception instanceof HttpException ? exception.getResponse() : exception;
    this.logger.error(`Status: ${status} Error: ${JSON.stringify(error)}`);
    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
    });
  }
}
