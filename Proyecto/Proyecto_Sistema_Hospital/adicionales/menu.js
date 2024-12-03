class Mimenu extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        this.menucontainer = document.createElement('div');
        this.menucontainer.classList.add('menu-container');
        this.styleElement = document.createElement('style');
        this.styleElement.textContent = `
            .menu-container {  
                display: flex;
                background-color: #333;
                color: white;
                padding: 0;
                list-style-type: none;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                height: 100%;
                margin: 0;
            }
            .menu-container li {
                padding: 1rem 5rem;
                cursor: pointer;
                transition: background-color 0.3s, color 0.3s;
            }
            .menu-container li:hover {
                background-color: cyan;
                color: black;
            }
            .menu-container a {
                text-decoration: none;
                color: inherit;
            }           
        `;

        this.shadow.appendChild(this.menucontainer);
        this.shadow.appendChild(this.styleElement);
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        const opciones = [
            { item: 'Inicio', link: '/Proyecto_Sistema_Hospital/index.html'},
            { item: 'Doctor', link: '/Proyecto_Sistema_Hospital/gestion_hospital/doctor.html' },
            { item: 'Paciente', link: '/Proyecto_Sistema_Hospital/gestion_hospital/paciente.html' },
            { item: 'API', link: '/Tarea_API - copia/paginas/api.html' },
        ];

        opciones.forEach(op => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = op.item;
            link.href = op.link;
            listItem.appendChild(link);
            listItem.addEventListener('click', () => {
                window.location.href = op.link;
            });
            this.menucontainer.appendChild(listItem);
        });
    }
}

window.customElements.define('mi-menu', Mimenu);