import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

const agreements = mysqlTable('agreements', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    agreementNumber: varchar({ length: 256 }).notNull().unique(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
export default agreements;
