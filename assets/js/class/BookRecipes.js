import * as classRecipe from "./Recipe"

export class BookRecipes {
    
    constructor(jsonData, id){
        this.recipes = []
        jsonData.forEach(element => {
            this.recipes.push(new classRecipe.Recipe(element))
        })
        this.id = id
    }

    initializeDom() {
        const recipes = document.getElementById(this.id)
        this.recipes.forEach(element => {
            recipes.appendChild(element.domItem)
        })
    }
}