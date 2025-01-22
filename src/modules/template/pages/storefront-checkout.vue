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
                />

                <TextFieldInput
                  labelId="lastName"
                  labelTitle="Last Name"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your last name"
                  :isRequired="true"
                  :hasBottomPadding="false"
                />

                <TextFieldInput
                  labelId="email"
                  labelTitle="Email Address"
                  :inputType="IInputType.Email"
                  inputPlaceholder="Enter your email address"
                  :isRequired="true"
                  :hasBottomPadding="false"
                />

                <TextFieldInput
                  labelId="phoneNumber"
                  labelTitle="Phone Number"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your phone number"
                  :isRequired="true"
                  :hasBottomPadding="false"
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
                />

                <TextFieldInput
                  labelId="addressLine2"
                  labelTitle="Address Line 2 (Optional)"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your address line 2"
                  :isTextArea="true"
                  :isRequired="false"
                  :hasBottomPadding="false"
                />

                <SelectFieldInput
                  labelId="businessState"
                  labelTitle="Business State / Province"
                  inputPlaceholder="Provide your business state"
                  :inputValue="shippingPayload.state"
                  :selectData="zambianProvinces"
                  isRequired
                  :hasBottomPadding="false"
                  @onSelectionChange="shippingPayload.state = $event"
                />

                <TextFieldInput
                  labelId="postalCode"
                  labelTitle="Postal Code"
                  :inputType="IInputType.Text"
                  inputPlaceholder="Enter your postal code"
                  :isRequired="true"
                  :hasBottomPadding="false"
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
              <CartOrderItem />
              <CartOrderItem />
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
                @inputChanged="payload.couponCode = $event"
              />
            </div>

            <!-- PRODUCT SUMMATION BLOCK -->
            <div class="summation-block">
              <div class="secondary-total border-b border-b-grey-200/75">
                <div class="total-row">
                  <div class="text">Subtotal</div>
                  <div class="value">ZK20.00</div>
                </div>

                <div class="total-row">
                  <div class="text">Shipping</div>
                  <div class="value">ZK4.00</div>
                </div>

                <div class="total-row">
                  <div class="text">Taxes</div>
                  <div class="value">ZK0.00</div>
                </div>
              </div>

              <div class="primary-total pt-5 pb-4">
                <div class="total-row">
                  <div class="text font-semibold">Total</div>
                  <div class="value">ZK24.00</div>
                </div>
              </div>
            </div>
          </CheckoutCard>

          <!-- MAKE PAYMENT BTN -->
          <button class="btn">Make Payment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { IInputType } from "@/models/form-type";
import TextFieldInput from "@/shared/components/form-comps/text-field-input.vue";
import SelectFieldInput from "@/shared/components/form-comps/select-field-input.vue";
import zambiaProvinceList from "@/shared/constants/zambia-provinces";
import CheckoutCard from "@/modules/template/components/template-comp-one/checkout-card.vue";
import CartOrderItem from "@/modules/template/components/template-comp-one/cart-order-item.vue";

const zambianProvinces = ref([...zambiaProvinceList]);

const payload = ref({
  couponCode: "",
});

const shippingPayload = ref({
  state: "",
});

const paymentMethods = ref([
  {
    title: "Payment via Card",
    description:
      "Fast, secure, and seamless card payments for your convenience",
    isActive: true,
  },
  {
    title: "Payment via Mobile Money",
    description:
      "Fast, secure, and seamless mobile money payments for your convenience",
    isActive: false,
  },
]);

const toggleActivePayment = (index: number) => {
  paymentMethods.value = paymentMethods.value.map((payment, i) => ({
    ...payment,
    isActive: i === index,
  }));
};
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
        @apply mt-10 rounded-lg py-3 w-full bg-green-600 text-neutral-10 text-[15px] sm:text-sm font-semibold hover:bg-green-700;
      }
    }
  }
}
</style>
