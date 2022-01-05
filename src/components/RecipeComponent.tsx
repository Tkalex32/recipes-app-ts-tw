import { IRecipeData } from "../IRecipe";

const RecipeComponent = (props: { recipe: IRecipeData }) => {
  const { recipe } = props;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2">
      <div className="title">
        <img
          className="w-full"
          src={recipe.recipe.image || "http://localhost.3000/placeholder.jpg"}
          alt={recipe.recipe.label}
        />
        <p className="font-bold text-xl mb-2">{recipe.recipe.label}</p>
      </div>
      {recipe.recipe.ingredients && (
        <ul className="flex">
          {recipe.recipe.ingredients.map((ing, idx) => (
            <li
              className="whitespace-nowrap bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              key={idx}
            >
              #{ing.food}
            </li>
          ))}
        </ul>
      )}
      <a href={recipe.recipe.url} target="_blank">
        View Recipe
      </a>
    </div>
  );
};

export default RecipeComponent;
