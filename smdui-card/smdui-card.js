class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._wrapper;
        this.headingSpan;
        this.contentDiv;
    }

    connectedCallback() {
        this.heading = this.getAttribute('heading');

        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-card/smdui-card.css');

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('wrapper');

        this.shadowRoot.appendChild(linkElem);
        this.shadowRoot.appendChild(this._wrapper);

        this.headingSpan = document.createElement('span');
        this.headingSpan.classList.add('heading');
        this.headingSpan.innerHTML = this.heading;
        this._wrapper.appendChild(this.headingSpan);

        this.contentDiv = document.createElement('div');
        this.contentDiv.classList.add('content-div');
        this._wrapper.appendChild(this.contentDiv);

        const contentSlot = document.createElement('slot'); //To insert content from DOM, add separately, style before inserting
        contentSlot.classList.add('content-slot');
        contentSlot.setAttribute('name', 'content-slot');
        this.contentDiv.appendChild(contentSlot);
    }

    setHeading(heading) {
        this.setAttribute('heading', heading);
    }

    addContent(content) { //Allows to insert content rather than using slot. Should be styled before.
        try {
            this.contentDiv.appendChild(content);
        } catch {
            let message = content + " Should be an html element. May have nested elements, but only one parent.";
            console.warn(message);
        }

    }

    static get observedAttributes() {
        return ['heading'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'heading') {
            this.heading = newVal;
            this.headingSpan.innerHTML = this.heading;
        }
    }



}
customElements.define('smdui-card', Card);