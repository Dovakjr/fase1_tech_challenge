import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductUseCase } from 'src/application/use-cases/product/create-product.use-case';
import { FindAllProductsUseCase } from 'src/application/use-cases/product/find-all-products.use-case';
import { FindOneProductUseCase } from 'src/application/use-cases/product/find-one-products.use-case';
import { FindProductByTypeUseCase } from 'src/application/use-cases/product/find-product-by-type.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/product/update-product.use-case';
import { DeleteProductUseCase } from 'src/application/use-cases/product/delete-product.use-case';
import { UsecaseProxyModule } from 'src/infrastructure/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecase-proxy/usecase-proxy';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_PRODUCT_USE_CASE)
    private readonly createProductUseCaseProxy: UseCaseProxy<CreateProductUseCase>,
    @Inject(UsecaseProxyModule.FIND_ALL_PRODUCTS_USE_CASE)
    private readonly findAllProductsUseCaseProxy: UseCaseProxy<FindAllProductsUseCase>,
    @Inject(UsecaseProxyModule.FIND_ONE_PRODUCT_USE_CASE)
    private readonly findOneProductUseCaseProxy: UseCaseProxy<FindOneProductUseCase>,
    @Inject(UsecaseProxyModule.FIND_PRODUCT_BY_TYPE_USE_CASE)
    private readonly findProductByTypeUseCaseProxy: UseCaseProxy<FindProductByTypeUseCase>,
    @Inject(UsecaseProxyModule.UPDATE_PRODUCT_USE_CASE)
    private readonly updateProductUseCaseProxy: UseCaseProxy<UpdateProductUseCase>,
    @Inject(UsecaseProxyModule.DELETE_PRODUCT_USE_CASE)
    private readonly deleteProductUseCaseProxy: UseCaseProxy<DeleteProductUseCase>,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCaseProxy
      .getInstance()
      .execute(createProductDto);
  }

  @Get()
  findAll() {
    return this.findAllProductsUseCaseProxy.getInstance().execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneProductUseCaseProxy.getInstance().execute(+id);
  }

  @Get('/type/:id')
  findByType(@Param('id') type: string) {
    return this.findProductByTypeUseCaseProxy.getInstance().execute(type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.updateProductUseCaseProxy
      .getInstance()
      .execute(+id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.deleteProductUseCaseProxy.getInstance().execute(+id);
  }
}
