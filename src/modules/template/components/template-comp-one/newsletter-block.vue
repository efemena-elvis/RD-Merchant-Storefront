<template>
  <div class="app-container">
    <div class="newsletter-block">
      <!-- COPY BLOCK -->
      <div class="copy-block">
        <div class="title-text">
          Get <span class="text-yellow-500">25% Discount</span> on your first
          purchase
        </div>

        <div class="description-text">
          Subscribe to our newsletter to get the latest updates and special
          offers. We'll send you a coupon code for 25% off your first purchase.
        </div>
      </div>

      <!-- FORM BLOCK -->
      <div class="form-block">
        <form action="">
          <div class="form-group">
            <label for="" class="form-label-basic">Full Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Your full name"
            />
          </div>

          <div class="form-group">
            <label for="" class="form-label-basic">Email Address</label>
            <input
              type="email"
              class="form-control"
              placeholder="Your email address"
            />
          </div>

          <button class="btn">Subscribe Now</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.newsletter-block {
  @apply relative w-full h-auto rounded-3xl overflow-hidden bg-[#e6f3fb]/90 flex md:flex-col justify-between md:justify-center items-center py-24 lg:py-16 mdLg:py-14 sm:py-12 px-16 lg:px-12 mdLg:px-10 sm:px-5 mt-28 sm:mt-20 mb-16 sm:mb-12;

  .copy-block {
    @apply w-[44%] mdLg:w-[46%] md:w-full md:mb-12 flex flex-col justify-center items-start gap-y-8 md:gap-y-6;

    .title-text {
      @apply text-5xl lg:text-4xl mdLg:text-3xl sm:text-2xl leading-[62px] text-grey-800 font-bold;
    }

    .description-text {
      @apply text-lg mdLg:text-[17px] sm:text-[15px] leading-[30px] text-grey-500;
    }
  }

  .form-block {
    @apply w-[45%] md:w-full;

    .form-group {
      @apply mb-8;
    }

    .form-label-basic {
      @apply text-[15px] mb-2.5 text-grey-800 font-normal;
    }

    .btn {
      @apply mt-10 rounded-lg py-3 w-full bg-green-600 text-neutral-10 text-base sm:text-sm font-medium hover:bg-green-700;
    }
  }
}
</style>
