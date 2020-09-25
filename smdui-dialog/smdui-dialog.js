class Dialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
        this.stylesheetPath = '';
        this.faStylesheetPath = '../fontawesome/css/all.min.css';
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
        this.closeButton.addEventListener('touchstart', this.close.bind(this));

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
        console.log('Close');
        this.wrapper.style = '';
        this.remove();
    }

    setContent(el) {
        try {
            console.log(el);
            if (this.contentDiv.lastChild) {
                this.contentDiv.removeChild(this.contentDiv.lastChild);
            }
            this.contentDiv.appendChild(el);
        } catch (err) {
            console.log(err + '- Dialog content should be an element with one parent, but can have nested elements')
        }
    }

    dragElement(el) {
        let dragItem = this.headerDiv;
        let container = el;

        dragItem.onmousedown = dragStart;
        dragItem.addEventListener('touchstart', dragStart, false);
        dragItem.addEventListener('touchend', dragEnd, false);
        dragItem.addEventListener('touchmove', drag, false);

        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;
        let active = false;

        function dragStart(e) {
            //            e = e || window.event;
            //            e.preventDefault();
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === dragItem) {
                active = true;
            }
            document.onmouseup = dragEnd;
            document.onmousemove = drag;
            //            document.touchend = closeDragElement;
            //            document.touchmove = elementDrag;
        }

        function drag(e) {
            //            e = e || window.event;
            if (active) {

                e.preventDefault();
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                    //                initialX = e.clientX;
                    //                initialY = e.clientY;
                }

                xOffset = currentX;
                yOffset = currentY;
                //            el.style.top = (el.offsetTop - pos2) + 'px';
                //            el.style.left = (el.offsetLeft - pos1) + 'px';
                setTranslate((currentX), (currentY));
            }

            function setTranslate(xPos, yPos) {
                el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
                //                el.style.top = (yPos) + 'px';
                //                el.style.left = (xPos) + 'px';
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            active = false;
            document.onmouseup = null;
            document.onmousemove = null;
            //            document.touchend = null;
            //            document.touchmove = null;
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

    disconnectedCallback() {
        this.wrapper.style.transfrom = '';
    }
}

customElements.define('smdui-dialog', Dialog);