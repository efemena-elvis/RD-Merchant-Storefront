// index.ts
import { defineStore } from "pinia";
import * as state from "./state";
import * as getters from "./getters";
import * as actions from "./actions";
import { useStorefrontMutations } from "./mutations";

export const useStorefrontStore = defineStore("storefront", () => {
  const mutations = useStorefrontMutations();

  return {
    ...state,
    ...getters,
    ...mutations,
    ...actions,
  };
});
