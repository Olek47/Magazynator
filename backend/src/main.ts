import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import path from 'path'
import fs from 'fs'

export const UPLOAD_PATH = path.join(__dirname, '..', 'uploads')

async function bootstrap() {
  if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH, { recursive: true })
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix('/api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  app.useStaticAssets(UPLOAD_PATH, {
    prefix: '/uploads/',
  })

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
