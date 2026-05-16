import { HttpExceptionFilter } from "@/helpers/filters/exceptions.filter";
import { ValidationPipe } from "@nestjs/common";
import { INestApplication } from "@nestjs/common/interfaces";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

export function setDefaultConfig(app: INestApplication<any>){
    app.useGlobalPipes(new ValidationPipe())
    app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter())
   const config = new DocumentBuilder()
    .setTitle('Research Pilot')
    .setDescription('The Research Pilot API description')
    .setVersion('1.0')
    .addTag('ResearchPilot')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

}