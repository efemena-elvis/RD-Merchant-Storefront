<template>
  <div class="product-row">
    <div class="app-container">
      <!-- TOP ROW -->
      <div class="top-row">
        <div class="top-row--title" v-if="!productIsEmpty">
          {{ sectionTitle }}
        </div>

        <!-- <div class="slider-controls">
          <div class="item-slide">
            <div class="icon icon-caret-left"></div>
          </div>

          <div class="item-slide">
            <div class="icon icon-caret-right"></div>
          </div>
        </div> -->
      </div>

      <!-- PRODUCT ROW ITEMS -->
      <template v-if="isLoading">
        <div class="product-row-items">
          <ProductLoadingItem v-for="(_, index) in 4" :key="index" />
        </div>
      </template>

      <template v-else-if="productList.length">
        <div class="product-row-items">
          <ProductItem
            v-for="product in productList"
            :key="product.id"
            :product="product"
          />
        </div>
      </template>

      <template v-else>
        <ProductEmptyItem />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ProductItem from "@/modules/template/components/template-comp-one/product-item.vue";
import ProductLoadingItem from "@/modules/template/components/template-comp-one/product-loading-item.vue";
import ProductEmptyItem from "@/modules/template/components/template-comp-one/product-empty-item.vue";
import { IProductList } from "@/models/product-type";

const props = withDefaults(defineProps<IProductList>(), {
  sectionTitle: "Trending Items",
  productList: () => [],
  isLoading: false,
});

const productIsEmpty = computed(() => {
  return !props.productList.length && props.isLoading === false;
});
</script>

<style lang="scss" scoped>
.product-row {
  @apply relative w-full h-auto mt-12 mb-20;

  .top-row {
    @apply flex flex-nowrap justify-between items-center mb-8;

    &--title {
      @apply text-3xl xl:text-2xl md:text-xl font-bold text-grey-800;
    }

    .slider-controls {
      @apply flex justify-end items-center gap-x-3;

      .item-slide {
        @apply size-9 min-w-9 min-h-9 border border-grey-400 rounded-full flex justify-center items-center cursor-pointer transition duration-300 ease-in-out;

        .icon {
          @apply text-lg font-semibold text-grey-600 transition duration-300 ease-in-out;
        }

        &:hover {
          @apply border-green-400;

          .icon {
            @apply text-green-600;
          }
        }
      }
    }
  }

  .product-row-items {
    @apply grid grid-cols-4 mdLg:grid-cols-3 mdSm:grid-cols-2 xxs:grid-cols-1 gap-x-5 xl:gap-x-3.5 sm:gap-x-2 gap-y-7;
  }
}
</style>
