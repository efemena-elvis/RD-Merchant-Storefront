<template>
  <div class="cart-order-item">
    <div class="cart-order-item--left">
      <img
        :src="renderImg(`products/${product.image}`)"
        alt="product-thumbnail"
      />
    </div>

    <div class="cart-order-item--right">
      <div class="cart-order-info">
        <div class="info-top">{{ product.title }}</div>

        <div class="info-bottom">
          <div class="product-amount">
            <span>{{ product.currency }}</span
            ><span>{{ parseFloat(product.amount.toString()).toFixed(2) }}</span>
          </div>
          <div class="multiplier">x</div>
          <div class="product-unit">
            {{ product.quantityInCart || 1 }} UNIT{{
              (product.quantityInCart || 1) > 1 ? "S" : ""
            }}
          </div>
        </div>
      </div>

      <div class="cart-order-amount">
        <span>{{ product.currency }}</span
        ><span>{{
          parseFloat(
            (product.amount * (product.quantityInCart || 1)).toString()
          ).toFixed(2)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IProductItemCart } from "@/models/product-type";
import { useString } from "@/shared/composables/useString";

interface ICartDialogItem {
  product: IProductItemCart;
}

const { renderImg } = useString();

defineProps<ICartDialogItem>();
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
    @apply mdLg:pt-1 w-full flex justify-between items-start gap-x-3;

    .cart-order-info {
      @apply flex flex-col justify-start items-start gap-y-2;

      .info-top {
        @apply text-[14.5px] lg:text-[14px] sm:text-[14px] font-medium text-grey-700;
      }

      .info-bottom {
        @apply flex justify-start items-center gap-x-2 text-[13.5px] sm:text-[12px] font-medium text-neutral-300/80;

        .multiplier {
          @apply text-sm;
        }
      }
    }

    .cart-order-amount {
      @apply text-[15px] lg:text-[14.5px] sm:text-[14px] font-semibold text-grey-700;
    }
  }
}
</style>
