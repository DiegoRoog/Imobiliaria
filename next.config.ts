import type { NextConfig } from "next";
const config: NextConfig = {
  output: process.env.GITHUB_PAGES === "true" ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  devIndicators: false,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
};
export default config;
