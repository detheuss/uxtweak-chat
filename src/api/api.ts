import { ROUTE_MESSAGES } from 'app/shared/const';
import axios from 'axios';
import type { ChatMessageDtoOutT } from 'shared/types';

const api = axios.create({ baseURL: process.env.BASE_API_URL });

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
