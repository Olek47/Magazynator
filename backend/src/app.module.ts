import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './products/products.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './products/entities/product.entity'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH ?? 'database.db',
      entities: [Product],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist'),
      exclude: ['/api{*test}'],
    }),
    ProductsModule,
  ],
})
export class AppModule {}
