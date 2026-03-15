<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-transparent">
      <HeaderView />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import HeaderView from 'src/views/HeaderView.vue';
</script>
