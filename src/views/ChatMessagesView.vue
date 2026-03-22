<template>
  <q-scroll-area ref="scrollAreaRef" class="chat-messages-view q-px-lg q-py-md">
    <q-chat-message
      :text="[`Hello, world!`, `Hello again!`]"
      :name="userStore.user.name"
      stamp="2026-03-22 12:00:00"
      sent
    />
    <q-chat-message :text="[`Hello, world!`, `Hello again!`]" />
  </q-scroll-area>
</template>

<script setup lang="ts">
import { QScrollArea, QChatMessage } from 'quasar';
import { useUserStore } from 'src/stores/user.store';
import { ref } from 'vue';

const scrollAreaRef = ref<QScrollArea | null>(null);
const userStore = useUserStore();
</script>

<style scoped lang="scss">
.chat-messages-view {
  width: 100%;
  max-width: 600px;
  background: $dark-transparent;
}
</style>
