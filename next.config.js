/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  webpack: (config) => {
    const { IgnorePlugin } = require('webpack');
    const optional = ['aws4', 'snappy', 'kerberos', 'gcp-metadata', 'mongodb-client-encryption'];

    for (const mod of optional) {
      config.plugins.push(new IgnorePlugin({ resourceRegExp: new RegExp(`^${mod}$`) }));
    }

    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      aws4: false,
      snappy: false,
      kerberos: false,
      'gcp-metadata': false,
      'mongodb-client-encryption': false,
    };

    return config;
  },
};

module.exports = nextConfig;



