import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './resources/users/users.module';
import { ReviewsModule } from './resources/reviews/reviews.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './helpers/guards/auth/auth.guard';
import { AuthModule } from './resources/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), {
    module: PrismaModule,
    global: true
  }, JwtModule.registerAsync({
    inject: [ConfigService],
    global: true,
    useFactory: (config: ConfigService) => ({
      secret: config.get("JWT_SECRET"),
      signOptions: { expiresIn: '1h' },
    })
   
  }),
  
  UsersModule, ReviewsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
