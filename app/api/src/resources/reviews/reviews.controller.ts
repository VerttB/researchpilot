import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { type UUID } from 'crypto';
import type { Request } from 'express';
import { CurrentUser } from '../../helpers/decorators/currentUser.decorator';
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @CurrentUser('sub') userId: UUID) {
    return this.reviewsService.create(createReviewDto, userId);
  }

  @Get()
  findAll( @CurrentUser('sub') userId: UUID) {
    return this.reviewsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: UUID, @CurrentUser('sub') userId: UUID) {
    return this.reviewsService.findOne(id,userId);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateReviewDto: UpdateReviewDto,  @CurrentUser('sub') userId: UUID) {
   
    return this.reviewsService.update(id, updateReviewDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID, @CurrentUser('sub') userId: UUID) {
    return this.reviewsService.remove(id, userId);
  }
}
