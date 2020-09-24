export class LeftMenu extends HTMLElement {

    get items() {
        return JSON.parse(this.getAttribute('items'));
    }
    set items(newVal) {
        this.setAttribute('items', JSON.stringify(newVal));
    }

    get active() {
        return this.getAttribute('active');
    }
    set active(newVal) {
        this.setAttribute('active', newVal);
    }

    get template() {
        const template = document.createElement('template');
        template.innerHTML = `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
                                <div class="container m-0 p-0 h-100">
                                <div class="row w-100 h-100">
                                    <ul id="menu-list" class="list-group" style="width: 200px;">
                                    </ul>
                                </div>
                             </div>`;
        return template;
    }


    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });

        this.items =  [
            {
                id: 'bar',
                name: 'Bar chart',
            },{
                id: 'line',
                name: 'Line chart'
            },{
                id: 'radar',
                name: 'Radar chart'
            },{
                id: 'bubble',
                name: 'Bubble chart'
            },{
                id: 'pie',
                name: 'Pie chart'
            }
        ];
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.renderChildren();
    }

    renderChildren(){
        const parent = this.shadowRoot.querySelector('#menu-list');
        if(this.items && this.items .length >0) {
            this.items.forEach(item => {
                const li = document.createElement('li')
                li.className = `list-group-item${this.active === item.id?' active' : ''}`;
                li.innerText = item.name;
                li.key = item.id;
                li.addEventListener('click', (event)=> {
                    this.dispatchEvent(new CustomEvent('my-event', {
                        bubbles: true,
                        detail: {
                            menuId: li.key
                        }
                    }));
                });
                parent.appendChild(li);
            });
        }
    }


}
customElements.define('left-menu', LeftMenu);
