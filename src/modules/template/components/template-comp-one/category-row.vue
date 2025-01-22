<template>
  <div class="category-row">
    <div class="app-container">
      <!-- SEARCH AREA -->
      <div class="search-area">
        <SearchBar />
      </div>

      <!-- CATEGORY LIST DROPDOWN -->
      <div class="category-list-dropdown">
        <select class="form-control" value="all-categories">
          <option value="all-categories">All categories</option>
          <option value="popular">Popular</option>
          <option value="best-sellers">Best Sellers</option>
          <option value="coffee">Coffee</option>
          <option value="drinks">Drinks</option>
          <option value="food">Food</option>
          <option value="clothing">Clothing</option>
        </select>

        <div class="icon icon-caret-up"></div>
      </div>

      <div class="category-list">
        <div class="category-item category-item--active">All categrories</div>
        <div class="category-item">Popular</div>
        <div class="category-item">Best Sellers</div>
        <div class="category-item">Coffee</div>
        <div class="category-item">Drinks</div>
        <div class="category-item">Food</div>
        <div class="category-item">Clothing</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "@/modules/template/components/template-comp-one/search-bar.vue";
</script>

<style lang="scss" scoped>
.category-row {
  @apply py-6 mdLg:py-5 sm:py-4 border-b-[6px] sm:border-b-4 xs:border-b-[3px] border-[#f5f5f5];

  .app-container {
    @apply flex flex-nowrap justify-between items-center gap-x-3;

    .search-area {
      @apply flex-nowrap justify-start items-center gap-x-3 hidden mdLg:flex w-full;
    }

    .category-list-dropdown {
      @apply flex-nowrap justify-end items-center hidden mdLg:flex sm:hidden gap-x-1.5 border border-grey-300 px-4 py-0 rounded-3xl w-max transition duration-300 ease-in-out hover:border-green-400;

      .form-control {
        @apply border-0 px-0;
      }

      .icon {
        @apply relative top-0.5 rotate-180;
      }
    }

    .category-list {
      @apply flex flex-nowrap justify-start items-center gap-x-1 mdLg:hidden;

      .category-item {
        @apply text-[14.75px] text-neutral-400 px-[18px] py-2.5 rounded-full cursor-pointer hover:text-neutral-500 hover:bg-neutral-50/30 transition duration-300 ease-in-out;

        &--active {
          @apply text-neutral-10 bg-green-700 hover:text-neutral-10 hover:bg-green-700;
        }
      }
    }
  }
}
</style>
