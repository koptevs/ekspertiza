import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { agreements } from '@/db/schema';

const lifts = mysqlTable('lifts', {
    // const liftsTable = mysqlTable('lifts', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    agreementId: int('agreement_id', { unsigned: true }).references(
        () => agreements.id
    ),
    regNumber: varchar('reg_number', { length: 32 }).notNull().unique(),
    // birUrl: varchar('bir_url', { length: 256 }),
    // type: mysqlEnum(['elektriskais', 'hidrauliskais']).notNull(),
    // category: mysqlEnum(['1', '2', '3', 'CE']).notNull(),
    // factoryNumber: varchar('factory_number', { length: 32 }).notNull(),
    // model: varchar({ length: 64 }),
    // speed: decimal({ precision: 8, scale: 2 }),
    // load: smallint({ unsigned: true }).notNull(),
    // manufacturer: varchar({ length: 128 }),
    // installer: varchar({ length: 128 }),
    // installationYear: year('installation_year').notNull(),
    // floorsServiced: tinyint('floors_serviced', { unsigned: true }), // unsigned - max 255
    // addressCountry: varchar('address_country', { length: 64 }).notNull(),
    // addressCity: varchar('address_city', { length: 64 }).notNull(),
    address: varchar('address', { length: 256 }).notNull(),
    // addressPostalCode: varchar('address_postal_code', { length: 8 }).notNull(),
    // googleCoordinates: varchar('google_coordinates', { length: 128 }),
    // buildingSeries: varchar('building_series', { length: 16 }),
    // notes: text(),
    // inspectionStatus: mysqlEnum('inspection_status', ['X', '0', '1', '2', '3'])
    //     .default('X')
    //     .notNull(),
    // entryCode: varchar('entry_code', { length: 128 }),
    // // you can use { mode: 'date' }, if you want to have Date as type for this column
    // nextInspectionDate: date('next_inspection_date', { mode: 'string' }),
    // createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    // updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export default lifts;
