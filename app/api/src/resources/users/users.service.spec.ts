import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { randomUUID } from 'crypto';

describe('UsersService', () => {
  let service: UsersService;
  const prismaMock = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Should create user", async () => {
    const newUser = {
      id: randomUUID(),
      email:"test@gmail.com",
      password:"1234"
    }

    prismaMock.user.create.mockResolvedValue(newUser)
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: newUser
    });


  })
});
