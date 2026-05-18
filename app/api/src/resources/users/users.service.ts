import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@generated/prisma/browser';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService){}


  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users || []
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(!user) {
      throw new NotFoundException("User Not Found")
    }
    return user;
  }

  async findOne(id: UUID): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where:{
        id: id
        } 
      }
    )
    if (!user) {
      throw new Error('User not found');
    }
    return user;
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
