import { useWebSocket } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { ChatMessageT } from 'shared/types';
import { ref, watch } from 'vue';

export const useChatMessageStore = defineStore('chatMessage', () => {
  const chatMessages = ref<ChatMessageT[]>([]);

  const { data, send } = useWebSocket(process.env.BASE_WS_URL);

  watch(data, (msg) => {
    console.log('Received:', msg);
    chatMessages.value.push(msg);
  });

  const apiSendChatMessage = (message: ChatMessageT) => {
    const messageJson = JSON.stringify(message);
    send(messageJson);
  };

  return {
    chatMessages,
    apiSendChatMessage,
  };
});
