class NameValue extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.itemName = '';
        this.itemValue = '';
        this.itemUnit = '';
        this.contentDiv = document.createElement('div');
        this.nameSpan = document.createElement('span');
        this.valueSpan = document.createElement('span');
        this.unitSpan = document.createElement('span');
        this.nameTooltip;
        this.valueTooltip;
    }

    connectedCallback() {
        if (this.hasAttribute('item-name')) {
            this.itemName = this.getAttribute('item-name');
        }
        if (this.hasAttribute('item-value')) {
            this.itemValue = this.getAttribute('item-value');
        }
        if (this.hasAttribute('item-unit')) {
            this.itemUnit = this.getAttribute('item-unit');
        }
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'smdui-name-value/smdui-name-value.css');
        this.shadowRoot.appendChild(linkElem);


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
        this.nameSpan.innerHTML = this.itemName;


        this.valueSpan.classList.add('value-span');
        valueSpanContainer.appendChild(this.valueSpan);
        this.valueSpan.innerHTML = this.itemValue;


        this.unitSpan.classList.add('unit-span');
        this.contentDiv.appendChild(this.unitSpan);
        this.unitSpan.innerHTML = this.itemUnit;
        //tooltip add script
        try {
            if ((this.parentNode.querySelectorAll('smdui-name-value').length <= 1)) {
                if (!document.querySelector('script[src="./smdui-tooltip/smdui-tooltip.js"]')) {
                    const tooltipElSrc = document.createElement('script');
                    tooltipElSrc.setAttribute('src', './smdui-tooltip/smdui-tooltip.js');
                    this.shadowRoot.appendChild(tooltipElSrc);
                } else { return }
            };
        } catch (error) {
            console.warn(error);
        }
        this.nameTooltip = document.createElement('smdui-tooltip');
        this.valueTooltip = document.createElement('smdui-tooltip');
    }

    static get observedAttributes() {
        return ['item-name', 'item-value', 'item-unit'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'item-name' && this.nameSpan) {
            this.itemName = newVal;
            this.nameSpan.innerHTML = this.itemName;
        }
        if (name === 'item-value' && this.valueSpan) {
            this.itemValue = newVal;
            this.valueSpan.innerHTML = this.itemValue;
        }
        if (name === 'item-unit' && this.unitSpan) {
            this.itemUnit = newVal;
            this.unitSpan.innerHTML = this.itemUnit;
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

    setName(name) {
        this.setAttribute('item-name', name);
        return this;
    }

    setValue(value) {
        this.setAttribute('item-value', value);
        return this;
    }

    setUnit(unit) {
        this.setAttribute('item-unit', unit);
        return this;
    }
}

customElements.define('smdui-name-value', NameValue);