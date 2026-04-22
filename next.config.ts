import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // remove "X-Powered-By: Next.js"

  async headers() {
    return [
      {
        source: "/menu/:path*.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: "inline",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
