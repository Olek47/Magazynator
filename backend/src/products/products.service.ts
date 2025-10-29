import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import path from 'path'
import fs from 'fs'
import { UPLOAD_PATH } from 'src/main'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto)
    return this.productRepository.save(product)
  }

  async findAll(query: {
    search?: string
    minStock?: number
    maxStock?: number
  }): Promise<Product[]> {
    const { search, minStock, maxStock } = query

    const qb = this.productRepository.createQueryBuilder('product')

    if (search) {
      qb.where(
        '(LOWER(product.name) LIKE :search OR LOWER(product.code) LIKE :search)',
        {
          search: `%${search.toLowerCase()}%`,
        },
      )
    }

    if (minStock !== undefined && !isNaN(minStock)) {
      qb.andWhere('product.quantity >= :minStock', { minStock })
    }

    if (maxStock !== undefined && !isNaN(maxStock)) {
      qb.andWhere('product.quantity <= :maxStock', { maxStock })
    }

    qb.orderBy('product.name', 'ASC')
    return qb.getMany()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }
    return product
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    })
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }
    return this.productRepository.save(product)
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }
    if (product.imageFile) {
      this.deleteImageFromUploads(product.imageFile)
    }
    await this.productRepository.remove(product)
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id })
    if (!product) {
      this.deleteImageFromUploads(file.filename)
      throw new NotFoundException(`Product with ID "${id}" not found`)
    }
    if (product.imageFile) {
      this.deleteImageFromUploads(product.imageFile)
    }
    product.imageFile = file.filename
    return this.productRepository.save(product)
  }

  private deleteImageFromUploads(filename: string): void {
    const filePath = path.join(UPLOAD_PATH, filename)
    if (!filePath.startsWith(UPLOAD_PATH)) {
      Logger.warn(`Blocked file removal outside upload directory: ${filePath}`)
      return
    }
    try {
      fs.unlinkSync(filePath)
    } catch (e) {
      Logger.warn(e)
    }
  }
}
