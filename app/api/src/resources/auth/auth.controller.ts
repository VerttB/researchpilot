import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SkipAuth } from '@/helpers/decorators/skipauth.decorator';
import type { Response } from 'express';
import { cookieConfig } from '@/helpers/common/cookies.config';
import { LocalGuard } from './guard/local.guard';
import { CurrentUser } from '@/helpers/decorators/currentUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@CurrentUser() user, @Res({ passthrough: true}) res: Response) {
    const token = await this.authService.login(user, res);
    return token
  }

  @SkipAuth()
  @Post('register')
  async register(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const token = await this.authService.register(signUpDto)
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
