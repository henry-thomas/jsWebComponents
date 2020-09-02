class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.init();
    }

    init() {
        this.text = "Button";
        this.button = document.createElement('button');
        this.type = '';

        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-button/smdui-button.css');
        this.shadowRoot.appendChild(linkElem);
    }

    connectedCallback() {
        this.setText(this.text);
        this.shadowRoot.appendChild(this.button);
    }

    setText(text) {
        this.setAttribute('text', text);
        return this;
    }

    set type(type) {
        if (this.button.classList.length > 0) {
            for (let i = 0; i <= this.classList.length; i++) {
                console.log(this.button.classList)
                this.button.classList.remove(this.button.classList[i]);
            }
        }

        switch (type) {
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
        return this;
    }

    static get observedAttributes() {
        return ['text', 'disabled', 'type'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'text') {
            this.text = newVal;
            this.button.innerHTML = this.text;
        }
        if (name === 'disabled') {
            if (newVal === 'true') {
                this.button.setAttribute('disabled', newVal);
            } else {
                this.button.removeAttribute('disabled');
            }
        }
        if (name === 'type') {
            this.type = this.getAttribute('type', newVal);
        }
    }
}

customElements.define('smdui-button', Button);