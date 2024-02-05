import * as classBookRecipes from "../class/BookRecipes"
import * as dataRecipes from "../data/recipes"
import * as utilityTag from "../utility/tag"

export function buildTabBookRecipes() {
    /* DATA ORIGIN JS/DATA/ table JSON + classList */
    const book = new classBookRecipes.BookRecipes(dataRecipes.recipes, "recipes")
    utilityTag._addEvents(book)

    return book
}

//export function buildApiBookRecipes() {}

