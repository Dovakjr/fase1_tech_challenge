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
    await this.ProductPort.create(product);
    return product;
  }

  findAll() {
    const productList = this.ProductPort.findAll();
    return productList;
  }

  async findByPk(id: number) {
    const product = await this.ProductPort.findByPk(id);
    return product;
  }

  async findByType(type: string) {
    const productList = await this.ProductPort.findByType(type);
    return productList;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.ProductPort.update(id, updateProductDto);
  }

  delete(id: number) {
    return this.ProductPort.delete(id);
  }
}
