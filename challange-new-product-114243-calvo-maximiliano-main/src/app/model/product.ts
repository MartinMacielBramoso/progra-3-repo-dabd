export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  inventories: Stock[] = [];
  timeFraction: number = 0;
  nameEncoded: string = '';
  productType: string = '';
}

export class Stock {
  id: number = 0;
  location: string = '';
  count: number = 0;
}
