'use server'

import { mocktails } from "./mockdata";

import pg from 'pg';
require('dotenv').config();

const { Pool } = pg;

const config = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: parseInt(process.env.DB_REQUEST_TIMEOUT || '30000', 10),
    mode: process.env.MODE || 'live',
};

const pool = new Pool(config);

export async function getTwentyCocktails() {
    if (config.mode === 'mock') {
        return getLocalMocktails();
    }
    try {
        const result = await pool.query('SELECT * FROM cocktails ORDER BY RANDOM() LIMIT 20');
        return result.rows;
    } catch (err) {
        console.error('Error fetching cocktails:', err);
        throw err;
    }
}

export async function GetCocktailsByNameAndIngredients(name: string | undefined, ingredients: string[]) {
    try {
        if (!name && ingredients.length === 0) {
            throw new Error("Either name or ingredients must be provided.");
        }

        let queryText: string;
        let queryParams: any[] = [];

        if (name && ingredients.length === 0) {
            queryText = 'SELECT * FROM cocktails WHERE name ILIKE $1 ORDER BY LENGTH(name) LIMIT 100';
            queryParams = [`%${name.trim()}%`];
        } else if (!name && ingredients.length > 0) {
            const ingredientConditions = ingredients.map((_, index) => `ingredients ILIKE $${index + 1}`).join(' AND ');
            queryText = `SELECT * FROM cocktails WHERE ${ingredientConditions} ORDER BY LENGTH(name) LIMIT 100`;
            queryParams = ingredients.map(ingredient => `%${ingredient.trim()}%`);
        } else {
            const ingredientConditions = ingredients.map((_, index) => `ingredients ILIKE $${index + 2}`).join(' AND ');
            queryText = `SELECT * FROM cocktails WHERE name ILIKE $1 AND ${ingredientConditions} ORDER BY LENGTH(name) LIMIT 100`;
            queryParams = [`%${name?.trim()}%`, ...ingredients.map(ingredient => `%${ingredient.trim()}%`)];
        }

        const result = await pool.query(queryText, queryParams);
        return result.rows;
    } catch (err) {
        console.error('Error fetching cocktails by name/ingredients:', err);
        throw err;
    }
}

export async function getLocalMocktails() {
    return mocktails;
}