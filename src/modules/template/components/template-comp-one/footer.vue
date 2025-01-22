<template>
  <div class="footer">
    <!-- FOOTER TOP -->
    <div class="footer-top">
      <div class="app-container">
        <div class="footer-top--left">
          <!-- BRAND LOGO -->
          <img :src="renderImg('store-logo.png')" alt="" class="brand-logo" />
        </div>

        <div class="footer-top--right">
          <router-link to="" class="social-wrapper">
            <img
              :src="renderImg('socials/instagram.png')"
              alt="instagram-icon"
              class="social-icon"
            />
          </router-link>

          <router-link to="" class="social-wrapper">
            <img
              :src="renderImg('socials/whatsapp.png')"
              alt="whatsapp-icon"
              class="social-icon"
            />
          </router-link>

          <router-link to="" class="social-wrapper">
            <img
              :src="renderImg('socials/facebook.png')"
              alt="facebook-icon"
              class="social-icon"
            />
          </router-link>

          <router-link to="" class="social-wrapper">
            <img
              :src="renderImg('socials/tik-tok.png')"
              alt="tiktok-icon"
              class="social-icon"
            />
          </router-link>

          <router-link to="" class="social-wrapper">
            <img
              :src="renderImg('socials/twitter.png')"
              alt="twitter-icon"
              class="social-icon"
            />
          </router-link>
        </div>
      </div>
    </div>

    <!-- FOOTER BOTTOM -->
    <div class="footer-bottom">
      <div class="app-container">
        <div class="footer-bottom--left">
          &copy; 2025 Foodmart. All rights reserved.
        </div>

        <div class="footer-bottom--right">
          Storefront powered and developed by
          <router-link to="">Redstone</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useString } from "@/shared/composables/useString";

const { renderImg } = useString();
</script>

<style lang="scss" scoped>
.footer {
  @apply w-full h-auto mt-24;

  &-top {
    @apply pt-12 pb-8 sm:pb-10 bg-[#f9f9f9]/75;

    .app-container {
      @apply flex sm:flex-col justify-between sm:justify-start items-start sm:items-center sm:gap-y-1;
    }

    &--left {
      .brand-logo {
        @apply h-[50px] mdLg:h-[44px] xs:h-[40px] w-auto mb-8;
      }
    }

    &--right {
      @apply flex justify-end items-center gap-x-3;

      .social-wrapper {
        @apply flex justify-center items-center size-12 min-h-12 min-w-12 rounded-full border border-grey-100 bg-neutral-10 cursor-pointer hover:border-grey-300 transition duration-300 ease-in-out;

        .social-icon {
          @apply size-5 min-w-5 min-h-5;
        }
      }
    }
  }

  &-bottom {
    @apply flex justify-between items-center gap-6 py-8 bg-[#f4f4f4] text-grey-600 text-[15.5px] mdLg:text-[14.5px] xs:text-[13.5px];

    .app-container {
      @apply flex sm:flex-col justify-between sm:justify-start items-start sm:items-center sm:gap-y-2;
    }

    &--right {
      a {
        @apply text-grey-900 font-semibold underline;
      }
    }
  }
}
</style>
