<template>
  <div class="template-wrapper-one">
    <!-- CATEGORY ROW -->
    <CategoryRow :productCategories="getProductCategories" />

    <!-- HERO BANNER -->
    <!-- <HeroBanner /> -->

    <!-- PRODUCT ROW (TRENDING) -->
    <!-- <ProductRow
      sectionTitle="Trending Products"
      :productList="getStoreProducts.slice(0, 4)"
    /> -->

    <!-- PRODUCT ROW (ALL PRODUCTS) -->
    <ProductRow
      :sectionTitle="productSectionTitle"
      :productList="getStoreProducts"
      :isLoading="isProductLoading"
    />

    <!-- NEWSLETTER BLOCK -->
    <!-- <NewsletterBlock /> -->

    <!-- STORE PERKS -->
    <!-- <StorePerks /> -->

    <!-- BASE NAVBAR -->
    <div class="base-navbar">
      <div class="app-container">
        <div class="nav-row">
          <!-- <div class="nav-item">
            <div class="nav-item--top">
              <div class="icon icon-user"></div>
            </div>
            <div class="nav-item--bottom">Account</div>
          </div> -->

          <div class="nav-item" @click="toggleOrdersDialog">
            <div class="nav-item--top">
              <div class="icon icon-directbox-notif"></div>
            </div>
            <div class="nav-item--bottom">Orders</div>
          </div>

          <div class="nav-item" @click="toggleSavedDialog">
            <div class="nav-item--top">
              <div class="icon icon-heart-outline"></div>
            </div>
            <div class="nav-item--bottom">Saved</div>
          </div>

          <div class="nav-item" @click="toggleCartDialog">
            <div class="nav-item--top">
              <div class="icon icon-shopping-bag"></div>
            </div>
            <div class="nav-item--bottom">Cart</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <teleport to="body" v-if="showCartDialog">
    <CartDialog @closeTriggered="toggleCartDialog" />
  </teleport>

  <teleport to="body" v-if="showSavedDialog">
    <SavedDialog @closeTriggered="toggleSavedDialog" />
  </teleport>

  <teleport to="body" v-if="showOrdersDialog">
    <OrdersDialog @closeTriggered="toggleOrdersDialog" />
  </teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import CategoryRow from "@/modules/template/components/template-comp-one/category-row.vue";
import HeroBanner from "@/modules/template/components/template-comp-one/hero-banner.vue";
import ProductRow from "@/modules/template/components/template-comp-one/product-row.vue";
import NewsletterBlock from "@/modules/template/components/template-comp-one/newsletter-block.vue";
import StorePerks from "@/modules/template/components/template-comp-one/store-perks.vue";

import CartDialog from "@/modules/template/dialogs/template-dialog-one/cart-dialog.vue";
import SavedDialog from "@/modules/template/dialogs/template-dialog-one/saved-dialog.vue";
import OrdersDialog from "@/modules/template/dialogs/template-dialog-one/orders-dialog.vue";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";

const route = useRoute();

const isProductLoading = ref<boolean>(true);
const productSectionTitle = ref<string>("All Products");

const { getProductCategories, getStoreProducts } =
  storeToRefs(useStorefrontStore());

const showCartDialog = ref<boolean>(false);
const showSavedDialog = ref<boolean>(false);
const showOrdersDialog = ref<boolean>(false);

const toggleCartDialog = () => {
  showCartDialog.value = !showCartDialog.value;
};

const toggleSavedDialog = () => {
  showSavedDialog.value = !showSavedDialog.value;
};

const toggleOrdersDialog = () => {
  showOrdersDialog.value = !showOrdersDialog.value;
};

watch(
  () => [getProductCategories.value, getStoreProducts.value],
  ([categories, products]) => {
    if (categories.length && products.length) {
      isProductLoading.value = false;
    } else if (!categories.length && !products.length) {
      isProductLoading.value = false;
    } else {
      isProductLoading.value = true;
    }
  },
  { immediate: true }
);

watch(
  () => route.query,
  (value) => {
    // HANDLE SEARCH QUERY
    if (value.search) {
      productSectionTitle.value = `Search Results for "${value.search}"`;
    }

    // HANDLE CATEGORY QUERY
    else if (value.category) {
      productSectionTitle.value = `Category: ${getProductCategories.value.find((category) => category.slug === value.category)?.name || "All categories"}`;
    }

    // HANDLE EMPTY QUERY
    else {
      productSectionTitle.value = "All Products";
    }

    isProductLoading.value = true;

    setTimeout(() => {
      isProductLoading.value = false;
    }, 1000);
  }
);
</script>

<style lang="scss" scoped>
.template-wrapper-one {
  @apply relative mt-[107px] mdLg:mt-[88px] xs:mt-[92px];

  .base-navbar {
    @apply fixed bottom-0 left-0 w-full bg-neutral-10 py-5 hidden sm:block shadow-md border-t-2 border-[#f5f5f5];

    .nav-row {
      @apply flex flex-nowrap justify-around items-center gap-x-3;

      .nav-item {
        @apply relative flex flex-col justify-start items-center gap-y-1.5 cursor-pointer;

        &--top {
          .icon {
            @apply text-[19px] text-grey-600 transition duration-300 ease-in-out;
          }
        }

        &--bottom {
          @apply text-[13px]  font-medium text-grey-500 transition duration-300 ease-in-out;
        }
      }
    }
  }
}
</style>
