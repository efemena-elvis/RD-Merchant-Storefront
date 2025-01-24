export interface IProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
  currency: string;
  amount: number;
  category: IProductCategory;
  quantity: number;
  rating: number;
}

export interface IProductList {
  sectionTitle: string;
  productList: IProductItem[];
  isLoading: boolean;
}

export interface IProductCategory {
  id: number;
  slug: string;
  name: string;
}

export interface IProductItemCart extends IProductItem {
  quantityInCart?: number;
}
