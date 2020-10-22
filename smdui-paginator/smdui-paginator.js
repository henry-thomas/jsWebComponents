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

        if (!this.hasAttribute('current-page')) {
            this.setAttribute('current-page', 1);
        }
        if (!this.hasAttribute('page-size')) {
            this.setAttribute('page-size', 10);
        }
        if (!this.hasAttribute('max-pages')) {
            this.setAttribute('max-pages', 5);
        }
        this.paginate();
    }

    set pageSize(pageSize) {
        if (typeof(pageSize) === 'number') {
            this.setAttribute('page-size', pageSize);
        }
    }

    get pageSize() {
        if (this.hasAttribute('page-size')) {
            return Number(this.getAttribute('page-size'));
        }
    }

    set currentPage(currentPage) {
        if (typeof(currentPage) === 'number') {
            this.setAttribute('current-page', currentPage)
        }
    }

    get currentPage() {
        if (this.hasAttribute('current-page')) {
            return Number(this.getAttribute('current-page'));
        }
    }

    set maxPages(maxPages) {
        if (typeof(maxPages === 'number')) {
            if (maxPages < 3) {
                maxPages = 4;
            }
            this.setAttribute('max-pages', maxPages);
        }
    }

    get maxPages() {
        if (this.hasAttribute('max-pages')) {
            return Number(this.getAttribute('max-pages'));
        }
    }

    set totalPages(totalPages) {
        this.setAttribute('total-pages', totalPages);
    }

    get totalPages() {
        Number(this.getAttribute('total-pages'));
    }

    addPages(data) {
        this.pagesDiv.innerHTML = '';
        // this.pagesArr = [];
        this.visiblePagesArr = [];
        if (data.pages) {
            this.lastItem = data.pages;
            // for (let i = 1; i <= data.pages; i++) {
            //     this.addPageButton(i, this.lastItem);
            // }
            this.totalPages = data.pages;
            // this.paginate();
        }
    }

    navToStart() {
        this.currentPage = 1;
        this.paginate();
    }

    navPrev() {
        if (this.currentPage > 1) {
            this.currentPage = Number(this.currentPage) - 1;
            this.paginate();
        }
    }

    navNext() {
        if (this.currentPage < this.lastItem) {
            this.currentPage = Number(this.currentPage) + 1;
            this.paginate();
        }
    }

    navToEnd() {
        this.currentPage = this.lastItem;
        this.paginate();
    }

    addPageButton(text, lastItem) {
        let pageButton = document.createElement('div');
        pageButton.classList.add('smdui-paginator-page-button');
        pageButton.innerHTML = text;
        this.pagesDiv.appendChild(pageButton);
        pageButton.addEventListener('click', () => {
            this.currentPage = Number(text);
            this.paginate()
            console.log({ page: this.currentPage, size: this.pageSize })
        });
        this.pagesArr.push(pageButton);
        return pageButton;
    };

    handleSelectedItemChange() {
        if (Number(this.currentPage) === 1) {
            this.prevPage.classList.add('paginator-nav-disabled');
            this.firstPageNav.classList.add('paginator-nav-disabled');
        } else {
            this.prevPage.classList.remove('paginator-nav-disabled');
            this.firstPageNav.classList.remove('paginator-nav-disabled');
        }

        if (Number(this.currentPage) === this.lastItem) {
            this.nextPage.classList.add('paginator-nav-disabled');
            this.lastPageNav.classList.add('paginator-nav-disabled');
        } else {
            this.nextPage.classList.remove('paginator-nav-disabled');
            this.lastPageNav.classList.remove('paginator-nav-disabled');
        }
    }

    paginate() {

        let totalPages = Number(this.getAttribute('total-pages'));
        let currentPage = this.currentPage;
        let pageSize = this.pageSize;
        let maxPages = this.maxPages;
        let totalItems = (totalPages * pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage, endPage;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        this.currentPage = currentPage;
        this.startPage = startPage;
        this.endPage = endPage;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.pages = pages;

        this.pagesArr = [];
        this.pagesDiv.innerHTML = '';
        for (let i = startPage; i <= endPage; i++) {
            let pageButton = this.addPageButton(i);
            if (this.currentPage === i) {
                pageButton.classList.add('smdui-paginator-selected-item');
            } else {
                pageButton.classList.remove('smdui-paginator-selected-item');
            }
        }
        this.handleSelectedItemChange();

        //  object with all pager properties required by the view
        this.data = {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };

        console.log(this.data);
    }

    static get observedAttributes() {
        return ['current-page', 'page-size', 'max-pages', 'total-pages'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'max-pages') {
            if (this.getAttribute('max-pages') < 3) {
                this.maxPages = 3;
            }
            if (oldVal) {
                this.paginate();
            }
        };
    }


}
customElements.define('smdui-paginator', Paginator);