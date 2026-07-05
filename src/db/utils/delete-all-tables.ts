import mysql from 'mysql2/promise';
import 'dotenv/config';

async function dropAllTables() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    try {
        const sql = `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA ="${process.env.DB_DATABASE}" AND TABLE_TYPE = "BASE TABLE"`;

        const [rows] = await connection.query(sql);

        const tableNames = Object.values(rows).map((row) => row.TABLE_NAME);

        if (tableNames.length === 0) {
            console.log('Нет таблиц для удаления');
            // return;
            process.exit();
        }
        // 2. Отключаем проверку внешних ключей
        await await connection.query('SET FOREIGN_KEY_CHECKS = 0');

        // 3. Удаляем таблицы
        for (const tableName of tableNames) {
            await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
            console.log(`Удалена таблица ${tableName}`);
        }
        console.log('Все таблицы удалены');
        await connection.end();
        process.exit();
    } catch (err) {
        console.log(err);
    } finally {
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    }
}

dropAllTables();
