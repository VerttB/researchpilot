import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UUID } from 'crypto';
import { Review } from '../../../generated/prisma/browser';
@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService){}
  async create(createReviewDto: CreateReviewDto, ownerId: UUID) {
    const newReview = await this.prisma.review.create({
      data: {...createReviewDto, ownerId},
      
      
    })

    return newReview
  }

  async findAll(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany();
    return reviews || []
  }

  async findOne(id: UUID): Promise<Review | null> {
    const review = await this.prisma.review.findFirst({
      where: {
        id: id
      }
    })

    return review || null
  }

  async update(id: UUID, updateReviewDto: UpdateReviewDto, ownerId: UUID): Promise<Review> {
    return await this.prisma.review.update({
      where: {
        id: id,
        ownerId: ownerId
      },
      data: updateReviewDto
    })
  }

  async remove(id: UUID, ownerId: UUID) {
    return this.prisma.review.delete({
      where: {
        id: id,
        ownerId: ownerId
      }
    })
  }
}
