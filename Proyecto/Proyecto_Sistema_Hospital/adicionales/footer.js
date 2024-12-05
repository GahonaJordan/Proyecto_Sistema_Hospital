class MiFooter extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            position: relative;
            width: 100%;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    };

    connectedCallback(){
        this.render();
    };

    render = () => {
        this.container.innerHTML = `
            <footer>
                <p>&copy; 2024 - Todos los derechos reservados</p>
            </footer>
        `;
    };
}

window.customElements.define('mi-footer', MiFooter);