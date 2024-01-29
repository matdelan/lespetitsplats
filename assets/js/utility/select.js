/**
 * Class representing a custom select component.
 */
export class Select {
    /**
     * Creates a new Select instance.
     *
     * @param {string} querySelect - The query selector for the select component.
     * @param {Array} list - The list of items for the select component.
     */
    constructor(querySelect, list) {
        /**
         * The list of items for the select component.
         * @type {Array}
         */
        this.list = list;

        /**
         * The DOM element for the select component.
         * @type {HTMLElement}
         */
        this.domItem = document.querySelector(querySelect);
        
        /**
         * The index of the selected entry.
         * @type {number}
         */
        this.entryIndex = 0;

        /**
         * The list of DOM elements for the select items.
         * @type {Array}
         */
        this.domItemList = [];

        this.domDisplay = null
        this.searchInput = null
        this.input = null
        /**
         * Flag indicating whether the select list is deployed or not.
         * @type {boolean}
         */
        this.deploy = false;

        /**
         * The starting tabindex value.
         * @type {number}
         * @private
         */
        this._tabIndexStart = 1;

        /**
         * Initializes the select component.
         * @private
         */
        this._init();
    }

    /**
     * Initializes the select component by building the menu.
     * @private
     */
    _init() {
        this.domItem.setAttribute("role", "button");
        this.domItem.setAttribute("aria-expanded", "false");

        for (let i = 0; i < this.list.length; i++) {
            this._buildMenuItem(i);
        }

        this._addEvent()
    }

    /**
     * Builds a menu item for the select component.
     *
     * @param {number} index - The index of the menu item.
     * @private
     */
    _buildMenuItem(index) {
        const entry = document.createElement("li");
        let chevronDown = null

        if (index !== 0) {
            entry.classList.add("select__item-list");
            entry.setAttribute("role", "listbox");
        } else {
            chevronDown = document.createElement("i");
            chevronDown.classList.add("fa-solid");
            entry.classList.add("select__item-first");
            chevronDown.classList.add("fa-chevron-down");
        }

        entry.classList.add("select__item");
        entry.style.setProperty("order", index + 2);
        entry.setAttribute("aria-label", this.list[index]);

        const p = document.createElement("p");
        p.textContent = this.list[index];
        entry.appendChild(p);
        
        if(chevronDown !== null)
            entry.appendChild(chevronDown);

        this.domItem.appendChild(entry);
        if (index == 0) {
            const entrySearch = document.createElement("li")
            const input = document.createElement("input")
            entrySearch.classList.add("select__item-list")
            entrySearch.classList.add("select__item-search")
            entrySearch.classList.add("select__item")
            entrySearch.style.setProperty("order", 2);
            input.classList.add("select__input-" + this.list[0])
            input.classList.add("select__input")
            entrySearch.appendChild(input)
            const icon = document.createElement("i")
            icon.classList.add("fa-solid")
            icon.classList.add("fa-magnifying-glass")
            icon.classList.add("select__input-icon")
            entrySearch.appendChild(icon)
            this.input = entrySearch.firstChild
            this.domItem.appendChild(entrySearch)
            this.domDisplay = entry
            this.searchInput = entrySearch
        } else {
            entry.setAttribute("data-display", "true")
            this.domItemList.push(entry);
        }
        
    }

    /**
     * Toggles the display of the select list.
     */
    showSelectList() {
        if (this.deploy) {
            this.closeListItem();
        } else {
            this.displayListItem();
        }
    }
    /**
     * Closes the select list.
     */
    closeListItem() {
        this.deploy = false;
        for (let i = 0; i < this.domItemList.length; i++) {
            this.domItemList[i].style.display = "none";
        }
        this.domDisplay.style.display = "flex";
        this.domDisplay.lastChild.classList.toggle("fa-chevron-down");
        this.domDisplay.lastChild.classList.toggle("fa-chevron-up");
        this.domDisplay.classList.toggle("select__item-first");
        this.domItem.setAttribute("aria-expanded", "false");
        this.searchInput.style.display = "none"

        this.domItem.style.zIndex = "1" 
        console.log("close select")
        this.domItem.focus();
    }
    /**
     * Displays the select list.
     */
    displayListItem() {
        this.deploy = true;
        this.domItem.style.zIndex = "10"
        for (let i = 0; i < this.domItemList.length; i++) {
            if(this.domItemList[i].getAttribute("data-display") == "true") {
                this.domItemList[i].style.display = "flex";
            }
            else 
                this.domItemList[i].style.display = "none";
        }
        this.domDisplay.lastChild.classList.toggle("fa-chevron-down");
        this.domDisplay.lastChild.classList.toggle("fa-chevron-up");
        this.domDisplay.classList.toggle("select__item-first");
        this.searchInput.style.display = "flex"
        this.domItem.setAttribute("aria-expanded", "true");
        console.log("display")
    }
    search(string) {
        this.domItemList.forEach(element => {
            element.style.display = "flex"
            if(!element.firstChild.textContent.includes(string))
                element.style.display = "none"
        })
    }
    refreshSearch() {
        this.domItemList.forEach(element => {
            element.style.display = "flex"
        })
    }

    _addEvent() {
        
        /* input Change */
        this.input.addEventListener("input", (elem) => {
            const entry = elem.target.value.toLowerCase()
            this.search(entry)
        })
        /* Click event document */
        document.addEventListener("click", (event) => {
            console.log("document close")
            if (!this.domItem.contains(event.target)) {
                this.input.value = ""
                if (this.deploy) {
                    this.closeListItem();
                }
            }
        })
    }
}
