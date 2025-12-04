import apiClient from "./config";
import { API_URLS } from "./urls";

export interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
  read: boolean;
  senderName?: string;
  receiverName?: string;
}

export interface MessagesResponse {
  content: Message[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface SendMessageRequest {
  receiverId: number;
  content: string;
}

export const messagesApi = {
  getMessages: async (): Promise<MessagesResponse> => {
    const response = await apiClient.get<{ data: MessagesResponse }>(
      API_URLS.MESSAGES.LIST
    );
    return response.data.data;
  },

  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<{ data: { count: number } }>(
      API_URLS.MESSAGES.UNREAD_COUNT
    );
    return response.data.data.count;
  },

  getConversation: async (userId: number): Promise<Message[]> => {
    const response = await apiClient.get<{ data: Message[] }>(
      API_URLS.MESSAGES.CONVERSATION(userId)
    );
    return response.data.data;
  },

  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    const response = await apiClient.post<{ data: Message }>(
      API_URLS.MESSAGES.SEND,
      data
    );
    return response.data.data;
  },

  replyToMessage: async (
    messageId: number,
    content: string
  ): Promise<Message> => {
    const response = await apiClient.post<{ data: Message }>(
      API_URLS.MESSAGES.REPLY(messageId),
      { content }
    );
    return response.data.data;
  },

  markAsRead: async (messageId: number): Promise<void> => {
    await apiClient.put(API_URLS.MESSAGES.MARK_READ(messageId));
  },

  markAllAsRead: async (): Promise<void> => {
    await apiClient.put(API_URLS.MESSAGES.MARK_ALL_READ);
  },
};
