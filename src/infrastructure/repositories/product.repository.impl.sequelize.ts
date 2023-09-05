import { IProductRepository } from '../../domain/product/product.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ProductModel } from '../models/product.model';
import { Product } from '../../domain/product/product.entity';
import { UpdateProductDto } from '../../presentations/product/dto/update-product.dto';

@Injectable()
export class ProductRepositorySequelize implements IProductRepository {
  //Repository
  constructor(
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async create(product: Product): Promise<Product> {
    const newProduct = await this.productModel.create(product);
    product.id = newProduct.id;
    product.name = newProduct.name;
    product.type = newProduct.type;
    product.price = newProduct.price;
    product.description = newProduct.description;
    product.image = newProduct.image;
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await product.update(updateProductDto);

    return product;
  }

  async delete(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await product.destroy();

    return product;
  }

  async findByPk(id: number): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    const productsModels = await this.productModel.findAll();
    return productsModels.map(
      (productModel) =>
        new Product(
          productModel.id,
          productModel.name,
          productModel.type,
          productModel.price,
          productModel.description,
          productModel.image,
        ),
    );
  }

  async findByType(type: string): Promise<Product[]> {
    const productList = await this.productModel.findAll({
      where: {
        type: type,
      },
    });

    if (!productList) {
      throw new NotFoundException('Categoria invláida');
    }

    return productList.map(
      (productModel) =>
        new Product(
          productModel.id,
          productModel.name,
          productModel.type,
          productModel.price,
          productModel.description,
          productModel.image,
        ),
    );
  }
}
