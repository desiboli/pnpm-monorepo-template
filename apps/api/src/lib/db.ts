import { createDb } from "@pnpm-monorepo-template/db";
import env from "@/env";

export const db = createDb(env.DATABASE_URL);
