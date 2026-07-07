'use server';
// import { eq, not } from "drizzle-orm";
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { lifts } from '@/db/schema';

export const getAllLifts = async () => {
    const data = await db.select().from(lifts);
    return data;
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