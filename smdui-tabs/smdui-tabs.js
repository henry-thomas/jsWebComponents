class Tabs extends HTMLElement {
    constructor() {
        super();
        this._wrapper;
        this.selectedTab;
        this.tabsArr = [];
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

        // if (this.selectedTab === undefined) {
        //     this.selectedTab = this.tabsArr[0];
        //     this.setSelected(this.selectedTab);
        // }
    }

    addTab(name, cb) {

        const tab = document.createElement('div');
        tab.classList.add('tab');
        tab.addEventListener('click', () => {
            cb.bind(this);
            this.setSelected(tab);
        });
        this._wrapper.appendChild(tab);

        const tabContent = document.createElement('span');
        tabContent.classList.add('tab-content');
        tab.appendChild(tabContent);
        tabContent.innerHTML = name;

        this.tabsArr.push(tab);

        if (this.selectedTab === undefined) {
            this.selectedTab = this.tabsArr[0];
            this.setSelected(this.selectedTab);
        }
    }

    setSelected(tab) {
        let selectedTab = tab;
        for (let i = 0; i < this._wrapper.children.length; i++) {
            this.tabsArr[i].classList.remove('selected');
        }
        selectedTab.classList.add('selected');

    }
}

customElements.define('smdui-tabs', Tabs);