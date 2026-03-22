import type { SessionUserT } from 'src/types/types';
import { USER_COLOR_NAMES } from 'shared/constants';

export const NULL_USER: SessionUserT = {
  name: '',
  id: '',
  isRemembered: false,
  colorName: USER_COLOR_NAMES[0],
};
