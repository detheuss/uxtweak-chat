<template>
  <div class="flex flex-center window-height window-width">
    <q-form class="q-pa-lg q-gutter-md" style="max-width: 400px; width: 100%" @submit="onSubmit">
      <q-input
        filled
        v-model="username"
        label="Your username *"
        hint="Create your username"
        lazy-rules
        :rules="usernameRules"
      />

      <q-toggle v-model="isRemembered" label="Remember me" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user.store';
import { ref } from 'vue';

const userStore = useUserStore();

const username = ref('');
const isRemembered = ref(false);

const usernameRules = [
  (val: string) => (val && val.length > 0) || 'Username is required',
  (val: string) => val.length >= 3 || 'Must be at least 3 characters',
];

const onSubmit = () => {
  try {
    userStore.setUsername(username.value);
    userStore.setIsRemembered(isRemembered.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
