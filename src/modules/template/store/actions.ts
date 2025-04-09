import $api from "@/shared/composables/useServiceAPI";
import { useStorefrontMutations } from "./mutations";
import { storeRoutes } from "./store-routes";
import { IAPIType } from "@/models/api-type";

const nameSpace: string = "storefront";

const { populateStoreDetails, populateStoreProducts } =
  useStorefrontMutations();


  // const resolveStorefrontSlug = (): string => {
  //   if (typeof window === "undefined") return ""; 
  
  //   const { hostname, pathname } = window.location;
  

  //   const pathParts = pathname.split("/").filter(Boolean);
  //   if (pathParts.length > 0) {
  //     return pathParts[0];
  //   }
  

  //   const domainParts = hostname.split(".");
  //   const possibleSlug = domainParts[0];
  
  //   return possibleSlug;
  // };
  
  
  // const storefrontSlug = resolveStorefrontSlug();

export const getStorefrontDetails = async (payload: any): Promise<IAPIType> => {

const queryParameter = payload.domain ? `?domain=${payload.domain} ` : `?slug=${payload.slug}`
  const response: any = await $api.fetch(
    `${storeRoutes.getStorefront}${queryParameter}`
  );
  // console.log(response.data)

  if (response.code === 200) populateStoreDetails(response.data);

  return response;
};

export const getStorefrontProducts = async (
  payload: any
): Promise<IAPIType> => {
  const queryParameter = payload.domain ? `?domain=${payload.domain} ` : `?slug=${payload.slug}`
  const response: any = await $api.fetch(
    `${storeRoutes.getStoreProducts}${queryParameter}`
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
  const queryParameter = payload.domain ? `?domain=${payload.domain} ` : `?slug=${payload.slug}`
  const response: any = await $api.fetch(
    `${storeRoutes.searchProducts}${queryParameter}&keywords=${payload.keywords}`
  );

  if (response.code === 200) populateStoreProducts(response.data);

  return response;
};
