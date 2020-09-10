import '/smdui-button/smdui-button.js';
import '/smdui-card/smdui-card.js';
import '/smdui-data-panel/smdui-data-panel.js';
import '/smdui-modal/smdui-modal.js';
import '/smdui-name-value/smdui-name-value.js';
import '/smdui-nav-bar/smdui-nav-bar.js';
import '/smdui-tabs/smdui-tabs.js';
import '/smdui-tooltip/smdui-tooltip.js';

(function(root) {
    let Component = function(component, parentEl) {
        return new Component.init(component, parentEl);
    }

    Component.init = function(component = null, parentEl = null) {
        this.component = component;
        this.parentEl = parentEl;

        return Component.prototype.render(component, parentEl);
    };

    Component.init.prototype = Component.prototype;

    root.Component = root.smdui = Component;

    Component.prototype = {
        set component(component) {
            this.component = component;
            this.render(this.component, this.parentEl);
        },

        get component() {
            return this.component;
        },

        set parentEl(parentEl) {
            this.parentEl = parentEl;
            this.render(this.component, this.parentEl);
        },

        get parentEl() {
            return this.parentEl;
        },

        render: function(component, parentEl) {
            this.element;
            switch (component) {
                case 'button':
                    this.element = document.createElement('smdui-button');
                    break;
                case 'card':
                    this.element = document.createElement('smdui-card');
                    break;
                case 'data-panel':
                    this.element = document.createElement('smdui-data-panel');
                    break;
                case 'modal':
                    this.element = document.createElement('smdui-modal');
                    break;
                case 'name-value':
                    this.element = document.createElement('smdui-name-value');
                    break;
                case 'nav-bar':
                    this.element = document.createElement('smdui-nav-bar');
                    break;
                case 'tabs':
                    this.element = document.createElement('smdui-tabs');
                    break;
                case 'tooltip':
                    this.element = document.createElement('smdui-tooltip');
                    break;
                default:
                    this.element = undefined;
                    break;
            }

            if ((this.element !== (null || undefined)) && (parentEl !== (null || undefined))) {
                console.log(this.element);
                if (typeof(parentEl) === "object")
                    parentEl.appendChild(this.element);
            }
            return this.element;
        },

    }

}(window));