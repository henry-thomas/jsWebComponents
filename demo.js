(function(root) {

    const demo = {
        init: function() {
            this.body = document.querySelector('body');

            this.render();
        },

        render: function() {
            this.createNavBar();
            this.createCard();
            this.createButton();
            this.createModal();
        },

        createNavBar: function() {
            let navBar = document.createElement('smdui-nav-bar');

            navBar.addTab('Test1', () => console.log('nav bar1 clicked'));
            navBar.addTab('Test2', () => console.log('nav bar2 clicked'));
            navBar.addTab('Test3', () => console.log('nav bar3 clicked'));
            navBar.addLink('Logout', () => console.log('Logged Out'));
            navBar.setLinkInfo('Logged in as Henry');
            this.body.appendChild(navBar);
        },

        createCard: function() {
            let card = document.createElement('smdui-card');
            card.setHeading("SMDUI-Card");
            this.body.appendChild(card);

            for (let i = 0; i < this.dataArr.length; i++) {
                let item = document.createElement('smdui-name-value');
                item.setName(this.dataArr[i].name);
                item.setValue(this.dataArr[i].value);
                if (this.dataArr[i].valueClassName) {
                    item.valueSpan.classList.add(this.dataArr[i].valueClassName);
                }

                item.setUnit(this.dataArr[i].unit);
                card.addContent(item);
                item.setNameTooltip(this.dataArr[i].name);
                item.setValueTooltip(this.dataArr[i].value);
            }
        },

        createButton: function() {
            let btn = document.createElement('smdui-button');
            btn.setText('open modal');
            btn.addEventListener('click', () => {
                this.modal.open();
            })
            this.body.appendChild(btn);
        },

        createModal() {
            let modal = document.createElement('smdui-modal');
            this.body.appendChild(modal);
            modal.setHeading('SMDUI-Modal');
            let modalContent = document.createElement('span');
            modalContent.innerHTML = 'This is the content section of the modal.'
            modal.setContent(modalContent);
            modal.addButton('Okay', () => {
                console.log('Modal Button Clicked');
                modal.hide();
            });
            this.modal = modal;
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