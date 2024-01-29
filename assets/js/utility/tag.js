/* TAG INFORMATION */
function removeTag(element, book) {
    element.remove()
    book.search(book.input.value.toLowerCase())
}

function create(element, index, select, book) {
    const domPosition = document.getElementById("select__tag")
    const elem = document.createElement("div")
    
    elem.classList.add("select__item")
    elem.classList.add("select__tag-item")
    elem.textContent = element.firstChild.textContent
    elem.setAttribute("data-select", select.domItem.firstChild.firstChild.textContent)
    const i = document.createElement("i")
    i.classList.add("fa-solid")
    i.classList.add("fa-xmark")

    /* Events*/
    elem.appendChild(i)
    elem.addEventListener("click", () => {
        select.domItemList[index].classList.toggle("select__item-tag")
        removeTag(elem, book)
    })
    
    domPosition.appendChild(elem)
}

export function _addEvents(book) {
    console.log(book)
    /* Input */
    book.input.addEventListener("input", (elem) => {
        const entry = elem.target.value.toLowerCase()
        book.search(entry)
    })
    let i = 0
    book.selectIngredients.domItemList.forEach(element => {
        _eventTag(element, i, book.selectIngredients, book)
        i++
    })
    i = 0
    book.selectAppliance.domItemList.forEach(element => {
        _eventTag(element, i, book.selectAppliance, book)
        i++
    })
    i = 0
    book.selectUstensils.domItemList.forEach(element => {
        _eventTag(element, i, book.selectUstensils, book)
        i++
    })
}

export function _eventTag(element, i, select , book) {
    element.addEventListener("click", () => {
        if(element.classList.contains("select__item-tag")) {
            //-> Already a tag
            const tags = document.querySelectorAll(".select__tag-item")
            tags.forEach(tag => {
                if(tag.textContent.includes(element.firstChild.textContent))
                    tag.remove()
            })
            element.classList.toggle("select__item-tag")
        } else {
            //-> Create tag
            element.classList.toggle("select__item-tag")
            create(element, i, select, book)
        }
        book.search(book.input.value.toLowerCase())
    })
}