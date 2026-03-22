import type { UserT } from 'shared/types';

export interface SessionUserT extends UserT {
  isRemembered: boolean;
}
