import { IProductRepository } from '../../../domain/product/product.repository'; // Importe a interface do repositório
import { Product } from '../../../domain/product/product.entity'; // Importe a entidade do usuário

export class FindProductByTypeUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(type: string): Promise<Product[]> {
    return await this.productRepository.findByType(type);
  }
}
