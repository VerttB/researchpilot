import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { randomUUID } from 'crypto';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotFoundException } from '@nestjs/common';
import { ReviewStatus } from '@generated/prisma/enums';
import { PrismaService } from '@/prisma/prisma.service';
describe('ReviewsService', () => {
  let service: ReviewsService;
  const prismaMock = {
    review: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
};
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService, {
        provide: PrismaService,
        useValue: prismaMock,
      }],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

    it('should find reviews by ownerId', async () => {
    const ownerId = 'user-123' as any;

    prismaMock.review.findMany.mockResolvedValue([]);

    await service.findAll(ownerId);

    expect(prismaMock.review.findMany).toHaveBeenCalledWith({
      where: { ownerId },
    });
  });

  it('should return create one review', async () => {
    const ownerId = randomUUID()

    const createReviewDto: CreateReviewDto = {
    name: 'Teste Review',
    description: 'Review Teste',
    status: ReviewStatus.IN_PROGRESS,
  };

    const createdReviewMock = {
      id: randomUUID(),
      ...createReviewDto,
      ownerId,
      createdAt: new Date(),
      updatedAt: null,
  };
    prismaMock.review.create.mockResolvedValue(createdReviewMock)
    const result = await service.create(createReviewDto, ownerId);
    expect(prismaMock.review.create).toHaveBeenCalledWith({
    data: {
      ...createReviewDto,
      ownerId,
    },
  });
    expect(result).toEqual(createdReviewMock);
  })


  
  it('should throw NotFoundException when review does not exist for owner', async () => {
  prismaMock.review.findFirst.mockResolvedValue(null);

  await expect(
    service.findOne('review-id' as any, 'owner-id' as any),
  ).rejects.toThrow(NotFoundException);
});
});

