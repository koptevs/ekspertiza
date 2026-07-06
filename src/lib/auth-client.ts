import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
    /** Same-domain requests: omit baseURL so it targets whatever origin the app is served from */
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
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
