class Dialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
        this.stylesheetPath = '';
        this.faStylesheetPath = '../fontAwesome/css/all.min.css';
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('smdui-dialog-wrapper');
        this.headerDiv = document.createElement('div');
        this.headerDiv.classList.add('smdui-dialog-header');
        this.contentDiv = document.createElement('div');
        this.contentDiv.classList.add('smdui-dialog-content');
        this.closeButton = document.createElement('span');
        this.closeButton.classList.add('far');
        this.closeButton.classList.add('fa-window-close');
        this.closeButton.classList.add('smdui-dialog-close-button');
        this.closeButton.addEventListener('click', this.close.bind(this));

        this.headerDiv.appendChild(this.closeButton);
        this.wrapper.appendChild(this.headerDiv);
        this.wrapper.appendChild(this.contentDiv);
        this.shadowRoot.appendChild(this.wrapper);
    }

    connectedCallback() {
        const linkElem = document.createElement('link'); //link for external stylesheet
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', this.stylesheetPath + '/smdui-dialog/smdui-dialog.css');
        this.shadowRoot.appendChild(linkElem);
        const faStylesheetLink = document.createElement('link'); //link for external stylesheet
        faStylesheetLink.setAttribute('rel', 'stylesheet');
        faStylesheetLink.setAttribute('href', this.faStylesheetPath);
        this.shadowRoot.appendChild(faStylesheetLink);
        this.dragElement(this.wrapper);
    }

    set heading(text) {
        this.setAttribute('heading', text);
    }

    get heading() {
        return this.getAttribute('heading');
    }

    set content(content) {
        this.setContent(content);
    }

    get content() {
        return this.contentDiv.firstChild;
    }

    open() {
        this.wrapper.classList.add('open');
    }

    close() {
        this.wrapper.classList.remove('open');
    }

    setContent(el) {
        try {
            if (this.contentDiv.lastChild) {
                this.contentDiv.removeChild(this.mainSection.lastChild);
            }
            this.contentDiv.appendChild(el);
        } catch (err) {
            console.log(err + '- Dialog content should be an element with one parent, but can have nested elements')
        }
    }

    dragElement(el) {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
        el.style.top = (el.offsetTop - pos2) + 'px';
        el.style.left = (el.offsetLeft - pos1) + 'px';
        if (this.headerDiv) {
            this.headerDiv.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + 'px';
            el.style.left = (el.offsetLeft - pos1) + 'px';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }






    static get observedAttributes() {
        return ['heading'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'heading') {
            if (!this.headingSpan) {
                this.headingSpan = document.createElement('span');
                this.headingSpan.classList.add('smdui-dialog-heading');
                this.headerDiv.prepend(this.headingSpan);
            }
            this.headingSpan.innerHTML = this.heading;
        }
    }
}

customElements.define('smdui-dialog', Dialog);