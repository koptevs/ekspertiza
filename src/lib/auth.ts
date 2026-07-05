import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/db'; // your drizzle instance
import * as schemas from '@/db/schema'; // Import your entire Drizzle schema

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'mysql', // or "pg", "sqlite"
        schema: schemas,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
        minPasswordLength: 8
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },

    trustedOrigins: [
        // 'http://localhost',
        // 'http://localhost:3000',
        // 'http://192.168.31.70:3000',
        'https://ekspertiza.eu',
    ],
    plugins: [nextCookies()], // make sure tanstackStartCookies is the last plugin in the array
});
