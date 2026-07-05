import {
    bigint,
    date,
    decimal,
    index,
    int,
    longtext,
    mediumtext,
    mysqlEnum,
    mysqlTable,
    primaryKey,
    smallint,
    text,
    timestamp,
    tinyint,
    unique,
    varchar,
} from 'drizzle-orm/mysql-core';

export const cache = mysqlTable(
    'cache',
    {
        key: varchar({ length: 255 }).notNull(),
        value: mediumtext().notNull(),
        expiration: int().notNull(),
    },
    (table) => [primaryKey({ columns: [table.key], name: 'cache_key' })]
);

export const cacheLocks = mysqlTable(
    'cache_locks',
    {
        key: varchar({ length: 255 }).notNull(),
        owner: varchar({ length: 255 }).notNull(),
        expiration: int().notNull(),
    },
    (table) => [primaryKey({ columns: [table.key], name: 'cache_locks_key' })]
);

export const failedJobs = mysqlTable(
    'failed_jobs',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        uuid: varchar({ length: 255 }).notNull(),
        connection: text().notNull(),
        queue: text().notNull(),
        payload: longtext().notNull(),
        exception: longtext().notNull(),
        failedAt: timestamp('failed_at', { mode: 'string' })
            .defaultNow()
            .notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'failed_jobs_id' }),
        unique('failed_jobs_uuid_unique').on(table.uuid),
    ]
);

export const inspections = mysqlTable(
    'inspections',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        protocolNumber: varchar('protocol_number', { length: 32 }).notNull(),
        liftId: bigint('lift_id', { mode: 'number', unsigned: true })
            .notNull()
            .references(() => lifts.id),
        inspectionType: mysqlEnum('inspection_type', [
            'Pirmreizējā',
            'Kārtējā',
            'Ārpuskārtas',
            'Atkārtotā',
        ]),
        inspectionNextType: mysqlEnum('inspection_next_type', [
            'Pirmreizējā',
            'Kārtējā',
            'Ārpuskārtas',
            'Atkārtotā',
        ]),
        expert: int({ unsigned: true }),
        liftManager: int('lift_manager', { unsigned: true }),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        dateStart: date('date_start', { mode: 'string' }),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        dateEnd: date('date_end', { mode: 'string' }),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        dateNext: date('date_next', { mode: 'string' }),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        dateNextNormal: date('date_next_normal', { mode: 'string' }),
        label: varchar({ length: 32 }),
        birNumber: varchar('bir_number', { length: 32 }),
        inspectionResult: int('inspection_result', { unsigned: true }),
        participants: varchar({ length: 255 }),
        nonCompliances0: text('non_compliances_0'),
        nonCompliances1: text('non_compliances_1'),
        nonCompliances2: text('non_compliances_2'),
        nonCompliances3: text('non_compliances_3'),
        extraCheckReason: text('extra_check_reason'),
        notCheckedForced: text('not_checked_forced'),
        notes: text(),
        notesForProtokol: text('notes_for_protokol'),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [
        index('inspections_lift_id_index').on(table.liftId),
        primaryKey({ columns: [table.id], name: 'inspections_id' }),
    ]
);

export const jobBatches = mysqlTable(
    'job_batches',
    {
        id: varchar({ length: 255 }).notNull(),
        name: varchar({ length: 255 }).notNull(),
        totalJobs: int('total_jobs').notNull(),
        pendingJobs: int('pending_jobs').notNull(),
        failedJobs: int('failed_jobs').notNull(),
        failedJobIds: longtext('failed_job_ids').notNull(),
        options: mediumtext(),
        cancelledAt: int('cancelled_at'),
        createdAt: int('created_at').notNull(),
        finishedAt: int('finished_at'),
    },
    (table) => [primaryKey({ columns: [table.id], name: 'job_batches_id' })]
);

export const jobs = mysqlTable(
    'jobs',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        queue: varchar({ length: 255 }).notNull(),
        payload: longtext().notNull(),
        attempts: tinyint({ unsigned: true }).notNull(),
        reservedAt: int('reserved_at', { unsigned: true }),
        availableAt: int('available_at', { unsigned: true }).notNull(),
        createdAt: int('created_at', { unsigned: true }).notNull(),
    },
    (table) => [
        index('jobs_queue_index').on(table.queue),
        primaryKey({ columns: [table.id], name: 'jobs_id' }),
    ]
);

