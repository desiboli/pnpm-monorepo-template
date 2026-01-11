import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: ["@pnpm-monorepo-template/shared-ui"],

	// async rewrites() {
	// 	//  Unlike Vite's dev server proxy (which only works during development), Next.js rewrites work in production too. If you only want this for development, you can conditionally add the rewrite
	// 	if (process.env.NODE_ENV === "development") {
	// 		return [
	// 			{
	// 				source: "/api/:path*",
	// 				destination: "http://localhost:8787/api/:path*",
	// 			},
	// 		];
	// 	}
	// 	return [];
	// },
};

export default nextConfig;
