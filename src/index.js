import {sass} from "../assets/sass/style.sass"
import * as classBookRecipes from "../assets/js/class/BookRecipes"
import * as classRecipe from "../assets/js/class/Recipe"
import * as homeBuildBookRecipes from "../assets/js/home/buildBookRecipes"


const book = homeBuildBookRecipes.buildTabBookRecipes()
console.log(book)

book.initializeDom()

const selectIngredients = homeBuildBookRecipes.buildSelectIngredients(book)
const selectAppliance = homeBuildBookRecipes.buildSelectAppliance(book)
const selectUstensils = homeBuildBookRecipes.buildSelectUstensils(book)



