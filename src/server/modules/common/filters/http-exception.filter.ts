import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {MessageCodeError} from '../error/MessageCodeError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: any, response: any): any {
    const status = exception.httpStatus ? exception.httpStatus : HttpStatus.GATEWAY_TIMEOUT;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.errorMessage
      });
  }
}
