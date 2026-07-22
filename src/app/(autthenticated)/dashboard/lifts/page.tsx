import Link from 'next/link';
import { getAllLifts } from '@/actions/liftActions';
export const revalidate = 60;
const LiftsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const rawPage = (await searchParams).page;
    const pageParam = Array.isArray(rawPage) ? rawPage[0] : rawPage;
    const page = Number.parseInt(pageParam ?? '1', 10);
    const {
        data: lifts,
        currentPage,
        totalPages,
    } = await getAllLifts({ page });
    return (
        <div>
            <h1 className='mb-2 font-bold text-2xl'>LiftsPage</h1>
            <nav
                aria-label='Pagination'
                className='mt-4 flex items-center gap-4'
            >
                {currentPage > 1 ? (
                    <Link href={`/dashboard/lifts?page=${currentPage - 1}`}>
                        Previous
                    </Link>
                ) : (
                    <span className='text-gray-400'>Previous</span>
                )}
                <span className='text-red-700'>
                    Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages ? (
                    <Link href={`/dashboard/lifts?page=${currentPage + 1}`}>
                        Next
                    </Link>
                ) : (
                    <span className='text-gray-400'>Next</span>
                )}
            </nav>
            {lifts.map((lift) => (
                <div className='my-4' key={lift.id}>
                    <Link href={`/dashboard/lifts/${lift.id}`}>
                        <p>
                            Reg. number:{' '}
                            <span className='font-bold text-blue-800'>
                                {lift.regNumber}
                            </span>
                        </p>
                    </Link>
                    <p>
                        Address: {lift.addressStreet} {lift.addressBuildingNr}
                        {lift.addressBuildingEntrance
                            ? `-${lift.addressBuildingEntrance}`
                            : ''}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default LiftsPage;
