import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy} from "@nestjs/passport";
import { Injectable,  } from '@nestjs/common';
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { TokenPayloadDto } from "../dto/token-payload.dto";
import { UsersService } from "@/resources/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService: ConfigService, private readonly usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies.Authentication
            ]),
            secretOrKey: configService.getOrThrow("JWT_SECRET")
        });

    }
        
    async validate(payload: TokenPayloadDto) {
        return this.usersService.findByEmail( payload.email);
    }
}