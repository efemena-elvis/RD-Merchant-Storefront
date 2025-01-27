import $api from "@/shared/composables/useServiceAPI";
import { useStorefrontMutations } from "./mutations";
import { storeRoutes } from "./store-routes";
import { IAPIType } from "@/models/api-type";

const nameSpace: string = "storefront";
const { populateStoreDetails, populateStoreProducts } =
  useStorefrontMutations();

export const getStorefrontBySlug = async (payload: any): Promise<IAPIType> => {
  const response: any = await $api
    .setBaseAPI(nameSpace)
    .fetch(`${storeRoutes.getStorefront}/?slug=${payload.storefrontSlug}`);

  if (response.code === 200) populateStoreDetails(response.data);

  return response;
};

export const getStorefrontProducts = async (
  payload: any
): Promise<IAPIType> => {
  const response: any = await $api
    .setBaseAPI(nameSpace)
    .fetch(`${storeRoutes.getStoreProducts}?slug=${payload.storefrontSlug}`);

  if (response.code === 200) populateStoreProducts(response.data);

  return response;
};
