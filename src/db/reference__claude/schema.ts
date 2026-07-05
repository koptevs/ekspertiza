import { relations } from 'drizzle-orm';
import {
    boolean,
    date,
    decimal,
    int,
    mysqlEnum,
    mysqlTable,
    primaryKey,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/mysql-core';

// ============================================================================
// BETTER-AUTH TABLES
// These tables are required by Better-Auth and the Organization plugin.
// Field names follow Better-Auth conventions exactly.
// ============================================================================

/**
 * Core user table for Better-Auth.
 * Stores all authenticated users (admins, inspectors, viewers).
 */
export const user = mysqlTable('user', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Session table for Better-Auth.
 */
export const session = mysqlTable('session', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    expiresAt: timestamp('expires_at').notNull(),
    token: varchar('token', { length: 255 }).notNull().unique(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: varchar('user_id', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Account table for Better-Auth (OAuth / credential providers).
 */
export const account = mysqlTable('account', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    accountId: varchar('account_id', { length: 255 }).notNull(),
    providerId: varchar('provider_id', { length: 255 }).notNull(),
    userId: varchar('user_id', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Verification table for Better-Auth (email verification, password reset, etc.).
 */
export const verification = mysqlTable('verification', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

// ============================================================================
// BETTER-AUTH ORGANIZATION PLUGIN TABLES
// Manages multi-tenancy and role-based access control.
// Roles: "admin" | "inspector" | "viewer"
// ============================================================================

/**
 * Organization table — represents the Inspection Company (system tenant).
 * In a single-tenant setup, there is one organization.
 * The Organization plugin requires this table for RBAC.
 */
export const organization = mysqlTable('organization', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).unique(),
    logo: text('logo'),
    metadata: text('metadata'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

/**
 * Organization member — links a user to an organization with a role.
 * Roles: "admin", "inspector", "viewer"
 */
export const member = mysqlTable('member', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organization.id, { onDelete: 'cascade' }),
    userId: varchar('user_id', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 50 }).notNull().default('viewer'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

/**
 * Invitation table for the Organization plugin.
 */
export const invitation = mysqlTable('invitation', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    organizationId: varchar('organization_id', { length: 36 })
        .notNull()
        .references(() => organization.id, { onDelete: 'cascade' }),
    email: varchar('email', { length: 255 }).notNull(),
    role: varchar('role', { length: 50 }),
    status: varchar('status', { length: 20 }).notNull().default('pending'),
    expiresAt: timestamp('expires_at').notNull(),
    inviterId: varchar('inviter_id', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
});

// ============================================================================
// BUSINESS DOMAIN TABLES
// Core entities: Managing Companies, Service Companies, Contracts,
// Elevators (Lifts), Inspections, Defects, and Mechanics.
// ============================================================================

/**
 * Managing Company (Client) — the legal entity responsible for buildings
 * and their elevator equipment. Initiates inspection contracts.
 */
export const managingCompany = mysqlTable('managing_company', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    registrationNumber: varchar('registration_number', { length: 50 }).unique(),
    legalAddress: text('legal_address'),
    actualAddress: text('actual_address'),
    phone: varchar('phone', { length: 50 }),
    email: varchar('email', { length: 255 }),
    contactPersonName: varchar('contact_person_name', { length: 255 }),
    contactPersonPhone: varchar('contact_person_phone', { length: 50 }),
    contactPersonEmail: varchar('contact_person_email', { length: 255 }),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Service Company (Elevator Maintainer) — contracted by Managing Companies
 * to maintain and repair elevators. Each elevator has exactly one active
 * Service Company at any given time.
 */
export const serviceCompany = mysqlTable('service_company', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    registrationNumber: varchar('registration_number', { length: 50 }).unique(),
    legalAddress: text('legal_address'),
    actualAddress: text('actual_address'),
    phone: varchar('phone', { length: 50 }),
    email: varchar('email', { length: 255 }),
    contactPersonName: varchar('contact_person_name', { length: 255 }),
    contactPersonPhone: varchar('contact_person_phone', { length: 50 }),
    contactPersonEmail: varchar('contact_person_email', { length: 255 }),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Mechanic — a representative of a Service Company who attends inspections.
 * 1–3 mechanics must be present at each inspection (mandatory).
 */
export const mechanic = mysqlTable('mechanic', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }),
    email: varchar('email', { length: 255 }),
    /** The Service Company this mechanic works for */
    serviceCompanyId: varchar('service_company_id', { length: 36 })
        .notNull()
        .references(() => serviceCompany.id, { onDelete: 'cascade' }),
    certificationNumber: varchar('certification_number', { length: 100 }),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Contract — agreement between the Inspection Company and a Managing Company.
 * Multiple concurrent contracts can exist between the same parties
 * (e.g., divided by city district).
 *
 * Covers: list of elevators, deadlines, costs, responsible persons,
 * invoice terms, and document dispatch emails.
 */
export const contract = mysqlTable('contract', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    /** Sequential human-readable contract number */
    contractNumber: varchar('contract_number', { length: 50 })
        .notNull()
        .unique(),
    /** The Managing Company this contract is with */
    managingCompanyId: varchar('managing_company_id', { length: 36 })
        .notNull()
        .references(() => managingCompany.id, { onDelete: 'restrict' }),
    /** Contract type: written formal agreement or verbal agreement */
    contractType: mysqlEnum('contract_type', ['written', 'verbal'])
        .notNull()
        .default('written'),
    /** Date the contract becomes effective */
    startDate: date('start_date').notNull(),
    /** Date the contract expires (null = indefinite) */
    endDate: date('end_date'),
    /** Cost per individual elevator inspection (in EUR) */
    costPerInspection: decimal('cost_per_inspection', {
        precision: 10,
        scale: 2,
    }).notNull(),
    /** Payment terms in days (e.g., 30 = net 30) */
    paymentTermDays: int('payment_term_days').notNull().default(30),
    /** Email addresses for dispatching invoices and documents (comma-separated or JSON) */
    invoiceEmails: text('invoice_emails'),
    /** Contact person name from the Managing Company for this contract */
    clientContactName: varchar('client_contact_name', { length: 255 }),
    clientContactPhone: varchar('client_contact_phone', { length: 50 }),
    clientContactEmail: varchar('client_contact_email', { length: 255 }),
    /** Description or label for the contract scope (e.g., "Riga - Centrs district") */
    description: text('description'),
    /** Whether the contract is currently active */
    isActive: boolean('is_active').notNull().default(true),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Contract–Inspector assignment (Many-to-Many).
 * An inspector (user with "inspector" role) can be assigned to specific
 * contracts. They are then responsible for inspecting elevators under
 * those contracts.
 */
export const contractInspector = mysqlTable(
    'contract_inspector',
    {
        contractId: varchar('contract_id', { length: 36 })
            .notNull()
            .references(() => contract.id, { onDelete: 'cascade' }),
        /** References the user table — must be a user with role "inspector" */
        inspectorId: varchar('inspector_id', { length: 36 })
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        assignedAt: timestamp('assigned_at').notNull().defaultNow(),
    },
    (table) => [primaryKey({ columns: [table.contractId, table.inspectorId] })]
);

/**
 * Elevator (Lift) — the physical equipment being inspected.
 * Each elevator belongs to one Managing Company, is maintained by one
 * Service Company, and is covered under a specific Contract.
 *
 * An elevator can be re-assigned to a different Service Company or Contract
 * over time, but only has one active assignment at any point.
 */
export const elevator = mysqlTable('elevator', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    /** Registration number as per Latvian registry */
    registrationNumber: varchar('registration_number', { length: 50 })
        .notNull()
        .unique(),
    /** Factory/serial number of the elevator */
    serialNumber: varchar('serial_number', { length: 100 }),
    /** Type of elevator: passenger, freight, hospital, escalator, etc. */
    elevatorType: mysqlEnum('elevator_type', [
        'passenger',
        'freight',
        'hospital',
        'escalator',
        'platform',
        'other',
    ])
        .notNull()
        .default('passenger'),
    /** Manufacturer name */
    manufacturer: varchar('manufacturer', { length: 255 }),
    /** Year the elevator was manufactured */
    manufacturingYear: int('manufacturing_year'),
    /** Number of floors the elevator services */
    numberOfStops: int('number_of_stops'),
    /** Rated load capacity in kg */
    loadCapacity: int('load_capacity'),
    /** Rated speed in m/s */
    ratedSpeed: decimal('rated_speed', { precision: 5, scale: 2 }),
    /** Full address where the elevator is installed */
    address: text('address').notNull(),
    /** The Managing Company responsible for this elevator */
    managingCompanyId: varchar('managing_company_id', { length: 36 })
        .notNull()
        .references(() => managingCompany.id, { onDelete: 'restrict' }),
    /** The Service Company currently maintaining this elevator */
    serviceCompanyId: varchar('service_company_id', { length: 36 })
        .notNull()
        .references(() => serviceCompany.id, { onDelete: 'restrict' }),
    /** The Contract under which this elevator is inspected */
    contractId: varchar('contract_id', { length: 36 })
        .notNull()
        .references(() => contract.id, { onDelete: 'restrict' }),
    /** Next required inspection deadline */
    nextInspectionDeadline: date('next_inspection_deadline'),
    /** Whether the elevator is currently permitted to operate */
    isOperational: boolean('is_operational').notNull().default(true),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Inspection — the core inspection event.
 * Conducted by an Inspector (user), coordinated with 1–3 Mechanics.
 * Results in a defect category (0–3) that determines the elevator's
 * operational status.
 *
 * Defect Categories (per Latvian Cabinet of Ministers Regulation No. 679):
 *   0 = Full compliance, no defects
 *   1 = Minor defects, safe to operate for 1 year
 *   2 = Significant defects, operate for 1 month then must halt
 *   3 = Critical defects, immediate operation ban
 */
export const inspection = mysqlTable('inspection', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    /** The elevator being inspected */
    elevatorId: varchar('elevator_id', { length: 36 })
        .notNull()
        .references(() => elevator.id, { onDelete: 'restrict' }),
    /** The inspector conducting this inspection (must be a user with "inspector" role) */
    inspectorId: varchar('inspector_id', { length: 36 })
        .notNull()
        .references(() => user.id, { onDelete: 'restrict' }),
    /** The contract under which this inspection is performed */
    contractId: varchar('contract_id', { length: 36 })
        .notNull()
        .references(() => contract.id, { onDelete: 'restrict' }),
    /** Date inspection started */
    inspectionDate: date('inspection_date').notNull(),
    /** Date inspection was completed (may span multiple days) */
    completionDate: date('completion_date'),
    /**
     * Overall defect category for this inspection.
     * The highest (worst) category among all logged defects.
     */
    defectCategory: mysqlEnum('defect_category', ['0', '1', '2', '3'])
        .notNull()
        .default('0'),
    /** Current status of the inspection workflow */
    status: mysqlEnum('status', [
        'scheduled',
        'in_progress',
        'completed',
        'cancelled',
    ])
        .notNull()
        .default('scheduled'),
    /** If Category 2: deadline by which defects must be resolved (1 month from inspection) */
    defectResolutionDeadline: date('defect_resolution_deadline'),
    /** Whether elevator operation is permitted after this inspection */
    operationPermitted: boolean('operation_permitted').notNull().default(true),
    /** Date the next annual inspection is due (typically 1 year for Cat 0/1) */
    nextInspectionDate: date('next_inspection_date'),
    /** General notes / observations from the inspector */
    notes: text('notes'),
    /** Protocol number for the generated inspection document */
    protocolNumber: varchar('protocol_number', { length: 100 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Inspection–Mechanic junction table (Many-to-Many).
 * Links 1–3 mechanics to each inspection. Mechanic presence is mandatory.
 */
export const inspectionMechanic = mysqlTable(
    'inspection_mechanic',
    {
        inspectionId: varchar('inspection_id', { length: 36 })
            .notNull()
            .references(() => inspection.id, { onDelete: 'cascade' }),
        mechanicId: varchar('mechanic_id', { length: 36 })
            .notNull()
            .references(() => mechanic.id, { onDelete: 'restrict' }),
        assignedAt: timestamp('assigned_at').notNull().defaultNow(),
    },
    (table) => [primaryKey({ columns: [table.inspectionId, table.mechanicId] })]
);

/**
 * Defect — individual defect items logged during an inspection.
 * Each defect has its own category (0–3). The inspection's overall
 * defect category is determined by the worst defect found.
 */
export const defect = mysqlTable('defect', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    /** The inspection during which this defect was found */
    inspectionId: varchar('inspection_id', { length: 36 })
        .notNull()
        .references(() => inspection.id, { onDelete: 'cascade' }),
    /**
     * Defect category:
     *   0 = Compliant (used as a positive check item)
     *   1 = Minor — no safety impact
     *   2 = Significant — 1-month deadline to fix
     *   3 = Critical — immediate operation ban
     */
    category: mysqlEnum('category', ['0', '1', '2', '3']).notNull(),
    /** Reference to the regulation clause (e.g., "MK Nr.679, §12.3") */
    regulationReference: varchar('regulation_reference', { length: 255 }),
    /** Human-readable description of the defect */
    description: text('description').notNull(),
    /** Component or area of the elevator where the defect was found */
    location: varchar('location', { length: 255 }),
    /** Whether the defect has been resolved */
    isResolved: boolean('is_resolved').notNull().default(false),
    /** Date the defect was resolved */
    resolvedAt: timestamp('resolved_at'),
    /** Notes about the resolution */
    resolutionNotes: text('resolution_notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Invoice — generated for inspections performed under a contract.
 * Links to the contract for payment terms and the inspection for details.
 */
export const invoice = mysqlTable('invoice', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    /** Human-readable invoice number */
    invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
    /** The contract this invoice is issued under */
    contractId: varchar('contract_id', { length: 36 })
        .notNull()
        .references(() => contract.id, { onDelete: 'restrict' }),
    /** The Managing Company being billed */
    managingCompanyId: varchar('managing_company_id', { length: 36 })
        .notNull()
        .references(() => managingCompany.id, { onDelete: 'restrict' }),
    /** Date the invoice was issued */
    issueDate: date('issue_date').notNull(),
    /** Payment due date (calculated from contract payment terms) */
    dueDate: date('due_date').notNull(),
    /** Total amount in EUR */
    totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
    /** VAT amount in EUR */
    vatAmount: decimal('vat_amount', { precision: 10, scale: 2 })
        .notNull()
        .default('0.00'),
    /** Invoice status */
    status: mysqlEnum('invoice_status', [
        'draft',
        'sent',
        'paid',
        'overdue',
        'cancelled',
    ])
        .notNull()
        .default('draft'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

/**
 * Invoice line items — each line represents one elevator inspection on this invoice.
 */
export const invoiceItem = mysqlTable('invoice_item', {
    id: varchar('id', { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    invoiceId: varchar('invoice_id', { length: 36 })
        .notNull()
        .references(() => invoice.id, { onDelete: 'cascade' }),
    /** The specific inspection this line item covers */
    inspectionId: varchar('inspection_id', { length: 36 })
        .notNull()
        .references(() => inspection.id, { onDelete: 'restrict' }),
    /** Description of the service (e.g., "Annual inspection — Elevator #12345") */
    description: text('description').notNull(),
    /** Unit price in EUR */
    unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
    /** Quantity (typically 1 per elevator inspection) */
    quantity: int('quantity').notNull().default(1),
    /** Line total = unitPrice * quantity */
    lineTotal: decimal('line_total', { precision: 10, scale: 2 }).notNull(),
});

// ============================================================================
// RELATIONS
// Drizzle ORM relation definitions for type-safe query building.
// ============================================================================

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
    memberships: many(member),
    conductedInspections: many(inspection),
    contractAssignments: many(contractInspector),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
    members: many(member),
    invitations: many(invitation),
}));

export const memberRelations = relations(member, ({ one }) => ({
    organization: one(organization, {
        fields: [member.organizationId],
        references: [organization.id],
    }),
    user: one(user, { fields: [member.userId], references: [user.id] }),
}));

export const invitationRelations = relations(invitation, ({ one }) => ({
    organization: one(organization, {
        fields: [invitation.organizationId],
        references: [organization.id],
    }),
    inviter: one(user, {
        fields: [invitation.inviterId],
        references: [user.id],
    }),
}));

export const managingCompanyRelations = relations(
    managingCompany,
    ({ many }) => ({
        contracts: many(contract),
        elevators: many(elevator),
        invoices: many(invoice),
    })
);

export const serviceCompanyRelations = relations(
    serviceCompany,
    ({ many }) => ({
        mechanics: many(mechanic),
        elevators: many(elevator),
    })
);

export const mechanicRelations = relations(mechanic, ({ one, many }) => ({
    serviceCompany: one(serviceCompany, {
        fields: [mechanic.serviceCompanyId],
        references: [serviceCompany.id],
    }),
    inspectionAssignments: many(inspectionMechanic),
}));

export const contractRelations = relations(contract, ({ one, many }) => ({
    managingCompany: one(managingCompany, {
        fields: [contract.managingCompanyId],
        references: [managingCompany.id],
    }),
    elevators: many(elevator),
    inspections: many(inspection),
    assignedInspectors: many(contractInspector),
    invoices: many(invoice),
}));

export const contractInspectorRelations = relations(
    contractInspector,
    ({ one }) => ({
        contract: one(contract, {
            fields: [contractInspector.contractId],
            references: [contract.id],
        }),
        inspector: one(user, {
            fields: [contractInspector.inspectorId],
            references: [user.id],
        }),
    })
);

export const elevatorRelations = relations(elevator, ({ one, many }) => ({
    managingCompany: one(managingCompany, {
        fields: [elevator.managingCompanyId],
        references: [managingCompany.id],
    }),
    serviceCompany: one(serviceCompany, {
        fields: [elevator.serviceCompanyId],
        references: [serviceCompany.id],
    }),
    contract: one(contract, {
        fields: [elevator.contractId],
        references: [contract.id],
    }),
    inspections: many(inspection),
}));

export const inspectionRelations = relations(inspection, ({ one, many }) => ({
    elevator: one(elevator, {
        fields: [inspection.elevatorId],
        references: [elevator.id],
    }),
    inspector: one(user, {
        fields: [inspection.inspectorId],
        references: [user.id],
    }),
    contract: one(contract, {
        fields: [inspection.contractId],
        references: [contract.id],
    }),
    mechanics: many(inspectionMechanic),
    defects: many(defect),
}));

export const inspectionMechanicRelations = relations(
    inspectionMechanic,
    ({ one }) => ({
        inspection: one(inspection, {
            fields: [inspectionMechanic.inspectionId],
            references: [inspection.id],
        }),
        mechanic: one(mechanic, {
            fields: [inspectionMechanic.mechanicId],
            references: [mechanic.id],
        }),
    })
);

export const defectRelations = relations(defect, ({ one }) => ({
    inspection: one(inspection, {
        fields: [defect.inspectionId],
        references: [inspection.id],
    }),
}));

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
    contract: one(contract, {
        fields: [invoice.contractId],
        references: [contract.id],
    }),
    managingCompany: one(managingCompany, {
        fields: [invoice.managingCompanyId],
        references: [managingCompany.id],
    }),
    items: many(invoiceItem),
}));

export const invoiceItemRelations = relations(invoiceItem, ({ one }) => ({
    invoice: one(invoice, {
        fields: [invoiceItem.invoiceId],
        references: [invoice.id],
    }),
    inspection: one(inspection, {
        fields: [invoiceItem.inspectionId],
        references: [inspection.id],
    }),
}));
