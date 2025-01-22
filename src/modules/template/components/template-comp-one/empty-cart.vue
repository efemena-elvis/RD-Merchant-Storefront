<template>
  <div>
    <!-- EMPTY CART -->
    <div class="empty-cart">
      <div class="empty-img">
        <img :src="renderImg('empty-cart.png')" alt="empty-cart" />
      </div>

      <div class="empty-text">
        <div class="empty-text--title">{{ title }}</div>

        <div class="empty-text--description">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useString } from "@/shared/composables/useString";

const { renderImg } = useString();

defineProps({
  title: {
    type: String,
    default: "Cart is empty",
  },
  description: {
    type: String,
    default: "No product data is available yet",
  },
});
</script>

<style lang="scss" scoped>
.empty-cart {
  @apply w-full h-full flex flex-col gap-y-5 justify-center items-center;

  .empty-img {
    @apply w-[100px] sm:w-[80px] h-auto mx-auto;
  }

  .empty-text {
    &--title {
      @apply text-2xl md:text-xl font-bold text-grey-800 text-center mb-3;
    }

    &--description {
      @apply text-[15px] md:text-[14.5px] md:leading-6 text-grey-500 text-center px-5 w-4/5 mx-auto;
    }
  }
}
</style>
