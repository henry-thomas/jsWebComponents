class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isOpen = false;
        this.heading;
        this.backdrop = document.createElement('div');
        this.header = document.createElement('header');
        this.mainSection = document.createElement('section');
        this.modal = document.createElement('div');
        this.actionsSection = document.createElement('section');
        this.footer = document.createElement('footer');
    }

    // const slots = this.shadowRoot.querySelectorAll('slot');
    // slots[1].addEventListener('slotchange', event => {
    //     // console.dir(slots[1].assignedNodes());
    // });


    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-modal/smdui-modal.css');
        this.shadowRoot.appendChild(linkElem);

        this.backdrop.setAttribute('id', 'backdrop');

        this.modal.setAttribute('id', 'modal');

        this.headerSlot = document.createElement('slot');
        this.headerSlot.setAttribute('id', 'title-slot');
        this.headerSlot.setAttribute('name', 'title');

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
        this.header.appendChild(this.headerSlot);
        this.modal.appendChild(this.mainSection);
        this.mainSection.appendChild(this.mainSlot);
        this.modal.appendChild(this.footer);
        this.footer.appendChild(this.footerSlot);
        this.modal.appendChild(this.actionsSection);
        this.actionsSection.appendChild(this.actionsSlot);


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
                this.heading = newValue;
                let head = this.header.appendChild(document.createElement('h2'));
                head.innerHTML = this.heading;
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
        //*The following checks whether the needed script is included, then includes it at most
        //*once. The script is appended to the head of the document. 
        //TODO add a dynamic src attribute to handle dependencies like this.
        //TODO or find a better solution.

        if ((this.actionsSection.querySelectorAll('smdui-button').length <= 1)) {
            if (!document.querySelector('script[src="./smdui-button/smdui-button.js"]')) {
                const buttonSrc = document.createElement('script');
                buttonSrc.setAttribute('src', './smdui-button/smdui-button.js');
                if (document.querySelector('head')) {
                    console.log('smdui-button script appended to head');
                    document.querySelector('head').appendChild(buttonSrc);
                } else {
                    console.log('smdui-button script appended to head');
                    let head = document.createElement('head');
                    document.querySelector('html').appendChild(head);
                    document.querySelector('head').appendChild(buttonSrc);
                }
            }
        };

        let newButton = document.createElement('smdui-button');
        newButton.setText(name);
        newButton.addEventListener('click', cb);
        this.actionsSection.appendChild(newButton);
    }

    setHeading(heading) {

        if (this.shadowRoot.querySelector('slot[name="title"]')) {
            this.header.removeChild(this.header.lastChild);
        }

        this.setAttribute('heading', heading);
        // this.heading = heading;

    }

    setContent(el, replace) {

        this.mainSection.removeChild(this.mainSection.lastChild);
        this.mainSection.appendChild(el);

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