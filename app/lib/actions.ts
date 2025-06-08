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

export async function searchForCocktailsAction(prevState: SearchResult | null, formData: FormData): Promise<SearchResult> {
    const name = formData.get('name');
    const nameString = name?.toString()
    const ingredients = formData.get('tags');;
    const ingredientArray = ingredients ? ingredients.toString().split(',') : [];

    try {
        const response = await GetCocktailsByNameAndIngredients(nameString, ingredientArray)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
