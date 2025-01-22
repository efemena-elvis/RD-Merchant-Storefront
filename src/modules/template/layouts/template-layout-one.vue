<template>
  <div>
    <!-- TOP BAR -->
    <TopBar />

    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script setup>
import TopBar from "@/modules/template/components/template-comp-one/top-bar.vue";
import Footer from "@/modules/template/components/template-comp-one/footer.vue";
</script>

<style lang="css" scoped></style>
