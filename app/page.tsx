import Card from "@/app/ui/components/card";
import { Cocktail } from "./lib/definitions";

export default async function Home() {

  const cocktails: Cocktail[] = [
    {
      ID: 1328,
      Name: "Harrison Ginsberg’s Martinez",
      Image: "https://assets-prd.punchdrink.com/wp-content/uploads/2023/03/20105058/Thumb-Martinez-Martini-Cocktail-Reecipe-Harrison-Ginsberg-Overstory-NYC.jpg",
      Link: "https://punchdrink.com/recipes/harrison-ginsbergs-martinez/",
      Ingredients: "Sweet vermouth, London dry gin, Old tom gin, Maraschino liqueur, Angostura bitters",
      Source: "Punchdrink.com"
    },
    {
      ID: 6949,
      Name: "The Purl",
      Image: "https://cdn.diffords.com/contrib/stock-images/2017/1/42/2017cb115be0e111e8137617e86d81962a60.jpg",
      Link: "https://www.diffordsguide.com/cocktails/recipe/2552/the-purl",
      Ingredients: "Hayman's old tom gin, British bitter ale",
      Source: "Diffordsguide.com"
    },
    {
      ID: 5877,
      Name: "Wow",
      Image: "https://cdn.diffords.com/contrib/stock-images/2022/04/62500f43574da.jpg",
      Link: "https://www.diffordsguide.com/cocktails/recipe/12054/wow",
      Ingredients: "Cognac, Calvados straight applejacks, Light white rum, Dubonnetfrench rouge aromatised wine",
      Source: "Diffordsguide.com"
    },
    {
      ID: 5317,
      Name: "Singapore Sling",
      Image: "https://cdn.diffords.com/contrib/stock-images/2015/7/49/20158432d60536445c98d8c03dc77a4ec525.jpg",
      Link: "https://www.diffordsguide.com/cocktails/recipe/1777/singapore-sling-using-old-tom-gin",
      Ingredients: "Hayman's old tom gin, Bénédictine d.o.m. liqueur, Cherry heering cherry brandy liqueur, Lemon juice, Angostura aromatic bitters, Orange bitters by angostura, Soda water",
      Source: "Diffordsguide.com"
    }
  ];

  return (
    <div>
      <h1>Drink Scraper</h1>
      {cocktails.map(cocktail => (
        <Card cocktail={{
          ...cocktail
        }} key={cocktail.ID} />))

      }
    </div>
  );
}
