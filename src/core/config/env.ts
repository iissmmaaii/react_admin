export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL || 'http://172.29.5.41:30080').replace(/\/$/, ''),
};
