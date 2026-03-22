<template>
  <q-card class="user-card flex flex-center">
    <q-card-section>
      <UserAvatar :avatar-src="avatarSrc" />
      <div class="full-width text-center text-h6 q-mt-sm">
        {{ name }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { BaseUserT } from 'app/shared/types';
import { QCard, QCardSection } from 'quasar';
import UserAvatar from 'src/components/UserAvatar.vue';

defineProps<BaseUserT>();
</script>

<style scoped>
.user-card {
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
