class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.text = "Button";
        this.button = document.createElement('button');
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-button/smdui-button.css');
        this.shadowRoot.appendChild(linkElem);

        this.setText(this.text);
        this.shadowRoot.appendChild(this.button);
    }

    setText(text) {
        // if (this.hasAttribute('text')) {
        this.setAttribute('text', text);
        // }
    }

    setType(type) {
        switch (type) {
            case 'confirm':
                this.classList.add('type-confirm');
                break;
            default:
                return;
        }

    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'text') {
            this.text = newVal;
            this.button.innerHTML = this.text;
        }
    }
}

customElements.define('smdui-button', Button);