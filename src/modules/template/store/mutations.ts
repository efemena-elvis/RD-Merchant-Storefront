import axios from "axios";
import { productsInCart, productsInWishList } from "./state";
import { useStorage } from "@/shared/composables/useStorage";
import { IProductItem } from "@/models/product-type";

const { setStorage } = useStorage();

export function useStorefrontMutations() {
  const toggleProductInCart = (product: IProductItem) => {
    const cartProducts = productsInCart.value;

    if (cartProducts.some((item) => item.id === product.id)) {
      cartProducts.splice(cartProducts.indexOf(product), 1);
    } else {
      cartProducts.push(product);
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
    toggleProductInCart,
    updateProductCartQuantity,
    toggleProductInWishlist,
  };
}
