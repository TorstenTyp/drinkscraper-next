import Card from "@/app/ui/components/card";
import { Cocktail } from "./lib/definitions";
import { mocktails } from '@/app/lib/mockdata'

export default async function Home() {

  const cocktails: Cocktail[] = mocktails;

  return (
    <div>
      <h1>Drink Scraper</h1>
      <div className="grid grid-cols-fill gap-4 p-4">
        {cocktails.map(cocktail => (
          <Card cocktail={{
            ...cocktail
          }} key={cocktail.ID} />))
        }
      </div>
    </div>
  );
}
