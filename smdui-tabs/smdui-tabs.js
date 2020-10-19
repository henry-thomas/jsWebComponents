class Tabs extends HTMLElement {
    constructor() {
        super();
        this._wrapper;
        this.tabsArr = [];
        this.pagesArr = [];
        this.collection = [];
        // this.attachShadow({ mode: 'open' });
        this.init();
    }

    init() {
        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('sui-tabs-wrapper');
        this.tabArea = document.createElement('div');
        this.tabArea.classList.add('sui-tabs-tab-area');
        this._wrapper.appendChild(this.tabArea);
        this.pageArea = document.createElement('div');
        this.pageArea.classList.add('sui-tabs-tab-page');
        this._wrapper.appendChild(this.pageArea);
    }

    connectedCallback() {
        this.appendChild(this._wrapper);
    }

    addTab(name, page, cb) {

        const tab = document.createElement('div');
        tab.classList.add('sui-tabs-tab');
        tab.addEventListener('click', () => {
            if (typeof(cb) === 'function') {
                cb();
            }
            this.selectedTab = tab;
            this.selectedPage = page;
        });
        this.tabArea.appendChild(tab);

        if (typeof(page) === 'object') {
            this.pageArea.appendChild(page);
            page.classList.add('sui-tabs-page');
        }

        const tabContent = document.createElement('span');
        tabContent.classList.add('sui-tabs-tab-content');
        tab.appendChild(tabContent);
        tabContent.innerHTML = name;

        this.tabsArr.push(tab);
        this.pagesArr.push(page);
        this.collection.push({ tab: tab, page: page });


        if (this.selectedTab === undefined) {
            this.selectedTab = this.tabsArr[0];
            if (typeof(page) === 'object') {
                this.selectedPage = this.pagesArr[0];
            }
        }
        return { tab: tab, page: page };
    }

    removeTab(tabCollection) {
        for (let tabCol in this.collection) {
            if (tabCollection.page === this.collection[tabCol].page) {
                this.collection[tabCol].page.remove();
                this.collection[tabCol].tab.remove();
            }
        }
    }

    set selectedTab(tab) {
        let selectedTab = tab;
        for (let i = 0; i < this.tabsArr.length; i++) {
            this.tabsArr[i].classList.remove('sui-tabs-selected');
        }
        selectedTab.classList.add('sui-tabs-selected');
    }

    set selectedPage(page) {
        for (let i = 0; i < this.pagesArr.length; i++) {
            this.pagesArr[i].classList.remove('sui-tabs-pageVisible');
            this.pagesArr[i].classList.add('sui-tabs-pageHidden');
        }
        page.classList.add('sui-tabs-visible');
        page.classList.remove('sui-tabs-hidden');
    }

    get selectedCollection() {
        for (let i = 0; i < this.tabsArr.length; i++) {
            if (this.tabsArr[i].classList.contains('.sui-tabs-selected')) {
                return this.collection[i];
            }
        }
    }
}

customElements.define('smdui-tabs', Tabs);