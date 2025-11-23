'use client'

import { useEffect, useState } from "react";
import Card from "@/app/ui/components/card";
import Input from "./ui/components/input";
import { Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import { getInitialCocktailsAction, searchForCocktailsAction } from "./lib/actions";
import { Cocktail } from "./lib/definitions";
import CardSkeleton from "./ui/components/skeletons/cardSkeleton";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    const fetchInitial = async () => {
      setIsLoading(true);
      const name = searchParams.get('name');
      const ingredients = searchParams.get('ingredients')?.split(',').filter(Boolean) || [];

      let data;
      if (name || ingredients.length > 0) {
        data = await searchForCocktailsAction(name, ingredients);
      } else {
        data = await getInitialCocktailsAction();
      }

      setCocktails(data?.response || []);
      setIsLoading(false);
    };

    fetchInitial();
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !isLoading && !isFetchingMore && cocktails.length > 0
      ) {
        fetchMoreCocktails();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, isFetchingMore, cocktails]);

  const fetchMoreCocktails = async () => {
    setIsFetchingMore(true);
    const data = await getInitialCocktailsAction();
    const newCocktails = data?.response ?? [];
    setCocktails(prev => [...prev, ...newCocktails]);
    setIsFetchingMore(false);
  };

  const handleSearch = async (name: string, ingredients: string[]) => {
    setIsPending(true);
    const result = await searchForCocktailsAction(name, ingredients);
    setCocktails(result.response || []);
    setIsPending(false);
  };

  return (
    <div>
      <header className="bg-white">
        <h1 className="title"><a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = window.location.pathname;
          }}
        >Drink Scraper</a></h1>
        <Input action={handleSearch} isPending={isPending} />
      </header>
      <div className="cards">
        {isLoading ? (
          <CardSkeleton />
        ) : cocktails.length > 0 ? (
          <>
            {cocktails.map((cocktail: Cocktail) => (
              <Card
                key={cocktail.ID + Math.random()}
                cocktail={cocktail}
              />
            ))}
            {isFetchingMore && <CardSkeleton />}
          </>
        ) : (
          <div className="w-full text-center p-8 text-gray-500">
            ..I think you just created a new cocktail
          </div>
        )}
      </div>
    </div>
  );
}
