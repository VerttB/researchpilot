import { Body, Controller, Get, HttpCode, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from '@/helpers/decorators/public.decorator';
import type { Response } from 'express';
import { LocalGuard } from './guard/local-auth.guard';
import { CurrentUser } from '@/helpers/decorators/currentUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @HttpCode(204)
  @Post('login')
  async login(@CurrentUser() user, @Res({ passthrough: true}) res: Response) {
    const token = await this.authService.login(user, res);
    return token
  }

  @Public()
  @Post('register')
  async register(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    await this.authService.register(signUpDto)
    
    res.send({ message: "User created"})
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
