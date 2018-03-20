import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {MessageCodeError} from '../error/MessageCodeError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: MessageCodeError, response: any): any {
    const status = exception.httpStatus;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.errorMessage
      });
  }
}
