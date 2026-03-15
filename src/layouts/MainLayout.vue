<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense :icon="drawerIcon" aria-label="Menu" @click="toggleDrawer" />

        <q-toolbar-title class="flex items-center q-gutter-x-md">
          <span class="flex items-center q-gutter-x-sm">
            <span>Chatting as:</span>
            <span class="text-bold flex items-center q-gutter-x-sm">
              <UserAvatar />
              <span>{{ userStore.user.name }}</span>
            </span>
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="isDrawerOpen">
      <q-list>
        <q-item-label header> Chat Rooms </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user.store';
import { computed, ref } from 'vue';
import UserAvatar from 'src/components/UserAvatar.vue';

const isDrawerOpen = ref(false);

const drawerIcon = computed(() => (isDrawerOpen.value ? 'chevron_left' : 'chevron_right'));

const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value);

const userStore = useUserStore();
</script>
