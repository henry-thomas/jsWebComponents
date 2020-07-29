class Tabs extends HTMLElement {
    constructor() {
        super();
        this._wrapper;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        //define elements
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-tabs/smdui-tabs.css');

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('wrapper');

        //attach to component
        this.shadowRoot.appendChild(linkElem);
        this.shadowRoot.appendChild(this._wrapper);
    }

    addTab(name, cb) {

        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.addEventListener('click', cb.bind(this));
        // tab.onclick(tab.classList.add('selected'));

        this._wrapper.appendChild(tab);

        const tabContent = document.createElement('span');
        tabContent.classList.add('tab-content');
        tab.appendChild(tabContent);
        tabContent.innerHTML = name;
    }
}

customElements.define('smdui-tabs', Tabs);