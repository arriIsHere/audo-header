class AutoHeader extends HTMLElement {
    static _lastLevel = 1;
    constructor(nextPrevOrSame) {
        super();

        this.isNext = nextPrevOrSame > 0;
        this.isPrev = nextPrevOrSame < 0;
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
        let lastLevel = AutoHeader.getLastLevel();

        // Advance next level if set and prevLevel is not set and we have not surpassed '6'
        if(this.isNext && lastLevel < 6) {
            lastLevel = lastLevel + 1;
        }

        if(this.isPrev && lastLevel > 1) {
            lastLevel = lastLevel - 1;
        }

        AutoHeader.setLastLevel(lastLevel);

        //Set my level
        this.headerLevel = lastLevel;

        const realHeader = document.createElement(`h${this.headerLevel}`);
        const slot = document.createElement('slot');
        realHeader.appendChild(slot);

        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.appendChild(realHeader);
    }
}


customElements.define('h-next', 
    class extends AutoHeader {
        constructor() {
            super(1)
        }
    }
);

customElements.define('h-prev', 
    class extends AutoHeader {
        constructor() {
            super(-1);
        }
    }
);

customElements.define('h-same', 
    class extends AutoHeader {
        constructor() {
            super(0);
        }
    }
);