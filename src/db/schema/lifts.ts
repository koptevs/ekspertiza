import {
    decimal,
    int,
    mysqlEnum,
    mysqlTable,
    smallint,
    text,
    tinyint,
    varchar,
} from 'drizzle-orm/mysql-core';

const lifts = mysqlTable('lifts', {
    // const liftsTable = mysqlTable('lifts', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    regNumber: varchar('reg_number', { length: 32 }).notNull().unique(),
    factoryNumber: varchar('factory_number', { length: 32 }).notNull(),
    model: varchar({ length: 64 }),
    floorsServiced: tinyint('floors_serviced', { unsigned: true }), // unsigned - max 255
    speed: decimal({ precision: 8, scale: 2 }),
    load: smallint({ unsigned: true }).notNull(),
    manufacturer: varchar({ length: 128 }),
    type: mysqlEnum(['elektriskais', 'hidrauliskais']).notNull(),
    category: mysqlEnum(['1', '2', '3', 'CE']).notNull(),
    installationYear: smallint('installation_year', {
        unsigned: true,
    }).notNull(),
    installer: varchar({ length: 128 }),
    addressCountry: varchar('address_country', { length: 64 })
        .notNull()
        .default('Latvija'),
    addressCity: varchar('address_city', { length: 64 })
        .notNull()
        .default('Rīga'),
    addressPostalCode: varchar('address_postal_code', { length: 8 }).notNull(),
    addressNovads: varchar('address_novads', { length: 128 }),
    addressStreet: varchar('address_street', { length: 128 }).notNull(),
    addressBuildingNr: varchar('address_building_nr', { length: 8 }).notNull(),
    addressBuildingEntrance: varchar('address_building_entrance', {
        length: 8,
    }),
    buildingSeries: varchar('building_series', { length: 16 }),
    liftPlacement: varchar('lift_placement', { length: 16 }),
    googleCoordinates: varchar('google_coordinates', { length: 128 }),
    inspectionStatus: mysqlEnum('inspection_status', ['X', '0', '1', '2', '3'])
        .default('X')
        .notNull(),
    entryCode: varchar('entry_code', { length: 128 }),
    birUrl: varchar('bir_url', { length: 256 }),
    notes: text(),

    // currentLiftManager: int('current_lift_manager', { unsigned: true }).references(
    //     () => lift_managers.id
    // ),
    // agreementId: int('agreement_id', { unsigned: true }).references(
    //     () => agreements.id
    // ),
    // // you can use { mode: 'date' }, if you want to have Date as type for this column
    // nextInspectionDate: date('next_inspection_date', { mode: 'string' }),
    // createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    // updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export default lifts;
