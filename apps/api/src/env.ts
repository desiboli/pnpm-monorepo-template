import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
	NODE_ENV: z.string().default("development"),
	PORT: z.coerce.number().default(9999),
	LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
	DATABASE_URL: z.url(),
});

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
	// biome-ignore lint/style/noProcessEnv: we need to access the process.env
	env = EnvSchema.parse(process.env);
} catch (e) {
	const error = e as z.ZodError;
	console.error("❌ Invalid env:");
	console.error(z.prettifyError(error));
	// console.error(JSON.stringify(z.treeifyError(error), null, 2));
	process.exit(1);
}

export default env;
