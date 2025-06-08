'use client'
import { useEffect, useState } from "react";
import Card from "@/app/ui/components/card";
import Input from "./ui/components/input";
import { useActionState } from "react";
import { getInitialCocktailsAction, searchForCocktailsAction } from "./lib/actions";
import { Cocktail } from "./lib/definitions";

export default function Page() {
  const [initialCocktails, setInitialCocktails] = useState<Cocktail[]>([]);
  const [state, formAction, isPending] = useActionState(searchForCocktailsAction, null);

  useEffect(() => {
    const fetchInitialCocktails = async () => {
      const data = await getInitialCocktailsAction();      
      setInitialCocktails(data?.response || []);
    };

    fetchInitialCocktails();
  }, []);

  return (
    <div>
      <header className="bg-white">
        <h1 className="font-bold text-4xl p-4 pl-8 pt-8">Drink Scraper</h1>
        <Input action={formAction} isPending={isPending} />
      </header>
      <div className="flex flex-wrap grid-cols-fill justify-center gap-4 p-4">
        {(state?.response || initialCocktails)?.map(cocktail => (
          <Card cocktail={{ ...cocktail }} key={cocktail.ID} />
        ))}
      </div>
    </div>
  );
}
