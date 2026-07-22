'use client';

import { useRouter } from 'next/navigation';

export const BackButton = () => {
    const router = useRouter();
    return (
        <button
            className='font-bold text-blue-800'
            onClick={() => router.back()}
            type='button'
        >
            Back
        </button>
    );
};
