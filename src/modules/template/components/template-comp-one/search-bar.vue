<template>
  <div class="search-input">
    <div class="icon icon-search-normal"></div>
    <input
      type="text"
      class="form-control"
      placeholder="What are you looking for?"
      aria-label="What are you looking for?"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.search-input {
  @apply w-full relative;

  .icon {
    @apply absolute left-[26px] lg:left-[20px] sm:left-[18px] top-1/2 transform -translate-y-1/2 text-xl sm:text-[17px] text-neutral-400 z-10;
  }

  .form-control {
    @apply w-full h-[54px] lg:h-[52px] rounded-[24px] pt-3 sm:pt-3.5 pb-3.5 px-4 pl-[62px] lg:pl-[50px] sm:pl-[46px] bg-[#f4f4f4] border border-neutral-50 placeholder:text-[15px] mdLg:placeholder:text-[14.5px] sm:placeholder:text-[14px] text-[15px] mdLg:text-[14.5px] sm:text-[13.5px] hover:border-neutral-100 focus:border-neutral-100;
  }
}
</style>
