import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setDefaultConfig } from './config/config.setter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setDefaultConfig(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
