class DataPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');
        this.settingsPanel = document.createElement('div');
        this.settingsPanel.classList.add('settingsPanel')
        this.contentPanel = document.createElement('div');
        this.contentPanel.classList.add('contentPanel');
        this.panelArr = [];
        this.selectedPanel = '';
        this.orientation = '';

        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-data-panel/smdui-data-panel.css');
        this.shadowRoot.appendChild(linkElem);
    }

    connectedCallback() {
        this.wrapper.appendChild(this.settingsPanel);
        this.wrapper.appendChild(this.contentPanel);
        this.shadowRoot.appendChild(this.wrapper);
        this._onToggleOrientation();
    }

    addItem(item) {
        item.classList.add('panel-item');
        this.panelArr.push(item);
        this.contentPanel.appendChild(item);
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

        } catch (error) {
            console.warn(error);
        }
    }

    addSetting(element, cb) {
        element.classList.add('setting');
        this.settingsPanel.appendChild(element);

        if (cb && (typeof cb === "function")) {
            element.addEventListener('click', () => { cb() });
        }
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
        }
    }

    _onToggleOrientation() {
        if (!this.hasAttribute('orientation')) {
            this.setAttribute('orientation', this.orientation);
        }

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