class DataPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
        this.styleSheetPath = '';
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');
        this.settingsPanel = document.createElement('div');
        this.settingsPanel.classList.add('settingsPanel')
        this.contentPanel = document.createElement('div');
        this.contentPanel.classList.add('contentPanel');
        this.wrapper.appendChild(this.settingsPanel);
        this.wrapper.appendChild(this.contentPanel);
        this.shadowRoot.appendChild(this.wrapper);
        this.panelArr = [];
    }

    get orientation() {
        if (this.hasAttribute('orientation')) {
            return this.getAttribute('orientation');
        } else {
            this.setAttribute('orientation', 'vertical');
            return 'vertical';
        }
    }

    set orientation(orient) {
        if (this.hasAttribute('orientation')) {
            this.setAttribute('orientation', orient);
        } else {
            this.setAttribute('orientation', 'vertical');
        }
    }

    set selectedPanel(panel) {
        if (this.panelArr.length !== 0) {
            for (let i = 0; i < this.panelArr.length; i++) {
                if (this.panelArr[i] !== panel) {
                    this.panelArr[i].classList.remove('selected');
                } else {
                    this.panelArr[i].classList.add('selected');
                }
            }
        }
    }

    get selectedPanel() {
        if (this.panelArr.length !== 0) {
            for (let i = 0; i < this.panelArr.length; i++) {
                if (this.panelArr[i].classList.contains('selected')) {
                    return this.panelArr[i];
                }

            }
        }
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.styleSheetPath + '/smdui-data-panel/smdui-data-panel.css');
        this.shadowRoot.appendChild(linkElem);
        this._onToggleOrientation();
        this.selectedPanel = this.panelArr[0];
    }

    addItem(item) {
        item.classList.add('panel-item');
        if (item.classList.contains('selected')) {
            this.selectedPanel = item;
        }
        this.panelArr.push(item);
        this.contentPanel.appendChild(item);
        item.addEventListener('click', () => { this.selectedPanel = item; });
        return this;
    }

    removeItems(index, removeAll) {
        try {
            if (removeAll === true) {
                for (let i = index; i < this.panelArr.length; i++) {
                    this.contentPanel.removeChild(this.panelArr[i]);
                }
                this.panelArr.splice(0, this.panelArr.length);
            } else {
                this.contentPanel.removeChild(this.panelArr[index]);
                this.panelArr.splice(index, 1);
            }

        } catch (e) {
            console.warn(e);
        }
        return this;
    }

    addSetting(element, cb) {
        element.classList.add('setting');
        this.settingsPanel.appendChild(element);

        if (cb && (typeof cb === "function")) {
            element.addEventListener('click', () => { cb() });
        }

        return this;
    }

    _onToggleOrientation() {

        if (this.orientation === 'vertical') {
            this.contentPanel.classList.remove('horizontal');
            this.contentPanel.classList.add('vertical');
        } else if (this.orientation === 'horizontal') {
            this.contentPanel.classList.remove('vertical');
            this.contentPanel.classList.add('horizontal');
        }
    }

    toggleOrientation() {
        if (this.orientation === 'vertical') {
            this.orientation = 'horizontal';
        } else if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
        return this;
    }

    static get observedAttributes() {
        return ['orientation'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'orientation') {
            this._onToggleOrientation();
        }
    }
}
customElements.define('smdui-data-panel', DataPanel);