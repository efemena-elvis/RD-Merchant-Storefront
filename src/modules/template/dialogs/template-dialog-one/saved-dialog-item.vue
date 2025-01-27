<template>
  <div class="saved-item">
    <div class="saved-item--left">
      <img :src="product.image" :alt="product.name" />
    </div>

    <div class="saved-item--right">
      <div class="saved-data-top">
        <div class="item-info">
          <div class="product-title">{{ product.name }}</div>
          <div class="product-meta">
            <div class="amount">
              <span>ZMW</span><span>{{ formatNumber(product.amount) }}</span>
            </div>
            <div class="dot"></div>
            <div class="stock-status">
              {{ product.stock }} UNIT{{ product.stock > 1 ? "S" : "" }}
              AVAILABLE
            </div>
          </div>
        </div>

        <div class="remove-action" @click="removeFromWishlist">
          <div class="icon icon-trash"></div>
        </div>
      </div>

      <div class="saved-data-bottom">
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
import { computed } from "vue";
import { IProductItem } from "@/models/product-type";
import { useString } from "@/shared/composables/useString";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";

interface ISavedDialogItem {
  product: IProductItem;
}

const props = defineProps<ISavedDialogItem>();

const { getProductsInCart } = storeToRefs(useStorefrontStore());
const { toggleProductInWishlist, toggleProductInCart } = useStorefrontStore();

const { formatNumber } = useString();

const isProductInCart = computed(() => {
  const cartProducts = getProductsInCart.value;
  return cartProducts.some((p) => p.id === props.product.id);
});

const removeFromWishlist = () => {
  toggleProductInWishlist(props.product);
};

const addToCart = () => {
  toggleProductInCart(props.product);
};
</script>

<style lang="scss" scoped>
.saved-item {
  @apply flex justify-start items-start gap-x-3 py-6 first-of-type:pt-3 border-b-[4px] border-[#f5f5f5];

  .saved-item--left {
    @apply relative size-[100px] sm:size-[80px] min-w-[100px] sm:min-w-[80px] min-h-[100px] sm:min-h-[80px] bg-[#f0f0f1] rounded-lg flex justify-center items-center;

    img {
      @apply w-auto h-[80px] sm:h-[70px];
    }
  }

  .saved-item--right {
    @apply w-full flex flex-col justify-center items-start gap-y-3.5;

    .saved-data-top {
      @apply w-full flex justify-between items-start gap-x-3;

      .item-info {
        .product-title {
          @apply text-[15px] sm:text-[14px] font-medium text-grey-600 mb-2;
        }

        .product-meta {
          @apply flex justify-start items-center gap-x-2;

          .amount {
            @apply text-grey-600 font-semibold text-[13px];
          }

          .dot {
            @apply size-1 min-w-1 min-h-1 rounded-full bg-grey-400;
          }

          .stock-status {
            @apply font-semibold text-[12.25px] xs:text-[11.5px] text-green-500;
          }
        }
      }

      .remove-action {
        @apply relative top-1 size-12 sm:size-10 min-h-12 sm:min-h-10 min-w-12 sm:min-w-10 rounded-full flex justify-center items-center border bg-red-50/70 cursor-pointer transition duration-300 ease-in-out hover:bg-red-100/50 hover:border-red-100/80;

        .icon {
          @apply text-xl sm:text-lg text-red-600;
        }
      }
    }

    .saved-data-bottom {
      @apply w-full flex justify-between items-center gap-x-2;

      .product-action {
        @apply flex justify-center items-center gap-x-1.5 px-4 py-1.5 rounded-full cursor-pointer transition duration-300 ease-in-out text-neutral-10 bg-green-600 hover:bg-green-700;

        .icon {
          @apply text-base;
        }

        .text {
          @apply text-[13.75px] xs:text-[12.5px];
        }
      }

      .product-action-disabled {
        @apply cursor-not-allowed bg-green-500/90 hover:bg-green-500/80;
      }
    }
  }
}
</style>
