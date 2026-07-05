// import 'dotenv/config'; // in docs
import { drizzle } from 'drizzle-orm/mysql2';

import * as schema from './schema/index';

// const db = drizzle(process.env.DATABASE_URL); // in docs

// export const db: MySql2Database<typeof schema> = drizzle(process.env.DATABASE_URL!, {
export const db = drizzle(process.env.DATABASE_URL!, {
    schema,
    mode: 'default',
});

export type db = typeof db;

/* Claude
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "./schema.ts";

const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(poolConnection, { schema, mode: "default" });
*/
