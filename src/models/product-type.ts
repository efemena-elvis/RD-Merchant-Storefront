export interface IProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
  currency: string;
  amount: string;
  quantity: number;
  rating: number;
  isFavorite: boolean;
}

export interface IProductList {
  sectionTitle: string;
  productList: IProductItem[];
}
