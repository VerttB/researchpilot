import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import {  ReviewStatus } from "../../../../generated/prisma/client";

export class CreateReviewDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    description!: string
    
    @IsOptional()
    @IsEnum(ReviewStatus)
    status: ReviewStatus = ReviewStatus.IN_PROGRESS
}

