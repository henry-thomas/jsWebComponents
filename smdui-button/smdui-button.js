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
        if (this.button.classList.length > 0) {
            for (let i = 0; i <= this.classList.length; i++) {
                console.log(this.button.classList)
                this.button.classList.remove(this.button.classList[i]);
            }
        }

        switch (type) {
            case 'confirm':
                this.button.classList.add('confirm--button');
                console.log(this.button.classList)

                break;
            case 'cancel':
                this.button.classList.add('cancel--button');
                break;
            case 'danger':
                this.button.classList.add('danger--button');
                break;
            case 'warning':
                this.button.classList.add('warning--button');
                break;
            case 'primary':
                this.button.classList.add('primary--button');
                break;
            case 'secondary':
                this.button.classList.add('secondary--button');
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