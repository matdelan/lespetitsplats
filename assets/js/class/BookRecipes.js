import * as classRecipe from "./Recipe"
import * as utilitySelect from "../utility/select"
import * as utilityTag from "../utility/tag"
import * as search from "../home/search"


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

        this.selectIngredients = this._buildSelect(".select__ingredients", search.getIngredientsArray(this.recipes))
        this.selectAppliance = this._buildSelect(".select__appareils", search.getApplianceArray(this.recipes))
        this.selectUstensils = this._buildSelect(".select__ustensiles", search.getUstensilsArray(this.recipes))
        
        this.selectIngredientsTag = document.querySelector(".select__ingredients-tag")
        this.selectApplianceTag = document.querySelector(".select__appareils-tag")
        this.selectUstensilsTag = document.querySelector(".select__ustensiles-tag")

    }
    initializeDom() {
        const recipes = document.getElementById(this.id)
        this.recipes.forEach(element => {
            recipes.appendChild(element.domItem)
        })
        this.synchroNumberRecipe() 
    }
    /* INITIATE SELECT */
    _buildSelect(domEmplacement, tabResult) {
        const select = new utilitySelect.Select(domEmplacement, tabResult)
        /*ADD Events */
        select.domItem.firstChild.addEventListener("click", function() {
            if (!select.deploy) {
                select.showSelectList();
            } else  {
                select.closeListItem();
            }
        })

        return select
    }
    search(entry) {
        if(this.input.value === "Rechercher une recette, un ingrédient, ...") 
            entry = this.input.value = " "
    
        this.refreshSearchTags()
            
        if(entry.length > 2) {
            search.Recipes(entry, null, this.recipes)
        }
        this.closeAllSelect()
    
        this.refreshDisplay()
        this.refreshSelect()
        this.synchroNumberRecipe()
    }
    refreshSearchTags() {
        //Controle tous les tags: reinitialise la recherche et applique une recherche sur les tags restant
        this.recipes.forEach(element => {
            if(!element.display)
                element.display = true
        })

        const tags = document.querySelectorAll(".select__tag-item")

        tags.forEach(element => {
            const selectName = element.getAttribute("data-select")
            search.Recipes(element.textContent.toLowerCase(), selectName, this.recipes)   
        })
    }
    /* SELECT SEARCH MANAGEMENT */
    closeAllSelect() {
        if(this.selectIngredients.deploy) 
            this.selectIngredients.closeListItem()
        if(this.selectAppliance.deploy) 
            this.selectAppliance.closeListItem()
        if(this.selectUstensils.deploy) 
            this.selectUstensils.closeListItem()
    }
    /* Display result after search */
    refreshDisplay() {
        this.recipes.forEach(element => {
            if(element.display)
                element.domItem.style.display = "block"
            else
                element.domItem.style.display = "none"
        })
    }
    refreshSelect() {
        this.selectIngredients.domItemList.forEach(element => {
            element.setAttribute("data-display", search.Ingredients(element.firstChild.textContent, this.recipes)) 
        })
        this.selectAppliance.domItemList.forEach(element => {
            element.setAttribute("data-display", search.Appareils(element.firstChild.textContent, this.recipes)) 
        })
        this.selectUstensils.domItemList.forEach(element => {
            element.setAttribute("data-display", search.Ustensils(element.firstChild.textContent, this.recipes)) 
        })
    }
    /* Number recipe Management */
    synchroNumberRecipe() {
        const numberRecipesDom = document.querySelector(".select__number")
        const i = this.countDisplayRecipe()

        if(i === 1 || i === 0)
            numberRecipesDom.textContent = i + " recette"
        else
            numberRecipesDom.textContent = i + " recettes"

        const recipes = document.getElementById("info")
        if(i === 0) {
            recipes.textContent = "Aucune recette trouvée!"
            recipes.style.display = "flex"
        } else {
            recipes.style.display = "none"
        }
    }
    countDisplayRecipe() {
        let i = 0
        this.recipes.forEach(element => {
            if(element.display)
                i++
        })

        return parseInt(i)
    }   
}