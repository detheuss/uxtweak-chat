<template>
  <q-avatar :size="`${width}px`">
    <img :src="avatarSrc" :width="width" :height="height" />
  </q-avatar>
</template>

<script setup lang="ts">
import { QAvatar } from 'quasar';

const { width = 48, height = 48 } = defineProps<{
  avatarSrc?: string;
  width?: number;
  height?: number;
}>();
</script>
