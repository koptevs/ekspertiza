import 'dotenv/config';
import fs from 'node:fs/promises';
import { sleep } from '@/lib/utils';

async function main() {
    await fs.rm('drizzle', { recursive: true, force: true });
    sleep(3000);
    process.exit();
}
main();
