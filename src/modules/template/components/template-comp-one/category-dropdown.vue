<template>
  <div class="category-list-dropdown">
    <select
      class="form-control"
      v-model="activeCategory"
      @change="handleCategoryChange"
    >
      <option
        v-for="(category, index) in props.productCategories"
        :key="index"
        :value="category.slug"
      >
        {{ category.name }}
      </option>
    </select>

    <div class="icon icon-caret-up"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface ICategoryProps {
  productCategories: { id: number; slug: string; name: string }[];
}

const props = withDefaults(defineProps<ICategoryProps>(), {
  productCategories: () => [],
});

const route = useRoute();
const router = useRouter();

const activeCategory = ref<string>("all");

const handleCategoryChange = () => {
  if (activeCategory.value === "all") router.push({ query: {} });
  else router.push({ query: { category: activeCategory.value } });
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
.category-list-dropdown {
  @apply flex-nowrap justify-end items-center hidden mdLg:flex sm:hidden gap-x-1.5 border border-grey-300 px-4 py-0 rounded-3xl w-max transition duration-300 ease-in-out hover:border-green-400;

  .form-control {
    @apply border-0 px-0;
  }

  .icon {
    @apply relative top-0.5 rotate-180;
  }
}
</style>
