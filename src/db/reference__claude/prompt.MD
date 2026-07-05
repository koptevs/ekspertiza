# Role and Objective
You are an expert full-stack developer and database architect. Your task is to develop a comprehensive SaaS web application for an elevator inspection company operating in Latvia. The application must digitize their workflow, enforce business rules, and manage complex relationships between different entities.
## Technology Stack
- **Framework:** TanStack Start (React)
- **Language:** TypeScript
- **Database ORM:** Drizzle ORM
- **Database:** MySQL
- **Authentication & Authorization:** Better-Auth with the `Organization` plugin for role-based access control (RBAC).
- **UI Components & Styling:** shadcn/ui, Tailwind CSS
- **Document Generation:** React-pdf (for generating inspection protocols and invoices)
## Business Context
The client is an Inspection Company responsible for inspecting elevators in accordance with the Latvian Cabinet of Ministers Regulation No. 679. 
The annual inspection is mandatory by law.
### Core Entities and Relationships
1. **Managing Company (Client)**
   - A legal entity responsible for the building's equipment.
   - Initiates the inspection process.
2. **Service Company (Elevator Maintainer)**
   - Contracted by the Managing Company to maintain and repair elevators.
   - Every elevator has exactly one active Service Company responsible for it at any given time.
3. **Inspection Company (The Tenant/System Owner)**
   - Signs contracts (written or verbal) with Managing Companies.
   - **Contract Details Include:**
     - List of specific elevator equipment covered.
     - Deadlines for inspections.
     - Cost of inspection per elevator.
     - Responsible contact persons from the Managing Company.
     - Responsible persons from the Inspection Company (Inspectors assigned to specific or all equipment in the contract).
     - Invoice payment terms and email addresses for dispatching documents.
   - *Note:* There can be multiple concurrent contracts between the same Managing Company and Inspection Company (e.g., divided by city districts).
4. **Elevator (Lift)**
   - The physical object being inspected.
   - Linked to a Managing Company, a Service Company, and defined in a Contract.
5. **Inspection**
   - Conducted by an **Inspector** (employee of the Inspection Company).
   - Coordinated with and attended by 1 to 3 **Mechanics** (representatives of the Service Company). Mechanic presence is mandatory.
   - Has a start date and an end date.
### Defect Categorization (The Core Logic)
During the inspection, the Inspector logs defects, categorized strictly as follows:
- **Category 0:** Full compliance. No defects.
- **Category 1:** Minor defects. Does not affect safety. The elevator gets permission to operate for the next year.
- **Category 2:** Significant defects. Does not critically affect safety immediately. The elevator is allowed to operate for **1 month**. If defects are not resolved within this month, elevator operation must be halted.
- **Category 3:** Critical defects. Directly affects safety. Immediate ban on elevator operation.
## Access Control and Roles
You will use the Better-Auth `Organization` plugin to manage access.
1. **Admin:**
   - Full read/write/delete access across the entire system.
   - Can manage Elevators, Service Company Representatives, Managing Company Representatives.
   - Can edit or delete ANY inspection created by ANY inspector.
2. **Inspector:**
   - Can create new Elevator objects.
   - Can create, edit, and delete their **own** Inspection records.
   - **Cannot** edit or delete Inspections created by other Inspectors.
3. **Viewer:**
   - Read-only access to elevator information and inspection protocols.
---
## Task Instructions: Phase 1 - Database Architecture
As the first phase of this project, you must design the database schema using **Drizzle ORM for MySQL**. 
Please provide the complete Drizzle ORM schema (`schema.ts`) that accurately models the entities, relationships, constraints, and roles described above. Keep the Better-Auth required tables in mind as well.
### Requirements for the Schema:
1. Define all tables with proper TypeScript types.
2. Establish correct foreign key relationships (One-to-Many, Many-to-Many where appropriate, e.g., Inspection to Mechanics).
3. Include timestamps (`createdAt`, `updatedAt`) for all critical tables.
4. Add brief comments explaining the relationships, especially regarding Contracts, Elevators, and Inspections.
5. Ask any clarifying questions if the business logic or relationships have edge cases that have not been covered in this prompt.