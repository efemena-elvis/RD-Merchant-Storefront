<template>
  <ModalDialog
    :place_side="true"
    :modal_style="{ size: 'modal-md', shape: 'rounded-none' }"
    @closeModal="$emit('closeTriggered')"
  >
    <!-- MODAL COVER HEADER -->
    <template #modal-cover-header>
      <div class="modal-cover-header">
        <div class="modal-cover-title">Shopping Cart</div>
      </div>
    </template>

    <template #modal-cover-body>
      <div class="modal-cover-body">
        <template v-if="cartIsLoading">
          <CartLoadingItem v-for="(_, index) in 3" :key="index" />
        </template>

        <template v-else-if="!cartIsLoading && getProductsInCart.length">
          <CartItem
            v-for="(product, index) in getProductsInCart"
            :key="index"
            :product="product"
          />
        </template>

        <template v-else>
          <div class="empty-cart-wrapper">
            <EmptyCart
              title="Your cart is empty"
              description=" Looks like you have not added any item to your cart yet"
            />
          </div>
        </template>
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template #modal-cover-footer>
      <div class="modal-cover-footer">
        <button
          @click="goToCheckout"
          class="btn btn-md"
          v-if="getProductsInCart.length"
        >
          <div class="icon-shopping-cart text-lg"></div>
          Proceed to Checkout
        </button>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ModalDialog from "@/shared/components/global-comps/modal-dialog.vue";
import CartItem from "@/modules/template/dialogs/template-dialog-one/cart-dialog-item.vue";
import EmptyCart from "@/modules/template/components/template-comp-one/empty-cart.vue";
import CartLoadingItem from "@/modules/template/dialogs/template-dialog-one/cart-loading-item.vue";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";

const router = useRouter();
const $emit = defineEmits(["closeTriggered"]);

const { getStoreDetails, getProductsInCart } =
  storeToRefs(useStorefrontStore());

const cartIsLoading = ref<boolean>(true);

const goToCheckout = () => {
  $emit("closeTriggered");
  router.push(`/${getStoreDetails.value?.slug}/store-checkout`);
};

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
  @apply h-4/5;

  .empty-cart-wrapper {
    @apply flex flex-col justify-center items-center h-full -mt-10;
  }
}

.modal-cover-footer {
  @apply absolute bottom-0 left-0 right-0 py-6 sm:py-4 bg-white;

  .btn {
    @apply rounded-lg py-3 w-full bg-green-600 text-neutral-10 text-[14.75px] sm:text-sm hover:bg-green-700 font-normal;
  }
}
</style>
