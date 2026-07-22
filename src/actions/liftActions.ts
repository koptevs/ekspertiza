'use server';
// import { eq, not } from "drizzle-orm";
import { and, asc, count, eq, like, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { lifts } from '@/db/schema';

const LIFTS_PER_PAGE = 5;

const ADDRESS_SEARCH_TOKEN_PATTERN = /\s+/;

const buildAddressCondition = (addressQuery: string) => {
    const tokens = addressQuery
        .trim()
        .split(ADDRESS_SEARCH_TOKEN_PATTERN)
        .filter(Boolean);
    if (tokens.length === 0) {
        return;
    }
    const addressConcat = sql`concat(${lifts.addressStreet}, ' ', ${lifts.addressBuildingNr})`;
    return and(...tokens.map((token) => like(addressConcat, `%${token}%`)));
};

export const getAllLifts = async ({
    page,
    regNumber,
    addressStreet,
}: {
    page: number;
    regNumber?: string;
    addressStreet?: string;
}) => {
    const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;
    const offset = (currentPage - 1) * LIFTS_PER_PAGE;
    const conditions = [
        regNumber ? like(lifts.regNumber, `%${regNumber}%`) : undefined,
        addressStreet ? buildAddressCondition(addressStreet) : undefined,
    ].filter((condition) => condition !== undefined);
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, [totalRow]] = await Promise.all([
        db
            .select()
            .from(lifts)
            .where(where)
            .orderBy(asc(lifts.id))
            .limit(LIFTS_PER_PAGE)
            .offset(offset),
        db.select({ value: count() }).from(lifts).where(where),
    ]);
    const totalPages = Math.max(1, Math.ceil((totalRow?.value ?? 0) / LIFTS_PER_PAGE));
    return { data, currentPage, totalPages };
};

export const getRegNumberSuggestions = async () => {
    const rows = await db
        .selectDistinct({ value: lifts.regNumber })
        .from(lifts)
        .orderBy(asc(lifts.regNumber));
    return rows.map((row) => row.value);
};

export const getAddressStreetSuggestions = async () => {
    const rows = await db
        .selectDistinct({ value: lifts.addressStreet })
        .from(lifts)
        .orderBy(asc(lifts.addressStreet));
    return rows.map((row) => row.value);
};
export const getLiftById = async (id: number) => {
    const [lift] = await db.select().from(lifts).where(eq(lifts.id, id));
    return lift ?? null;
};
// export const addLift = async (
//     agreementId: number,
//     regNumber: string,
//     address: string
// ) => {
//     await db.insert(lifts).values({
//         agreementId,
//         regNumber,
//         address,
//     });
// };
export const deleteLift = async (id: number) => {
    await db.delete(lifts).where(eq(lifts.id, id));
    revalidatePath('/');
};

// export const toggleTodo = async (id: number) => {
//   await db
//     .update(todo)
//     .set({
//       done: not(todo.done),
//     })
//     .where(eq(todo.id, id));
//   revalidatePath("/");
// };
// export const editTodo = async (id: number, text: string) => {
//   await db
//     .update(todo)
//     .set({
//       text: text,
//     })
//     .where(eq(todo.id, id));
//   revalidatePath("/");
// };
