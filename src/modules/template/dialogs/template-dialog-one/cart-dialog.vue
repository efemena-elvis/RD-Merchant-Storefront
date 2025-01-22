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
        <CartItem />

        <!-- <div
          class="empty-cart-wrapper flex flex-col justify-center items-center h-full -mt-10"
        >
          <EmptyCart
            title="Your cart is empty"
            description=" Looks like you have not added any item to your cart yet"
          />
        </div> -->
      </div>
    </template>

    <!-- MODAL COVER FOOTER -->
    <template #modal-cover-footer>
      <div class="modal-cover-footer">
        <router-link to="" @click="goToCheckout" class="btn"
          >Proceed to Checkout</router-link
        >
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import ModalDialog from "@/shared/components/global-comps/modal-dialog.vue";
import CartItem from "@/modules/template/dialogs/template-dialog-one/cart-dialog-item.vue";
import EmptyCart from "@/modules/template/components/template-comp-one/empty-cart.vue";

const $emit = defineEmits(["closeTriggered"]);

const router = useRouter();

const goToCheckout = () => {
  $emit("closeTriggered");
  router.push("/store-checkout");
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  @apply pt-7 sm:pt-5 pb-5 sm:pb-4 border-b-[6px] border-[#f5f5f5];
}

.modal-cover-body {
  @apply h-4/5;
}

.modal-cover-footer {
  @apply absolute bottom-0 left-0 right-0 py-6 sm:py-4 bg-white;

  .btn {
    @apply rounded-lg py-3 w-full bg-green-600 text-neutral-10 text-base sm:text-sm font-medium hover:bg-green-700;
  }
}
</style>
