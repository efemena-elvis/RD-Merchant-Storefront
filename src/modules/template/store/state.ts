import { ref } from "vue";
import { useStorage } from "@/shared/composables/useStorage";
import { IProductCategory } from "@/models/product-type";
// import { mockProducts } from "@/mock-payload/mock-products";
import { IProductItem, IProductItemCart } from "@/models/product-type";
import { IStoreItem } from "@/models/store-type";
import constants from "@/utilities/constants";

const { getStorage } = useStorage();
const { REDSTONE_STOREFRONT_TOKEN } = constants;

export const storeDetails = ref<IStoreItem | null>(
  (() => {
    const storedData = getStorage({
      storage_name: REDSTONE_STOREFRONT_TOKEN,
      storage_type: "object",
    });

    // Ensure the data is of type IStoreItem
    if (
      storedData &&
      typeof storedData === "object" &&
      isIStoreItem(storedData)
    ) {
      return storedData as IStoreItem; // Safely cast it
    }

    return null;
  })()
);

export const storeProducts = ref<IProductItem[]>([]);

export const productCategories = ref<IProductCategory[]>([
  { id: 1, slug: "all", name: "All categories" },
]);

export const productsInCart = ref<IProductItemCart[]>([]);
export const productsInWishList = ref<IProductItem[]>([]);
export const productsInOrdersList = ref<IProductItem[]>([]);

function isIStoreItem(data: object): data is IStoreItem {
  // Check if all required fields exist in the object
  return (
    "address" in data &&
    "business_id" in data &&
    "created_at" in data &&
    "currency" in data &&
    "description" in data &&
    "email" in data &&
    "facebook" in data &&
    "id" in data &&
    "instagram" in data &&
    "logo" in data &&
    "name" in data &&
    "phone_number" in data &&
    "slug" in data &&
    "tag" in data &&
    "tikTok" in data &&
    "twitter" in data &&
    "updated_at" in data
  );
}
