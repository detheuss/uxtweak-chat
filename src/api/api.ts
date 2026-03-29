import { ROUTE_MESSAGES } from 'app/shared/const';
import type { ChatMessageDtoOutT } from 'shared/types';
import { api } from 'src/boot/axios';

export const apiSendChatMessage = async (body: ChatMessageDtoOutT) => {
  return api.post(ROUTE_MESSAGES, body);
};

export const apiGetChatMessages = async () => {
  return api.get(ROUTE_MESSAGES);
};

export const apiDeleteChatMessage = async (id: string) => {
  return api.delete(`${ROUTE_MESSAGES}/${id}`);
};

export const apiDeleteAllChatMessages = async () => {
  return api.delete(`${ROUTE_MESSAGES}/all`);
};