export const liftManagers = mysqlTable(
    'lift_managers',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        name: varchar({ length: 128 }).notNull(),
        regNumber: varchar('reg_number', { length: 64 }).notNull(),
        address: varchar({ length: 128 }).notNull(),
        contractNumber: varchar('contract_number', { length: 128 }),
        contractDate: varchar('contract_date', { length: 128 }),
        contactPerson: varchar('contact_person', { length: 128 }),
        contactPersonPosition: varchar('contact_person_position', {
            length: 128,
        }),
        contactPersonPhone: varchar('contact_person_phone', { length: 64 }),
        contactPersonPhoneBill: varchar('contact_person_phone_bill', {
            length: 64,
        }),
        emailForDocs: varchar('email_for_docs', { length: 64 }),
        bankName: varchar('bank_name', { length: 64 }),
        bankCode: varchar('bank_code', { length: 64 }),
        bankAccount: varchar('bank_account', { length: 64 }),
        billPayDays: varchar('bill_pay_days', { length: 64 }),
        protocolWithElectricMeasurments: tinyint(
            'protocol_with_electric_measurments'
        )
            .default(0)
            .notNull(),
        notes: text(),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [primaryKey({ columns: [table.id], name: 'lift_managers_id' })]
);

export const lifts = mysqlTable(
    'lifts',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        liftManagerId: bigint('lift_manager_id', {
            mode: 'number',
            unsigned: true,
        }),
        regNumber: varchar('reg_number', { length: 32 }).notNull(),
        birUrl: varchar('bir_url', { length: 256 }),
        type: mysqlEnum(['elektriskais', 'hidrauliskais']).notNull(),
        category: mysqlEnum(['1', '2', '3', 'CE']).notNull(),
        factoryNumber: varchar('factory_number', { length: 32 }).notNull(),
        model: varchar({ length: 64 }),
        speed: decimal({ precision: 8, scale: 2 }),
        load: smallint({ unsigned: true }).notNull(),
        manufacturer: varchar({ length: 128 }),
        installer: varchar({ length: 128 }),
        installationYear: smallint('installation_year', {
            unsigned: true,
        }).notNull(),
        floorsServiced: tinyint('floors_serviced', { unsigned: true }),
        addressCountry: varchar('address_country', { length: 64 }).notNull(),
        addressCity: varchar('address_city', { length: 64 }).notNull(),
        address: varchar({ length: 256 }).notNull(),
        addressPostalCode: varchar('address_postal_code', {
            length: 8,
        }).notNull(),
        googleCoordinates: varchar('google_coordinates', { length: 128 }),
        buildingSeries: varchar('building_series', { length: 16 }),
        notes: text(),
        inspectionStatus: mysqlEnum('inspection_status', [
            'X',
            '0',
            '1',
            '2',
            '3',
        ])
            .default('X')
            .notNull(),
        entryCode: varchar('entry_code', { length: 128 }),
        // you can use { mode: 'date' }, if you want to have Date as type for this column
        nextInspectionDate: date('next_inspection_date', { mode: 'string' }),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'lifts_id' }),
        unique('lifts_reg_number_unique').on(table.regNumber),
    ]
);

export const mechanics = mysqlTable(
    'mechanics',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        name: varchar({ length: 64 }).notNull(),
        personalCode: varchar('personal_code', { length: 64 }),
        company: varchar({ length: 64 }).notNull(),
        phone: varchar({ length: 64 }),
        email: varchar({ length: 64 }),
        notes: text(),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [primaryKey({ columns: [table.id], name: 'mechanics_id' })]
);

export const migrations = mysqlTable(
    'migrations',
    {
        id: int({ unsigned: true }).autoincrement().notNull(),
        migration: varchar({ length: 255 }).notNull(),
        batch: int().notNull(),
    },
    (table) => [primaryKey({ columns: [table.id], name: 'migrations_id' })]
);

