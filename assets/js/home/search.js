/* Global Search Function*/ 
export function recipes(entry, selectName, recipes) {
    switch(selectName) {
            case "Ingrédients":
                searchEngine(entry, selectName, recipes)
                break;
            case "Appareils":
                searchEngine(entry, selectName, recipes)
                break;
            case "Ustensiles":
                searchEngine(entry, selectName, recipes)
                break;
            case null:
            default:
                loopForEach(recipes, entry)
                break;
            case "for":
                loopFor(recipes, entry)
                break;
            case "map":
                loopMap(recipes, entry)
                break;
    }
}
function loopForEach(recipes, entry) {
    let bool = false;
    recipes.forEach(element => {
        if(element.display) {
            bool = false;

            if(element.name.toLowerCase().includes(entry)) {
                bool = true;
            }
            if(!bool) {
                if(element.description.toLowerCase().includes(entry)) {
                    bool = true;
                }
                if(!bool) {
                    element.ingredients.forEach(item => {
                        if(item.ingredient.toLowerCase().includes(entry)) {
                            bool = true;
                        }
                    });
                }
            }
            if(bool)
                element.display = true;
            else
                element.display = false;
        }
    });
}
function loopFor(recipes, entry) {
    let bool = false;
    for(let i=0; i<recipes.length; i++) {
        if(recipes[i].display) {
            bool = false;

            if(recipes[i].name.toLowerCase().includes(entry)) {
                bool = true;
            }
            if(!bool)if(recipes[i].description.toLowerCase().includes(entry)) {
                    bool = true;
            }
            if(!bool)for(let j=0; j < recipes[i].ingredients.length; j++) {
                if(recipes[i].ingredients[j].ingredient.toLowerCase().includes(entry)) {
                    bool = true;
                    break;
                }
            }
        }
        if(bool)
            recipes[i].display = true;
        else
            recipes[i].display = false;
    }
}
function loopMap(recipes, entry) {
    let bool = false;
    recipes.map(element => {
        if(element.display) {
            bool = false;

            if(element.name.toLowerCase().includes(entry)) {
                bool = true;
            }
            if(!bool) {
                if(element.description.toLowerCase().includes(entry)) {
                    bool = true;
                }
                if(!bool) {
                    element.ingredients.map(item => {
                        if(item.ingredient.toLowerCase().includes(entry)) {
                            bool = true;
                        }
                    });
                }
            }
            if(bool)
                element.display = true;
            else
                element.display = false;
        }
    });
}
export function ingredients(element, recipes) {
    let result = false
    recipes.forEach(recipe => {
        if(recipe.display) {
            recipe.ingredients.forEach(ingredient => {
                if(element.toLowerCase() === ingredient.ingredient.toLowerCase())
                    result = true
            })
        }
    })

    return result
}
export function appareils(element, recipes) {
    let result = false
    recipes.forEach(recipe => {
        if(recipe.display) {
            if(element.toLowerCase() === recipe.appliance.toLowerCase())
                result = true
        }
    })

    return result

}
export function ustensils(selectUstensil, recipes) {
    let result = false
    recipes.forEach(recipe => {
        if(recipe.display) {
            recipe.ustensils.forEach(recipeUstensil => {
                if(selectUstensil.toLowerCase() === recipeUstensil.toLowerCase()) {
                    result = true    
                }
            })
        }
    })
    
    return result
}

function engineIngredients(element, entry) {
    let bool = false;
    element.ingredients.forEach(item => {
        if(item.ingredient.toLowerCase() === entry) {
            bool = true;
        }
    })
    if(bool)
        return true 
    else
        return false
}
function engineAppareils(element, entry) {
    let bool = false;
    if(element.appliance.toLowerCase() === entry) {
        bool = true;
    }
    if(bool)
        return true 
    else
        return false
}
function engineUstensiles(element, entry) {
    let bool = false;
    element.ustensils.forEach(item => {
        if(item.toLowerCase() === entry) {
            bool = true;
        }
    })
    if(bool)
        return true 
    else
        return false
}

function searchEngine(entry, selectName, recipes) {
    recipes.forEach(element => {
        let bool = false;
        if(element.display) {
            switch(selectName) {
                case "Ingrédients":
                    bool = engineIngredients(element, entry) 
                    break;
                case "Appareils":
                    bool = engineAppareils(element, entry) 
                    break;
                case "Ustensiles":
                    bool = engineUstensiles(element, entry) 
                    break;
            }
            
        }
        if(bool)
            element.display = true;
        else
            element.display = false;
    });
}
/* INITIATE SELECT DATA */
export function getIngredientsArray(recipes) {
    const result = ["Ingrédients"]
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            if(!result.includes(item.ingredient.toLowerCase())){
                result.push(item.ingredient.toLowerCase())
            }
        })
    })

    return result
}
export function getApplianceArray(recipes) {
    const result = ["Appareils"]
    recipes.forEach(recipe => {
            if(!result.includes(recipe.appliance.toLowerCase())) {
                result.push(recipe.appliance.toLowerCase())
            }
    })

    return result
}
export function getUstensilsArray(recipes) {
    const result = ["Ustensiles"]
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(item => {
            if(!result.includes(item.toLowerCase())){
                result.push(item.toLowerCase())
            }
        })
    })

    return result
}