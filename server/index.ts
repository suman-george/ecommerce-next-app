import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "@/server/schema";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL! });
const db = drizzle({ client: pool, schema, logger: true });

export default db;
