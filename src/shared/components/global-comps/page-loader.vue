<template>
  <div class="page-loader">
    <div class="app-container">
      <div class="loader-wrapper">
        <img :src="renderImg('dual-ball.gif')" alt="img-loader" />

        <div class="loader-text">Gathering store data. Please wait...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import { useString } from "@/shared/composables/useString";
const { renderImg } = useString();

onMounted(() => {
  const body = document.querySelector("body");
  if (body) body.style.overflow = "hidden";
});

onUnmounted(() => {
  const body = document.querySelector("body");
  if (body) body.style.overflow = "auto";
});
</script>

<style lang="scss" scoped>
.page-loader {
  @apply fixed inset-0 w-full h-full bg-neutral-10 transition duration-300 ease-in-out z-50;

  .loader-wrapper {
    @apply w-full h-screen flex flex-col justify-center items-center;

    img {
      @apply w-[100px] h-auto;
    }

    .loader-text {
      @apply text-[15.5px] sm:text-[14.5px] text-grey-600 text-center;
    }
  }
}
</style>
