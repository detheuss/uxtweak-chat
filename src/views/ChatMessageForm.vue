<template>
  <q-form
    ref="formRef"
    :autofocus="!checkIsMobile()"
    class="chat-message-form full-width row items-end q-px-lg q-py-md"
    @submit="handleSendChatMessage"
  >
    <q-input
      v-model="message"
      class="col resize-none"
      type="textarea"
      ref="inputRef"
      borderless
      :placeholder="placeholderText"
      :maxlength="MAX_MESSAGE_LENGTH"
      counter
    />

    <q-btn color="primary" type="submit" icon="send" class="q-ml-md" />
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { checkIsMac, checkIsMobile, createMessageDto } from 'src/utils/utils';
import { sanitizeChatMessageText, validateMaxLength } from 'shared/utils';
import { useChatMessageStore } from 'src/stores/chatMessage.store';
import { useUserStore } from 'src/stores/user.store';
import { useQuasar } from 'quasar';
import { MSG_ERROR_APOLOGETIC } from 'src/api/messages';
import { MAX_MESSAGE_LENGTH } from 'app/shared/const';

const message = ref('');
const formRef = ref();
const inputRef = ref();

const $q = useQuasar();

const { sendChatMessage } = useChatMessageStore();
const userStore = useUserStore();

const keys = useMagicKeys();
const shortcut = checkIsMac() ? keys['Meta+Enter']! : keys['Ctrl+Enter']!;

watch(shortcut, (pressed) => {
  if (pressed) formRef.value?.submit();
});

const placeholderText = computed(() => {
  if (checkIsMobile()) return 'Write a message...';
  return checkIsMac() ? 'Cmd+Enter to send...' : 'Ctrl+Enter to send...';
});

const handleSendChatMessage = () => {
  const text = sanitizeChatMessageText(message.value);
  if (!text) return;

  if (!validateMaxLength(text)) return;

  const dto = createMessageDto(text, userStore.user);

  sendChatMessage(dto)
    .then(() => {
      message.value = '';
    })
    .catch((e) => {
      console.error(e);
      $q.notify(MSG_ERROR_APOLOGETIC);
    });
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
