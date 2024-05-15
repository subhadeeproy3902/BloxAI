import withPWA from 'next-pwa';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

const withPWAConfig = withPWA(pwaConfig);

export default withPWAConfig({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  }
});