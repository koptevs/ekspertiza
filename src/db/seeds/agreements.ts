import 'dotenv/config';
import { db } from '@/db';
import { agreements } from '@/db/schema/index';
import agreementsData from '@/db/seeds/data/agreements.json';

export async function seedAgreements() {
    for (const agreement of agreementsData) {
        await db.insert(agreements).values(agreement);
    }
}
