<template>
  <div class="product-item">
    <!-- PRODUCT ITEM TOP -->
    <div class="product-item--top">
      <img :src="product.image" :alt="product.name" />

      <div class="favourite-container" @click="toggleIsFavourite">
        <div :class="'icon ' + isProductInWishlist"></div>
      </div>
    </div>

    <!-- PRODUCT ITEM BOTTOM -->
    <div class="product-item--bottom">
      <div class="title-container">
        <div class="product-title">
          {{ product.name }}
        </div>

        <div class="product-category">
          {{ product.category }}
        </div>
      </div>

      <!-- PRODUCT META -->
      <div class="product-meta">
        <div class="product-amount">
          <span class="mr-0.5">ZMW</span
          ><span>{{ formatNumber(product.amount) }}</span>
        </div>

        <div class="dot"></div>

        <div class="product-unit">
          {{ product.stock }} UNIT{{ product.stock > 1 ? "S" : "" }}
        </div>

        <!-- <div class="product-rating">
          <div class="icon icon-star-fill"></div>
          <div class="rating">{{ product.rating }}</div>
        </div> -->
      </div>

      <!-- PRODUCT BASE -->
      <div class="product-base">
        <!-- <div class="product-amount">
          <span class="mr-0.5">{{ product.currency }}</span
          ><span>{{ product.amount }}</span>
        </div> -->

        <div
          class="product-action product-action-disabled"
          v-if="isProductInCart"
        >
          <div class="icon icon-checkmark"></div>
          <div class="text">Added to Cart</div>
        </div>

        <div class="product-action" v-else @click="addToCart">
          <div class="icon icon-shopping-bag"></div>
          <div class="text">Add to Cart</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, toRaw } from "vue";
import { useString } from "@/shared/composables/useString";
import { IProductItem } from "@/models/product-type";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";
import { Emitter } from "mitt";

interface IAlertType {
  type: string;
  message: string;
  description?: string;
}

type Events = {
  triggerToastAlert: IAlertType;
};

type IProductItemData = {
  product: IProductItem;
};

const props = defineProps<IProductItemData>();
const eventBus = inject<Emitter<Events>>("eventBus");

const { formatNumber } = useString();

const { getProductsInCart, getProductsInWishList } =
  storeToRefs(useStorefrontStore());

const { toggleProductInCart, toggleProductInWishlist } = useStorefrontStore();

const inWishList = computed(() => {
  return getProductsInWishList.value.some(
    (product) => product.id === props.product.id
  );
});

const isProductInWishlist = computed(() => {
  return inWishList.value
    ? "icon-heart-fill !text-red-400"
    : "icon-heart-outline";
});

const isProductInCart = computed(() => {
  const cartProducts = getProductsInCart.value;
  return cartProducts.some((p) => p.id === props.product.id);
});

const pushToastAlert = (alertPayload: IAlertType | undefined) => {
  alertPayload && eventBus?.emit("triggerToastAlert", alertPayload);
};

const toggleIsFavourite = () => {
  pushToastAlert({
    type: inWishList.value ? "error" : "success",
    message: inWishList.value ? "Removed from Wishlist" : "Added to Wishlist",
  });

  toggleProductInWishlist(props.product);
};

const addToCart = () => {
  // pushToastAlert({
  //   type: "success",
  //   message: "Added to Cart",
  // });

  toggleProductInCart(props.product);
};
</script>

<style lang="scss" scoped>
.product-item {
  @apply w-full h-auto p-3.5 xl:p-2.5 md:p-1.5 border border-[#e3e3e3] shadow-lg shadow-[#eeeeee] rounded-xl overflow-hidden transition duration-300 ease-in-out hover:scale-[97%];

  &--top {
    @apply relative w-full h-[230px] xl:h-[220px] md:h-[190px] xs:h-[165px] xxs:h-[220px] mb-4 xl:mb-3 bg-[#f0f0f1] rounded-lg flex justify-center items-center;

    img {
      @apply w-auto h-[200px] md:h-[180px] sm:h-[160px] xxs:h-[190px];
    }

    .favourite-container {
      @apply absolute top-3 sm:top-2 right-3 sm:right-2 size-11 sm:size-10 min-w-11 sm:min-w-10 min-h-11 sm:min-h-10 bg-white border rounded-full flex justify-center items-center cursor-pointer transition duration-300 ease-in-out  hover:bg-red-100/30 hover:border-red-200;

      .icon {
        @apply text-[22px] text-grey-700;
      }
    }
  }

  &--bottom {
    @apply w-full h-auto xl:px-1 xl:pb-1;

    .title-container {
      @apply w-full h-auto mb-4;

      .product-title {
        @apply text-[15.5px] sm:text-[14px] text-neutral-500 font-medium line-clamp-1 text-ellipsis text-nowrap;
      }

      .product-category {
        @apply text-[13px] text-grey-500 mt-0.5;
      }
    }

    .product-meta {
      @apply flex justify-start items-center gap-x-2.5 mb-5;

      .product-amount {
        @apply text-base sm:text-[15.5px] text-neutral-600 font-semibold;
      }

      .dot {
        @apply size-1.5 min-w-1.5 min-h-1.5 rounded-full bg-grey-400;
      }

      .product-unit {
        @apply text-[13.75px] sm:text-[13.25px] text-grey-500;
      }

      // .product-rating {
      //   @apply flex justify-start items-center gap-x-1.5;

      //   .icon {
      //     @apply relative -top-[0.65px] text-[14px] text-yellow-300;
      //   }

      //   .rating {
      //     @apply text-[13.75px] text-grey-600 font-semibold;
      //   }
      // }
    }

    .product-base {
      @apply flex justify-between items-center pb-0.5;

      // .product-amount {
      //   @apply text-[19px] text-neutral-800 font-semibold;
      // }

      .product-action {
        @apply w-full flex justify-center items-center gap-x-1.5 px-3.5 py-2 rounded-[20px] transition duration-300 ease-in-out cursor-pointer text-neutral-10 bg-green-600 hover:bg-green-700;

        .icon {
          @apply text-lg;
        }

        .text {
          @apply text-[13.75px];
        }
      }

      .product-action-disabled {
        @apply cursor-not-allowed bg-green-500/80 hover:bg-green-500/80;
      }
    }
  }
}
</style>
