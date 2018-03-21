import { Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import {MessageCodeError} from '../error/MessageCodeError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: MessageCodeError, response: any): any {
    const status = exception.httpStatus;

    response
      //.status(status)
      .status(HttpStatus.BAD_REQUEST)
      .json({
        statusCode: status,
        message: exception.errorMessage
      });
  }
}
