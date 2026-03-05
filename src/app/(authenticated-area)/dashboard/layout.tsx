import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authenticated - ',
    description: 'Authenticated - ',
};

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="bg-red-200"> {children}</div>;
}
