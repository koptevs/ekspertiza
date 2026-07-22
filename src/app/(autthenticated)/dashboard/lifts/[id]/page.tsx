import { notFound } from 'next/navigation';
import { getLiftById } from '@/actions/liftActions';
import { BackButton } from '@/components/back-button';

export default async function LiftPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const lift = await getLiftById(Number.parseInt(id, 10));
    if (!lift) {
        notFound();
    }
    return (
        <div>
            <BackButton />
            <h1 className='mb-2 font-bold text-2xl'>Lift {lift.regNumber}</h1>
            <div className='my-4'>
                <p>
                    Reg. number:{' '}
                    <span className='font-bold text-blue-800'>
                        {lift.regNumber}
                    </span>
                </p>
                <p>
                    Address: {lift.addressStreet} {lift.addressBuildingNr}
                    {lift.addressBuildingEntrance
                        ? `-${lift.addressBuildingEntrance}`
                        : ''}
                </p>
                <p>Code: {lift.entryCode}</p>
            </div>
            <pre>{JSON.stringify(lift, null, 4)}</pre>
        </div>
    );
}
