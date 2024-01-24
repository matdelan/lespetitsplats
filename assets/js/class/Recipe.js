export class Recipe {
    /**
     * Creates a new Recipe instance.
     *
     * @param {Array} recipe - JSON recipe item
     */
    constructor(recipe) {
        /* LOGICAL VARIABLES */
        this.display = true

        /* Load data from JSON */
        const $pathImg = "./assets/img/recipes/"
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

        const content = document.createElement("div")
        content.classList.add("recipe__content")

        const title = document.createElement("h2")
        title.textContent = this.name
        title.classList.add("recipe__title")

        const titletext1 = document.createElement("h3")
        titletext1.textContent = "RECETTE"
        titletext1.classList.add("recipe__text-title")

        const text1 = document.createElement("p")
        text1.textContent = this.description
        text1.classList.add("recipe__text")

        const titletext2 = document.createElement("h3")
        titletext2.textContent = "INGREDI\u00C9NTS"
        titletext2.classList.add("recipe__text-title")

        const text2 = this._initBuildIngredients()

        article.appendChild(img)
        content.appendChild(imgOverlay)
        content.appendChild(title)
        content.appendChild(titletext1)
        content.appendChild(text1)
        content.appendChild(titletext2)
        content.appendChild(text2)
        article.appendChild(content)

        this.domItem = article
    }

    _initBuildIngredients() {
        const ingredients = document.createElement("div")
        ingredients.classList.add("recipe__ingredients")

        this.ingredients.forEach(element => {
            const div = document.createElement("div")
            div.classList.add("recipe__ingredients-context")

            const text = document.createElement("p")
            text.classList.add("recipe__ingredients-text")
            text.textContent = element.ingredient

            const subtext = document.createElement("p")
            subtext.classList.add("recipe__ingredients-subtext")
            let temp = null
            if(element.unit !== undefined)
                temp = " " + element.unit
            else
                temp = ""
            subtext.textContent = element.quantity + temp

            div.appendChild(text)
            div.appendChild(subtext)

            ingredients.appendChild(div)
        })

        return ingredients
    }
    
}