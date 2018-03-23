import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './IErrorMessages';

export const errorMessages: { [messageCode: string]: IErrorMessages } = {
  'user:notFound': {
    type: 'notFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'Unable to found the user with the provided information.',
    userMessage: 'No users found with the provided information.',
  },
  'request:unauthorized': {
    type: 'unauthorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Access unauthorized.',
    userMessage: 'Unauthorized access.',
  },
  'request:forbidden': {
    type: 'forbidden',
    httpStatus: HttpStatus.FORBIDDEN,
    errorMessage: 'Access forbidden.',
    userMessage: 'Your do not access to tis resource',
  },
  'auth:login:missingEmail': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the user without email.',
    userMessage: 'Please enter your e-mail.',
  },
  'auth:login:missingPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to connect the user without password.',
    userMessage: 'Please enter your password.',
  },
};
