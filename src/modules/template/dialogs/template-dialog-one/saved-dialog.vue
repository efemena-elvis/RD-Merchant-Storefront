<template>
  <ModalDialog
    :place_side="true"
    :modal_style="{ size: 'modal-md', shape: 'rounded-none' }"
    @closeModal="$emit('closeTriggered')"
  >
    <!-- MODAL COVER HEADER -->
    <template #modal-cover-header>
      <div class="modal-cover-header">
        <div class="modal-cover-title">Saved Products</div>
      </div>
    </template>

    <template #modal-cover-body>
      <div class="modal-cover-body">
        <template v-if="cartIsLoading">
          <CartLoadingItem v-for="(_, index) in 3" :key="index" />
        </template>

        <template v-else-if="!cartIsLoading && getProductsInWishList.length">
          <SavedItem
            v-for="(product, index) in getProductsInWishList"
            :key="index"
            :product="product"
          />
        </template>

        <template v-else>
          <div class="empty-cart-wrapper">
            <EmptyCart
              title="No saved item"
              description="Looks like you have not saved any product for a later purchase yet."
            />
          </div>
        </template>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import ModalDialog from "@/shared/components/global-comps/modal-dialog.vue";
import SavedItem from "@/modules/template/dialogs/template-dialog-one/saved-dialog-item.vue";
import EmptyCart from "@/modules/template/components/template-comp-one/empty-cart.vue";
import CartLoadingItem from "@/modules/template/dialogs/template-dialog-one/cart-loading-item.vue";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";

const { getProductsInWishList } = storeToRefs(useStorefrontStore());

const cartIsLoading = ref<boolean>(true);

onMounted(() => {
  setTimeout(() => {
    cartIsLoading.value = false;
  }, 1000);
});
</script>

<style lang="scss" scoped>
.modal-cover-header {
  @apply pt-7 sm:pt-5 pb-5 sm:pb-4 border-b-[6px] border-[#f5f5f5];
}

.modal-cover-body {
  @apply h-[90%];

  .empty-cart-wrapper {
    @apply flex flex-col justify-center items-center h-full -mt-10;
  }
}
</style>
