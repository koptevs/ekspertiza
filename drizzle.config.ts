import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';

config({ path: ['.env.local', '.env'] });

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema/index.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
}) satisfies Config;
