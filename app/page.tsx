import Card from "@/app/ui/components/card";
import { Cocktail } from "./lib/definitions";
import { mocktails } from '@/app/lib/mockdata'
import Input from "./ui/components/input";
import { getTwentyCocktails } from "./lib/data";

export default async function Home() {

  const cocktails: Cocktail[] = await getTwentyCocktails()

  return (
    <div>
      <header className="bg-white">
        <h1 className="font-bold text-4xl p-4 pl-8 pt-8">Drink Scraper</h1>
        <Input/>
      </header>
      <div className="flex flex-wrap grid-cols-fill justify-center gap-4 p-4">
        {cocktails.map(cocktail => (
          <Card cocktail={{
            ...cocktail
          }} key={cocktail.ID} />))
        }
      </div>
    </div>
  );
}
