import { createDb, type Database } from "@pnpm-monorepo-template/db";
import env from "../env";

export const db: Database = createDb(env.DATABASE_URL);
