import {sass} from "../assets/sass/style.sass"
import * as homeBuildBookRecipes from "../assets/js/home/buildBookRecipes"

const book = homeBuildBookRecipes.buildTabBookRecipes()

book.initializeDom()
