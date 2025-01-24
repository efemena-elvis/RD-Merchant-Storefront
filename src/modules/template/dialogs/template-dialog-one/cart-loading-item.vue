<template>
  <div class="cart-loading-item">
    <div class="cart-loading-item--left"></div>

    <div class="cart-loading-item--right">
      <div class="cart-loading-row row-one"></div>
      <div class="cart-loading-row row-two"></div>
      <div class="cart-loading-row row-three"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.cart-loading-item {
  @apply flex justify-start items-start gap-x-3 py-6 first-of-type:pt-3 border-b-2 border-[#f5f5f5];

  .cart-loading-item--left {
    @apply relative size-[100px] sm:size-[80px] min-w-[100px] sm:min-w-[80px] min-h-[100px] sm:min-h-[80px] bg-[#f0f0f1] rounded-lg;
  }

  .cart-loading-item--right {
    @apply w-full flex flex-col justify-start items-start gap-y-2;

    .cart-loading-row {
      @apply bg-[#f0f0f1] rounded-lg;
    }

    .row-one {
      @apply w-full h-8;
    }

    .row-two {
      @apply w-1/3 h-5;
    }

    .row-three {
      @apply w-[40%] h-8;
    }
  }
}
</style>
