class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tabsArr = [];
        this.selectedTab;
        this.mainSection = document.createElement('div');
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-nav-bar/smdui-nav-bar.css');
        this.shadowRoot.appendChild(linkElem);

        this.mainSection.classList.add('main-section');
        this.shadowRoot.appendChild(this.mainSection);

        this.tabsSection = document.createElement('div');
        this.tabsSection.classList.add('tabs-section');
        this.mainSection.appendChild(this.tabsSection);
    }

    addTab(name, cb) {
        const newTab = document.createElement('span');
        newTab.classList.add('nav-tab');
        newTab.innerHTML = name;
        newTab.addEventListener('click', () => {
            cb();
            this.setSelected(newTab);
        });
        this.tabsSection.appendChild(newTab);
        this.tabsArr.push(newTab);

        if (this.selectedTab === undefined) {
            this.selectedTab = this.tabsArr[0];
            this.setSelected(this.selectedTab);
        }
    }

    setSelected(tab) {
        let selectedTab = tab;
        for (let i = 0; i < this.tabsSection.children.length; i++) {
            this.tabsArr[i].classList.remove('selected');
        }
        selectedTab.classList.add('selected');
    }

    addLink(name, cb) {
        const linkSection = document.createElement('div');
        linkSection.classList.add('link-section');
        this.mainSection.appendChild(linkSection);
        const link = document.createElement('a');
        link.innerHTML = name;
        link.addEventListener('click', cb);
        link.classList.add('anchor-tag');
        linkSection.appendChild(link);
    }
}

customElements.define('smdui-nav-bar', NavBar);