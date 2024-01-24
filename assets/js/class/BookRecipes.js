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

        this.selectIngredients = this._buildSelect(".select__ingredients", this.getIngredientsArray())
        this.selectAppliance = this._buildSelect(".select__appareils", this.getApplianceArray())
        this.selectUstensils = this._buildSelect(".select__ustensiles", this.getUstensilsArray())
        
        this.selectIngredientsTag = document.querySelector(".select__ingredients-tag")
        this.selectApplianceTag = document.querySelector(".select__appareils-tag")
        this.selectUstensilsTag = document.querySelector(".select__ustensiles-tag")

        this._addEvents()
    }

    initializeDom() {
        const recipes = document.getElementById(this.id)
        this.recipes.forEach(element => {
            recipes.appendChild(element.domItem)
        })
        this.synchroNumberRecipe() 
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
    _buildSelect(domEmplacement, tabResult) {
        
        const select = new utilitySelect.Select(domEmplacement, tabResult)
        /* ADD Events */
        select.domItem.firstChild.addEventListener("click", function() {
            if (!select.deploy) {
                select.showSelectList();
            } else  {
                select.closeListItem();
            }
        })

        return select
    }
    /* AMELIORATION : Trier la liste finale par max occurent / nombre de mots de la recette du mieux évaluer au moins bon (1 occurence par exemple)*/
    searchRecipes(entry) {
        /* Search on title, description and ingrédients - minimum functionning*/
        
        this.recipes.forEach(element => {
            let bool = false

            if(element.name.toLowerCase().includes(entry)) {
                bool = true
            }
            if(!bool) {
                if(element.description.toLowerCase().includes(entry)) {
                    bool = true
                }
                if(!bool) {
                    element.ingredients.forEach(item => {
                        if(item.ingredient.toLowerCase().includes(entry)) {
                            bool = true
                        }
                        // Add break if for loop
                    })
                }
            }
            if(bool)
                element.display = true
            else
                element.display = false
        })
    }
    addTagInfo() {
        //ajoute un element sur la page

    }

    synchroNumberRecipe() {
        const numberRecipesDom = document.querySelector(".select__number")
        const i = this.countDisplayRecipe()

        if(i === 1)
            numberRecipesDom.textContent = i + " recette"
        else
            numberRecipesDom.textContent = i + " recettes"
    }
    countDisplayRecipe() {
        let i = 0
        this.recipes.forEach(element => {
            if(element.display)
                i++
        })

        return parseInt(i)
    }
    refreshSelect() {

    }
    refreshDisplay() {
        this.recipes.forEach(element => {
            if(element.display)
                element.domItem.style.display = "block"
            else
                element.domItem.style.display = "none"
        })
    }
    search(entry) {
        if(entry.length > 2){
            this.searchRecipes(entry)
        }
        /* REFACTO => Tableau de select */
        if(this.selectIngredients.deploy) 
            this.selectIngredients.closeListItem()
        if(this.selectAppliance.deploy) 
            this.selectAppliance.closeListItem()
        if(this.selectUstensils.deploy) 
            this.selectUstensils.closeListItem()

        this.refreshDisplay()
        this.refreshSelect()
        this.synchroNumberRecipe()
    }
    /* EVENTS */
    _addEvents() {
        /* Input */
        this.input.addEventListener("input", (elem) => {
            const entry = elem.target.value.toLowerCase()
            this.search(entry)
        })

        this.selectIngredients.domItemList.forEach(element => {
            element.addEventListener("click", () => {
                element.classList.toggle("select__item-tag")
            })
        })
        this.selectAppliance.domItemList.forEach(element => {
            element.addEventListener("click", () => {
                element.classList.toggle("select__item-tag")
            })
        })
        this.selectUstensils.domItemList.forEach(element => {
            element.addEventListener("click", () => {
                element.classList.toggle("select__item-tag")
            })
        })
        /*
        document.addEventListener("DOMContentLoaded", function(){
            console.log(this.input.placeholder)
            this.input.placeholder = "Rechercher une recette, un ingrédient, ..."
        })*/

    }
    /* SELECT SEARCH */
    refreshSelect() {
        this.selectIngredients.domItemList.forEach(element => {
            element.setAttribute("data-display", this.searchIngredients(element.firstChild.textContent)) 
        })
        this.selectAppliance.domItemList.forEach(element => {
            element.setAttribute("data-display", this.searchAppareils(element.firstChild.textContent)) 
        })
        this.selectUstensils.domItemList.forEach(element => {
            element.setAttribute("data-display", this.searchUstensils(element.firstChild.textContent)) 
        })
    }
    searchIngredients(element) {
        //Parcours les ingredient pour une recette et return true or F
        let result = false
        this.recipes.forEach(item => {
            if(item.display) {
                item.ingredients.forEach(ingredient => {
                    if(element.toLowerCase().includes(ingredient.ingredient.toLowerCase()))
                        result = true    
                })
            }
        })

        return result
    }
    searchAppareils(element) {
        let result = false
        this.recipes.forEach(item => {
            if(item.display) {
                if(element.toLowerCase().includes(item.appliance.toLowerCase()))
                        result = true 
            }
        })

        return result

    }
    searchUstensils(element) {
        let result = false
        this.recipes.forEach(item => {
            if(item.display) {
                item.ustensils.forEach(elem => {
                    if(element.toLowerCase().includes(elem.toLowerCase()))
                        result = true    
                })
            }
        })

        return result

    }
}