class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isOpen = false;
        this.init();
        this.stylesheetPath = 'smdui-modal/smdui-modal.css';
        this.buttonJsPath = '../smdui-button/smdui-button.js';

    }

    init() {
        this.backdrop = document.createElement('div');
        this.header = document.createElement('header');
        this.head = document.createElement('h2');
        this.mainSection = document.createElement('section');
        this.modal = document.createElement('div');
        this.actionsSection = document.createElement('section');
        this.footer = document.createElement('footer');
        this.backdrop.setAttribute('id', 'backdrop');

        this.modal.setAttribute('id', 'modal');

        this.mainSection.setAttribute('id', 'main');

        this.mainSlot = document.createElement('slot');
        this.mainSlot.setAttribute('name', 'content-slot');

        this.footerSlot = document.createElement('slot');
        this.footerSlot.setAttribute('name', 'footer');

        this.actionsSection.setAttribute('id', 'actions');

        this.actionsSlot = document.createElement('slot');
        this.actionsSlot.setAttribute('name', 'actions');

        this.backdrop.addEventListener('click', this._cancel.bind(this))
        this.shadowRoot.appendChild(this.backdrop);
        this.shadowRoot.appendChild(this.modal);
        this.modal.appendChild(this.header);
        this.header.appendChild(this.head);
        this.modal.appendChild(this.mainSection);
        this.mainSection.appendChild(this.mainSlot);
        this.modal.appendChild(this.footer);
        this.footer.appendChild(this.footerSlot);
        this.modal.appendChild(this.actionsSection);
        this.actionsSection.appendChild(this.actionsSlot);
    }

    set heading(heading) {
        this.setAttribute('heading', heading);
        this.head.innerHTML = heading;
    }

    get heading() {
        if (this.hasAttribute('heading')) {
            return this.getAttribute('heading');
        }
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath);
        this.shadowRoot.appendChild(linkElem);

        if (!this.hasAttribute('heading')) {
            this.setAttribute('heading', this.heading);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'opened') {
            if (this.hasAttribute('opened')) {
                this.isOpen = true;
            } else {
                this.isOpen = false;
            }
        }

        if (name === 'heading') {
            if (this.hasAttribute('heading')) {
                this.head.innerHTML = newValue;
            } else {
                this.head.innerHTML = '';
            }
        }
    }

    static get observedAttributes() {
        return ['opened', 'heading'];
    }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    hide() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    addButton(name, cb) {
        import (this.buttonJsPath).catch(err => { return });

        let newButton = document.createElement('smdui-button');
        newButton.text = (name);
        newButton.addEventListener('click', cb);
        this.actionsSection.appendChild(newButton);
        return newButton;
    }

    setContent(el, replace) {
        try {
            this.mainSection.removeChild(this.mainSection.lastChild);
            this.mainSection.appendChild(el);
        } catch (err) {
            console.log(err + '- Modal content should be an element with one parent, but can have nested elements')
        }
    }

    _cancel(event) {
        this.hide();
        const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm(event) {
        this.hide();
        const confirmEvent = new Event('confirm')
        this.dispatchEvent(confirmEvent);
    }
}

customElements.define('smdui-modal', Modal);