import { IsEnum, IsNotEmpty } from "class-validator"
import {  reviewStatus } from "../../../../generated/prisma/client";

export class CreateReviewDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    description!: string
    
    @IsNotEmpty()
    @IsEnum(reviewStatus)
    status!: reviewStatus
}

