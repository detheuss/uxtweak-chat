import type { UserT } from 'src/types/types';

export const USER_COLOR_NAMES = ['default', 'cyan', 'violet', 'green', 'rose', 'amber'] as const;
export const NULL_USER: UserT = {
  name: '',
  id: '',
  isRemembered: false,
  colorName: USER_COLOR_NAMES[0],
};
