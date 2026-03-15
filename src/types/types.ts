import type { USER_COLOR_NAMES } from 'src/constants/constants';

export type UserColorNameT = (typeof USER_COLOR_NAMES)[number];
export type UserT = {
  name: string;
  id: string;
  isRemembered: boolean;
  colorName: UserColorNameT;
};
export type ChatMessageT = {
  message: string;
  timestamp: string;
  author: UserT;
};
