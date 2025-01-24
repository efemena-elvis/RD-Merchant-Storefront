<template>
  <div class="product-loading-item">
    <div class="product-loading-top"></div>

    <div class="product-loading-bottom">
      <div class="title-container">
        <div class="title-line title-line-one"></div>
        <div class="title-line title-line-two"></div>
      </div>

      <div class="loading-meta"></div>

      <div class="loading-action"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
/* Placeholder for the shimmer effect */
// %shimmer-effect {
//   animation: shimmer 1.5s infinite linear;
//   background: linear-gradient(90deg, #e8e8e8 25%, #efefef 40%, #e8e8e8 60%);
//   background-size: 200% 100%;
// }

.product-loading-item {
  @apply w-full h-auto p-3.5 xl:p-2.5 md:p-1.5 border border-[#e3e3e3]/35 shadow-lg shadow-[#eeeeee] rounded-xl overflow-hidden;

  .product-loading-top {
    @apply w-full h-[230px] xl:h-[220px] md:h-[190px] xs:h-[140px] xxs:h-[180px] mb-4 xl:mb-3 bg-[#f0f0f1]/75 rounded-lg;
  }

  .product-loading-bottom {
    @apply w-full h-auto xl:px-1 xl:pb-1;

    .title-container {
      @apply w-full h-[45px] mb-2;

      .title-line {
        @apply h-4 rounded-full bg-[#f0f0f1]/75;
      }

      .title-line-one {
        @apply w-full mb-1;
      }

      .title-line-two {
        @apply w-2/3;
      }
    }

    .loading-meta {
      @apply h-4 w-1/2 bg-[#f0f0f1]/75 rounded-full mb-5 sm:hidden;
    }

    .loading-action {
      @apply rounded-full w-full h-10 bg-[#f0f0f1]/75;
    }
  }
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>
