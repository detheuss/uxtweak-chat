<template>
  <q-page class="flex column items-center height-none">
    <ChatMessagesView class="col page-content" />
    <ChatMessageForm class="page-content" />
  </q-page>
</template>

<script setup lang="ts">
import ChatMessagesView from 'src/views/ChatMessagesView.vue';
import ChatMessageForm from 'src/views/ChatMessageForm.vue';
</script>

<style scoped lang="scss">
.q-page {
  background: url('src/assets/doodle.webp') center;
  background-size: contain;
}
</style>
