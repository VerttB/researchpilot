import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './resources/users/users.module';
import { ReviewsModule } from './resources/reviews/reviews.module';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), PrismaModule, UsersModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
