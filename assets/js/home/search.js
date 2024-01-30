export function Ingredients(element, recipes) {
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
export function Appareils(element, recipes) {
    let result = false
    recipes.forEach(recipe => {
        if(recipe.display) {
            if(element.toLowerCase() === recipe.appliance.toLowerCase())
                result = true
        }
    })

    return result

}
export function Ustensils(selectUstensil, recipes) {
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

export function Recipes(entry, selectName, recipes) {
    /* Search on title, description and ingrédients - minimum functionning*/
    let bool = false;
    switch(selectName) {
            case "Ingrédients":
                recipes.forEach(element => {
                    bool = false;
                    if(element.display) {
                        element.ingredients.forEach(item => {
                            if(item.ingredient.toLowerCase() === entry) {
                                bool = true;
                            }
                        })
                    }
                    if(bool)
                        element.display = true;
                    else
                        element.display = false;
                });
                break;
            case "Appareils":
                recipes.forEach(recipe => {
                    bool = false;
                    if(recipe.display) {
                        if(recipe.appliance.toLowerCase() === entry) {
                            bool = true;
                        }
                    }
                    if(bool)
                        recipe.display = true;
                    else
                        recipe.display = false;
                });
                break;
            case "Ustensiles":
                recipes.forEach(element => {
                    bool = false;
                    if(element.display) {
                        element.ustensils.forEach(item => {
                            if(item.toLowerCase() === entry) {
                                bool = true;
                            }
                        })
                    }
                    if(bool)
                        element.display = true;
                    else
                        element.display = false;
                });
                break;
            case null:
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
                break;
            case "for":
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
                break;
            case "map":
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
                    break;
    }
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