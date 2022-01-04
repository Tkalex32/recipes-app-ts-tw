import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [recipesFound, setRecipesFound] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  const searchForRecipes = async (query: string): Promise<any> => {
    const res = await fetch(`http://localhost:3001/query=${query}`);
    return (await res.json()).results;
  };

  /* useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const res = await searchForRecipes(query);
      setRecipesFound(res);
    })();
  }); */

  return (
    <div className="">
      <h1>Recipe Search</h1>
      <form className="searchForm">
        <input id="searchText" type="text" placeholder="search..." />
      </form>
    </div>
  );
};

export default App;
