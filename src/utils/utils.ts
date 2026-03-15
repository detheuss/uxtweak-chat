import { useQuasar } from 'quasar';

export const checkIsMac = () => {
  const $q = useQuasar();

  return $q.platform.is.mac;
};

export const checkIsMobile = () => {
  const $q = useQuasar();

  return $q.platform.is.mobile;
};

export const createMessageDto = () => {};
