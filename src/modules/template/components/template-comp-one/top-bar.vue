<template>
  <div class="top-bar" ref="topBarRef">
    <div class="app-container">
      <!-- LOGO AREA -->
      <div class="logo-area">
        <div
          class="brand-logo"
          :class="storeDetailsValidated.logo ? '' : 'opacity-45'"
        >
          <img
            :src="
              storeDetailsValidated.logo || renderImg('logo-placeholder.png')
            "
            :alt="storeDetailsValidated.name"
          />
        </div>
      </div>

      <template v-if="!showSimpleUI">
        <!-- SEARCH AREA -->
        <div class="search-area">
          <SearchBar />
        </div>

        <!-- OPTIONS AREA -->
        <div class="options-area">
          <!-- ACCOUNT -->
          <!-- <div class="option-item">
            <div class="option-item--top">
              <div class="icon icon-user"></div>
            </div>
            <div class="option-item--bottom">Account</div>
          </div> -->

          <!-- ORDERS -->
          <div class="option-item" @click="toggleOrdersDialog">
            <div class="option-item--top">
              <div class="icon icon-directbox-notif"></div>
            </div>
            <div class="option-item--bottom">Orders</div>
          </div>

          <!-- FAVOURITES -->
          <div class="option-item favourite" @click="toggleSavedDialog">
            <div class="option-pill" v-if="getProductsInWishList.length">
              {{ getProductsInWishList.length }}
            </div>

            <div class="option-item--top">
              <div class="icon icon-heart-outline"></div>
            </div>
            <div class="option-item--bottom">Saved</div>
          </div>

          <!-- CART -->
          <div class="option-item" @click="toggleCartDialog">
            <div class="option-pill" v-if="getProductsInCart.length">
              {{ getProductsInCart.length }}
            </div>

            <div class="option-item--top">
              <div class="icon icon-shopping-bag"></div>
            </div>
            <div class="option-item--bottom">Cart</div>
          </div>
        </div>

        <!-- CATEGORY OPTIONS AREA -->
        <div class="category-options">
          <CategoryDropdown :productCategories="getProductCategories" />
        </div>
      </template>

      <template v-if="showSimpleUI">
        <div class="back-button" @click="navigateToStorefront">
          <div class="icon icon-arrow-left"></div>
          <div class="text xs:hidden">Back to Storefront</div>
          <div class="text hidden xs:block">Storefront</div>
        </div>
      </template>
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
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CartDialog from "@/modules/template/dialogs/template-dialog-one/cart-dialog.vue";
import SavedDialog from "@/modules/template/dialogs/template-dialog-one/saved-dialog.vue";
import OrdersDialog from "@/modules/template/dialogs/template-dialog-one/orders-dialog.vue";
import SearchBar from "@/modules/template/components/template-comp-one/search-bar.vue";
import CategoryDropdown from "@/modules/template/components/template-comp-one/category-dropdown.vue";
import { useStorefrontStore } from "@/modules/template/store";
import { useString } from "@/shared/composables/useString";
import { storeToRefs } from "pinia";
import { storeDetails } from "../../store/state";

const { renderImg } = useString();

const route = useRoute();
const router = useRouter();

const topBarRef = ref<HTMLInputElement | null>(null);
const showSimpleUI = ref<boolean>(false);

const {
  getStoreDetails,
  getProductCategories,
  getProductsInCart,
  getProductsInWishList,
} = storeToRefs(useStorefrontStore());

const storeDetailsValidated = computed(() => {
  if (!getStoreDetails.value) {
    return {
      name: "Store Name",
      logo: "",
      slug: "",
    };
  }

  return getStoreDetails.value;
});

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

const getRoutePath = () => {
  const simpleUIRoutes = [
    `/${storeDetails.value?.slug}/store-checkout`,
    `/${storeDetails.value?.slug}/checkout-success`,
  ];
  showSimpleUI.value = simpleUIRoutes.includes(route.path);
};

