import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy} from "@nestjs/passport";
import { Injectable,  } from '@nestjs/common';
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { TokenPayloadDto } from "../dto/token-payload.dto";
import { UsersService } from "@/resources/users/users.service";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh"){
    constructor(configService: ConfigService, private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies?.Refresh
            ]),
            secretOrKey: configService.getOrThrow("JWT_REFRESH_SECRET"),
            passReqToCallback: true,
        });

    }
        
    async validate(request: Request, payload: TokenPayloadDto) {
        return this.authService.verifyUserRefreshToken(request.cookies.refresh, payload.id)
    }
}