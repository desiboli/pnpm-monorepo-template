import { Scalar } from "@scalar/hono-api-reference";
import packageJson from "../../package.json";
import { BASE_PATH } from "./constants";
import type { AppOpenAPI } from "./types";

export default function configureOpenAPI(app: AppOpenAPI) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			title: "API reference",
			version: packageJson.version,
		},
	});

	app.get(
		"/reference",
		Scalar({
			url: `${BASE_PATH}/doc`,
			layout: "classic",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "fetch",
			},
			theme: "elysiajs",
		}),
	);
}
