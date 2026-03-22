<template>
  <q-form
    ref="formRef"
    autofocus
    class="chat-message-form full-width row items-end q-px-lg q-py-md"
    @submit="sendChatMessage"
  >
    <q-input
      v-model="message"
      class="col resize-none"
      type="textarea"
      borderless
      :placeholder="placeholderText"
    />

    <q-btn color="primary" type="submit" icon="send" class="q-ml-md" />
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { checkIsMac, checkIsMobile } from 'src/utils/utils';
// import { useChatMessageStore } from 'src/stores/chatMessage.store';
// import { useUserStore } from 'src/stores/user.store';

const message = ref('');
const formRef = ref();

// const { apiSendChatMessage } = useChatMessageStore();
// const userStore = useUserStore();

const keys = useMagicKeys();
const shortcut = checkIsMac() ? keys['Meta+Enter']! : keys['Ctrl+Enter']!;

watch(shortcut, (pressed) => {
  if (pressed) formRef.value?.submit();
});

const placeholderText = computed(() => {
  if (checkIsMobile()) return 'Write a message...';
  return checkIsMac() ? 'Cmd+Enter to send...' : 'Ctrl+Enter to send...';
});

const sendChatMessage = () => {
  const text = message.value.trim();
  console.log('text', text);
  // if (!text) return;
  // apiSendChatMessage({
  //   message: text,
  //   timestamp: new Date().toISOString(),
  //   author: userStore.user,
  // });
  message.value = '';
};
</script>

<style lang="scss" scoped>
.chat-message-form {
  width: 100%;
  max-width: 600px;
  background: $dark-page;
}
.resize-none :deep(textarea) {
  resize: none;
}
</style>
