import { seedAgreements } from '@/db/seeds/agreements';
import { seedLifts } from '@/db/seeds/lifts';

async function seedAll() {
    await seedAgreements();
    await seedLifts();
    process.exit();
}
seedAll();
