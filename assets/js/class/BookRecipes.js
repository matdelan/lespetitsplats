import * as classRecipe from "./Recipe"
import * as utilitySelect from "../utility/select"
import * as search from "../home/search"

export class BookRecipes {
    
    constructor(jsonData, id) {
        this.recipes = []
        jsonData.forEach(element => {
            this.recipes.push(new classRecipe.Recipe(element))
        })
        this.id = id
        this.input = document.querySelector(".header__subcontent-input")
        /* SELECT INITIALISE */
        this.selectIngredients = this._buildSelect(".select__ingredients", search.getIngredientsArray(this.recipes))
        this.selectAppliance = this._buildSelect(".select__appareils", search.getApplianceArray(this.recipes))
        this.selectUstensils = this._buildSelect(".select__ustensiles", search.getUstensilsArray(this.recipes))

    }
    initializeDom() {
        const recipes = document.getElementById(this.id)
        this.recipes.forEach(element => {
            recipes.appendChild(element.domItem)
        })

        this.search(this.input.value) 
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
    /*Logical search function*/
    search(entry) {
        this.refreshSearchTags()
    
        if(entry.length > 2) {
            search.recipes(entry, "for", this.recipes)
        }

        this.closeAllSelect()
    
        this.refreshDisplay()
        this.refreshSelect()

        this.synchroNumberRecipe()
    }
    reinitDisplay() {
        this.recipes.forEach(element => {
            if(!element.display)
                element.display = true
        })
    }
    refreshSearchTags() {
        //Controle tous les tags: reinitialise la recherche et applique une recherche sur les tags restant
        this.reinitDisplay()

        const tags = document.querySelectorAll(".select__tag-item")

        tags.forEach(element => {
            const selectName = element.getAttribute("data-select")
            search.recipes(element.textContent.toLowerCase(), selectName, this.recipes)   
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
            element.setAttribute("data-display", search.ingredients(element.firstChild.textContent, this.recipes)) 
        })
        this.selectAppliance.domItemList.forEach(element => {
            element.setAttribute("data-display", search.appareils(element.firstChild.textContent, this.recipes)) 
        })
        this.selectUstensils.domItemList.forEach(element => {
            element.setAttribute("data-display", search.ustensils(element.firstChild.textContent, this.recipes)) 
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