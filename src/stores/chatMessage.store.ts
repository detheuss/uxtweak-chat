import { useWebSocket } from '@vueuse/core';
import { WS_EVENT_TYPES } from 'shared/const';
import { defineStore } from 'pinia';
import type {
  ChatMessageDtoOutT,
  ChatMessageDtoInT,
  WsEventT,
  ChatMessageDisplayT,
} from 'shared/types';
import { apiGetChatMessages, apiSendChatMessage } from 'src/api/api';
import { ref, watch } from 'vue';
import { getStampText, checkWithinLastMinute } from 'src/utils/utils';
import { Notify } from 'quasar';
import { MSG_SUCCESS_CONNECTED } from 'src/api/messages';

export const useChatMessageStore = defineStore('chatMessage', () => {
  const chatMessages = ref<ChatMessageDisplayT[]>([]);

  const version = ref(0);

  const { data: lastEvent } = useWebSocket(process.env.BASE_WS_URL);

  watch(lastEvent, (next) => {
    processIncomingEvent(next);
  });

  const processIncomingEvent = (wsEvent?: string) => {
    if (!wsEvent) return;
    let parsedEvent: WsEventT;
    try {
      parsedEvent = JSON.parse(wsEvent) as WsEventT;
    } catch {
      console.warn('Invalid WebSocket message:', wsEvent);
      return;
    }

    switch (parsedEvent.type) {
      case WS_EVENT_TYPES.chat:
        processIncomingChatMessage(parsedEvent.data);
        break;
      case WS_EVENT_TYPES.system:
        if (parsedEvent.message != null) {
          console.debug('System event:', parsedEvent.message);
          Notify.create(MSG_SUCCESS_CONNECTED); // for now we only have connected system event
        }
        break;
      default: {
        console.warn('Invalid WebSocket event type', wsEvent);
        break;
      }
    }
  };

  const processIncomingChatMessage = (dtoIn?: ChatMessageDtoInT) => {
    if (!dtoIn?.author?.id || !dtoIn.timestamp || !dtoIn.message) return;

    const lastChunk = chatMessages.value.at(-1);

    if (!lastChunk) {
      pushNextChunk(dtoIn);
    } else {
      const isSameAuthor = lastChunk.meta.author.id === dtoIn.author.id;
      const isWithinLastMinute = checkWithinLastMinute(
        lastChunk.meta.lastTimestamp,
        dtoIn.timestamp,
      );

      if (isSameAuthor && isWithinLastMinute) {
        lastChunk.display.text ??= [];
        lastChunk.display.text.push(dtoIn.message);
        lastChunk.meta.lastTimestamp = dtoIn.timestamp;
      } else {
        pushNextChunk(dtoIn);
      }
    }

    version.value++;
  };

  const createNextChunk = (dtoIn: ChatMessageDtoInT) => {
    return {
      meta: {
        author: dtoIn.author,
        lastTimestamp: dtoIn.timestamp,
        id: dtoIn.id,
      },
      display: {
        text: [dtoIn.message],
        name: dtoIn.author.name,
        stamp: getStampText(dtoIn.timestamp),
        avatar: dtoIn.author.avatarSrc,
      },
    };
  };

  const pushNextChunk = (dtoIn: ChatMessageDtoInT) => {
    const nextChunk = createNextChunk(dtoIn);
    chatMessages.value.push(nextChunk);
  };

  const sendChatMessage = async (message: ChatMessageDtoOutT) => await apiSendChatMessage(message);

  const getChatMessages = () =>
    apiGetChatMessages().then((res) => {
      chatMessages.value = [];
      const data = res.data as ChatMessageDtoInT[];
      data.forEach(processIncomingChatMessage);
    });

  return {
    chatMessages,
    version,
    sendChatMessage,
    getChatMessages,
  };
});
