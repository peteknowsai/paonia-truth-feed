import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin-search",
        destination: "/initiatives/admin-search",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
