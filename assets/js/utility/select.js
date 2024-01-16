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
        this._tabIndexStart = 6;

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
    }

    /**
     * Builds a menu item for the select component.
     *
     * @param {number} index - The index of the menu item.
     * @private
     */
    _buildMenuItem(index) {
        const entry = document.createElement("li");
        const chevronDown = document.createElement("i");

        if (index !== 0) {
            entry.classList.add("select__item-list");
            entry.setAttribute("role", "listbox");
        } else {
            chevronDown.classList.add("fa-solid");
        }

        entry.classList.add("select__item");
        entry.setAttribute("data-index", index);
        entry.style.setProperty("order", index + 1);
        entry.setAttribute("tabindex", this._tabIndexStart);
        entry.setAttribute("data-tabindex", this._tabIndexStart++);
        entry.setAttribute("aria-label", this.list[index]);

        const p = document.createElement("p");
        p.textContent = this.list[index];
        entry.appendChild(p);

        chevronDown.classList.add("invisible");
        chevronDown.classList.add("fa-chevron-down");

        entry.appendChild(chevronDown);

        this.domItem.appendChild(entry);
        this.domItemList.push(entry);
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
            if (this.domItemList[i].style.getPropertyValue("order") !== "1") {
                this.domItemList[i].style.display = "none";
            } else {
                this.domItemList[i].style.display = "flex";
                this.domItemList[i].lastChild.classList.toggle("fa-chevron-down");
                this.domItemList[i].lastChild.classList.toggle("fa-chevron-up");
            }
            if (parseInt(this.domItemList[i].getAttribute("tabindex")) !== -1) {
                const temp = this.domItemList[i].getAttribute("tabindex");
                this.domItemList[i].setAttribute("data-tabindex", temp);
                this.domItemList[i].setAttribute("tabindex", "-1");
            }
        }
        this.domItem.setAttribute("aria-expanded", "false");
        this.domItem.focus();
    }
    /**
     * Displays the select list.
     */
    displayListItem() {
        this.deploy = true;

        for (let i = 0; i < this.domItemList.length; i++) {
            if (this.domItemList[i].style.getPropertyValue("order") !== "1") {
                this.domItemList[i].style.display = "flex";
            } else {
                // Swap chevron
                this.domItemList[i].lastChild.classList.toggle("fa-chevron-down");
                this.domItemList[i].lastChild.classList.toggle("fa-chevron-up");
            }
            const temp = this.domItemList[i].getAttribute("data-tabindex");
            this.domItemList[i].setAttribute("tabindex", temp);
        }
        this.domItem.setAttribute("aria-expanded", "true");
    }

    /**
     * Swaps the first list item with a new index.
     *
     * @param {number} newIndex - The index of the new list item.
     */
    swapFirstListItem(newIndex) {
        let lastOrder = null;
        // Compare entry with index
        lastOrder = this.domItemList[newIndex].style.getPropertyValue("order");
        const lastTabindex = this.domItemList[newIndex].getAttribute("tabindex");
        const lastDataTabindex = this.domItemList[newIndex].getAttribute("data-tabindex");

        this.domItemList[newIndex].style.setProperty("order", "1");
        this.domItemList[newIndex].classList.toggle("select__item-list");
        this.domItemList[newIndex].lastElementChild.classList.toggle("fa-solid");
        this.domItemList[newIndex].lastChild.classList.toggle("fa-chevron-down");
        this.domItemList[newIndex].lastChild.classList.toggle("fa-chevron-up");
        let temp = this.domItemList[this.entryIndex].getAttribute("tabindex");
        this.domItemList[newIndex].setAttribute("tabindex", temp);
        temp = this.domItemList[this.entryIndex].getAttribute("data-tabindex");
        this.domItemList[newIndex].setAttribute("data-tabindex", temp);

        this.domItemList[this.entryIndex].style.setProperty("order", lastOrder);
        this.domItemList[this.entryIndex].classList.toggle("select__item-list");
        this.domItemList[this.entryIndex].lastElementChild.classList.toggle("fa-solid");
        this.domItemList[this.entryIndex].lastChild.classList.toggle("fa-chevron-down");
        this.domItemList[this.entryIndex].lastChild.classList.toggle("fa-chevron-up");
        this.domItemList[this.entryIndex].setAttribute("tabindex", lastTabindex);
        this.domItemList[this.entryIndex].setAttribute("data-tabindex", lastDataTabindex);

        this.entryIndex = newIndex;

        this.closeListItem();
    }
}
