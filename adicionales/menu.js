class Mimenu extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });
        //Crear el contenedor del menu
        this.menucontainer = document.createElement('div');
        this.menucontainer.classList.add('menu-container');
        //crear el contenedor de imagen
        this.imagenContainer = document.createElement('div');
        this.imagenContainer.classList.add('imagen-container');
        //crear la imagen
        this.listaImagen = document.createElement('li');
        this.listaImagen.style.listStyleType = 'none';
        this.logo = document.createElement('img');
        this.logo.src = '/Proyecto_Sistema_Hospital/adicionales/imagenes/Designer1.png';
        this.imagenContainer.appendChild(this.logo);
        //los estilos del menu
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
            .imagen-container {
                display: flex;
                padding: 1rem;
                justify-content: center;

            }

            .imagen-container img {
                width: 350px;
                height: 90px;
                margin-right: 8px;
            }           
        `;

        this.shadow.appendChild(this.styleElement);
        this.shadow.appendChild(this.imagenContainer);
        this.shadow.appendChild(this.menucontainer);
        
    }

    connectedCallback() {
        this.render();
    }

    render = () => {
        const opciones = [
            { item: 'Inicio', link: '/Proyecto_Sistema_Hospital/index.html'},
            { item: 'Doctor', link: '/Proyecto_Sistema_Hospital/gestion_hospital/doctor.html' },
            { item: 'Paciente', link: '/Proyecto_Sistema_Hospital/gestion_hospital/paciente.html' },
            { item: 'Medicos Asignados', link: '/Proyecto_Sistema_Hospital/gestion_hospital/paciente_doctor.html' },
            { item: 'Presentación', link: '/Proyecto_Sistema_Hospital/gestion_hospital/estudiante.html' },
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