import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(query: {
    search?: string;
    minStock?: number;
  }): Promise<Product[]> {
    const { search, minStock } = query;

    const qb = this.productRepository.createQueryBuilder('product');

    if (search) {
      qb.where(
        '(LOWER(product.name) LIKE :search OR LOWER(product.ean) LIKE :search)',
        {
          search: `%${search.toLowerCase()}%`,
        },
      );
    }

    if (minStock !== undefined && !isNaN(minStock)) {
      qb.andWhere('product.quantity >= :minStock', { minStock });
    }

    qb.orderBy('product.name', 'ASC');
    return qb.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
