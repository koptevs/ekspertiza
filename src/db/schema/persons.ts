import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

const persons = mysqlTable('persons', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    personaCode: varchar('personal_code', { length: 32 }).notNull().unique(),
    firstName: varchar('first_name', { length: 64 }).notNull(),
    lastName: varchar('last_name', { length: 64 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export default persons;
