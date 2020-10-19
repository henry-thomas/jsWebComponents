// import '/smdui-button/smdui-button.js';
// import '/smdui-card/smdui-card.js';
// import '/smdui-data-panel/smdui-data-panel.js';
// import '/smdui-modal/smdui-modal.js';
// import '/smdui-name-value/smdui-name-value.js';
// import '/smdui-nav-bar/smdui-nav-bar.js';
// import '/smdui-tabs/smdui-tabs.js';
// import '/smdui-tooltip/smdui-tooltip.js';
// import '/smdui-dialog/smdui-dialog.js';
// import '/smdui-dropdown/smdui-dropdown.js';
// import '/smdui-paginator/smdui-paginator.js';
// import '/smdui-button/smdui-button-1.0.1.js';

(function(root) {
    let Component = function() {
        return new Component.init();
    };

    Component.init = function() {
        this.elements = {};
    };

    Component.prototype.addFunctions = function(element) {
        element.hide = function() {
            element.style = 'display: none;';
        };

        element.show = function() {
            element.style = 'display: block;';
        };
    };

    Component.prototype.addElement = function(name, element) {
        if (!this.elements[name]) {
            this.elements[name] = {};
        }
        let count = 0;
        for (let i in this.elements[name]) {
            count++;
        }
        this.elements[name][count] = element;
    };

    Component.prototype.button = function(cfg) {
        let button = document.createElement('smdui-button');
        if (cfg) {
            if (cfg.text) {
                button.text = cfg.text;
            }
            if (cfg.type) {
                button.type = cfg.type;
            }
        }

        this.addElement('button', button);
        return button;
    };

    Component.prototype.tooltip = function(cfg) {
        let tooltip = document.createElement('smdui-tooltip');
        if (cfg) {
            if (cfg.text) {
                tooltip.text = cfg.text;
            }
        }
        this.addElement('tooltip', tooltip);
        return tooltip;
    };

    Component.prototype.dialog = function(cfg) {
        let dialog = document.createElement('smdui-dialog');
        if (cfg) {
            if (cfg.text) {
                dialog.heading = cfg.text;
            }
            if (cfg.content) {
                dialog.content = cfg.content;
            }
        }
        this.addElement('dialog', dialog);
        return dialog;
    };

    Component.prototype.dropdown = function(cfg) {
        let dropdown = document.createElement('smdui-dropdown');
        if (cfg) {
            if (cfg.text) {
                dropdown.text = cfg.text;
            }
            if (cfg.content) {
                dropdown.items = cfg.content;
            }
            if (cfg.type) {
                dropdown.type = cfg.type;
            }
        }
        this.addElement('dropdown', dropdown);
        return dropdown;
    };

    Component.prototype.tabs = function(cfg) {
        // cfg=[{tab: string, page: element, cb: function}]
        let tabs = document.createElement('smdui-tabs');
        if (cfg) {
            for (let i = 0; i < cfg.length; i++) {
                tabs.addTab(cfg[i].tab, cfg[i].page, cfg[i].cb);
            }
        }
        this.addElement('tabs', tabs);
        return tabs;
    };
    Component.prototype.modal = function(cfg) {
        // cfg=[{tab: string, page: element, cb: function}]
        let modal = document.createElement('smdui-modal');
        if (cfg) {
            if (cfg.heading) {
                modal.heading = cfg.heading;
            }
        }
        this.addElement('modal', modal);
        return modal;
    };

    //utils
    Component.prototype.addTooltip = function(target, text) {
        if (typeof(target) !== 'object') {
            console.warn('Must be an html element');
        } else {
            let tooltip = this.tooltip({ text: text });
            tooltip.element = target;
        }
    };

    Component.init.prototype = Component.prototype;

    root.Component = root.smdui = Component; // e.g. let a = smdui('button')
    root.sui = root.smdui(); // e.g. let b = sui.button();
    console.log('smdui-components init');

}(window));



//    Component.prototype.render = function (component, parentEl) {
//        this.element;
//        switch (component) {
//            case 'button':
//                this.element = document.createElement('smdui-button');
//                break;
//            case 'card':
//                this.element = document.createElement('smdui-card');
//                break;
//            case 'data-panel':
//                this.element = document.createElement('smdui-data-panel');
//                break;
//            case 'modal':
//                this.element = document.createElement('smdui-modal');
//                break;
//            case 'name-value':
//                this.element = document.createElement('smdui-name-value');
//                break;
//            case 'nav-bar':
//                this.element = document.createElement('smdui-nav-bar');
//                break;
//            case 'tabs':
//                this.element = document.createElement('smdui-tabs');
//                break;
//            case 'tooltip':
//                this.element = document.createElement('smdui-tooltip');
//                break;
//            case 'dialog':
//                this.element = document.createElement('smdui-dialog');
//                break;
//            case 'dropdown':
//                this.element = document.createElement('smdui-dropdown');
//                break;
//            default:
//                this.element = undefined;
//                break;
//        }
//
////        this.addElement(component, this.element);
//        if ((this.element !== (null)) && (parentEl !== (null))) {
//            if (typeof (parentEl) === "object")
//                parentEl.appendChild(this.element);
//        }
//
//        this.addFunctions(this.element);
////        this.elements[this.element] = this.element;
//        return this.element;
//    };