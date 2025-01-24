import { computed } from "vue";
import {
  productCategories,
  storeProducts,
  productsInCart,
  productsInWishList,
  productsInOrdersList,
} from "./state";

export const getProductCategories = computed(() => productCategories.value);
export const getStoreProducts = computed(() => storeProducts.value);
export const getProductsInCart = computed(() => productsInCart.value);
export const getProductsInWishList = computed(() => productsInWishList.value);
export const getProductsInOrdersList = computed(
  () => productsInOrdersList.value
);
