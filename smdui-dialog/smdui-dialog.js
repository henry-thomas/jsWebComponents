class Dialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init();
        this.stylesheetPath = '';
        this.faStylesheetPath = 'fontAwesome/css/all.min.css';
        this.maxWidth = window.matchMedia("(max-width: 640px)");
        this.onWidthChange(this.maxWidth);
        this.maxWidth.addListener(this.onWidthChange.bind(this));
        this.wrapper.onmousedown = this.handleActiveDialog.bind(this);
        this.wrapper.ontouchstart = this.handleActiveDialog.bind(this);
        window.onmousedown = function(ev) {
            if (ev.target !== this) {
                this.wrapper.classList.remove('smdui-dialog-wrapper-active');
            }
        }.bind(this);
        window.ontouchstart = function(ev) {
            if (ev.target !== this) {
                this.wrapper.classList.remove('smdui-dialog-wrapper-active');
            }
        }.bind(this);

        //        this.onHeightChange(this.maxHeight);
    }

    init() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('smdui-dialog-wrapper');
        //        this.wrapper.style.height = 'min-content';
        //        this.wrapper.style.width = '300px';
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
        this.wrapper.style.left = (innerWidth - (this.wrapper.clientWidth + innerWidth) / 2).toString() + "px";
        this.wrapper.style.top = (innerHeight - (this.wrapper.clientHeight + innerHeight) / 2).toString() + "px";
        //        this.wrapper.style.width = '';
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
        } catch (e) {
            console.log(e + '- Dialog content should be an element with one parent, but can have nested elements');
        }
    }

    onWidthChange(maxWidth) {
        if (maxWidth.matches) {
            this.wrapper.style = '';
            this.wrapper.style.width = '350px';
            this.wrapper.style.left = (innerWidth - (this.wrapper.clientWidth + innerWidth) / 2).toString() + "px";
            this.wrapper.style.top = (innerHeight - (this.wrapper.clientHeight + innerHeight) / 2).toString() + "px";
            this.dragElement(this.wrapper);
        } else {
            this.wrapper.style = '';
            this.wrapper.style.width = '450px';
            this.wrapper.style.left = (innerWidth - (this.wrapper.clientWidth + innerWidth) / 2).toString() + "px";
            this.wrapper.style.top = (innerHeight - (this.wrapper.clientHeight + innerHeight) / 2).toString() + "px";
            this.dragElement(this.wrapper);
        }
    }
    onHeightChange(maxHeight) {
        if (maxHeight.matches) {
            this.wrapper.style.height = innerHeight * 0.4 + 'px';
        } else {
            this.wrapper.style.height = 'min-content';
        }
    }

    //if there is more than one dialog on screen, increase the z-index of the clicked one.
    handleActiveDialog() {
        this.wrapper.classList.add('smdui-dialog-wrapper-active');
    }

    dragElement(el) {
        let dragItem = this.headerDiv;
        let wrapper = this.wrapper;

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
        }

        function drag(e) {
            if (active) {

                e.preventDefault();
                if (e.type === 'touchmove') {

                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }
                xOffset = currentX;
                yOffset = currentY;

                let topOffsetHeight;
                if (window.matchMedia("(max-width: 1000px)").matches) {
                    topOffsetHeight = 65;
                } else {
                    topOffsetHeight = 0;
                };
                let leftLimitBool = (innerWidth / 2 - wrapper.clientWidth / 2 > -currentX);
                let topLimitBool = (innerHeight / 2 - wrapper.clientHeight / 2 - topOffsetHeight > -currentY);
                let rightLimitBool = (-(wrapper.clientWidth / 2 - innerWidth / 2) > currentX);
                let bottomLimitBool = (-(wrapper.clientHeight / 2 - (innerHeight) / 2) + topOffsetHeight > currentY);

                if (!topLimitBool || !bottomLimitBool) {
                    if (!topLimitBool) {
                        currentY = -(innerHeight / 2 - wrapper.clientHeight / 2) + topOffsetHeight;
                    }
                    if (!bottomLimitBool) {
                        currentY = (innerHeight / 2 - wrapper.clientHeight / 2) + topOffsetHeight;
                    }
                    yOffset = currentY;
                }

                if (!leftLimitBool || !rightLimitBool) {
                    if (!leftLimitBool) {
                        currentX = -(innerWidth / 2 - wrapper.clientWidth / 2);
                    }

                    if (!rightLimitBool) {
                        currentX = (innerWidth / 2 - wrapper.clientWidth / 2);
                    }
                    xOffset = currentX;
                }
                setTranslate((currentX), (currentY));

            }

            function setTranslate(xPos, yPos) {
                el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            active = false;
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

    disconnectedCallback() {
        this.wrapper.style.transfrom = '';
    }
}

customElements.define('smdui-dialog', Dialog);