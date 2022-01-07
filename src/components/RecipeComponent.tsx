import { IRecipeData } from "../IRecipe";

const RecipeComponent = (props: { recipe: IRecipeData }) => {
  const { recipe } = props;

  return (
    <div className="max-w-xs w-full lg:w-1/3 rounded-lg relative bg-white shadow-md hover:shadow-lg overflow-hidden">
      <div className="text-lg font-extrabold flex flex-col justify-center items-center">
        <img
          className="w-full"
          src={recipe.recipe.image || "http://localhost.3000/placeholder.jpg"}
          alt={recipe.recipe.label}
        />
        <p className="font-bold text-xl m-2">{recipe.recipe.label}</p>
      </div>
      {recipe.recipe.ingredients && (
        <ul className="flex flex-wrap m-2 mt-2 p-0">
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
      <a
        href={recipe.recipe.url}
        target="_blank"
        className="no-underline bg-sky-600/70 hover:bg-sky-600 absolute top-0 right-0 p-2 text-white transition-colors duration-300"
      >
        View Recipe
      </a>
    </div>
  );
};

export default RecipeComponent;
