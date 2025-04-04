<template>
  <div class="cart-item">
    <div class="cart-item--left">
      <img :src="product.image" :alt="product.name" />
    </div>

    <div class="cart-item--right">
      <div class="cart-data-top">
        <div class="item-info">
          <div class="product-title">{{ product.name }}</div>
          <div class="product-meta">
            <div class="amount">
              <span class="mr-0.5">ZMW</span
              ><span>{{ formatNumber(product.amount) }}</span>
            </div>
            <div class="dot"></div>
            <div class="stock-status">
              {{ product.stock }} UNIT{{ product.stock > 1 ? "S" : "" }}
              AVAILABLE
            </div>
          </div>
        </div>

        <div class="remove-action" @click="removeFromCart">
          <div class="icon icon-trash"></div>
        </div>
      </div>

      <div class="cart-data-bottom">
        <div class="product-quantity">
          <div
            class="control"
            :class="{ 'control-disabled': getProductQuantityInCart === 1 }"
            @click="updateCartQuantity(-1)"
          >
            <div class="icon icon-minus"></div>
          </div>

          <div class="value">{{ getProductQuantityInCart }}</div>

          <div
            class="control"
            :class="{
              'control-disabled': getProductQuantityInCart === product.stock,
            }"
            @click="updateCartQuantity(1)"
          >
            <div class="icon icon-plus"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue";
import { IProductItemCart } from "@/models/product-type";
import { useStorefrontStore } from "@/modules/template/store";
import { useString } from "@/shared/composables/useString";
import { Emitter } from "mitt";

interface IAlertType {
  type: string;
  message: string;
  description?: string;
}

type Events = {
  triggerToastAlert: IAlertType;
};

interface ICartDialogItem {
  product: IProductItemCart;
}

const props = defineProps<ICartDialogItem>();
const eventBus = inject<Emitter<Events>>("eventBus");

const { formatNumber } = useString();

const { toggleProductInCart, updateProductCartQuantity } = useStorefrontStore();

const getProductQuantityInCart = computed(() => {
  return props.product?.quantityInCart ?? 1;
});

const cartQuantity = ref<number>(1);

const removeFromCart = () => {
  toggleProductInCart(props.product);
};

const pushToastAlert = (alertPayload: IAlertType | undefined) => {
  alertPayload && eventBus?.emit("triggerToastAlert", alertPayload);
};

const updateCartQuantity = (count: number) => {
  const minQuantity = 1;
  const maxQuantity = props.product?.stock ?? 1;

  // HANDLE REDUCTION BELOW THE MINIMUM VALUE
  if (count === -1 && getProductQuantityInCart.value === minQuantity) {
    pushToastAlert({
      type: "error",
      message: "Minimum quantity reached!",
      description: "Product quantity cannot go below 1 unit",
    });
  }

  // HANDLE INCREASE ABOVE THE MAXIMUM VALUE
  else if (count === 1 && getProductQuantityInCart.value === maxQuantity) {
    pushToastAlert({
      type: "error",
      message: "Maximum quantity reached!",
      description: `Product quantity cannot exceed ${maxQuantity} units`,
    });
  } else {
    cartQuantity.value += count;
    updateProductCartQuantity(props.product.id, cartQuantity.value);
  }
};
</script>

<style lang="scss" scoped>
.cart-item {
  @apply flex justify-start items-start gap-x-3 py-6 first-of-type:pt-3 border-b-[4px] border-[#f5f5f5];

  .cart-item--left {
    @apply relative size-[100px] sm:size-[80px] min-w-[100px] sm:min-w-[80px] min-h-[100px] sm:min-h-[80px] bg-[#f0f0f1] rounded-lg flex justify-center items-center;

    img {
      @apply w-auto h-[80px] sm:h-[70px];
    }
  }

  .cart-item--right {
    @apply w-full flex flex-col justify-center items-start gap-y-4;

    .cart-data-top {
      @apply w-full flex justify-between items-start gap-x-3;

      .item-info {
        .product-title {
          @apply text-[15px] sm:text-[14px] font-medium text-grey-600 mb-2;
        }

        .product-meta {
          @apply flex justify-start items-center gap-x-2;

          .amount {
            @apply text-grey-600 font-medium text-[13px];
          }

          .dot {
            @apply size-1 min-w-1 min-h-1 rounded-full bg-grey-400;
          }

          .stock-status {
            @apply font-semibold text-[12.25px] text-green-500;
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

    .cart-data-bottom {
      @apply w-full flex justify-between items-center gap-x-2;

      .product-quantity {
        @apply flex justify-start items-center w-max;

        .control {
          @apply size-8 min-h-8 min-w-8 flex justify-center items-center cursor-pointer bg-green-600 rounded-full text-neutral-10 transition duration-300 ease-in-out hover:bg-green-700;

          .icon {
            @apply text-sm;
          }
        }

        .control-disabled {
          @apply bg-green-400/80 cursor-not-allowed hover:bg-green-400/80;
        }

        .value {
          @apply min-w-12 px-3 text-center text-[14.5px] text-grey-700;
        }
      }
    }
  }
}
</style>
