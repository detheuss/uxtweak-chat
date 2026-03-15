<template>
  <div class="full-width q-px-md">
    <QScrollArea ref="scrollAreaRef"></QScrollArea>
    {{ chatMessageStore.chatMessages }}
  </div>
</template>

<script setup lang="ts">
import { QScrollArea } from 'quasar';
import { useChatMessageStore } from 'src/stores/chatMessage.store';
import { ref } from 'vue';

const scrollAreaRef = ref<QScrollArea | null>(null);

const chatMessageStore = useChatMessageStore();
</script>

<style scoped></style>
