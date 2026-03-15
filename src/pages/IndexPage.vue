<template>
  <q-page class="column height-none">
    <ChatMessagesView class="col-9" />
    <div class="col-3 border-t">
      <ChatMessageForm />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ChatMessagesView from 'src/views/ChatMessagesView.vue';
import ChatMessageForm from 'src/views/ChatMessageForm.vue';
</script>
