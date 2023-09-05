import { IProductRepository } from '../../../domain/product/product.repository'; // Importe a interface do repositório
import { Product } from '../../../domain/product/product.entity'; // Importe a entidade do usuário

export class FindOneProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: number): Promise<Product> {
    return await this.productRepository.findByPk(id);
  }
}
