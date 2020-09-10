//*This demo shows how to use the components, basic use cases.
//*Each element's script should be added to the head document separately,
//*and the defer attribute should be added for optimal loading. Especially
//*if the components have to be created on page load like here (demo.init()). Otherwise 
//*the elements try to append to elements that have not yet been initialised.

(function(root) {

    const demo = {
        init: function() {
            this.body = document.querySelector('.wrapper');
            this.contentDiv = document.querySelector('.content-div');

            this.render();
        },

        render: function() {
            this.createNavBar();
            this.createTabs();
            this.createCard();
            this.createButton();
            this.createModal();
            this.createDataPanel()
        },

        createNavBar: function() {
            let navBar = document.createElement('smdui-nav-bar');

            navBar.addTab('Test1', () => console.log('nav bar1 clicked'));
            navBar.addTab('Test2', () => console.log('nav bar2 clicked'));
            navBar.addTab('Test3', () => console.log('nav bar3 clicked'));
            navBar.addLink('Logout', () => console.log('Logged Out'));
            navBar.setLinkInfo('Logged in as Henry');
            this.body.prepend(navBar);
        },

        createCard: function() {
            let card = document.createElement('smdui-card');
            card.heading = "SMDUI-Card";
            this.contentDiv.appendChild(card);

            for (let i = 0; i < this.dataArr.length; i++) {
                let item = document.createElement('smdui-name-value');
                item.name = (this.dataArr[i].name);
                item.value = (this.dataArr[i].value);
                if (this.dataArr[i].valueClassName) {
                    item.valueSpan.classList.add(this.dataArr[i].valueClassName);
                }

                item.unit = (this.dataArr[i].unit);
                card.addContent(item);
                item.setNameTooltip(this.dataArr[i].name);
                item.setValueTooltip(this.dataArr[i].value);
            }
        },

        createButton: function() {
            let btn = document.createElement('smdui-button');
            btn.text = ('Open Modal');
            btn.addEventListener('click', () => {
                this.modal.open();
            })
            this.contentDiv.appendChild(btn);
        },

        createModal: function() {
            let modal = document.createElement('smdui-modal');
            this.body.appendChild(modal);
            let modalContent = document.createElement('span');
            modalContent.innerHTML = "This is the modal content"
            modal.setContent(modalContent);
            modal.addButton('Okay', () => {
                console.log('Modal Button Clicked');
                modal.hide();
            }).type = 'secondary';
            this.modal = modal;
            modal.heading = 'SMDUI-Modal';
        },

        createDataPanel: function() {
            let dataPanel = document.createElement('smdui-data-panel');
            this.contentDiv.appendChild(dataPanel);
            for (let i = 0; i < 4; i++) {
                let contentWrapper = document.createElement('div');
                let headingSpan = document.createElement('span');
                headingSpan.innerHTML = 'PANITEM' + i;
                contentWrapper.appendChild(headingSpan);

                dataPanel.addItem(contentWrapper);
            }


            let faStylesheet = document.createElement('link');
            faStylesheet.setAttribute('rel', 'stylesheet');
            faStylesheet.setAttribute('href', '../fontAwesome/css/all.min.css');
            dataPanel.shadowRoot.prepend(faStylesheet);
            let orientSets = document.createElement('span');
            // orientSet.textContent = 'Orient';
            let orientSet = document.createElement('i');
            orientSet.classList.add('fas');
            orientSet.classList.add('fa-sync-alt');
            orientSets.appendChild(orientSet);
            dataPanel.addSetting(orientSets, function() { dataPanel.toggleOrientation() });
        },

        createTabs: function() {
            let tabs;
            tabs = document.createElement('smdui-tabs');
            for (let i = 0; i < 15; i++) {
                tabs.addTab("Tabs Number " + i, function() {
                    console.log(i)
                });
                // console.log(tabs.tabsArr);
            }
            // tabs.setSelected(tabs.tabsArr[1]);
            this.body.prepend(tabs);
        },

        dataArr: [{
            name: 'Software Ver:',
            value: '',
            valueClassName: "param-swVer",
            unit: ""
        }, {
            name: 'LoggerV Rev:',
            value: '',
            valueClassName: "param-hwVer",
            unit: ""
        }, {
            name: 'Hardware:',
            value: '',
            valueClassName: "param-hardware",
            unit: ""
        }, {
            name: 'Hardware Serial:',
            value: '',
            valueClassName: "param-hardwareSer",
            unit: ""
        }, {
            name: 'Hardware Ver:',
            value: '',
            valueClassName: "param-hardwareRev",
            unit: ""
        }, {
            name: 'Hardware Model:',
            value: 'N/A',
            valueClassName: "param-hardwareModel",
            unit: ""
        }, {
            name: 'Max CPU Freq:',
            value: 'N/A',
            valueClassName: "param-maxCpuFrequency",
            unit: ""
        }, {
            name: 'Min CPU Freq:',
            value: 'N/A',
            valueClassName: "param-minCpuFrequency",
            unit: "MHz"
        }, {
            name: 'Memory Total:',
            value: 'N/A',
            valueClassName: "param-memTotal",
            unit: "MB"
        }, {
            name: 'OS Arch:',
            value: 'N/A',
            valueClassName: "param-osArch",
            unit: ""
        }, {
            name: 'OS Name:',
            value: 'N/A',
            valueClassName: "param-osName",
            unit: ""
        }, {
            name: 'OS Version:',
            value: 'N/A',
            valueClassName: "param-osVersion",
            unit: ""
        }, {
            name: 'Java version:',
            value: 'N/A',
            valueClassName: "param-javaVersion",
            unit: ""
        }]
    }

    root.demo = demo;

}(window));

demo.init();