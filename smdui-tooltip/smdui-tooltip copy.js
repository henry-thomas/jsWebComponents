class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipVisible = false;
        this.attachShadow({ mode: 'open' });
        this.init();

        this.stylesheetPath = '';
    }

    init() {
        this._tooltipTarget = document.createElement('slot');
        this.shadowRoot.appendChild(this._tooltipTarget);
        this._tooltipTarget.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipTarget.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.tooltipContainer = document.createElement('div');
        this.shadowRoot.appendChild(this.tooltipContainer);
    }

    set text(text) {
        if (text) {
            console.log(text);
            this.setAttribute('text', text);
        } else if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text') || '';
        } else {
            this._tooltipText = '';
        }
    }

    get text() {
        return this.getAttribute('text');
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath + '/smdui-tooltip/smdui-tooltip.css');
        this.shadowRoot.appendChild(linkElem);

        this._render();
    };

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback() {
        this._tooltipTarget.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipTarget.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        this.tooltipContainer.textContent = this._tooltipText || "";
        if (this._tooltipVisible) {
            this.tooltipContainer.classList.add('open');

        } else {
            if (this.tooltipContainer)
                this.tooltipContainer.classList.remove('open');
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }
    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}
customElements.define('smdui-tooltip-new', Tooltip);