import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy} from "@nestjs/passport";
import { Injectable,  } from '@nestjs/common';
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies.Authentication
            ]),
            secretOrKey: configService.getOrThrow("JWT_SECRET")
        });
    }
        
    async validate(email: string, password: string) {
        return ""
    }
}