
export class MainLayout extends HTMLElement {

    get active() {
        return this.getAttribute('active');
    }
    set active(newVal) {
        this.setAttribute('active', newVal);
    }

    static get observedAttributes() {
        return ['active'];
    }
    constructor() {
        super();
        this.active = 'bar';
        this.innerHTML = this.renderPage();
        this.addEventListener('my-event', (event)=> {
            this.setAttribute('active', event.detail.menuId);
            this.active = event.detail.menuId;
        });
    }

    renderPage() {
        return `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
                <div class="row h-100">
                    <div class=col-2>
                        <left-menu active="${this.active}"></left-menu>
                    </div>
                    <div class=col-10>
                        <chart-container type="${this.active}"></chart-container>
                    </div>
                </div>`;
    }


    attributeChangedCallback(name, oldValue, newValue) {
        const isNew = oldValue !== newValue;
        if (name === 'active' && isNew) {
            this.innerHTML = this.renderPage();
        }
    }
}
customElements.define('main-layout', MainLayout);
