import 'pinia-plugin-persistedstate';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { BaseUserT } from 'shared/types';
import { NULL_USER } from 'src/constants/constants';

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<BaseUserT>({ ...NULL_USER });

    const login = (u: BaseUserT) => (user.value = { ...u });

    const logout = () => (user.value = { ...NULL_USER });

    return {
      user,
      login,
      logout,
    };
  },

  {
    persist: true,
  },
);
