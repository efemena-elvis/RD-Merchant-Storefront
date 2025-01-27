export interface IProductItem {
  amount: number;
  category: string;
  created_at: string;
  description: string;
  id: string;
  image: string;
  name: string;
  stock: number;
  store_id: string;
  updated_at: string;
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
