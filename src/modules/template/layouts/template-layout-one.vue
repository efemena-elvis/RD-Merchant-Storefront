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

// const defaultStorefrontDomain = ref<string>("https://store.redstonepgs.com");

// const getCurrentBaseDomain = computed(() => window.location.origin);

// const getStorefrontPayload = computed(() => {
//   if (
//    getCurrentBaseDomain.value ===  defaultStorefrontDomain.value ||
//     getCurrentBaseDomain.value === "http://localhost:8010"
//   ) {
//     return {
//       slug: route.params.storefrontName,
//     };
//   } else {
//     return {
//       domain: getCurrentBaseDomain.value,
//     };
//   }
// });

// const storefrontPayload = getStorefrontPayload.value

// const fetchAllStorefrontProducts = async () => {
//   await processAPIRequest({
//     action: getStorefrontProducts,
//     payload: storefrontPayload,
//     showAlert: false,
//   });
// };

const defaultStorefrontDomain = ref<string>("https://storoapp.com");

const getCurrentBaseDomain = computed(() => window.location.origin);

const getStorefrontPayload = computed(() => {
  const origin = getCurrentBaseDomain.value;
  const baseDomain = new URL(defaultStorefrontDomain.value).hostname; 
  const currentHost = window.location.hostname; 

  if (origin === "http://localhost:8010") {
 
    return { slug: route.params.storefrontName || "" };
  }

  if (currentHost.endsWith(baseDomain)) {
   
    const subdomain = currentHost.replace(`.${baseDomain}`, "");
  
    return { slug: subdomain };
  }

  return { domain: origin };
});

const fetchAllStorefrontProducts = async () => {
  await processAPIRequest({
    action: getStorefrontProducts,
    payload: getStorefrontPayload.value, 
    showAlert: false,
  });
};


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
