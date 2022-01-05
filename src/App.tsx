import { FormEvent, useEffect, useState } from "react";
import RecipeComponent from "./components/RecipeComponent";
import Spinner from "./components/Spinner";
import { IRecipeData } from "./IRecipe";

const App: React.FC = () => {
  const [recipesFound, setRecipesFound] = useState<IRecipeData[]>([]);
  const [recipeSearch, setRecipeSearch] = useState<string>("");

  const searchForRecipes = async (query: string): Promise<IRecipeData[]> => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${
        import.meta.env.VITE_APP_ID
      }&app_key=${import.meta.env.VITE_APP_KEY}`
    );
    return (await response.json()).hits;
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
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
      }
    })();
  }, [recipeSearch]);

  return (
    <div className="bg-gray-300">
      <div className="py-12 px-24">
        <h1 className="text-xl font-semibold">Recipe Search</h1>
        <form className="searchForm" onSubmit={(event) => search(event)}>
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
        {recipeSearch && <p>Results for {recipeSearch}...</p>}

        <div className="flex flex-wrap my-2 mx-0">
          {recipesFound &&
            recipesFound.map((recipe, idx) => (
              <RecipeComponent key={idx} recipe={recipe} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
