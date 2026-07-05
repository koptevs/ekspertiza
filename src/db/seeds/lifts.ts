import 'dotenv/config';
import { db } from '@/db';
import { lifts } from '@/db/schema/index';
import liftsData from '@/db/seeds/data/lifts.json';

export async function seedLifts() {
    for (const lift of liftsData) {
        await db.insert(lifts).values(lift);
    }
}
