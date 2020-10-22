class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.init();
        this.stylesheetPath = '../../../../resources/platar86/jsWebComponents';

    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('sui-dropdown-wrapper');
        //        this.wrapper.classList.add('dropdown-wrapper');
        this.button = document.createElement('button');
        this.button.classList.add('sui-dropdown-button');
        //        this.button.classList.add('ui-button');
        this.button.classList.add('dropdown-button-init');
        this.button.classList.add('default--dropdown');
        this.button.addEventListener('click', function() {
            if (this.wrapper.querySelector('.sui-dropdown-content-opened')) {
                this.close();
            } else {
                this.open();
            }
        }.bind(this));
        this.dropdownItemsContainer = document.createElement('div');
        this.dropdownItemsContainer.classList.add('smdui-dropdown');
        this.dropdownItemsContainer.classList.add('sui-dropdown-content');
        this.wrapper.appendChild(this.button);
        this.wrapper.appendChild(this.dropdownItemsContainer);
    }

    connectedCallback() {
        this.appendChild(this.wrapper);
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
        this.dropdownItemsContainer.classList.add('sui-dropdown-content-opened');
        //        this.dropdownItemsContainer.classList.remove('sui-dropdown-content');
    }

    close() {
        //        this.dropdownItemsContainer.classList.add('sui-dropdown-content');
        this.dropdownItemsContainer.classList.remove('sui-dropdown-content-opened');
    }

    //?[{name: "string", cb: fn()}, {name: "string", cb: fn()}, {name: "string", cb: fn()}]*//
    createDropDownContent(contentArr) {
        this.contentItems = [];

        for (let i = 0; i < contentArr.length; i++) {
            this.contentItems[i] = document.createElement('button');
            this.contentItems[i].classList.add('smdui-dropdown');
            this.contentItems[i].classList.add('sui-dropdown-button');
            //            this.contentItems[i].classList.add('ui-button');
            this.contentItems[i].classList.add('sui-dropdown-content-item');
            if (contentArr[i].name) {
                this.contentItems[i].innerHTML = contentArr[i].name;
            }

            if (contentArr[i].cb) {
                this.contentItems[i].addEventListener('click', contentArr[i].cb);
                this.contentItems[i].addEventListener('click', this.close.bind(this));
            }

            this.dropdownItemsContainer.appendChild(this.contentItems[i]);
        }
        let self = this;
        document.onclick = function(event) {
            if (!event.target.matches('.sui-dropdown-button')) {
                self.close();
            }
        };
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