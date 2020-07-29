class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this._wrapper;
        this.heading;
        this.headingSpan;
    }

    connectedCallback() {
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
    }

    setHeading(heading) {
        this.setAttribute('heading', heading);
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