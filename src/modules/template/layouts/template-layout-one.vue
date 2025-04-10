<template>
  <div>
    <!-- TOP BAR -->
    <TopBar />

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, onMounted, watch } from "vue";
import { Emitter } from "mitt";
import { useRoute, useRouter } from "vue-router";
import { useStorefrontStore } from "@/modules/template/store";
import useEvents from "@/shared/composables/useEvents";
import TopBar from "@/modules/template/components/template-comp-one/top-bar.vue";
import Footer from "@/modules/template/components/template-comp-one/footer.vue";
import constants from "@/utilities/constants";

type Events = {
  hidePageLoader: void;
  showPageLoader: void;
};

const eventBus = inject<Emitter<Events>>("eventBus");

const route = useRoute();
const router = useRouter();

const { processAPIRequest } = useEvents();
const { getStorefrontDetails, getStorefrontProducts } = useStorefrontStore();

const fetchAllStorefrontProducts = async (payload: any) => {
  await processAPIRequest({
    action: getStorefrontProducts,
    payload,
    showAlert: false,
  });
};

// FETCH STOREFRONT DETAILS
const fetchStorefrontDetails = async (payload: any) => {
  eventBus?.emit("showPageLoader");

  const response = await processAPIRequest({
    action: getStorefrontDetails,
    payload,
    showAlert: false,
  });

  if (response.code === 200) {
    fetchAllStorefrontProducts(payload);
    eventBus?.emit("hidePageLoader");
  }

  // REDIRECT_TO_AN ERROR_PAGE
  else {
    router.push({ name: "NotFoundError" });
  }
};

watch(
  () => route,
  () => {
    const defaultOrigins = [
      "http://localhost:8010",
      "https://store.redstonepgs.com",
    ];

    if (defaultOrigins.includes(location.origin)) {
      // Check if route param exists
      if (route.params.storefrontName) {
        fetchStorefrontDetails({ slug: route.params.storefrontName });
      }
      // Redirect to 404 page
      else {
        router.push({ name: "NotFoundError" });
      }
    } else {
      fetchStorefrontDetails({ domain: location.hostname });
    }
  },
  { immediate: true }
);
</script>

<style lang="css" scoped></style>
