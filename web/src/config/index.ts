type Config = {
  baseUrl: string;
  googleClientId: string;
};

const devConfig: Config = {
  baseUrl: 'http://localhost:5287',
  googleClientId: '' // TODO: Add your Google Client ID
};

const prodConfig: Config = {
  baseUrl: 'https://api.yourdomain.com', // TODO: Update with actual production URL
  googleClientId: '' // TODO: Add your production Google Client ID
};

const getConfig = (): Config => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? devConfig : prodConfig;
};

export const config = getConfig();
