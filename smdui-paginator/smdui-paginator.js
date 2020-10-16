class Paginator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
        this.stylesheetPath = '';
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('smdui-paginator-wrapper');
        this.firstPageNav = document.createElement('span');
        this.firstPageNav.classList.add('smdui-paginator-arrow');
        this.firstPageNav.innerHTML = '<<';
        this.prevPage = document.createElement('div');
        this.prevPage.classList.add('smdui-paginator-arrow');
        this.prevPage.innerHTML = '<';
        this.lastPageNav = document.createElement('span');
        this.lastPageNav.classList.add('smdui-paginator-arrow');
        this.lastPageNav.classList.add('paginator-last-item');
        this.lastPageNav.innerHTML = '>>';
        this.nextPage = document.createElement('div');
        this.nextPage.classList.add('smdui-paginator-arrow');
        this.nextPage.innerHTML = '>';
        this.backNavDiv = document.createElement('div');
        this.backNavDiv.classList.add('smdui-paginator-nav');
        this.forwardNavDiv = document.createElement('div');
        this.forwardNavDiv.classList.add('smdui-paginator-nav');
        this.pagesDiv = document.createElement('div');
        this.pagesDiv.classList.add('smdui-paginator-pages');

        this.backNavDiv.appendChild(this.firstPageNav);
        this.backNavDiv.appendChild(this.prevPage);
        this.forwardNavDiv.appendChild(this.nextPage);
        this.forwardNavDiv.appendChild(this.lastPageNav);
        this.wrapper.appendChild(this.backNavDiv);
        this.wrapper.appendChild(this.pagesDiv);
        this.wrapper.appendChild(this.forwardNavDiv);
        this.shadowRoot.appendChild(this.wrapper);

        this.prevPage.addEventListener('click', this.navPrev.bind(this));
        this.nextPage.addEventListener('click', this.navNext.bind(this));
        this.firstPageNav.addEventListener('click', this.navToStart.bind(this));
        this.lastPageNav.addEventListener('click', this.navToEnd.bind(this));
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath + '/smdui-paginator/smdui-paginator.css');
        this.shadowRoot.appendChild(linkElem);

        if (!this.hasAttribute('selected-page')) {
            this.setAttribute('selected-page', 1);
        }
        if (!this.hasAttribute('page-size')) {
            this.setAttribute('page-size', 10);
        }
        if (!this.hasAttribute('visible-tabs')) {
            this.setAttribute('visible-tabs', 4);
        }
    }

    set pageSize(pageSize) {
        if (typeof(pageSize) === 'number') {
            this.setAttribute('page-size', pageSize);
        }
    }

    get pageSize() {
        if (this.hasAttribute('page-size')) {
            return this.getAttribute('page-size');
        }
    }

    set selectedPage(selectedPage) {
        if (typeof(selectedPage) === 'number') {
            this.setAttribute('selected-page', selectedPage)
        }
    }

    get selectedPage() {
        if (this.hasAttribute('selected-page')) {
            return this.getAttribute('selected-page');
        }
    }

    set visibleTabs(visibleTabs) {
        if (typeof(visibleTabs === 'number')) {
            if (visibleTabs < 3) {
                visibleTabs = 3;
            }
            this.setAttribute('visible-tabs', visibleTabs);
        }
    }

    get visibleTabs() {
        if (this.hasAttribute('visible-tabs')) {
            return this.getAttribute('visible-tabs');
        }
    }

    addPages(data) {
        this.pagesDiv.innerHTML = '';
        this.pagesArr = [];
        this.visiblePagesArr = [];
        if (data.pages) {
            this.lastItem = data.pages;
            for (let i = 1; i <= data.pages; i++) {
                this.addPageButton(i, this.lastItem);
            }
        }
        this.handleSelectedItemChange();
        this.handleVisibleTabs();
    }

    navToStart() {
        this.selectedPage = 1;
        this.handleVisibleTabs(true, false);
    }

    navPrev() {
        if (this.selectedPage > 1) {
            this.selectedPage = Number(this.selectedPage) - 1;
            this.handleVisibleTabs();
        }
    }

    navNext() {
        if (this.selectedPage < this.lastItem) {
            this.selectedPage = Number(this.selectedPage) + 1;
            this.handleVisibleTabs();
        }
    }

    navToEnd() {
        this.selectedPage = this.lastItem;
        this.handleVisibleTabs(false, true);
    }

    addPageButton(text, lastItem) {
        let pageButton = document.createElement('div');
        pageButton.classList.add('smdui-paginator-page-button');
        pageButton.innerHTML = text;
        this.pagesDiv.appendChild(pageButton);
        pageButton.addEventListener('click', () => {
            this.selectedPage = Number(text);
            this.handleVisibleTabs()
                // console.log({ page: this.selectedPage, size: this.pageSize })
        });
        this.pagesArr.push(pageButton);
    };

    handleSelectedItemChange() {
        for (let i = 1; i <= this.pagesArr.length; i++) {
            if (Number(this.selectedPage) === i) {
                this.pagesArr[i - 1].classList.add('smdui-paginator-selected-item');
            } else {
                this.pagesArr[i - 1].classList.remove('smdui-paginator-selected-item');
            }
        }
        if (Number(this.selectedPage) === 1) {
            this.prevPage.classList.add('paginator-nav-disabled');
            this.firstPageNav.classList.add('paginator-nav-disabled');
        } else {
            this.prevPage.classList.remove('paginator-nav-disabled');
            this.firstPageNav.classList.remove('paginator-nav-disabled');
        }

        if (Number(this.selectedPage) === this.lastItem) {
            this.nextPage.classList.add('paginator-nav-disabled');
            this.lastPageNav.classList.add('paginator-nav-disabled');
        } else {
            this.nextPage.classList.remove('paginator-nav-disabled');
            this.lastPageNav.classList.remove('paginator-nav-disabled');
        }
    }

    handleVisibleTabs(navToStart, navToEnd) {
        if (Number(this.selectedPage) === this.lastItem && !navToEnd) {
            navToEnd = true;
            // return;
        }
        // console.log(this.lastItem - (this.lastItem - this.visibleTabs))
        if (Number(this.selectedPage) > (this.lastItem - this.visibleTabs) && !navToEnd) {
            navToEnd = true;
            // return;
        }
        if (this.visibleTabs > 1) {
            let start = (this.selectedPage) - 1;
            let end = (this.lastItem) - 1;
            if (this.pagesArr.length <= this.visibleTabs) {
                this.visibleTabs = this.pagesArr.length - 1;
            }
            if (navToEnd) {
                this.visiblePagesArr = [];
                for (let i = end - Number(this.visibleTabs) + 1; i <= end; i++) {
                    this.visiblePagesArr.push(this.pagesArr[i])
                }
                if (!this.pagesArr[start - 1]) {
                    if (this.pagesArr[start + Number(this.visibleTabs)]) {
                        this.visiblePagesArr.push(this.pagesArr[start + Number(this.visibleTabs)])
                    }
                }
                if (!this.pagesArr[end + 1]) {
                    if (this.pagesArr[start + Number(this.visibleTabs)]) {
                        this.visiblePagesArr.push(this.pagesArr[start + Number(this.visibleTabs)])
                    }
                }
                this.pagesDiv.innerHTML = '';
                for (let i = 0; i < this.visibleTabs; i++) {
                    this.pagesDiv.appendChild(this.visiblePagesArr[i]);
                }
            } else if (end !== undefined && start !== undefined && this.pagesArr !== undefined) {
                if (((end) - (start)) - this.visibleTabs > -this.visibleTabs) {
                    this.visiblePagesArr = [];
                    for (let i = start - 1; i <= start + Number(this.visibleTabs) - 1; i++) {
                        if (this.pagesArr[i]) {
                            this.visiblePagesArr.push(this.pagesArr[i])
                        }
                    }
                    for (let i = start - 1; i < start + Number(this.visibleTabs) - 1; i++) {
                        if (i === start - 1 && !this.pagesArr[i]) {
                            if (this.pagesArr[start + Number(this.visibleTabs)]) {
                                this.visiblePagesArr.push(this.pagesArr[start + Number(this.visibleTabs) - 1])
                            }
                        }
                        if (i === end + 1 && !this.pagesArr[i]) {
                            if (this.pagesArr[end - Number(this.visibleTabs)]) {
                                this.visiblePagesArr.unshift(this.pagesArr[end - Number(this.visibleTabs) + 1])
                            }
                        }
                    }
                    this.pagesDiv.innerHTML = '';
                    for (let i = 0; i < this.visibleTabs; i++) {
                        if (this.visiblePagesArr[i]) {
                            this.pagesDiv.appendChild(this.visiblePagesArr[i]);
                        }
                    }
                }
            }
        }
    }

    static get observedAttributes() {
        return ['selected-page', 'page-size', 'visible-tabs'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'page-size') {
            // console.log(this.pageSize);
        };
        if (name === 'selected-page') {
            if (this.pagesArr) {
                this.handleSelectedItemChange();
                this.previousPageVal = oldVal;
                if (!(this.selectedPage + 1 > this.lastItem)) {
                    this.nextPageVal = this.selectedPage + 1;
                }
            }
        };
        if (name === 'visible-tabs') {
            if (this.getAttribute('visible-tabs') < 3) {
                this.visibleTabs = 3;
            }
            if (oldVal) {
                this.handleVisibleTabs();
            }
        };
    }


}
customElements.define('smdui-paginator', Paginator);