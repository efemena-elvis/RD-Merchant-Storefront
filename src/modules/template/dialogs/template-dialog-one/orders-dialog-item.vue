<template>
  <div class="order-item">
    <div class="order-item--left">
      <img
        :src="renderImg('products/thumb-tomatoes.png')"
        alt="product-thumbnail"
      />
    </div>

    <div class="order-item--right">
      <div class="order-data-top">
        <div class="item-info">
          <div class="product-title">Breville One Hand Blender</div>
          <div class="product-meta">
            <div class="amount">ZMW20.00</div>
            <div class="dot"></div>
            <div class="quantity">1 UNIT</div>
          </div>
        </div>
      </div>

      <div class="order-data-bottom">
        <div class="order-status">DELIVERED</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useString } from "@/shared/composables/useString";
const { renderImg } = useString();
</script>

<style lang="scss" scoped>
.order-item {
  @apply flex justify-start items-start gap-x-3 py-6 first-of-type:pt-3 border-b-[4px] border-[#f5f5f5];

  .order-item--left {
    @apply relative size-[100px] sm:size-[80px] min-w-[100px] sm:min-w-[80px] min-h-[100px] sm:min-h-[80px] bg-[#f0f0f1] rounded-lg flex justify-center items-center;

    img {
      @apply w-auto h-[80px] sm:h-[70px];
    }
  }

  .order-item--right {
    @apply w-full flex flex-col justify-center items-start gap-y-3.5;

    .order-data-top {
      @apply w-full flex justify-between items-start gap-x-3;

      .item-info {
        .product-title {
          @apply text-[15px] sm:text-[14px] font-medium text-grey-600 mb-2;
        }

        .product-meta {
          @apply flex justify-start items-center gap-x-2 text-grey-600 font-medium text-[13px] sm:text-[12.5px];

          .dot {
            @apply size-1 min-w-1 min-h-1 rounded-full bg-grey-400;
          }
        }
      }
    }

    .order-data-bottom {
      @apply w-full flex justify-between items-center gap-x-2;

      .order-status {
        @apply text-green-600 text-[15px] sm:text-[13.75px] font-medium;
      }
    }
  }
}
</style>
