import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // The CVs are meant to be handed out, not indexed: the PDF carries the
        // same contact channels as the site, but there's no reason for it to
        // surface as a standalone search result.
        source: "/:file(cv-.*\\.pdf)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
