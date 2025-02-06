import {
  storeDetails,
  storeProducts,
  productCategories,
  productsInCart,
  productsInWishList,
} from "./state";
import { storefrontNiches } from "@/shared/constants/storefront-niches";
import { useStorage } from "@/shared/composables/useStorage";
import { IProductItem } from "@/models/product-type";
import { IStoreItem } from "@/models/store-type";
import constants from "@/utilities/constants";

const { setStorage } = useStorage();
const { REDSTONE_STOREFRONT_TOKEN } = constants;

export function useStorefrontMutations() {
  const populateStoreDetails = (storeData: IStoreItem) => {
    // 1. Persist store details
    storeDetails.value = storeData;

    // 2. Extract product categories
    const niche = storefrontNiches.find((n) => n.slug === storeData.tag);

    const categories = niche?.categories || [];

    productCategories.value = [
      {
        id: categories.length + 1,
        name: "All Categories",
        slug: "all",
      },
      ...categories,
    ];

    // 3. Persist store details
    setStorage({
      storage_name: REDSTONE_STOREFRONT_TOKEN,
      storage_type: "object",
      storage_value: storeData,
    });
  };

  const populateStoreProducts = (products: IProductItem[]) => {
    // 1. Persist product details
    storeProducts.value = products;
  };

  const toggleProductInCart = (product: IProductItem) => {
    const cartProducts = productsInCart.value;

    if (cartProducts.some((item) => item.id === product.id)) {
      cartProducts.splice(cartProducts.indexOf(product), 1);
    } else {
      cartProducts.push({ ...product, quantityInCart: 1 });
    }
  };

  const updateProductCartQuantity = (
    productId: string,
    quantityInCart: number
  ) => {
    const cartProducts = productsInCart.value;

    productsInCart.value = cartProducts.map((item) =>
      item.id === productId ? { ...item, quantityInCart } : item
    );
  };

  const toggleProductInWishlist = (product: IProductItem) => {
    const wishlistProducts = productsInWishList.value;

    if (wishlistProducts.some((item) => item.id === product.id)) {
      wishlistProducts.splice(wishlistProducts.indexOf(product), 1);
    } else {
      wishlistProducts.push(product);
    }
  };

  return {
    populateStoreDetails,
    populateStoreProducts,
    toggleProductInCart,
    updateProductCartQuantity,
    toggleProductInWishlist,
  };
}
