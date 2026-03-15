import 'pinia-plugin-persistedstate';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const USER_COLORS = [
  'oklch(70.5% 0.015 286.067)', // zinc-400 (default)
  'oklch(0.789 0.154 211.53)', // cyan-400
  'oklch(0.714 0.203 305.504)', // violet-400
  'oklch(0.792 0.209 151.711)', // green-400
  'oklch(0.704 0.191 22.216)', // rose-400
  'oklch(0.828 0.189 84.429)', // amber-400
] as const;

export type UserColorT = (typeof USER_COLORS)[number];

export interface User {
  name: string;
  id: string;
  isRemembered: boolean;
  color: UserColorT;
}

const NULL_USER: User = {
  name: '',
  id: '',
  isRemembered: false,
  color: USER_COLORS[0],
};

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User>({ ...NULL_USER });

    const setUser = (data: Partial<User>) => {
      user.value = { ...user.value, ...data };
    };

    const logout = () => {
      user.value = { ...NULL_USER };
    };

    return {
      user,
      setUser,
      logout,
    };
  },

  {
    persist: {
      serializer: {
        serialize: (state) => {
          const u = (state as { user: User }).user;
          return JSON.stringify({
            user: u.isRemembered
              ? u
              : { ...NULL_USER, color: u.color },
          });
        },
        deserialize: (value) => JSON.parse(value),
      },
    },
  },
);
