<template>
  <div class="checkout-ui">
    <div class="app-container">
      <div class="checkout-container">
        <!-- CHECKOUT CONTAINER LEFT -->
        <div class="checkout-container--left">
          <CheckoutCard title="Customer Information">
            <div class="body-area">
              <div class="grid-wrapper">
                <TextFieldInput
                  labelId="firstName"
                  labelTitle="First Name"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your first name"
                  :isRequired="true"
                  :hasBottomPadding="false"
                  @inputChanged="checkoutPayload.firstName = $event"
                  :errorHandler="{
                    validator: 'validateSingleName',
                  }"
                />

                <TextFieldInput
                  labelId="lastName"
                  labelTitle="Last Name"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your last name"
                  :isRequired="true"
                  :hasBottomPadding="false"
                  @inputChanged="checkoutPayload.lastName = $event"
                  :errorHandler="{
                    validator: 'validateSingleName',
                  }"
                />

                <TextFieldInput
                  labelId="email"
                  labelTitle="Email Address"
                  :inputType="IInputType.Email"
                  inputPlaceholder="Enter your email address"
                  :isRequired="true"
                  :hasBottomPadding="false"
                  @inputChanged="checkoutPayload.email = $event"
                  :errorHandler="{
                    validator: 'validateEmail',
                  }"
                />

                <PhoneFieldInput
                  labelId="phoneNumber"
                  labelTitle="Phone Number"
                  :inputValue="checkoutPayload.phoneNumber"
                  inputPlaceholder="Provide your phone number"
                  :isRequired="true"
                  :activeCountryCode="phoneCountryCode"
                  :hasBottomPadding="false"
                  @countryCodeChanged="phoneCountryCode = $event"
                  @inputChanged="checkoutPayload.phoneNumber = $event"
                  :errorHandler="{
                    validator: 'validatePhone',
                  }"
                />
              </div>
            </div>
          </CheckoutCard>

          <CheckoutCard title="Shipping Address">
            <div class="body-area">
              <div class="grid-wrapper">
                <TextFieldInput
                  labelId="addressLine1"
                  labelTitle="Address Line 1"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your address line 1"
                  :isTextArea="true"
                  :isRequired="true"
                  :hasBottomPadding="false"
                  @inputChanged="checkoutPayload.addressLine1 = $event"
                  :errorHandler="{
                    validator: 'validateRequired',
                  }"
                />

                <TextFieldInput
                  labelId="addressLine2"
                  labelTitle="Address Line 2 (Optional)"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your address line 2"
                  :isTextArea="true"
                  :isRequired="false"
                  :hasBottomPadding="false"
                  @inputChanged="checkoutPayload.addressLine2 = $event"
                />

                <SelectFieldInput
                  labelId="businessState"
                  labelTitle="Business State / Province"
                  inputPlaceholder="Provide your business state"
                  :inputValue="shippingPayload.state"
                  :selectData="zambianProvinces"
                  isRequired
                  :hasBottomPadding="false"
                  @onSelectionChange="checkoutPayload.state = $event"
                />

                <TextFieldInput
                  labelId="postalCode"
                  labelTitle="Postal Code"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your postal code"
                  :isRequired="true"
                  :hasBottomPadding="false"
                  @inputChanged="checkoutPayload.postalCode = $event"
                  :errorHandler="{
                    validator: 'validateRequired',
                  }"
                />
              </div>
            </div>
          </CheckoutCard>

          <CheckoutCard title="Billing & Payment">
            <div class="body-area">
              <div class="grid-wrapper">
                <div
                  class="payment-card"
                  :class="payment.isActive ? 'payment-card--active' : ''"
                  v-for="(payment, index) in paymentMethods"
                  :key="index"
                  @click="toggleActivePayment(index)"
                >
                  <div class="check-indicator">
                    <div
                      class="icon icon-checkmark"
                      v-if="payment.isActive"
                    ></div>
                  </div>

                  <div class="title">{{ payment.title }}</div>
                  <div class="description">{{ payment.description }}</div>
                </div>
              </div>
            </div>
          </CheckoutCard>
        </div>

        <!-- CHECKOUT CONTAINER RIGHT -->
        <div class="checkout-container--right">
          <CheckoutCard title="Order Summary">
            <!-- ORDER BLOCK LIST -->
            <div class="order-block">
              <template v-if="getProductsInCart.length">
                <CartOrderItem
                  v-for="(product, index) in getProductsInCart"
                  :key="index"
                  :product="product"
                />
              </template>

              <template v-else>
                <div class="empty-cart">
                  <img :src="renderImg('empty-cart.png')" alt="empty-cart" />

                  <div class="title-text">Your cart is empty</div>

                  <div class="description-text">
                    Look like you haven't added anything to your cart yet.
                  </div>
                </div>
              </template>
            </div>

            <!-- DISCOUNT BLOCK -->
            <div class="discount-block">
              <TextFieldInput
                labelId="discountCode"
                labelTitle="Have a Coupon Code?"
                :inputType="IInputType.Text"
                inputPlaceholder="Provide a valid coupon code"
                :isRequired="false"
                :hasBottomPadding="false"
                @inputChanged="couponPayload.couponCode = $event"
              />
            </div>

            <!-- PRODUCT SUMMATION BLOCK -->
            <div class="summation-block">
              <div class="secondary-total border-b border-b-grey-200/75">
                <div class="total-row">
                  <div class="text">Subtotal</div>
                  <div class="value">
                    <span class="mr-0.5">{{ getProductCurrency }}</span
                    ><span>{{ formatNumber(getSubTotal) }}</span>
                  </div>
                </div>

                <!-- <div class="total-row">
                  <div class="text">Shipping</div>
                  <div class="value">
                    <span class="mr-0.5">{{ getProductCurrency }}</span
                    ><span>{{ formatNumber(totalShippingFee) }}</span>
                  </div>
                </div> -->

                <div class="total-row">
                  <div class="text">Total VAT</div>
                  <div class="value">
                    <span class="mr-0.5">{{ getProductCurrency }}</span
                    ><span>{{ formatNumber(totalCollectedTax) }}</span>
                  </div>
                </div>
              </div>

              <div class="primary-total pt-5 pb-4">
                <div class="total-row">
                  <div class="text font-semibold">Total</div>
                  <div class="value !text-green-600">
                    <span class="mr-0.5">{{ getProductCurrency }}</span
                    ><span>{{ formatNumber(getTotalProductAmount) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </CheckoutCard>

          <!-- MAKE PAYMENT BTN -->
          <button
            class="btn"
            :disabled="isActionReady"
            @click="handleMakePayment"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from "vue";
import { Emitter } from "mitt";
import { IInputType } from "@/models/form-type";
import { useString } from "@/shared/composables/useString";
import useEvents from "@/shared/composables/useEvents";
import TextFieldInput from "@/shared/components/form-comps/text-field-input.vue";
import PhoneFieldInput from "@/shared/components/form-comps/phone-field-input.vue";
import SelectFieldInput from "@/shared/components/form-comps/select-field-input.vue";
import zambiaProvinceList from "@/shared/constants/zambia-provinces";
import CheckoutCard from "@/modules/template/components/template-comp-one/checkout-card.vue";
import CartOrderItem from "@/modules/template/components/template-comp-one/cart-order-item.vue";
import { useStorage } from "@/shared/composables/useStorage";
import { useStorefrontStore } from "@/modules/template/store";
import { storeToRefs } from "pinia";
import { v4 as uuidv4 } from "uuid";

type Events = {
  hidePageLoader: void;
  showPageLoader: void;
};

const eventBus = inject<Emitter<Events>>("eventBus");

const { processAPIRequest, pushToastAlert } = useEvents();
const { setStorage, removeStorage } = useStorage();

const { getStoreDetails, getProductsInCart } =
  storeToRefs(useStorefrontStore());
const { initiateStorefrontCheckout } = useStorefrontStore();

const { renderImg, formatNumber, createAndClickAnchor } = useString();

const zambianProvinces = ref([...zambiaProvinceList]);
const storeOrdersStorageKey = "storeOrders";
const phoneCountryCode = ref<string>("260");

const checkoutPayload = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  postalCode: "",
});

