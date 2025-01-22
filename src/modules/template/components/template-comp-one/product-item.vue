<template>
  <div class="product-item">
    <!-- PRODUCT ITEM TOP -->
    <div class="product-item--top">
      <img
        :src="renderImg(`products/${product.image}`)"
        alt="product-thumbnail"
      />

      <div class="favourite-container">
        <div :class="'icon ' + renderFavouriteState"></div>
      </div>
    </div>

    <!-- PRODUCT ITEM BOTTOM -->
    <div class="product-item--bottom">
      <div class="title-container">
        <div class="product-title">
          {{ product.title }}
        </div>
      </div>

      <!-- PRODUCT META -->
      <div class="product-meta">
        <div class="product-amount">
          <span class="mr-0.5">{{ product.currency }}</span
          ><span>{{ product.amount }}</span>
        </div>

        <div class="dot"></div>

        <div class="product-unit">
          {{ product.quantity }} UNIT{{ product.quantity > 1 ? "S" : "" }}
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

        <div class="product-action">
          <div class="icon icon-shopping-bag"></div>
          <div class="text">Add to Cart</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useString } from "@/shared/composables/useString";
import { IProductItem } from "@/models/product-type";

const { renderImg } = useString();

type IProductItemData = {
  product: IProductItem;
};

const props = defineProps<IProductItemData>();

const renderFavouriteState = computed(() => {
  if (props.product.isFavorite) return "icon-heart-fill !text-red-400";
  else return "icon-heart-outline";
});
</script>

<style lang="scss" scoped>
.product-item {
  @apply w-full h-auto p-3.5 xl:p-2.5 md:p-1.5 border-2 border-[#f1f1f1] shadow-lg shadow-[#eeeeee] rounded-xl overflow-hidden transition duration-300 ease-in-out hover:scale-[97%];

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
      @apply w-full h-[45px] mb-2;

      .product-title {
        @apply text-[15px] sm:text-[14px] text-neutral-500 font-medium line-clamp-2;
      }
    }

    .product-meta {
      @apply flex justify-start items-center gap-x-2.5 mb-5;

      .product-amount {
        @apply text-[17px] sm:text-[15.5px] text-neutral-600 font-semibold;
      }

      .dot {
        @apply size-1.5 min-w-1.5 min-h-1.5 rounded-full bg-grey-400;
      }

      .product-unit {
        @apply text-[13.75px] sm:text-[13.25px] text-grey-500/90;
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
        @apply w-full flex justify-center items-center gap-x-1.5 px-3.5 py-2 rounded-full transition duration-300 ease-in-out cursor-pointer text-neutral-10 bg-green-600 hover:bg-green-700;

        .icon {
          @apply text-lg;
        }

        .text {
          @apply text-[13.75px];
        }
      }
    }
  }
}
</style>
