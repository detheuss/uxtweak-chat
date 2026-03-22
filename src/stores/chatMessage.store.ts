import { useWebSocket } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { SessionChatMessageT } from 'shared/types';
import { ref, watch } from 'vue';

export const useChatMessageStore = defineStore('chatMessage', () => {
  const chatMessages = ref<SessionChatMessageT[]>([]);

  const { data, send } = useWebSocket(process.env.BASE_WS_URL);

  watch(data, (msg) => {
    console.log('Received:', msg);
    chatMessages.value.push(msg);
  });

  const apiSendChatMessage = (message: SessionChatMessageT) => {
    const messageJson = JSON.stringify(message);
    send(messageJson);
  };

  return {
    chatMessages,
    apiSendChatMessage,
  };
});
