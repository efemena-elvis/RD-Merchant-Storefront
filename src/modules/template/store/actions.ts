import $api from "@/shared/composables/useServiceAPI";
import { useStorefrontMutations } from "./mutations";
import { storeRoutes } from "./store-routes";
import { IAPIType } from "@/models/api-type";

const { populateStoreDetails, populateStoreProducts } =
  useStorefrontMutations();

const getQueryParam = (payload: any) => {
  return payload.domain
    ? `domain=${payload.domain.trim()}`
    : `slug=${payload.slug.trim()}`;
};

export const getStorefrontDetails = async (payload: any): Promise<IAPIType> => {
  const response: any = await $api.fetch(
    `${storeRoutes.getStorefront}?${getQueryParam(payload)}`
  );

  if (response.code === 200) populateStoreDetails(response.data);

  return response;
};

export const getStorefrontProducts = async (
  payload: any
): Promise<IAPIType> => {
  const response: any = await $api.fetch(
    `${storeRoutes.getStoreProducts}?${getQueryParam(payload)}`
  );

  if (response.code === 200) populateStoreProducts(response.data);

  return response;
};

export const initiateStorefrontCheckout = async ({
  payload,
  businessId,
}: any) => {
  return await $api.push(`${storeRoutes.initiateCheckout}`, {
    payload,
    customHeaders: { "business-id": businessId },
  });
};

export const placeStorefrontCheckoutOrder = async (payload: any) => {
  return await $api.push(`${storeRoutes.placeCheckoutOrder}`, {
    payload,
  });
};

export const searchStorefrontProducts = async (payload: any) => {
  const response: any = await $api.fetch(
    `${storeRoutes.searchProducts}?${getQueryParam(payload)}&keywords=${payload.keywords}`
  );

  if (response.code === 200) populateStoreProducts(response.data);

  return response;
};
