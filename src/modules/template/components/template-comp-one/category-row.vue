<template>
  <div class="category-row">
    <div class="app-container">
      <!-- SEARCH AREA -->
      <div class="search-area">
        <SearchBar />
      </div>

      <!-- CATEGORY LIST DROPDOWN -->
      <CategoryDropdown :productCategories="productCategories" />

      <div class="category-list">
        <div
          v-for="(category, index) in productCategories"
          :key="index"
          class="category-item"
          :class="{ 'category-item--active': category.slug === activeCategory }"
          @click="handleCategoryClick(category.slug)"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { IProductCategory } from "@/models/product-type";
import SearchBar from "@/modules/template/components/template-comp-one/search-bar.vue";
import CategoryDropdown from "@/modules/template/components/template-comp-one/category-dropdown.vue";

interface ICategoryProps {
  productCategories: IProductCategory[];
}

withDefaults(defineProps<ICategoryProps>(), {
  productCategories: () => [],
});

const route = useRoute();
const router = useRouter();

const activeCategory = ref<string>("all");

const handleCategoryClick = (slug: string) => {
  if (slug === "all") router.push({ query: {} });
  else router.push({ query: { category: slug } });
};

watch(
  () => route.query,
  () => {
    if (route.query.category) {
      activeCategory.value = route.query.category as string;
    } else {
      activeCategory.value = "all";
    }
  },
  { immediate: true }
);
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
      @apply flex flex-nowrap justify-start items-center gap-x-1 mdLg:hidden overflow-auto w-full;

      &::-webkit-scrollbar {
        @apply h-1;
      }

      &::-webkit-scrollbar-track {
        @apply rounded-sm;
      }

      &::-webkit-scrollbar-thumb {
        @apply rounded-sm bg-grey-300/45;
      }

      .category-item {
        @apply text-[14.75px] text-nowrap select-none mb-0.5 text-neutral-400 px-[18px] py-2.5 rounded-full cursor-pointer hover:text-neutral-500 hover:bg-neutral-50/30 transition duration-300 ease-in-out;

        &--active {
          @apply text-neutral-10 bg-green-700 hover:text-neutral-10 hover:bg-green-700;
        }
      }
    }
  }
}
</style>
