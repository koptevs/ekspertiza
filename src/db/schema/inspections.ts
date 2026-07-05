import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { lifts } from '@/db/schema';

const inspections = mysqlTable('inspections', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    protocolNumber: varchar('protocol_number', { length: 64 })
        .notNull()
        .unique(),
    liftId: int('lift_id', { unsigned: true }).references(() => lifts.id),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export default inspections;
