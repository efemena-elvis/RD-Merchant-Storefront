import { computed } from "vue";
import {
  storeDetails,
  productCategories,
  storeProducts,
  productsInCart,
  productsInWishList,
  productsInOrdersList,
} from "./state";

export const getStoreDetails = computed(() => storeDetails.value);
export const getStoreProducts = computed(() => storeProducts.value);
export const getProductCategories = computed(() => productCategories.value);

export const getProductsInCart = computed(() => productsInCart.value);
export const getProductsInWishList = computed(() => productsInWishList.value);
export const getProductsInOrdersList = computed(
  () => productsInOrdersList.value
);
