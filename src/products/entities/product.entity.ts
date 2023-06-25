export class Product {
  id: number;
  name: string;
  type: string; //Categoria {Lanhce, Acompanhamento, Bebida, Sobremesa}
  price: number;
  description: string;
  image: string; //Blob storage

  constructor(
    id: number,
    name: string,
    type: string,
    price: number,
    description: string,
    image?: string,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
