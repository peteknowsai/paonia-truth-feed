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
  // Force webpack off its bundled WASM hash (xxhash64/md4), which crashes
  // intermittently ("WasmHash._updateWithBuffer: Cannot read properties of
  // undefined") during builds on this machine. Native sha256 is deterministic.
  webpack: (config) => {
    config.output.hashFunction = "sha256";
    return config;
  },
};

export default nextConfig;
