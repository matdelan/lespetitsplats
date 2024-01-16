import * as classRecipe from "./Recipe"

export class BookRecipes {
    
    constructor(jsonData){
        this.recipes = []
        jsonData.forEach(element => {
            this.recipes.push(new classRecipe.Recipe(element))
        })
    }

    initializeDom() {
        const main = document.querySelector("main")
        this.recipes.forEach(element => {
                main.appendChild(element.domItem)
        })
    }
}