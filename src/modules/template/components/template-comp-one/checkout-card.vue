<template>
  <div class="checkout-card">
    <div class="checkout-card--header">
      <h2 class="checkout-card--header--title">{{ title }}</h2>
    </div>

    <div class="checkout-card--body">
      <div class="checkout-card--body--content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ title: string }>(), {
  title: "Card Title",
});
</script>

<style lang="scss" scoped>
.checkout-card {
  @apply w-full h-auto mb-8 rounded-md overflow-hidden border border-grey-200/80;

  &--header {
    @apply w-full h-auto px-6 lg:px-4 py-5 sm:py-[18px] bg-grey-100/40 border-b border-b-grey-200/80;

    &--title {
      @apply text-[16.75px] lg:text-base sm:text-[15.5px] font-semibold text-grey-900;
    }
  }

  &--body {
    @apply w-full h-auto;
  }
}
</style>
