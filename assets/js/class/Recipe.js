export class Recipe {
    /**
     * Creates a new Recipe instance.
     *
     * @param {Array} recipe - JSON recipe item
     */
    constructor(recipe) {
        const $pathImg = "../assets/img/recipes/"
        this.id = recipe.id
        this.name = recipe.name
        this.img = $pathImg + recipe.image
        this.servings = recipe.servings
        this.ingredients = []
        recipe.ingredients.forEach(element => {
            this.ingredients.push(element)    
        })
        this.time = recipe.time
        this.description = recipe.description
        this.appliance = recipe.appliance
        this.ustensils = []
        recipe.ustensils.forEach(element => {
            this.ustensils.push(element)    
        })

        this._initDomElement()
    }
    
    _initDomElement() {
        
        const article = document.createElement("article")
        article.classList.add("recipe")

        const img = document.createElement("img")
        img.classList.add("recipe__img")
        img.setAttribute("src", this.img)
        img.setAttribute("alt", this.name)

        const imgOverlay = document.createElement("div")
        imgOverlay.classList.add("recipe__img-overlay")
        imgOverlay.textContent = this.time + "min"


        article.appendChild(img)
        article.appendChild(imgOverlay)

        this.domItem = article
    }
    
}