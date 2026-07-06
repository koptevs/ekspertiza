import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: process.env.BETTER_AUTH_URL,
    // baseURL: 'http://192.168.31.70:3000',
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const { signIn,
    signUp,
    signOut,
    useSession,
    // admin,
    sendVerificationEmail,
    // forgetPassword,
    resetPassword,
    updateUser, } = authClient;

// https://better-auth.com/docs/installation:
// Tip: You can also export specific methods if you prefer:
// export const { signIn, signUp, useSession } = createAuthClient()
