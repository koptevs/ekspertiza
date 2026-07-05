import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

const companies = mysqlTable('companies', {
    id: int('id', { unsigned: true })
        .autoincrement()
        .unique()
        .notNull()
        .primaryKey(),
    name: varchar({ length: 128 }).notNull(),
    regNumber: varchar('reg_number', { length: 64 }).notNull(),
    // address: varchar({ length: 128 }).notNull(),
    // contractNumber: varchar("contract_number", { length: 128 }),
    // contractDate: varchar("contract_date", { length: 128 }),
    // contactPerson: varchar("contact_person", { length: 128 }),
    // contactPersonPosition: varchar("contact_person_position", { length: 128 }),
    // contactPersonPhone: varchar("contact_person_phone", { length: 64 }),
    // contactPersonPhoneBill: varchar("contact_person_phone_bill", { length: 64 }),
    // emailForDocs: varchar("email_for_docs", { length: 64 }),
    // bankName: varchar("bank_name", { length: 64 }),
    // bankCode: varchar("bank_code", { length: 64 }),
    // bankAccount: varchar("bank_account", { length: 64 }),
    // billPayDays: varchar("bill_pay_days", { length: 64 }),
    // protocolWithElectricMeasurments: tinyint("protocol_with_electric_measurments").default(0).notNull(),
    // notes: text(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export default companies;
