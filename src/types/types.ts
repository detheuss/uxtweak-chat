import type { BaseUserT } from 'shared/types';

export interface SessionUserT extends BaseUserT {
  isRemembered: boolean;
}
