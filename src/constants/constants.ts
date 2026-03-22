import type { BaseUserT } from 'shared/types';

export const NULL_USER: BaseUserT = {
  name: '',
  id: '',
  avatarSrc: '',
};

export const TEST_USERS: BaseUserT[] = [
  {
    name: 'Jožko',
    id: '1',
    avatarSrc: 'https://cdn.quasar.dev/img/avatar1.jpg',
  },
  {
    name: 'Janka',
    id: '2',
    avatarSrc: 'https://cdn.quasar.dev/img/avatar2.jpg',
  },
  {
    name: 'Marienka',
    id: '3',
    avatarSrc: 'https://cdn.quasar.dev/img/avatar5.jpg',
  },
  {
    name: 'Ruženka',
    id: '4',
    avatarSrc: 'https://cdn.quasar.dev/img/avatar6.jpg',
  },
  {
    name: 'Pepko',
    id: '5',
    avatarSrc: 'https://cdn.quasar.dev/img/avatar4.jpg',
  },
];
