'use server'
import { GetCocktailsByName, getTwentyCocktails } from "./data";

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
    const searchString = formData.get('nameSearch');
    
    if (!searchString) {
        return { error: 'Input required for search' }
    }

    try {
        const input = searchString.toString()
        const response = await GetCocktailsByName(input)
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}
