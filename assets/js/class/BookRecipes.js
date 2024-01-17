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

    /* INITIATE SELECT DATA */
    getIngredientsArray() {
        const result = ["Ingrédients"]
        this.recipes.forEach(element => {
            element.ingredients.forEach(item => {
                if(!result.includes(item.ingredient)){
                    result.push(item.ingredient)
                }
            })
        })

        return result
    }
    getApplianceArray() {
        const result = ["Appareils"]
        this.recipes.forEach(element => {
                if(!result.includes(element.appliance)) {
                    result.push(element.appliance)
                }
        })

        return result
    }
    getUstensilsArray() {
        const result = ["Ustensiles"]
        this.recipes.forEach(element => {
            element.ustensils.forEach(item => {
                if(!result.includes(item)){
                    result.push(item)
                }
            })
        })

        return result
    }
}