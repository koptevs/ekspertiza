import mysql from 'mysql2/promise';
// import postgres from 'postgres';
const connection = await mysql.createConnection(
  process.env.DATABASE_URL!
);
const sql = 'SELECT * FROM `lifts`';
const [rows, fields] = await connection.query(sql);
// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function listInvoices() {
// 	const data = await sql`
//     SELECT invoices.amount, customers.name
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE invoices.amount = 666;
//   `;

// 	return data;
// }

export async function GET() {
  return Response.json({
    rows
  }
    //   {
    //   message:
    //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
    // }
  );
  // try {
  // 	return Response.json(await listInvoices());
  // } catch (error) {
  // 	return Response.json({ error }, { status: 500 });
  // }
}