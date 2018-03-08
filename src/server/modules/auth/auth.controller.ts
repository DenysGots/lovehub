import { Controller, HttpStatus, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth')
  public async sign(@Request() req, @Response() res) {
    const body = req.body;
    if (!body) {
      throw new Error('Missing Information');
    }

    const token = await this.authService.sign(body);
    console.log(`Server AuthController send ${token}`);
    res.status(HttpStatus.ACCEPTED).json({ idToken : token });
  }
}
