import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '../../../generated/prisma/browser';
import { UUID } from 'crypto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[] | []> {
    const users = await this.prisma.user.findMany();
    return users || []
  }

  async findOne(id: UUID): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where:{
        id: id
        } 
      }
    )
    return user || null;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
        where: {id : id},
        data: updateUserDto
    }

  )
  }

  async remove(id: UUID) {
    await this.prisma.user.delete({
      where: {
        id:id
      }
    })
  }
}
