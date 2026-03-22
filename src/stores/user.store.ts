import 'pinia-plugin-persistedstate';
import { defineStore } from 'pinia';
import { getCssVar } from 'quasar';
import { ref } from 'vue';
import type { UserColorNameT } from 'shared/types';
import type { SessionUserT } from 'src/types/types';
import { NULL_USER } from 'src/constants/constants';

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<SessionUserT>({ ...NULL_USER });

    const setUser = (data: Partial<SessionUserT>) => {
      user.value = { ...user.value, ...data };
    };

    const getUserColor = (colorName?: UserColorNameT) => {
      const cn = colorName || user.value.colorName;
      return getCssVar(`color-user-${cn}`) as string;
    };

    const getUserAvatarChar = () => {
      return user.value?.name?.charAt(0)?.toUpperCase() ?? '';
    };

    const logout = () => {
      user.value = { ...NULL_USER };
    };

    return {
      user,
      setUser,
      getUserColor,
      getUserAvatarChar,
      logout,
    };
  },

  {
    persist: {
      serializer: {
        serialize: (state) => {
          const u = (state as { user: SessionUserT }).user;
          return JSON.stringify({
            user: u.isRemembered ? u : { ...NULL_USER, colorName: u.colorName },
          });
        },
        deserialize: (value) => JSON.parse(value),
      },
    },
  },
);
