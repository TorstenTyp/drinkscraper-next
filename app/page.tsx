'use client'
import Card from "@/app/ui/components/card";
import Input from "./ui/components/input";
import { useActionState } from "react";
import { searchForCocktailsAction } from "./lib/actions";

export default function Page() {

  const [state, formAction, isPending] = useActionState(searchForCocktailsAction, null)
  
  return (
    <div>
      <header className="bg-white">
        <h1 className="font-bold text-4xl p-4 pl-8 pt-8">Drink Scraper</h1>
        <Input action={formAction} isPending={isPending} />
      </header>
      <div className="flex flex-wrap grid-cols-fill justify-center gap-4 p-4">
        {state?.response?.map(cocktail => (
          <Card cocktail={{
            ...cocktail
          }} key={cocktail.ID} />))
        }
      </div>
    </div>
  );
}
