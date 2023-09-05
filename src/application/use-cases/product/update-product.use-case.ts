import { IProductRepository } from '../../../domain/product/product.repository'; // Importe a interface do repositório
import { Product } from '../../../domain/product/product.entity'; // Importe a entidade do usuário
import { UpdateProductDto } from 'src/presentations/product/dto/update-product.dto';
export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productRepository.update(id, updateProductDto);
  }
}
