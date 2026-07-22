'use server';
// import { eq, not } from "drizzle-orm";
import { asc, count, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { lifts } from '@/db/schema';

const LIFTS_PER_PAGE = 5;

export const getAllLifts = async ({ page }: { page: number }) => {
    const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;
    const offset = (currentPage - 1) * LIFTS_PER_PAGE;
    const [data, [totalRow]] = await Promise.all([
        db
            .select()
            .from(lifts)
            .orderBy(asc(lifts.id))
            .limit(LIFTS_PER_PAGE)
            .offset(offset),
        db.select({ value: count() }).from(lifts),
    ]);
    const totalPages = Math.max(1, Math.ceil((totalRow?.value ?? 0) / LIFTS_PER_PAGE));
    return { data, currentPage, totalPages };
};
export const getLiftById = async (id: number) => {
    const [lift] = await db.select().from(lifts).where(eq(lifts.id, id));
    return lift ?? null;
};
export const addLift = async (
    agreementId: number,
    regNumber: string,
    address: string
) => {
    await db.insert(lifts).values({
        agreementId,
        regNumber,
        address,
    });
};
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
