import * as classRecipe from "./Recipe"
import * as utilitySelect from "../utility/select"

export class BookRecipes {
    
    constructor(jsonData, id){
        this.recipes = []
        jsonData.forEach(element => {
            this.recipes.push(new classRecipe.Recipe(element))
        })
        this.id = id
        //search input
        this.input = document.querySelector(".header__subcontent-input")
        /* SELECT INITIALISE */
        this.selectIngredients = this.buildSelectIngredients()
        this.selectAppliance = this.buildSelectAppliance()
        this.selectUstensils = this.buildSelectUstensils()
        
        this.addEvents()
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
    /* INITIATE SELECT */
    buildSelectIngredients() {
        
        const selectIngredients = new utilitySelect.Select(".select__ingredients", this.getIngredientsArray())
        /* ADD Events */
        selectIngredients.domItem.firstChild.addEventListener("click", function() {
            if (!selectIngredients.deploy) {
                selectIngredients.showSelectList();
            } else  {
                selectIngredients.closeListItem();
            }
        })

        return selectIngredients
    }
    buildSelectAppliance() {
        
        const selectAppliance = new utilitySelect.Select(".select__appareils", this.getApplianceArray())
        /* ADD Events */
        selectAppliance.domItem.firstChild.addEventListener("click", function() {
            if (!selectAppliance.deploy) {
                selectAppliance.showSelectList();
            } else  {
                selectAppliance.closeListItem();
            }
        })

        return selectAppliance
    }
    buildSelectUstensils() {
        
        const selectUstensils = new utilitySelect.Select(".select__ustensiles", this.getUstensilsArray())
        /* ADD Events */
        selectUstensils.domItem.firstChild.addEventListener("click", function() {
            if (!selectUstensils.deploy) {
                selectUstensils.showSelectList();
            } else  {
                selectUstensils.closeListItem();
            }
        })

        return selectUstensils
    }

    searchRecipes() {

    }
    synchroNumberRecipe() {

    }
    refreshDisplay() {

    }
    /* EVENTS */
    addEvents() {

        /* Input */
        this.input.addEventListener("input", function(elem){
            if(elem.target.value.length > 2){
                console.log("ok")
            }
        })
    }
}