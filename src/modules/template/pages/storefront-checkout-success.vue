<template>
  <div class="checkout-success-ui">
    <div class="app-container">
      <!-- TOP ROW -->
      <div class="top-row">
        <div class="icon icon-tick-circle"></div>
        <div class="primary-text">Thank you</div>
        <div class="secondary-text">Your order has been received</div>
        <div class="meta-text">
          You will receive an email with your order tracking details.
        </div>
      </div>

      <!-- ORDER DETAILS -->
      <div class="order-details">
        <div class="title-top">Order Details</div>

        <div class="body-row">
          <div class="body-row--left">Order number</div>
          <div class="body-row--right">
            {{ orderDetails.order_number || "---" }}
          </div>
        </div>

        <div class="body-row">
          <div class="body-row--left">Date</div>
          <div class="body-row--right">
            {{ orderDetails.date_ordered || "---" }}
          </div>
        </div>

        <div class="body-row">
          <div class="body-row--left">Payment method</div>
          <div class="body-row--right">
            {{ orderDetails.payment_method || "---" }}
          </div>
        </div>

        <!-- BOTTOM AREA -->
        <div class="bottom-area">
          <div class="body-row">
            <div class="body-row--left">Subtotal</div>
            <div class="body-row--right">
              <span class="mr-0.5">ZMW</span
              >{{ formatNumber(orderDetails.total_amount ?? "0") }}
            </div>
          </div>

          <div class="body-row">
            <div class="body-row--left">Total VAT</div>
            <div class="body-row--right">
              <span class="mr-0.5">ZMW</span>0.00
            </div>
          </div>

          <div class="body-row">
            <div class="body-row--left">Total</div>
            <div class="body-row--right">
              <span class="mr-0.5">ZMW</span
              >{{ formatNumber(orderDetails.total_amount ?? "0") }}
            </div>
          </div>
        </div>
      </div>

      <!-- MERCHANT DETAILS -->
      <div class="merchant-details">
        <div class="title-top">Merchant Details</div>

        <div class="body-area">
          <div class="body-area--left">
            <div class="title-text">Contact</div>

            <div class="body-text">
              <span class="font-medium">Email</span>:
              {{ merchantContactDetails.email }}
            </div>

            <div class="body-text">
              <span class="font-medium">Phone</span>:
              {{ merchantContactDetails.phone_number }}
            </div>
          </div>

          <div class="body-area--right">
            <div class="title-text">Business Address</div>
            <div class="body-text">
              {{ merchantContactDetails.address }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Emitter } from "mitt";
import useDate from "@/shared/composables/useDate";
import { useStorage } from "@/shared/composables/useStorage";
import { useString } from "@/shared/composables/useString";
import useEvents from "@/shared/composables/useEvents";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";

type Events = {
  hidePageLoader: void;
  showPageLoader: void;
};

const eventBus = inject<Emitter<Events>>("eventBus");

const route = useRoute();
const router = useRouter();

const storeOrdersStorageKey = "storeOrders";

const { formatNumber } = useString();
const { processAPIRequest } = useEvents();
const { getStorage, removeStorage } = useStorage();

const { getStoreDetails } = storeToRefs(useStorefrontStore());
const { placeStorefrontCheckoutOrder } = useStorefrontStore();

const orderDetails = ref<{
  order_number: string;
  date_ordered: string;
  payment_method: string;
  total_amount: number;
}>({
  order_number: "",
  date_ordered: "",
  payment_method: "",
  total_amount: 0,
});

const merchantContactDetails = computed(() => {
  return {
    phone_number: getStoreDetails.value?.phone_number,
    email: getStoreDetails.value?.email,
    address: getStoreDetails.value?.address,
  };
});

const getOrderDate = (date: any) => {
  let { w2, m3, d3, y1 } = useDate.formatDate(date, false).getAll();
  return `${w2}, ${d3} ${m3}, ${y1}`;
};

const processCheckoutOrder = async (orderPayload: object) => {
  const response = await processAPIRequest({
    action: placeStorefrontCheckoutOrder,
    payload: orderPayload,
    showAlert: false,
  });

  if (response.code === 200) {
    removeStorage(storeOrdersStorageKey);
    eventBus?.emit("hidePageLoader");

    const currentOrderDate = new Date();

    // POPULATE ORDER DETAILS
    orderDetails.value.order_number =
      response.data?.order_number || response.data.order_details[0].order_id;
    orderDetails.value.date_ordered = getOrderDate(currentOrderDate);
    orderDetails.value.payment_method =
      response.data.payment_method ?? "Mobile Money";
    orderDetails.value.total_amount = response.data.amount ?? "0";
  }
};

const checkIfRouteHasPaymentReferance = async () => {
  const paymentReference = route.query.paymentReference;
  const paymentStatus = route.query.status;

  if (!paymentReference || !paymentStatus) {
    router.push({ path: `/${getStoreDetails.value?.slug}/store-checkout` });
  }

  // PROCESS PAYMENT ORDER
  else {
    let storeOrderPayload = getStorage({
      storage_name: storeOrdersStorageKey,
      storage_type: "object",
    });

    if (!storeOrderPayload) {
      router.push({ path: `/${getStoreDetails.value?.slug}/store-checkout` });
    }

    // PROCESS PAYMENT ORDER
    else {
      processCheckoutOrder({
        ...(storeOrderPayload as object),
        payment_reference: paymentReference,
      });
    }
  }
};

onMounted(() => {
  checkIfRouteHasPaymentReferance();
});

// SHOW PAGE LOADER BEFORE MOUNT
eventBus?.emit("showPageLoader");
</script>

<style lang="scss" scoped>
.checkout-success-ui {
  @apply relative mt-48 md:mt-36 sm:mt-32;

  .top-row {
    @apply flex flex-col justify-center items-center mb-14;

    .icon {
      @apply text-5xl text-green-500 mb-3;
    }

    .primary-text {
      @apply text-2xl font-semibold text-center text-grey-800 mb-1;
    }

    .secondary-text {
      @apply text-lg text-center text-grey-600/85 mb-1;
    }

    .meta-text {
      @apply text-sm text-center text-grey-500/85;
    }
  }

  .order-details {
    @apply bg-grey-100/40 rounded-xl p-6 w-[46%] md:w-4/5 sm:w-full mx-auto shadow-sm mb-14;

    .title-top {
      @apply text-lg font-medium text-grey-700 mb-6;
    }

    .body-row {
      @apply flex justify-between items-start gap-x-4 text-sm mb-5;

      &--left {
        @apply w-1/2 text-grey-600;
      }

      &--right {
        @apply w-1/2 text-grey-700 font-semibold text-right;
      }
    }

    .bottom-area {
      @apply border-t border-t-grey-200 mt-6 pt-6;
    }
  }

  .merchant-details {
    @apply w-[46%] md:w-4/5 sm:w-full mx-auto mb-16;

    .title-top {
      @apply text-lg font-medium text-grey-700 mb-6;
    }

    .body-area {
      @apply flex sm:flex-col justify-between sm:justify-start items-start sm:items-start gap-x-4 sm:gap-y-5;

      .title-text {
        @apply text-grey-700 font-medium text-sm mb-3;
      }

      .body-text {
        @apply text-grey-600 text-sm mb-1.5;
      }

      &--left {
        @apply w-2/5;
      }

      &--right {
        @apply w-[56%];
      }
    }
  }
}
</style>
