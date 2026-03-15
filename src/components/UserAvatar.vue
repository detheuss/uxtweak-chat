<template>
  <div class="flex items-center q-gutter-x-sm">
    <q-avatar size="md" :style="{ backgroundColor: userStore.getUserColor() }">
      <span>{{ userStore.getUserAvatarChar() }}</span>
    </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user.store';

const userStore = useUserStore();
</script>

<style scoped></style>
