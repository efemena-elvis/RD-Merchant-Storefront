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
import { computed, inject, ref } from "vue";
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

const { getStorefrontDetails, getStorefrontProducts } = useStorefrontStore();

const defaultStorefrontDomain = ref<string>("store.redstonepgs.com");

const getCurrentBaseDomain = computed(() => window.location.origin);

const getStorefrontPayload = computed(() => {
  if (
    defaultStorefrontDomain.value === getCurrentBaseDomain.value ||
    getCurrentBaseDomain.value === "http://localhost:8010"
  ) {
    return {
      slug: route.params.storefrontName,
    };
  } else {
    return {
      domaian: getCurrentBaseDomain.value,
    };
  }
});

const fetchAllStorefrontProducts = async () => {
  await processAPIRequest({
    action: getStorefrontProducts,
    payload: getStorefrontPayload.value,
    showAlert: false,
  });
};

// FETCH STOREFRONT DETAILS
const fetchStorefrontDetails = async () => {
  eventBus?.emit("showPageLoader");

  const response = await processAPIRequest({
    action: getStorefrontDetails,
    payload: getStorefrontPayload.value,
    showAlert: false,
  });

  if (response.code === 200) {
    fetchAllStorefrontProducts();
    eventBus?.emit("hidePageLoader");
  }

  // REDIRECT_TO_AN ERROR_PAGE
  else {
    eventBus?.emit("hidePageLoader");
    router.push({ name: "NotFoundError" });
  }
};

fetchStorefrontDetails();

</script>

<style lang="css" scoped></style>