const selectedPaymentMethod = ref<string>("mobilemoney");

const couponPayload = ref({
  couponCode: "",
});

const totalShippingFee = ref<number>(0);
const totalCollectedTax = ref<number>(0);
const totalDiscountAmount = ref<number>(0);

const shippingPayload = ref({
  state: "",
});

const paymentMethods = ref([
  {
    title: "Payment via Card",
    slug: "card",
    description:
      "Fast, secure, and seamless card payments for your convenience",
    isActive: false,
  },
  {
    title: "Payment via Mobile Money",
    slug: "mobilemoney",
    description:
      "Fast, secure, and seamless mobile money payments for your convenience",
    isActive: true,
  },
]);

const getProductCurrency = computed(() => {
  // return getProductsInCart.value[0]?.currency ?? "ZK";
  return "ZK";
});

const getSubTotal = computed(() => {
  return getProductsInCart.value.reduce(
    (total, product) => total + product.amount * (product.quantityInCart || 1),
    0
  );
});

const getTotalProductAmount = computed(() => {
  return (
    getSubTotal.value +
    totalShippingFee.value +
    totalCollectedTax.value -
    totalDiscountAmount.value
  );
});

const toggleActivePayment = (index: number) => {
  paymentMethods.value = paymentMethods.value.map((payment, i) => ({
    ...payment,
    isActive: i === index,
  }));

  selectedPaymentMethod.value =
    paymentMethods.value.find((payment) => payment.isActive)?.slug ??
    "mobilemoney";
};

