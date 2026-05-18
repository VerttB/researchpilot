import { IsNotEmpty, IsUUID } from "class-validator";
import {type UUID } from "crypto";

export class TokenPayloadDto{
    @IsUUID()
    id!: UUID;
    @IsNotEmpty()
    email!: string;
}