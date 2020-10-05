class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.init();
        this.stylesheetPath = '';

    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('smdui-dropdown');
        this.wrapper.classList.add('dropdown-wrapper');
        this.button = document.createElement('button');
        this.button.classList.add('smdui-dropdown');
        this.button.classList.add('dropdown-button-init');
        this.button.classList.add('default--dropdown');
        this.button.addEventListener('click', function() {
            if (this.shadowRoot.querySelector('.opened')) {
                this.close();
            } else {
                this.open();
            }
        }.bind(this));
        this.dropdownItemsContainer = document.createElement('div');
        this.dropdownItemsContainer.classList.add('smdui-dropdown');
        this.dropdownItemsContainer.classList.add('dropdown-content');
        this.wrapper.appendChild(this.button);
        this.wrapper.appendChild(this.dropdownItemsContainer);
        this.shadowRoot.appendChild(this.wrapper);
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath + '/smdui-dropdown/smdui-dropdown.css');
        this.shadowRoot.appendChild(linkElem);
    }

    set text(text) {
        this.setAttribute('text', text);

        return this;
    }

    get text() {
        return this.getAttribute('text');
    }

    set items(items) {
        if (Array.isArray(items)) {
            this.createDropDownContent(items);
        }
    };

    get items() {
        return this.contentItems;
    }

    set type(type) {
        this.setAttribute('type', type);
        return this;
    }

    get type() {
        return this.getAttribute('type');
    }

    open() {
        this.dropdownItemsContainer.classList.add('opened');
    }

    close() {
        this.dropdownItemsContainer.classList.remove('opened');
    }

    //?[{name: "string", cb: fn()}, {name: "string", cb: fn()}, {name: "string", cb: fn()}]*//
    createDropDownContent(contentArr) {
        this.contentItems = [];

        for (let i = 0; i < contentArr.length; i++) {
            this.contentItems[i] = document.createElement('button');
            this.contentItems[i].classList.add('smdui-dropdown');
            this.contentItems[i].classList.add('dropdown-button');
            this.contentItems[i].classList.add('content-item');
            if (contentArr[i].name) {
                this.contentItems[i].innerHTML = contentArr[i].name;
            }

            if (contentArr[i].cb) {
                this.contentItems[i].addEventListener('click', contentArr[i].cb);
                this.contentItems[i].addEventListener('click', this.close.bind(this));
            }

            this.dropdownItemsContainer.appendChild(this.contentItems[i])
        }
        let self = this;
        document.onclick = function(event) {
            if (!event.target.matches('smdui-dropdown')) {
                self.close();
            }
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'text') {
            this.button.innerHTML = newVal;
        }
    }
}
customElements.define('smdui-dropdown', Dropdown);