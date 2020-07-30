class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipTarget;
        this._tooltipVisible = false;
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
            div {
                width: max-content;
                max-width: 100px;
                font-weight: lighter;
                background-color: #fff;
                color: black;
                position: absolute;
                top: 0.25rem;
                z-index: -1;
                padding: 0.15rem;
                border-radius: 3px;
                box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26);
                opacity: 0;
                transform: translateY(-2rem);
                transition: all 200ms ease-in;
            }

            .open {
                z-index: 10;
                opacity: 0.8;
                transform: translateY(-3rem);
            }

            :host {
                position: relative;
                font-weight: bold;
                display: flex;
                justify-content: center;
            }

            :host-context(p) {
                font-weight: bold;
                border-bottom: 1px solid #ccc;
            }

            .icon {
                background: black;
                color: white;
                padding: 0.15rem 0.5rem;
                text-align: center;
                border-radius: 50%;
            }
        
            slot{
                display: flex;
                justify-content: center;
            }

            

        </style>
        
        <slot>Tooltip Default Slot</slot>
        `
    };
    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text') || "No tooltip text defined. Set 'text' attribute.";
        }

        this._tooltipTarget = this.shadowRoot.querySelector('slot');
        this._tooltipTarget.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipTarget.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.tooltipContainer = document.createElement('div');
        this.tooltipContainer.textContent = this._tooltipText || "No tooltip text";
        this.shadowRoot.appendChild(this.tooltipContainer);

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