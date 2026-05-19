import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response, response } from 'express';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UUID } from 'crypto';
import { cookieConfig } from '@/helpers/common/cookies.config';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '@generated/prisma/enums';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService) { }


    async verifyUser({ email, password }: SignInDto) {
        const user = await this.userService.findByEmail(email);
        const authenticated = argon2.verify(user.passwordHash, password)

        if (!authenticated) {
            throw new UnauthorizedException("Invalid Email or Password")
        }
        return {
            email: user.email,
            id: user.id
        }
    }


    async register(signUpDto: SignUpDto) {
        const passwordHash = await argon2.hash(signUpDto.password);
        const user: CreateUserDto = {
            email: signUpDto.email,
            passwordHash: passwordHash,
            role: Role.USER
        }
        const newUser = await this.userService.create(user);
      
        return true

    }
    async login(user: { id: UUID, email: string }, res: Response) {
        const expireAcessToken = new Date();
        expireAcessToken.setMilliseconds(
            expireAcessToken.getTime() + parseInt(this.configService.getOrThrow("JWT_EXPIRES_ACCESS_TOKEN")),
        );

        const tokenPayload: TokenPayloadDto = {
            id: user.id,
            email: user.email
        }

        const accessToken = this.jwtService.sign(tokenPayload, {
            secret: this.configService.getOrThrow("JWT_SECRET"),
            expiresIn: `${this.configService.getOrThrow("JWT_EXPIRES_ACCESS_TOKEN")}ms`
        }
        )

        res.cookie("Authentication", accessToken, {
            httpOnly: true,
            secure: this.configService.get("NODE_ENV") === "production",
            sameSite: "lax",
            expires: expireAcessToken
        })
    }
    async logout() { }
    async refresh() { }
}
