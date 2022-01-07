import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import RecipeComponent from "./components/RecipeComponent";
import { IRecipeData } from "./IRecipe";

const App: React.FC = () => {
  const getProducts = async (query: string): Promise<IRecipeData[]> =>
    await (
      await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${
          import.meta.env.VITE_APP_ID
        }&app_key=${import.meta.env.VITE_APP_KEY}`
      )
    ).json();
  const [recipesFound, setRecipesFound] = useState<IRecipeData[]>([]);
  const [recipeSearch, setRecipeSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useQuery<IRecipeData[]>(
    ["products", recipeSearch],
    () => searchForRecipes(recipeSearch),
    {
      enabled: recipeSearch !== "" && !recipesFound,
    }
  );

  const searchForRecipes = async (query: string): Promise<IRecipeData[]> => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${
        import.meta.env.VITE_APP_ID
      }&app_key=${import.meta.env.VITE_APP_KEY}`
    );
    return (await response.json()).hits;
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector("#searchText") as HTMLInputElement;
    setRecipeSearch(input.value);
    input.value = "";
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if (query) {
        const res = await searchForRecipes(query);
        setRecipesFound(res);
        setIsLoading(false);
      }
    })();
  }, [recipeSearch]);

  return (
    <div className="px-2 py-4 bg-slate-200 w-screen max-w-full min-h-screen bg-fixed">
      <h1 className="text-4xl my-3 font-semibold text-center">Recipe Search</h1>
      <form className="text-center" onSubmit={(event) => search(event)}>
        <input
          className="border-2 border-sky-600 p-2 text-lg rounded-md"
          id="searchText"
          type="text"
          placeholder="search..."
        />
        <button className="bg-sky-600 text-white p-2 m-2 text-lg rounded-md">
          Search
        </button>
      </form>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-600 mt-24"></div>
          <div className="text-sky-600 text-3xl mt-4 animate-pulse">
            LOADING...
          </div>
        </div>
      ) : error ? (
        <p className="text-sky-600 text-3xl">Something went wrong...</p>
      ) : (
        <div>
          {recipeSearch && (
            <p className="text-center">Results for {recipeSearch}...</p>
          )}
          <div className="flex flex-wrap my-2 mx-0 gap-2 justify-evenly">
            {recipesFound &&
              recipesFound.map((recipe, idx) => (
                <RecipeComponent key={idx} recipe={recipe} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
