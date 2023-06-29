export class CreateProductDto {
  id: number;
  name: string;
  type: string; //Categoria {Lanhce, Acompanhamento, Bebida, Sobremesa}
  price: number;
  description: string;
  image: string; //Blob storage
}
