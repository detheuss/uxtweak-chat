<template>
  <div class="flex column text-center flex-center q-pa-md">
    <h3>Who is using chat?</h3>

    <div class="flex flex-wrap flex-center gap-md">
      <button
        v-for="user in TEST_USERS"
        :key="user.id"
        class="user-card__button"
        @click="handleSelectUser(user)"
      >
        <UserCard v-bind="user" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseUserT } from 'app/shared/types';
import UserCard from 'src/components/UserCard.vue';
import { TEST_USERS } from 'src/constants/constants';
import { PATHS } from 'src/router/constants';
import { useUserStore } from 'src/stores/user.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const handleSelectUser = (user: BaseUserT) => {
  userStore.login(user);
  void router.push(PATHS.home);
};
</script>

<style scoped>
.user-cards__container {
  display: flex;
  flex-wrap: wrap;
}

.user-card__button {
  all: unset;
  position: relative;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
    pointer-events: none;
  }

  &:hover::after {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
