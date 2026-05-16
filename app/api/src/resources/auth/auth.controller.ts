import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SkipAuth } from '@/helpers/decorators/skipauth.decorator';
import type { Response } from 'express';
import { cookieConfig } from '@/helpers/common/cookies.config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const token  = await this.authService.signIn(signInDto);
    res.cookie('access_token', token, cookieConfig)
    res.send({message: token})
    return { message: token}
  }
  @SkipAuth()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const token = await this.authService.signUp(signUpDto)
    res.cookie('access_token', token, cookieConfig)
    res.send({token})
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Get('refresh')
  async refresh() {
    return this.authService.refresh();
  }
}
