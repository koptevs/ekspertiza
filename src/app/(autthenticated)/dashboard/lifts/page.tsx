import Link from 'next/link';
import {
    getAddressStreetSuggestions,
    getAllLifts,
    getRegNumberSuggestions,
} from '@/actions/liftActions';
import { LiftsSearchForm } from '@/components/lifts-search-form';
export const revalidate = 60;

const getParam = (
    searchParams: { [key: string]: string | string[] | undefined },
    key: string
) => {
    const value = searchParams[key];
    const resolved = Array.isArray(value) ? value[0] : value;
    return resolved && resolved.trim() !== '' ? resolved : undefined;
};

const LiftsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const resolvedSearchParams = await searchParams;
    const page = Number.parseInt(
        getParam(resolvedSearchParams, 'page') ?? '1',
        10
    );
    const regNumber = getParam(resolvedSearchParams, 'regNumber');
    const address = getParam(resolvedSearchParams, 'address');

    const [
        { data: lifts, currentPage, totalPages },
        regNumbers,
        addressStreets,
    ] = await Promise.all([
        getAllLifts({ page, regNumber, addressStreet: address }),
        getRegNumberSuggestions(),
        getAddressStreetSuggestions(),
    ]);

    const filterQuery = new URLSearchParams();
    if (regNumber) {
        filterQuery.set('regNumber', regNumber);
    }
    if (address) {
        filterQuery.set('address', address);
    }
    const filterQueryString = filterQuery.toString();
    const buildPageHref = (targetPage: number) => {
        const query = new URLSearchParams(filterQueryString);
        query.set('page', String(targetPage));
        return `/dashboard/lifts?${query.toString()}`;
    };

    return (
        <div className='w-full'>
            <h1 className='mb-2 font-bold text-2xl'>LiftsPage</h1>
            <LiftsSearchForm
                addressStreets={addressStreets}
                defaultAddressStreet={address}
                defaultRegNumber={regNumber}
                regNumbers={regNumbers}
            />
            <nav
                aria-label='Pagination'
                className='mt-4 flex items-center gap-4'
            >
                {currentPage > 1 ? (
                    <Link href={buildPageHref(currentPage - 1)}>Previous</Link>
                ) : (
                    <span className='text-gray-400'>Previous</span>
                )}
                <span className='text-red-700'>
                    Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages ? (
                    <Link href={buildPageHref(currentPage + 1)}>Next</Link>
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
