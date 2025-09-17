import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ProductsService } from '../products.service'
import { Product } from '../entities/product.entity'
import { type Request } from 'express'

export interface ProductRequest extends Request {
  product: Product
}

@Injectable()
export class ProductExistsGuard implements CanActivate {
  constructor(private readonly productService: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ProductRequest>()
    const productId = request.params?.id

    if (!productId) {
      return false
    }

    const product = await this.productService.findOne(productId)
    request.product = product
    return true
  }
}
