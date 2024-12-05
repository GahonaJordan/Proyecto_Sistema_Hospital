class MiInicio extends HTMLElement {
    constructor() {
        super();

        // Crear el shadow DOM
        this.attachShadow({ mode: 'open' });

        // Crear estilos
        const estilo = document.createElement('style');
        estilo.textContent = `
            .container-presentacion {
                position: relative;
                width: 100%;
                height: 100vh;
                background-image: url('https://static.vecteezy.com/system/resources/previews/004/493/181/non_2x/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg');
                background-size: cover;
                background-position: center;
            }
            .tarjeta-presentacion {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                text-align: center;
                width: 300px;
            }
            .tarjeta-presentacion .header {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 0;
                padding-bottom: 10px;
            }
            .tarjeta-presentacion .description {
                font-size: 1rem;
                color: #555;
            }
        `;

        // Crear plantilla HTML
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="container-presentacion">
                <div class="tarjeta-presentacion">
                    <div class="header">Bienvenido al sistema de gestión hospitalaria</div>
                    <div class="description">
                        Este sistema te permitirá gestionar los pacientes, médicos y asignaciones.
                    </div>
                </div>
            </div>
        `;

        // Agregar estilos y contenido al shadow DOM
        this.shadowRoot.appendChild(estilo);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Definir el componente
window.customElements.define('mi-inicio', MiInicio);
