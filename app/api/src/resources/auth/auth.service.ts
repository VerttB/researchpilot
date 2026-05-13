import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService)
         {}
    
    async signUp(signUpDto: SignUpDto) {
        const passwordHash = await argon2.hash(signUpDto.password);
        const newUser = await this.prismaService.user.create({data: {...signUpDto, passwordHash: passwordHash}});
        const payload = { sub: newUser.id, email: newUser.email, role: newUser.role };
        const token = this.jwtService.sign(payload);

        return token

    }
    async signIn(signInDto: SignInDto) {
        const user = await this.userService.findByEmail(signInDto.email);
        if (!user) {
            throw new Error('User not found');
        }

        if (!await argon2.verify(user.passwordHash, signInDto.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);

        return token;
    }
    async logout() {}
    async refresh() {}
}
