class MiPresentacion extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
        .container-presentacion {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                width: 100vw;
            }

        .tarjeta-presentacion {
            border: 1px solid #000;
            padding: 80px;
            margin: 10px 300px;
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .card-imagen {
            display: flex;
            justify-content: center;
            align-items: center;
            height: auto;
            overflow: hidden;
        }
        .card-imagen img {
            width: 100%;
            height: auto;
        }
        .header {
            text-align: center;
            font-size: 3rem;
            font-weight: bold;
            padding: 20px;
        }
        .description {
            text-align: center;
        }
        .experiencia {
            text-align: center;
        }
        .experiencia ul, .habilidades ul {
            list-style-type: disc;
            padding-left: 20px;
            text-align: left;
        }
        .habilidades {
            text-align: center;
        }
        .subtitulo {
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            padding: 20px;
        }
        .subtitulo2 {
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            padding: 20px;
        }
        `;

        const template = document.createElement('template');
        template.innerHTML = `
        <div class="tarjeta-presentacion">
            <div class="card-imagen">
                <slot name="imagen">
                    <img src="https://placehold.co/600x400" alt="Default Image">
                </slot>
            </div>
            <div class="header">
                <slot name="titulo">Default Title</slot>
            </div>
            <div class="description">
                <slot name="descripcion">Default Description</slot>
            </div>
            <div class="subtitulo">
                <slot name="titulo1">Default Title</slot>
            </div>
            <div class="experiencia">
                <slot name="experienciaLaboral">Default Experiencia</slot>
            </div>
            <div class="subtitulo2">
                <slot name="titulo2">Default Title</slot>
            </div>
            <div class="habilidades">
                <slot name="habilidadesBlandas">Default habilidades</slot>
            </div>
        </div>
        `;

        // Crear el objeto de datos del estudiante
        const estudiante = {
            nombre: "Jordan Gahona",
            descripcion: `
                Estudiante de la Prestigiosa Universidad de las Fuerzas Armadas ESPE. 
                Cursando la carrera de Ingeniería en Tecnologías de la Información.
                Actualmente en el 6to semestre.
                Conocimientos en programación en lenguajes como Java, Python, C++, C#, JavaScript, HTML, CSS.
                Poseo una vasta experiencia en la administración de negocios y atención al cliente.
                Fui Marinero Mercante encargado del transporte de combustible y apoyo de la Isla Santa Cruz - Galápagos.
            `,
            nombre1: "Experiencia Laboral",
            experienciaLaboral: `
                <ul>
                    <li>Estudié en la Unidad Educativa Nacional Galápagos, Bachillerato en 'Ciencias' especializado en 'Físico Matemáticas'</li>
                    <li>Gerente de la tienda Mini-Market 'Cucube', alrededor de 4 años</li>
                    <li>Encargado de la atención al cliente y administración del Mini-Market</li>
                    <li>Marinero mercante en la empresa Pacific Divers siendo tripulante de la Gabarra Orca por 11 meses</li>
                    <li>Conocimientos en el manejo de hotelería, restaurantes y bares</li>
                </ul>
            `,
            nombre2: "Habilidades Blandas",
            habilidadesBlandas: `
                <ul>
                    <li>Participo en proyectos con energía, en muchos casos liderando equipos para completar objetivos propuestos</li>
                    <li>En el colegio tomé la iniciativa para el proyecto 'Limpieza Costera'</li>
                    <li>Habilidad para manejar conflictos y buscar soluciones óptimas</li>
                    <li>Alta adaptabilidad a cualquier entorno, gracias a mi afán de ayudar</li>
                    <li>Capacidad de autocontrol e inteligencia emocional, buscando el equilibrio en cualquier situación</li>
                    <li>Perspectiva amplia y capacidad para generar múltiples soluciones ante cualquier problema</li>
                </ul>
            `
        };

        // Appending styles and template content to shadow DOM
        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Ahora actualizar directamente el contenido en lugar de los slots
        const tituloElement = this.shadowRoot.querySelector('.header');
        const descripcionElement = this.shadowRoot.querySelector('.description');
        const experienciaElement = this.shadowRoot.querySelector('.experiencia');
        const habilidadesElement = this.shadowRoot.querySelector('.habilidades');
        const tituloElement1 = this.shadowRoot.querySelector('.subtitulo');
        const tituloElement2 = this.shadowRoot.querySelector('.subtitulo2');

        tituloElement.textContent = estudiante.nombre;
        descripcionElement.textContent = estudiante.descripcion;
        experienciaElement.innerHTML = estudiante.experienciaLaboral; // Usar innerHTML para insertar el contenido HTML
        habilidadesElement.innerHTML = estudiante.habilidadesBlandas; // Usar innerHTML para insertar el contenido HTML
        tituloElement1.textContent = estudiante.nombre1;
        tituloElement2.textContent = estudiante.nombre2;
    }
}

window.customElements.define('mi-presentacion', MiPresentacion);
