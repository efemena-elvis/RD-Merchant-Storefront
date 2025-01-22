<template>
  <div class="hero-banner">
    <div class="app-container">
      <div class="banner-block">
        <img :src="renderImg('ad-bg-pattern.png')" alt="banner" class="bg-pattern" />

        <!-- LEFT CONTENT -->
        <div class="left-content">
          <h1 class="hero-title">Summers's brightest new drinks</h1>

          <p class="hero-description">
            Experience a whole new way to drink. Our summer collection features
            a range of refreshing juices, energising smoothies and quenched iced
            drinks.
          </p>

          <div class="hero-cta-button">
            <button class="btn">Order now</button>
          </div>
        </div>

        <!-- RIGHT CONTENT -->
        <div class="right-content">
          <img :src="renderImg('product-thumb.png')" alt="product-thumbnail" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useString } from "@/shared/composables/useString";

const { renderImg } = useString();
</script>

<style lang="scss" scoped>
.hero-banner {
  @apply relative mt-9 sm:mt-6;

  .banner-block {
    @apply relative w-full h-auto rounded-2xl overflow-hidden bg-[#eef5e5]/95 flex justify-between items-center py-20 lg:py-16 mdLg:py-14 sm:py-10 px-16 lg:px-12 mdLg:px-10 sm:px-5;

    .bg-pattern {
      @apply absolute top-0 left-0 w-full h-full object-cover;
    }

    .left-content {
      @apply w-[48%] mdLg:w-[58%] sm:w-full h-full;

      .hero-title {
        @apply text-5xl mdLg:text-4xl sm:text-[25px] leading-[54px] mdLg:leading-[48px] sm:leading-[36px] sm:pr-6 font-extrabold sm:font-bold text-grey-900 mb-5;
      }

      .hero-description {
        @apply text-lg mdLg:text-[17px] sm:text-[14.75px] text-grey-600 mb-10 mdLg:mb-8;
      }

      .hero-cta-button {
        @apply flex justify-start items-center;

        .btn {
          @apply py-3 px-10 rounded-full border-2 border-grey-700 text-grey-700 font-medium hover:bg-green-700 hover:text-neutral-10 hover:border-green-700;
        }
      }
    }

    .right-content {
      @apply w-1/2 mdLg:w-2/5 sm:hidden h-full flex flex-col justify-center items-end relative;

      img {
        @apply w-auto h-[360px] mdLg:h-[310px] sm:h-[280px] absolute;
      }
    }
  }
}
</style>
