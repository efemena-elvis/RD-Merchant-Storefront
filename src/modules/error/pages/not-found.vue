<template>
  <div class="error-page">
    <div class="app-container">
      <div class="page-section--left">
        <div class="page-title-text">
          <span class="text-yellow-500">Oops!</span>
          <br />
          Nothing Here...
        </div>

        <div class="page-description-text">
          It looks like you’ve stumbled onto a storefront page that doesn’t
          exist. The page URL might be incorrect or outdated, or probably might
          have been moved or teminated.
        </div>

        <div class="help-block">
          <div class="help-row">
            <div class="icon-wrapper">
              <div class="icon icon-checkmark"></div>
            </div>

            <div class="help-text">
              Double-check the URL to ensure it’s spelled correctly.
            </div>
          </div>

          <div class="help-row">
            <div class="icon-wrapper">
              <div class="icon icon-checkmark"></div>
            </div>

            <div class="help-text">
              Still having trouble? Contact the storefront owner to confirm the
              link or get assistance.
            </div>
          </div>
        </div>
      </div>

      <div class="page-section--right">
        <img :src="renderImg('error-bot.jpg')" alt="error-bot" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { useString } from "@/shared/composables/useString";
import { Emitter } from "mitt";

type Events = {
  hidePageLoader: void;
};

const eventBus = inject<Emitter<Events>>("eventBus");

const { renderImg } = useString();

onMounted(() => {
  setTimeout(() => {
    eventBus?.emit("hidePageLoader");
  }, 500);
});
</script>

<style lang="scss" scoped>
.error-page {
  @apply relative w-full h-screen inset-0;

  .app-container {
    @apply w-full h-full flex md:flex-col justify-center md:justify-start items-center mx-auto gap-x-10 lg:gap-x-2;
  }

  .page-section--left,
  .page-section--right {
    @apply w-[45%] md:w-4/5 sm:w-[90%] h-full;
  }

  .page-section--left {
    @apply flex flex-col justify-center items-start gap-y-8 md:order-2 md:pb-28;

    .page-title-text {
      @apply text-[72px] lg:text-[60px] sm:text-5xl xs:text-4xl leading-[88px] lg:leading-[70px] sm:leading-[56px] font-extrabold text-neutral-900;
    }

    .page-description-text {
      @apply text-[17px] lg:text-[15.5px] xs:text-[14.5px] leading-[30px] lg:leading-[28px] sm:leading-[26px] text-grey-600/95 lg:-mt-2;
    }

    .help-block {
      @apply flex flex-col justify-start items-start gap-y-5 xs:gap-y-4 w-[90%] sm:w-full;

      .help-row {
        @apply flex justify-start items-start gap-x-3;

        .icon-wrapper {
          @apply size-6 min-w-6 min-h-6 rounded-full flex justify-center items-center bg-grey-800;

          .icon {
            @apply text-white;
          }
        }

        .help-text {
          @apply relative -top-[2.5px] lg:-top-[3px] xs:-top-1 text-base lg:text-[14.25px] xs:text-[13.75px] leading-[28px] text-grey-700/85;
        }
      }
    }
  }

  .page-section--right {
    @apply flex flex-col justify-center items-center md:order-1 md:mt-16 md:mb-10;

    img {
      @apply md:w-[70%] sm:w-4/5 h-auto mx-auto;
    }
  }
}
</style>
