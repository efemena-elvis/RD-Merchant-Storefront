import { ref } from "vue";
import { useStorage } from "@/shared/composables/useStorage";
import { IProductCategory } from "@/models/product-type";
import { mockProducts } from "@/mock-payload/mock-products";
import { IProductItem, IProductItemCart } from "@/models/product-type";

const { getStorage } = useStorage();

export const productCategories = ref<IProductCategory[]>([
  { id: 1, slug: "all", name: "All categories" },
  { id: 2, slug: "clothing", name: "Clothing" },
  { id: 3, slug: "electronics", name: "Electronics" },
  { id: 4, slug: "home-cleaning", name: "Home & Cleaning" },
  { id: 5, slug: "furniture", name: "Furniture" },
  { id: 6, slug: "groceries", name: "Groceries" },
  { id: 7, slug: "food", name: "Food" },
  { id: 8, slug: "drinks", name: "Drinks" },
]);

export const storeProducts = ref<IProductItem[]>(mockProducts);

export const productsInCart = ref<IProductItemCart[]>([]);
export const productsInWishList = ref<IProductItem[]>([]);
export const productsInOrdersList = ref<IProductItem[]>([]);
