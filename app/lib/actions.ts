'use server'

import { GetCocktailsByNameAndIngredients, getTwentyCocktails } from "./data";

interface SearchResult {
    success?: boolean;
    response?: [{
        ID: number,
        Name: string,
        Image: string,
        Link: string,
        Ingredients: string,
        Source: string
    }];
    error?: unknown;
}

export async function getInitialCocktailsAction(): Promise<SearchResult> {
    try {
        const response = await getTwentyCocktails()
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export async function searchForCocktailsAction(name: string | null | undefined, ingredients: string[]): Promise<SearchResult> {
    try {
        const response = await GetCocktailsByNameAndIngredients(name || '', ingredients)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
