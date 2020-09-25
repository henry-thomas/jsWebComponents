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
        this.button.classList.add('dropdown-button');
        this.button.addEventListener('click', this.createDropDownContent);
        this.wrapper.appendChild(this.button);
        this.shadowRoot.appendChild(wrapper);
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath + '/smdui-dropdown/smdui-dropdown.css');
        this.shadowRoot.appendChild(linkElem);
    }

    set items(items) {
        if (typeof(items) === 'Array') {
            this.createDropDownContent(items);
        }
    };

    open(contentArr) {

    }

    createDropDownContent(contentArr) {
        this.contentItems = [];
        let dropdownItemsContainer = document.createElement('div');
        dropdownItemsContainer.classList.add('smdui-dropdown');
        dropdownItemsContainer.classList.add('items-container');
        for (let i = 0; i < contentArr.length; i++) {
            this.contentItems[i] = document.createElement('button');
            contentItems[i].classList.add('smdui-dropdown');
            contentItems[i].classList.add('dropdown-button');
            contentItems[i].classList.add('content-item');
            if (this.contentItems.text) {
                this.contentItems[i].innerHTML = contentArr[i].text;
            }

            if (contentItems[i].cb) {
                this.contentItems[i].addEventListener('click', contentItems[i].cb);
            }
        }
    }
}
customElements.define('smdui-dropdown', Dropdown);