import * as classBookRecipes from "../class/BookRecipes"
import * as classRecipe from "../class/Recipe"
import * as dataRecipes from "../data/recipes"

export function buildTabBookRecipes() {
    /* DATA ORIGIN JS/DATA/ tableau JSON */
    const book = new classBookRecipes.BookRecipes(dataRecipes.recipes, "recipes")

    return book
}