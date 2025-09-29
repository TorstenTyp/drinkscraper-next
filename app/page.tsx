'use client'
import { useEffect, useState } from "react";
import Card from "@/app/ui/components/card";
import Input from "./ui/components/input";
import { useActionState } from "react";
import { getInitialCocktailsAction, searchForCocktailsAction } from "./lib/actions";
import { Cocktail } from "./lib/definitions";
import CardSkeleton from "./ui/components/skeletons/cardSkeleton";

export default function Page() {
  const [initialCocktails, setInitialCocktails] = useState<Cocktail[]>([]);
  const [state, formAction, isPending] = useActionState(searchForCocktailsAction, null);
  const [isLoading, setIsLoading] = useState(true); //TODO: Refaktorera den här röran

  useEffect(() => {
    const fetchInitialCocktails = async () => {
      const data = await getInitialCocktailsAction();
      setInitialCocktails(data?.response || []);
    };

    fetchInitialCocktails().then(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <header className="bg-white">
        <h1 className="title">Drink Scraper</h1>
        <Input action={formAction} isPending={isPending} />
      </header>
      <div className="cards">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          (state?.response ?? initialCocktails)?.map((cocktail) => (
            <Card
              key={cocktail.ID}
              cocktail={cocktail}
            />
          ))
        )}
      </div>
    </div>
  );
}
