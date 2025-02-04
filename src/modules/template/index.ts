import { IRouteType } from "@/models/route-type";

// *********** STOREFRONT TEMPLATE ROUTES *********** //
const templateRoutes: IRouteType[] = [
  {
    path: "/:storefrontName",
    component: () =>
      import(
        /* webpackChunkName: "template-module" */ "@/modules/template/layouts/template-layout-one.vue"
      ),
    children: [
      {
        path: "",
        name: "storefrontHome",
        component: () =>
          import(
            /* webpackChunkName: "template-module" */ "@/modules/template/pages/storefront-home.vue"
          ),
        meta: {
          open: true,
          title: "Storefront",
        },
      },

      {
        path: "/:storefrontName/store-checkout",
        name: "storefrontCheckout",
        component: () =>
          import(
            /* webpackChunkName: "template-module" */ "@/modules/template/pages/storefront-checkout.vue"
          ),
        meta: {
          open: true,
          title: "Storefront Checkout",
        },
      },

      {
        path: "/:storefrontName/checkout-success",
        name: "storefrontCheckoutSuccess",
        component: () =>
          import(
            /* webpackChunkName: "template-module" */ "@/modules/template/pages/storefront-checkout-success.vue"
          ),
        meta: {
          open: true,
          title: "Storefront Checkout Success",
        },
      },
    ],
  },
];

export default templateRoutes;
