<template>
  <q-scroll-area ref="scrollAreaRef" class="chat-messages-view q-px-md q-py-md" :visible="false">
    <q-chat-message
      v-for="chunk in chatMessageStore.chatMessages"
      :key="chunk.meta.id"
      :sent="checkSent(chunk.meta.author.id)"
      v-bind="chunk.display"
    />
    <q-inner-loading :showing="isLoading" label="Getting chat messages..." />
  </q-scroll-area>
</template>

<script setup lang="ts">
import { QScrollArea, QChatMessage, QInnerLoading } from 'quasar';
import { useChatMessageStore } from 'src/stores/chatMessage.store';
import { useUserStore } from 'src/stores/user.store';
import { nextTick, onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { MSG_ERROR_APOLOGETIC } from 'src/api/messages';

const scrollAreaRef = ref<QScrollArea | null>(null);
const userStore = useUserStore();
const chatMessageStore = useChatMessageStore();
const isLoading = ref(true);

const scrollToBottom = (duration = 0) => {
  const scroll = scrollAreaRef.value;
  if (!scroll) return;

  const target = scroll.getScrollTarget();
  scroll.setScrollPosition('vertical', target.scrollHeight, duration);
};

watch(
  () => chatMessageStore.version,
  async () => {
    await nextTick();
    scrollToBottom();
  },
);

const $q = useQuasar();

const checkSent = (userId: string) => userId === userStore.user.id;

onMounted(() => {
  chatMessageStore
    .getChatMessages()
    .catch((e) => {
      $q.notify(MSG_ERROR_APOLOGETIC);
      console.error(e);
    })
    .finally(() => (isLoading.value = false));
});
</script>

<style scoped lang="scss">
.chat-messages-view {
  width: 100%;
  max-width: 600px;
  background: $dark-transparent;
}
</style>
