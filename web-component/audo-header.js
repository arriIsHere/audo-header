class AutoHeader extends HTMLElement {
    static _lastLevel = 1;
    constructor() {
        super();
    }

    //TODO: check back in the DOM instead of storing it.
    static getLastLevel() {
        return AutoHeader._lastLevel;
    }

    static setLastLevel(newLastLevel) {
        AutoHeader._lastLevel = newLastLevel;
        return AutoHeader._lastLevel;
    }

    connectedCallback() {
        //Check for the 'nextLevel' attr
        const isNextLevel = this.hasAttribute('next-level');
        const isPrevLevel = this.hasAttribute('prev-level');

        let lastLevel = AutoHeader.getLastLevel();

        // Advance next level if set and prevLevel is not set and we have not surpassed '6'
        if(isNextLevel && !isPrevLevel && lastLevel < 6) {
            lastLevel = lastLevel + 1;
        }

        if(isPrevLevel && !isNextLevel && lastLevel > 1) {
            lastLevel = lastLevel - 1;
        }

        AutoHeader.setLastLevel(lastLevel);

        //Set my level
        this.headerLevel = lastLevel;

        document.addEventListener('DOMContentLoaded', () => {
            //Manage the content (properly)
            const realHeader = document.createElement(`h${this.headerLevel}`);
            realHeader.innerHTML = this.innerHTML;
            this.innerHTML = '';
            this.appendChild(realHeader);
        });
    }
}


customElements.define('auto-header', 
    AutoHeader
);