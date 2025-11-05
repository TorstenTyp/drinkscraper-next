'use server'

import { mocktails } from "./mockdata";

const sql = require('mssql')
require('dotenv').config();

const config = {
    mode: process.env.MODE,
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
    if (config.mode === 'mock'){
        return getLocalMocktails()
    }
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

export async function GetCocktailsByNameAndIngredients(name: string | undefined, ingredients: string[]) {
    try {
        await sql.connect(config);
        let result;

        if (!name && ingredients.length === 0) {
            throw new Error("Either name or ingredients must be provided.");
        }
        
        if (name && ingredients.length === 0) {
            result = await sql.query(`SELECT TOP 100 * FROM cocktails WHERE Name LIKE '%${name.trim()}%'`);
        } else if (!name && ingredients.length > 0) {
            const ingredientConditions = ingredients.map(ingredient => `Ingredients LIKE '%${ingredient.trim()}%'`).join(' AND ');
            result = await sql.query(`SELECT TOP 100 * FROM cocktails WHERE ${ingredientConditions}`);
        } else {
            const ingredientConditions = ingredients.map(ingredient => `Ingredients LIKE '%${ingredient.trim()}%'`).join(' AND ');
            result = await sql.query(`SELECT TOP 100 * FROM cocktails WHERE Name LIKE '%${name?.trim()}%' AND ${ingredientConditions}`);
        }
        return result.recordset;

    } catch (err) {
        console.error(err);
    } finally {
            sql.close();
    }

}

export async function getLocalMocktails(){
    return mocktails;
}