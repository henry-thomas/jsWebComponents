class Tabs extends HTMLElement {
    constructor() {
        super();
        this._wrapper;

    }

    connectedCallback() {
        //define elements
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-tabs/smdui-tabs.css');

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('wrapper');

        //attach to component
        this.appendChild(linkElem);
        this.appendChild(this._wrapper);
    }

    addTab(name, cb) {

        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.addEventListener('click', cb.bind(this))

        this._wrapper.appendChild(tab);

        const tabContent = document.createElement('span');
        tabContent.classList.add('tab-content');
        tab.appendChild(tabContent);
        tabContent.innerHTML = name;
    }
}

customElements.define('smdui-tabs', Tabs);