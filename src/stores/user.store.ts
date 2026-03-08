import 'pinia-plugin-persistedstate';
import { defineStore } from 'pinia';
import { ref } from 'vue';

type UserStorePersistedDataT = {
  username: string;
  isRemembered: boolean;
};

export const useUserStore = defineStore(
  'user',
  () => {
    const username = ref('');
    const isRemembered = ref(false);

    const setUsername = (newUsername: string) => {
      username.value = newUsername;
    };

    const setIsRemembered = (value: boolean) => {
      isRemembered.value = value;
    };

    return {
      username,
      isRemembered,
      setUsername,
      setIsRemembered,
    };
  },

  {
    persist: {
      serializer: {
        serialize: (state) => {
          const s = state as UserStorePersistedDataT;
          return JSON.stringify({
            username: s.isRemembered ? s.username : '',
            isRemembered: s.isRemembered,
          });
        },
        deserialize: (value) => JSON.parse(value),
      },
    },
  },
);
