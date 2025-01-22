<template>
  <div class="cart-order-item">
    <div class="cart-order-item--left">
      <img
        :src="renderImg('products/thumb-milk.png')"
        alt="product-thumbnail"
      />
    </div>

    <div class="cart-order-item--right">
      <div class="cart-order-info">
        <div class="info-top">Breville One Hand Blender</div>

        <div class="info-bottom">
          <div class="product-category">Household</div>
          <div class="dot"></div>
          <div class="product-unit">2 units</div>
        </div>
      </div>

      <div class="cart-order-amount">ZK20.00</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useString } from "@/shared/composables/useString";
const { renderImg } = useString();
</script>

<style lang="scss" scoped>
.cart-order-item {
  @apply w-full h-auto flex justify-between items-start gap-x-3 lg:gap-x-2 py-6 first-of-type:pt-0.5 last-of-type:pb-0 border-b border-b-grey-200/75 last-of-type:border-b-0;

  .cart-order-item--left {
    @apply relative size-[70px] min-w-[70px] min-h-[70px] bg-[#f0f0f1] rounded-lg flex justify-center items-center;

    img {
      @apply w-auto h-[60px];
    }
  }

  .cart-order-item--right {
    @apply pt-2 lg:pt-0.5 mdLg:pt-1.5 w-full flex justify-between items-start gap-x-3;

    .cart-order-info {
      @apply flex flex-col justify-start items-start gap-y-1;

      .info-top {
        @apply text-[14.75px] lg:text-[14px] sm:text-[14px] font-medium text-grey-700;
      }

      .info-bottom {
        @apply flex justify-start items-center gap-x-2 text-[13px] sm:text-[12px] font-medium text-neutral-300/75;

        .dot {
          @apply size-1 min-w-1 min-h-1 rounded-full bg-grey-400;
        }
      }
    }

    .cart-order-amount {
      @apply text-[15px] lg:text-[14.5px] sm:text-[14px] font-semibold text-grey-700;
    }
  }
}
</style>