const navigateToStorefront = () => {
  router.push(`/${storeDetails.value?.slug}`);
};

watch(route, () => getRoutePath(), { immediate: true });

onMounted(() => {
  window.onscroll = () => {
    topBarRef.value?.classList.toggle("scrolling-up", window.scrollY > 20);
  };
});
</script>

<style lang="scss" scoped>
.top-bar {
  @apply fixed top-0 left-0 w-full py-6 mdLg:py-5 border-b-[6px] sm:border-b-4 xs:border-b-[3px] bg-neutral-10 z-20 border-[#f5f5f5] transition duration-300 ease-in-out;

  .app-container {
    @apply flex flex-nowrap justify-between items-center transition duration-300 ease-in-out;

    .logo-area {
      @apply w-1/4 mdLg:w-auto;

      img {
        @apply h-[50px] mdLg:h-[44px] sm:h-[40px] xs:h-[38px] w-auto;
      }
    }

    .search-area {
      @apply w-[38%] lg:w-[32%] mdLg:hidden;

      .search-input {
        @apply w-full relative;

        .icon {
          @apply absolute left-[26px] lg:left-[20px] top-1/2 transform -translate-y-1/2 text-xl text-neutral-400 z-10;
        }

        .form-control {
          @apply w-full h-[54px] lg:h-[52px] rounded-[24px] pt-3 pb-3.5 px-4 pl-[62px] lg:pl-[50px] bg-[#f4f4f4] border border-neutral-50 placeholder:text-[15px] mdLg:placeholder:text-[14.5px] text-[15px] mdLg:text-[14.5px] hover:border-neutral-100 focus:border-neutral-100;
        }
      }
    }

    .options-area {
      @apply w-1/4 lg:w-[30%] flex sm:hidden justify-end items-center gap-x-9 lg:gap-x-7 mdLg:gap-x-8 sm:gap-x-[26px] xs:gap-x-6 xxs:gap-x-5;

      .option-item {
        @apply relative flex flex-col justify-start items-center gap-y-1 xs:gap-y-0.5 cursor-pointer;

        &--top {
          .icon {
            @apply text-[23px] lg:text-[21px] mdLg:text-[20px] sm:text-[21px] xs:text-[19px] text-grey-600 transition duration-300 ease-in-out;
          }
        }

        &--bottom {
          @apply text-[13.5px] sm:text-[13.25px] xs:text-[12.5px] font-medium text-grey-500 transition duration-300 ease-in-out;
        }

        &:hover {
          .option-item--top {
            .icon {
              @apply text-green-600;
            }
          }

          .option-item--bottom {
            @apply text-green-600;
          }
        }

        .option-pill {
          @apply absolute -top-2 -right-1 min-w-[18px] w-max h-[18px] py-0.5 px-1 rounded-full bg-green-600 flex justify-center items-center text-[10px] font-semibold text-neutral-10;
        }
      }

      .favourite {
        @apply sm:hidden;
      }
    }

    .category-options {
      @apply hidden sm:block w-auto;

      .category-list-dropdown {
        @apply flex flex-nowrap justify-end items-center gap-x-1.5 border border-grey-300 px-4 py-0 rounded-3xl w-max transition duration-300 ease-in-out hover:border-green-400;

        .form-control {
          @apply border-0 px-0;
        }

        .icon {
          @apply relative top-0.5 rotate-180;
        }
      }
    }

    .back-button {
      @apply rounded-full border border-grey-400/80 text-sm xs:text-[13.75px] text-grey-600 px-5 xs:px-4 py-2 xs:py-1.5 flex justify-center items-center gap-x-2 cursor-pointer transition duration-300 ease-in-out hover:bg-green-50 hover:border-green-500;

      .icon {
        @apply text-grey-700 text-xl;
      }
    }
  }
}

.scrolling-up {
  @apply py-4 lg:py-[18px] xs:py-[16px] border-b-2 shadow-lg shadow-[#d4d4d4]/90 transition duration-300 ease-in-out;
}
</style>
