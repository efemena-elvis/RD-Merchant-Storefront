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
import { inject } from "vue";
import { Emitter } from "mitt";
import { useRoute, useRouter } from "vue-router";
import useEvents from "@/shared/composables/useEvents";
import TopBar from "@/modules/template/components/template-comp-one/top-bar.vue";
import Footer from "@/modules/template/components/template-comp-one/footer.vue";
import { useStorefrontStore } from "@/modules/template/store";

type Events = {
  hidePageLoader: void;
  showPageLoader: void;
};

const eventBus = inject<Emitter<Events>>("eventBus");

const route = useRoute();
const router = useRouter();

const { processAPIRequest } = useEvents();

const { getStorefrontBySlug, getStorefrontProducts } = useStorefrontStore();

const fetchAllStorefrontProducts = async () => {
  await processAPIRequest({
    action: getStorefrontProducts,
    payload: { storefrontSlug: route.params.storefrontName },
    showAlert: false,
  });
};

// FETCH STOREFRONT DETAILS
const fetchStorefrontDetails = async () => {
  eventBus?.emit("showPageLoader");

  const response = await processAPIRequest({
    action: getStorefrontBySlug,
    payload: { storefrontSlug: route.params.storefrontName },
    showAlert: false,
  });

  if (response.code === 200) {
    fetchAllStorefrontProducts();
    eventBus?.emit("hidePageLoader");
  }

  // REDIRECT_TO_AN ERROR_PAGE
  else router.push({ path: "/" });
};

fetchStorefrontDetails();
</script>

<style lang="css" scoped></style>
