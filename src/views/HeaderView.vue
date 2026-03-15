<template>
  <q-toolbar class="border-b">
    <q-toolbar-title class="flex items-center q-gutter-x-md">
      <div class="flex items-center q-gutter-x-sm text-uppercase text-caption">
        <span>Chatting as:</span>
        <span class="text-bold flex items-center q-gutter-x-sm">
          <UserAvatar />
          <span>{{ userStore.user.name }}</span>
        </span>
      </div>
      <q-btn class="q-ml-auto" color="secondary" @click="handleLogout"> Logout </q-btn>
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user.store';
import UserAvatar from 'src/components/UserAvatar.vue';
import { useRouter } from 'vue-router';
import { PATHS } from 'src/router/constants';

const router = useRouter();
const handleLogout = () => {
  userStore.logout();
  void router.push(PATHS.login);
};

const userStore = useUserStore();
</script>

<style scoped></style>
