import { Injectable, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductPortInterface } from './gateways/product-port-interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductPortInterface')
    private ProductPort: ProductPortInterface,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = new Product(
      createProductDto.id,
      createProductDto.name,
      createProductDto.type,
      createProductDto.price,
      createProductDto.description,
      createProductDto.image,
    );
    return await this.ProductPort.create(product);
  }

  findAll() {
    return this.ProductPort.findAll();
  }

  async findByPk(id: number) {
    return await this.ProductPort.findByPk(id);
  }

  async findByType(type: string) {
    return await this.ProductPort.findByType(type);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.ProductPort.update(id, updateProductDto);
  }

  delete(id: number) {
    return this.ProductPort.delete(id);
  }
}
