/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, {isServer}) => {
    if (!isServer) {
      // don't resolve 'XX' module on the client to prevent this error on build --> Error: Can't resolve 'XX'
      config.resolve.fallback = {
        fs: false,
        net: false,
        dns: false,
        tls: false,
        child_process: false,
      };
    }

    return config;
  },
  // images: {
  //   domains: ["res.cloudinary.com", "localhost", "tesla-shop-nextjs.vercel.app"],
  // },
};

module.exports = nextConfig;
