<template>
  <MetaData />

  <div id="app">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>

  <!-- TOAST ALERT CARD -->
  <ToastCard
    v-if="alertInfo.message"
    :message="alertInfo.message"
    :description="alertInfo.description"
    :type="alertInfo.type"
  />

  <!-- PAGE LOADER -->
  <PageLoader v-if="pageLoading" />
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import { Emitter } from "mitt";
import MetaData from "@/shared/components/seo-comps/meta-data.vue";
import ToastCard from "@/shared/components/global-comps/toast-card.vue";
import PageLoader from "@/shared/components/global-comps/page-loader.vue";
import useEvents from "@/shared/composables/useEvents";

type IAlertInfo = {
  message: string;
  description: string;
  type: string;
};

// Define the type of the event bus
type Events = {
  triggerToastAlert: IAlertInfo;
  closeToastAlert: void;
  hidePageLoader: void;
  showPageLoader: void;
};

const eventBus = inject<Emitter<Events>>("eventBus");
const { pushToastAlert } = useEvents();

const alertInfo = ref<IAlertInfo>({
  message: "",
  description: "",
  type: "",
});

const updateAlertPayload = (message = "", description = "", type = "") => {
  alertInfo.value.message = message;
  alertInfo.value.description = description;
  alertInfo.value.type = type;
};

const pageLoading = ref<boolean>(false);

const showPageLoader = () => {
  pageLoading.value = true;
};

const hidePageLoader = () => {
  pageLoading.value = false;
};

onMounted(() => {
  eventBus?.on(
    "triggerToastAlert",
    ({ message, description, type }: IAlertInfo) => {
      updateAlertPayload(message, description, type);
    }
  );

  eventBus?.on("closeToastAlert", () => {
    updateAlertPayload();
  });

  eventBus?.on("showPageLoader", () => {
    showPageLoader();
  });

  eventBus?.on("hidePageLoader", () => {
    hidePageLoader();
  });
});

showPageLoader();
</script>

<style lang="scss">
html,
body {
  scroll-behavior: smooth;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.225s ease;
}

.fade-leave-active {
  transition: opacity 0.225s ease;
  opacity: 0;
}
</style>