export const modelHasPermissions = mysqlTable(
    'model_has_permissions',
    {
        permissionId: bigint('permission_id', {
            mode: 'number',
            unsigned: true,
        })
            .notNull()
            .references(() => permissions.id, { onDelete: 'cascade' }),
        modelType: varchar('model_type', { length: 255 }).notNull(),
        modelId: bigint('model_id', {
            mode: 'number',
            unsigned: true,
        }).notNull(),
    },
    (table) => [
        index('model_has_permissions_model_id_model_type_index').on(
            table.modelId,
            table.modelType
        ),
        primaryKey({
            columns: [table.permissionId, table.modelId, table.modelType],
            name: 'model_has_permissions_permission_id_model_id_model_type',
        }),
    ]
);

export const modelHasRoles = mysqlTable(
    'model_has_roles',
    {
        roleId: bigint('role_id', { mode: 'number', unsigned: true })
            .notNull()
            .references(() => roles.id, { onDelete: 'cascade' }),
        modelType: varchar('model_type', { length: 255 }).notNull(),
        modelId: bigint('model_id', {
            mode: 'number',
            unsigned: true,
        }).notNull(),
    },
    (table) => [
        index('model_has_roles_model_id_model_type_index').on(
            table.modelId,
            table.modelType
        ),
        primaryKey({
            columns: [table.roleId, table.modelId, table.modelType],
            name: 'model_has_roles_role_id_model_id_model_type',
        }),
    ]
);

export const passwordResetTokens = mysqlTable(
    'password_reset_tokens',
    {
        email: varchar({ length: 255 }).notNull(),
        token: varchar({ length: 255 }).notNull(),
        createdAt: timestamp('created_at', { mode: 'string' }),
    },
    (table) => [
        primaryKey({
            columns: [table.email],
            name: 'password_reset_tokens_email',
        }),
    ]
);

export const permissions = mysqlTable(
    'permissions',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        name: varchar({ length: 255 }).notNull(),
        guardName: varchar('guard_name', { length: 255 }).notNull(),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'permissions_id' }),
        unique('permissions_name_guard_name_unique').on(
            table.name,
            table.guardName
        ),
    ]
);

export const roleHasPermissions = mysqlTable(
    'role_has_permissions',
    {
        permissionId: bigint('permission_id', {
            mode: 'number',
            unsigned: true,
        })
            .notNull()
            .references(() => permissions.id, { onDelete: 'cascade' }),
        roleId: bigint('role_id', { mode: 'number', unsigned: true })
            .notNull()
            .references(() => roles.id, { onDelete: 'cascade' }),
    },
    (table) => [
        primaryKey({
            columns: [table.permissionId, table.roleId],
            name: 'role_has_permissions_permission_id_role_id',
        }),
    ]
);

export const roles = mysqlTable(
    'roles',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        name: varchar({ length: 255 }).notNull(),
        guardName: varchar('guard_name', { length: 255 }).notNull(),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'roles_id' }),
        unique('roles_name_guard_name_unique').on(table.name, table.guardName),
    ]
);

export const sessions = mysqlTable(
    'sessions',
    {
        id: varchar({ length: 255 }).notNull(),
        userId: bigint('user_id', { mode: 'number', unsigned: true }),
        ipAddress: varchar('ip_address', { length: 45 }),
        userAgent: text('user_agent'),
        payload: longtext().notNull(),
        lastActivity: int('last_activity').notNull(),
    },
    (table) => [
        index('sessions_user_id_index').on(table.userId),
        index('sessions_last_activity_index').on(table.lastActivity),
        primaryKey({ columns: [table.id], name: 'sessions_id' }),
    ]
);

export const users = mysqlTable(
    'users',
    {
        id: bigint({ mode: 'number', unsigned: true })
            .autoincrement()
            .notNull(),
        name: varchar({ length: 255 }).notNull(),
        expertNumber: varchar('expert_number', { length: 255 })
            .default('00')
            .notNull(),
        email: varchar({ length: 255 }).notNull(),
        emailVerifiedAt: timestamp('email_verified_at', { mode: 'string' }),
        password: varchar({ length: 255 }).notNull(),
        rememberToken: varchar('remember_token', { length: 100 }),
        createdAt: timestamp('created_at', { mode: 'string' }),
        updatedAt: timestamp('updated_at', { mode: 'string' }),
    },
    (table) => [
        primaryKey({ columns: [table.id], name: 'users_id' }),
        unique('users_email_unique').on(table.email),
    ]
);
