import {Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {MessageCodeError} from '../error/MessageCodeError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: any, response: any): any {
    const status = exception.httpStatus;
    console.log(exception);

    response
      //.status(status)
      .status(HttpStatus.BAD_REQUEST)
      .json({
        statusCode: status,
        message: exception.errorMessage
      });
  }
}
