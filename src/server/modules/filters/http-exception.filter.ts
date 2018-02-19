import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, response: any): any {
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: ``
      });
  }
}
