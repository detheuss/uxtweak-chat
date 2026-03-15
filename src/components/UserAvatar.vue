<template>
  <div class="flex items-center q-gutter-x-sm">
    <q-avatar size="md" :style="{ backgroundColor: userStore.user.color }">
      <span>{{ avatarChar }}</span>
    </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user.store';
import { computed } from 'vue';

const userStore = useUserStore();

const avatarChar = computed(() => userStore.user.name.charAt(0)?.toUpperCase());
</script>

<style scoped></style>
