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
  },
  webpack: (config, { isServer }) => {
    // If it's a server build, exclude the `.node` file from bundling
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@resvg/resvg-js-darwin-arm64/resvgjs.darwin-arm64.node': 'commonjs2 @resvg/resvg-js-darwin-arm64/resvgjs.darwin-arm64.node',
      });
    }

    // Use node-loader for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
});