const isActionReady = computed(() => {
  return checkoutPayload.value.firstName &&
    checkoutPayload.value.lastName &&
    checkoutPayload.value.email &&
    checkoutPayload.value.phoneNumber &&
    checkoutPayload.value.addressLine1 &&
    checkoutPayload.value.state &&
    checkoutPayload.value.postalCode &&
    getTotalProductAmount.value > 0
    ? false
    : true;
});

const getCheckoutPayload = computed(() => {
  return {
    currency: "ZMW",
    country: "ZM",
    narration: "Product payment",
    method: selectedPaymentMethod.value,
    amount: getTotalProductAmount.value,
    redirect_url: `https://store.redstonepgs.com/${getStoreDetails.value?.slug}/checkout-success`,
    email: checkoutPayload.value.email,
    customer_first_name: checkoutPayload.value.firstName,
    customer_last_name: checkoutPayload.value.lastName,
    phone_number: phoneCountryCode.value + checkoutPayload.value.phoneNumber,
  };
});

const persistStoreOrders = () => {
  // CLEAR OUR ALL PREVIOUS CHECKOUT ORDERS
  removeStorage(storeOrdersStorageKey);

  // CREATE A NEW CHECKOUT ORDER PAYLOAD
  let storeOrderPayload = {
    user_id: uuidv4(),
    amount: getTotalProductAmount.value,
    address: checkoutPayload.value.addressLine1,
    payment_reference: null,
    payment_method: selectedPaymentMethod.value,
    currency: "ZMW",
    status: "pending",
    store_id: getStoreDetails.value?.id,
    customer: {
      email: checkoutPayload.value.email,
      phone_number: phoneCountryCode.value + checkoutPayload.value.phoneNumber,
      firstname: checkoutPayload.value.firstName,
      lastname: checkoutPayload.value.lastName,
    },
  };

  let products = getProductsInCart.value.map((product) => {
    return {
      product_id: product.id,
      price: product.amount,
      quantity: product.quantityInCart === 0 ? 1 : product.quantityInCart,
    };
  });

  setStorage({
    storage_name: storeOrdersStorageKey,
    storage_value: { ...storeOrderPayload, details: products },
    storage_type: "object",
  });
};

