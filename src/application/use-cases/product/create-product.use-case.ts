import { IProductRepository } from '../../../domain/product/product.repository'; // Importe a interface do repositório
import { Product } from '../../../domain/product/product.entity'; // Importe a entidade do usuário
import { CreateProductDto } from '../../../presentations/product/dto/create-product.dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: CreateProductDto): Promise<Product> {
    const product = new Product(
      data.id,
      data.name,
      data.type,
      data.price,
      data.description,
      data.image,
    );
    return await this.productRepository.create(product);
  }
}
