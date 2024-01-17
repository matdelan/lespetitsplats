import * as classBookRecipes from "../class/BookRecipes"
import * as classRecipe from "../class/Recipe"
import * as dataRecipes from "../data/recipes"
import * as utilitySelect from "../utility/select"

export function buildTabBookRecipes() {
    /* DATA ORIGIN JS/DATA/ tableau JSON */
    const book = new classBookRecipes.BookRecipes(dataRecipes.recipes, "recipes")

    return book
}

/* INITIATE SELECT */
export function buildSelectIngredients(book) {
    
    const selectIngredients = new utilitySelect.Select(".select__ingredients", book.getIngredientsArray())
    /* ADD Events */
    selectIngredients.domItemList.forEach((domItem) => domItem.addEventListener("click", function() {
        if (!selectIngredients.deploy) {
            selectIngredients.showSelectList();
        } else  {
            selectIngredients.closeListItem();
        }
    }))

    return selectIngredients
}
export function buildSelectAppliance(book) {
    
    const selectAppliance = new utilitySelect.Select(".select__appareils", book.getApplianceArray())
    /* ADD Events */
    selectAppliance.domItemList.forEach((domItem) => domItem.addEventListener("click", function() {
        if (!selectAppliance.deploy) {
            selectAppliance.showSelectList();
        } else  {
            selectAppliance.closeListItem();
        }
    }))

    return selectAppliance
}
export function buildSelectUstensils(book) {
    
    const selectUstensils = new utilitySelect.Select(".select__ustensiles", book.getUstensilsArray())
    /* ADD Events */
    selectUstensils.domItemList.forEach((domItem) => domItem.addEventListener("click", function() {
        if (!selectUstensils.deploy) {
            selectUstensils.showSelectList();
        } else  {
            selectUstensils.closeListItem();
        }
    }))

    return selectUstensils
}

