import Link from 'next/link';
import { getAllLifts } from '@/actions/liftActions';

const LiftsPage = async () => {
    const lifts = await getAllLifts();
    return (
        <div>
            <h1 className='mb-2 font-bold text-2xl'>LiftsPage</h1>
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
                    <p>Address: {lift.address}</p>
                </div>
            ))}
            <pre>{JSON.stringify(lifts, null, 4)}</pre>
        </div>
    );
};

export default LiftsPage;
