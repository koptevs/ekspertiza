import { relations } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { companies, persons } from '@/db/schema';

const scReps = mysqlTable('sc_reps', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    personId: int('person_id', { unsigned: true }).references(() => persons.id),
    companyId: int('company_id', { unsigned: true }).references(
        () => companies.id
    ),
    position: varchar('position', { length: 256 }),

    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const scRepsRelations = relations(scReps, ({ one }) => ({
    // state: one(state, {
    //     fields: [city.stateId],
    //     references: [state.id],
    // }),
}));

export default scReps;
