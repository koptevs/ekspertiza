import PublicMainNavigation from '@/components/shared/public-main-navigation/public-main-navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Public - ',
    description: 'Public - ',
};

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <PublicMainNavigation />
            <div className="container mx-auto w-full max-w-2xl px-6 lg:max-w-7xl">
                {/* <div className="container mx-auto flex h-[56px] w-full max-w-2xl justify-between px-6 lg:max-w-7xl">  */}
                {children}
            </div>
        </>
    );
}
