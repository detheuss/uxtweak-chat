import type { BaseUserT } from 'app/shared/types';
import { useQuasar } from 'quasar';

export const checkIsMac = () => {
  const $q = useQuasar();

  return $q.platform.is.mac;
};

export const checkIsMobile = () => {
  const $q = useQuasar();

  return $q.platform.is.mobile;
};

export const createMessageDto = (normalizedText: string, user?: BaseUserT) => {
  if (!user) throw new Error('User is required');
  return {
    message: normalizedText,
    author: user,
  };
};

const checkSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const checkWithinLastMinute = (lastTimestamp: string, currentTimestamp: string): boolean => {
  const last = new Date(lastTimestamp).getTime();
  const current = new Date(currentTimestamp).getTime();

  if (isNaN(last) || isNaN(current)) return false;

  return Math.abs(current - last) <= 60_000;
};

export const getStampText = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  // Today -> time
  if (checkSameDay(date, now)) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Yesterday -> "yesterday at HH:mm"
  if (checkSameDay(date, yesterday)) {
    return `yesterday at ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  }

  // Older -> date
  return date.toLocaleDateString();
};
