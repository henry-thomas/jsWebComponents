class NameValue extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
        this.stylesheetPath = 'smdui-name-value/smdui-name-value.css';
        this.tooltipJsPath = '../smdui-tooltip/smdui-tooltip.js';
    }

    init() {
        this.contentDiv = document.createElement('div');
        this.nameSpan = document.createElement('span');
        this.valueSpan = document.createElement('span');
        this.unitSpan = document.createElement('span');
        this.nameTooltip;
        this.valueTooltip;

        this.contentDiv.classList.add('content-div');
        this.shadowRoot.appendChild(this.contentDiv);

        const nameSpanContainer = document.createElement('div');
        nameSpanContainer.classList.add('left-container');

        const valueSpanContainer = document.createElement('div');
        valueSpanContainer.classList.add('right-container');

        this.contentDiv.appendChild(nameSpanContainer);
        this.contentDiv.appendChild(valueSpanContainer);

        this.nameSpan.classList.add('name-span');
        nameSpanContainer.appendChild(this.nameSpan);
        this.nameSpan.innerHTML = this.name;


        this.valueSpan.classList.add('value-span');
        valueSpanContainer.appendChild(this.valueSpan);
        this.valueSpan.innerHTML = this.value;


        this.unitSpan.classList.add('unit-span');
        this.contentDiv.appendChild(this.unitSpan);
        this.unitSpan.innerHTML = this.itemUnit;
    }

    set name(name) {
        this.setAttribute('item-name', name);
        return this;
    }

    get name() {
        return this.getAttribute('item-name');
    }

    set value(value) {
        this.setAttribute('item-value', value);
        return this;
    }

    get value() {
        return this.getAttribute('item-value');
    }

    set unit(unit) {
        this.setAttribute('item-unit', unit);
        return this;
    }

    get unit() {
        return this.getAttribute('item-unit');
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath);
        this.shadowRoot.appendChild(linkElem);

        //tooltip add script
        import (this.tooltipJsPath).catch(error => { return })

        try {
            this.nameTooltip = document.createElement('smdui-tooltip');
            this.valueTooltip = document.createElement('smdui-tooltip');
        } catch {
            return
        }

        return this;
    }

    static get observedAttributes() {
        return ['item-name', 'item-value', 'item-unit'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'item-name' && this.nameSpan) {
            this.nameSpan.innerHTML = newVal;
        }
        if (name === 'item-value' && this.valueSpan) {
            this.valueSpan.innerHTML = newVal;
        }
        if (name === 'item-unit' && this.unitSpan) {
            this.unitSpan.innerHTML = newVal;
        }
    }

    setNameTooltip(text) {
        if (text === (null || undefined)) {
            this.nameTooltip.setAttribute('text', '')
        }
        this.nameTooltip.setAttribute('text', text);
        this.nameSpan.parentNode.replaceChild(this.nameTooltip, this.nameSpan);
        this.nameTooltip.appendChild(this.nameSpan);
    }

    setValueTooltip(text) {
        if (text === null || undefined) {
            this.valueTooltip.setAttribute('text', '')
        }
        this.valueTooltip.setAttribute('text', text);
        this.valueSpan.parentNode.replaceChild(this.valueTooltip, this.valueSpan);
        this.valueTooltip.appendChild(this.valueSpan);
    }

}

customElements.define('smdui-name-value', NameValue);