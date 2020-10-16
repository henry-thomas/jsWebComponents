class Button extends HTMLElement {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.tooltipEl = sui.tooltip();
        this.content = document.createElement('span');;
    }

    connectedCallback() {
        this.classList.add('sui-btn');
        //        let btnContent = document.createElement('span');

        this.appendChild(this.content);

        if (!this.hasAttribute('type')) {
            this.setAttribute('type', 'small--button');
        }
    }

    set tooltip(tooltip) {
        if (this.tooltipEl) {
            this.tooltipEl.text = tooltip;
            this.tooltipEl.element = this.content;
        }
    }

    set text(text) {
        this.setAttribute('text', text);
        this.content.innerHTML = text;
    }

    get text() {
        return this.getAttribute('text');
    }

    set type(type) {
        this.setAttribute('type', type);
    }

    get type() {
        return this.getAttribute('type');
    }

    static get observedAttributes() {
        return ['text', 'disabled', 'type'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'text') {
            if (this.hasAttribute('text')) {
                this.content.innerHTML = newVal;
            }
        }
        if (name === 'disabled') {
            if (newVal === 'true') {
                this.button.setAttribute('disabled', newVal);
            } else {
                this.button.removeAttribute('disabled');
            }
        }
        if (name === 'type') {
            this.applyType(newVal);
        }
    }

    applyType(type) {
        if (this.classList.length > 0) {
            for (let i = 0; i <= this.classList.length; i++) {
                this.classList.remove(this.classList[i]);
            }
        }

        switch (type) {
            case 'danger':
                this.classList.add('sui-btn-danger--button');
                this.classList.add('sui-btn');
                break;
            case 'warning':
                this.classList.add('sui-btn-warning--button');
                this.classList.add('sui-btn');
                break;
            case 'primary':
                this.classList.add('sui-btn-primary--button');
                this.classList.add('sui-btn');
                break;
            case 'secondary':
                this.classList.add('sui-btn-secondary--button');
                this.classList.add('sui-btn');
                break;
            case 'small':
                this.classList.add('sui-btn-default--button');
                this.classList.add('sui-btn');
                break;
            default:
                return;
        }
    }

}

customElements.define('smdui-button', Button);