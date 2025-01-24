<template>
  <div class="product-empty-item">
    <div class="item-wrapper">
      <ProductLoadingItem
        v-for="(_, index) in 4"
        :key="index"
        isLoading="true"
      />
    </div>

    <div class="empty-item-wrapper">
      <div class="empty-item">
        <div class="empty-img">
          <img :src="renderImg('empty-cart.png')" alt="empty-cart" />
        </div>

        <div class="empty-item--title">No product found</div>
        <div class="empty-item--subtitle">
          It seems no product has been added by the merchant on this category
          section just yet. You can adjust your filters or search for a
          different keyword.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useString } from "@/shared/composables/useString";
import ProductLoadingItem from "@/modules/template/components/template-comp-one/product-loading-item.vue";

const { renderImg } = useString();
</script>

<style lang="scss" scoped>
.product-empty-item {
  @apply relative w-full h-auto;

  .item-wrapper {
    @apply grid grid-cols-4 mdLg:grid-cols-3 mdSm:grid-cols-2 xxs:grid-cols-1 gap-x-5 xl:gap-x-3.5 sm:gap-x-2 gap-y-7;
  }

  .empty-item-wrapper {
    @apply absolute top-0 left-0 w-full h-full flex justify-center items-center mx-auto bg-gradient-to-r from-neutral-10/30 to-white/30 via-neutral-10/30;

    .empty-item {
      @apply w-2/5 lg:w-3/5 sm:w-4/5 xs:w-full flex flex-col justify-center items-center gap-y-4;

      .empty-img {
        @apply w-[100px] lg:w-[80px] h-auto mx-auto;
      }

      .empty-item--title {
        @apply text-[28px] lg:text-[24px] font-semibold text-center text-grey-800;
      }

      .empty-item--subtitle {
        @apply text-[15px] lg:text-[14.5px] leading-[25px] text-grey-600 text-center;
      }
    }
  }
}
</style>
