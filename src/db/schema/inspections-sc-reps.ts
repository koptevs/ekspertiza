import { int, mysqlTable, primaryKey, timestamp } from 'drizzle-orm/mysql-core';
import { inspections, scReps } from '@/db/schema';

const inspectionsScReps = mysqlTable(
    'inspections_sc_reps',
    {
        // id: int('id', { unsigned: true })
        //     .autoincrement()
        //     .unique()
        //     .notNull()
        //     .primaryKey(),
        serviceCompanyRepId: int('sc_rep_id', { unsigned: true }).references(
            () => scReps.id
        ),
        inspectionId: int('inspection_id', { unsigned: true }).references(
            () => inspections.id
        ),

        createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
    },
    (table) => [
        primaryKey({
            columns: [table.inspectionId, table.serviceCompanyRepId],
        }),
    ]
);

export default inspectionsScReps;