const handleMakePayment = async () => {
  eventBus?.emit("showPageLoader");

  const response = await processAPIRequest({
    action: initiateStorefrontCheckout,
    payload: {
      payload: getCheckoutPayload.value,
      businessId: getStoreDetails.value?.business_id,
    },
    showAlert: false,
  });

  if (response.code === 200) {
    persistStoreOrders(); // PERSIST OUR CHECKOUT ORDERS
    createAndClickAnchor(response.data.payment_link);
  }

  // HANDLE UNIDENTIFIED MOBILE OPERATOR
  else if (response.code === 400 && response.message === "Unknown Operator") {
    eventBus?.emit("hidePageLoader");

    pushToastAlert({
      message: "Unknown Mobile Operator",
      description: "Please check phone number and try again",
      type: "error",
    });
  }

  // HANDLE ERROR RESPONSE
  else {
    eventBus?.emit("hidePageLoader");

    pushToastAlert({
      message: "Checkout failed",
      description: "Unable to process your payment. Please try again later.",
      type: "error",
    });
  }
};

onMounted(() => {
  setTimeout(() => {
    eventBus?.emit("hidePageLoader");
  }, 500);
});

// SHOW PAGE LOADER BEFORE MOUNT
eventBus?.emit("showPageLoader");
</script>

<style lang="scss" scoped>
.checkout-ui {
  @apply relative mt-40 md:mt-36 sm:mt-32;

  .checkout-container {
    @apply w-full h-auto flex md:flex-col justify-between md:justify-start items-start gap-x-8 xl:gap-x-5;

    &--left {
      @apply w-[62%] mdLg:w-[56%] md:w-full;

      .body-area {
        @apply p-6 lg:p-4 xs:p-3 pt-8 lg:pt-7 xs:pt-7 xs:pb-[18px];

        .grid-wrapper {
          @apply grid grid-cols-2 mdLg:grid-cols-1 gap-x-6 lg:gap-x-4 gap-y-9;
        }
      }

      .payment-card {
        @apply relative w-full h-auto border border-grey-200 rounded-lg p-6 cursor-pointer transition duration-300 ease-in-out hover:bg-green-50/60 hover:border-green-500;

        .check-indicator {
          @apply absolute top-3 right-3 size-5 min-w-5 min-h-5 rounded-full border border-grey-200 flex justify-center items-center transition duration-300 ease-in-out;

          .icon {
            @apply text-lg text-neutral-10 transition duration-300 ease-in-out;
          }
        }

        .title {
          @apply text-[15.5px] font-semibold text-grey-800 mb-2;
        }

        .description {
          @apply text-[13.75px] leading-[21.5px] text-grey-500;
        }
      }

      .payment-card--active {
        @apply bg-green-50/60 border-green-500;

        .check-indicator {
          @apply bg-green-600 border-green-600;
        }
      }
    }

    &--right {
      @apply w-[36%] mdLg:w-[48%] md:w-full;

      .order-block {
        @apply p-6 lg:p-4 w-full h-auto border-b border-b-grey-200;

        .empty-cart {
          @apply flex flex-col justify-center items-center h-full pt-6 pb-10;

          img {
            @apply w-[70px] h-auto mx-auto mb-3.5;
          }

          .title-text {
            @apply text-base font-semibold text-grey-800 mb-1;
          }

          .description-text {
            @apply text-sm leading-[24px] text-grey-500 w-[75%] text-center;
          }
        }
      }

      .discount-block {
        @apply px-6 lg:px-4 py-7 lg:py-6 lg:pt-7 w-full h-auto border-b border-b-grey-200;
      }

      .summation-block {
        @apply p-6 lg:p-4 pb-0 w-full h-auto;

        .total-row {
          @apply w-full h-auto flex justify-between items-center gap-x-3 py-3 first-of-type:pt-0;

          .text {
            @apply text-[14px] text-grey-700;
          }

          .value {
            @apply text-[15px] lg:text-[14.5px] sm:text-[14px] font-semibold text-grey-700;
          }
        }
      }

      .btn {
        @apply mt-10 rounded-lg py-3 w-full bg-green-600 text-neutral-10 text-[15px] sm:text-sm font-semibold hover:bg-green-700 disabled:opacity-50;
      }
    }
  }
}
</style>
