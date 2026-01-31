import { create } from 'zustand';

// Theme Store
export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') !== 'light',
  toggleTheme: () => {
    set((state) => {
      const newTheme = !state.isDark;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return { isDark: newTheme };
    });
  },
}));

export const useAuthStore = create((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
}));

export const useChatStore = create((set, get) => ({
  chats: [],
  activeChat: null,
  messages: [],
  loading: false,
  error: null,

  setChats: (chats) => set({ chats }),
  setActiveChat: (chat) => set({ activeChat: chat }),
  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  updateLastMessage: (updatedMessage) => {
    set((state) => ({
      messages: state.messages.map((msg, idx) =>
        idx === state.messages.length - 1 ? { ...msg, ...updatedMessage } : msg
      ),
    }));
  },

  clearMessages: () => set({ messages: [] }),
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),

  removeChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((c) => c._id !== chatId),
      activeChat: state.activeChat?._id === chatId ? null : state.activeChat,
    })),
}));
