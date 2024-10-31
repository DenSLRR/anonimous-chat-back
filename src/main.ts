import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("Chat api")
      .setDescription('API for chat')
      .setVersion('1.0')
      .addBearerAuth()
      .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
    // allowedHeaders: [
    //     'Content-Type',
    //     'Origin',
    //     'X-Requested-With',
    //     'Accept',
    //     'Authorization',
    //     'Cookie',
    // ],
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());
  await app.listen(3000);
  console.log('App listening on port 3000');
}
bootstrap();
