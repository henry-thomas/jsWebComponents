class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipTarget;
        this._tooltipVisible = false;
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <slot>Tooltip Default Slot</slot>
        `
    };
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text') || "";
        }

        this._tooltipTarget = this.shadowRoot.querySelector('slot');
        this._tooltipTarget.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipTarget.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.textContent = this._tooltipText || "";
        this.shadowRoot.appendChild(this.tooltipContainer);

        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-tooltip/smdui-tooltip.css');
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
        console.log('disconnected');
        this._tooltipTarget.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipTarget.removeEventListener('mouseleave', this._hideTooltip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            //            tooltipContainer = document.createElement('div');
            //            tooltipContainer.textContent = this._tooltipText || "No tooltip text";
            this.tooltipContainer.classList.add('open');

        } else {
            if (tooltipContainer)
                tooltipContainer.classList.remove('open');
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
customElements.define('smdui-tooltip', Tooltip);