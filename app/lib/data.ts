'use server'
const sql = require('mssql')
require('dotenv').config();

const config = {
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: parseInt(process.env.DB_PORT || '1433', 10),
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        requestTimeout: parseInt(process.env.DB_REQUEST_TIMEOUT || '30000', 10),
    },
}

export async function getTwentyCocktails() {
    try {
        await sql.connect(config);
        const result = await sql.query(`SELECT TOP 20 * FROM cocktails ORDER BY NEWID()`);        
        return result.recordset;
    } catch (err) {
        console.error(err);
    } finally {
        sql.close();
    }
}

export async function GetCocktailsByName(searchString: string | undefined) {
    try {
        await sql.connect(config);
        const result = await sql.query(`SELECT TOP 20 * FROM cocktails WHERE Name LIKE '%${searchString?.trim()}%'`);
        return result.recordset;
    } catch (err) {
        console.error(err);
    } finally {
        sql.close();
    }
}
