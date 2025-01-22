<template>
  <ModalDialog
    :place_side="true"
    :modal_style="{ size: 'modal-md', shape: 'rounded-none' }"
    @closeModal="$emit('closeTriggered')"
  >
    <!-- MODAL COVER HEADER -->
    <template #modal-cover-header>
      <div class="modal-cover-header">
        <div class="modal-cover-title">Order History</div>
      </div>
    </template>

    <template #modal-cover-body>
      <div class="modal-cover-body">
        <!-- <OrderItem /> -->

        <div
          class="empty-cart-wrapper flex flex-col justify-center items-center h-full -mt-10"
        >
          <EmptyCart
            title="Order history is empty"
            description="No order history yet. Place an order to see your order history."
          />
        </div>
      </div>
    </template>
  </ModalDialog>
</template>

<script lang="ts" setup>
import ModalDialog from "@/shared/components/global-comps/modal-dialog.vue";
import OrderItem from "@/modules/template/dialogs/template-dialog-one/orders-dialog-item.vue";
import EmptyCart from "@/modules/template/components/template-comp-one/empty-cart.vue";
</script>

<style lang="scss" scoped>
.modal-cover-header {
  @apply pt-7 sm:pt-5 pb-5 sm:pb-4 border-b-[6px] border-[#f5f5f5];
}

.modal-cover-body {
  @apply h-[90%];
}
</style>
