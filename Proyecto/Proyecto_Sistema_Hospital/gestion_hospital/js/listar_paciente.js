class ListarPaciente extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.container = document.createElement('div');
        this.container.className = 'container';
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            .container{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
            .error-alert{
                background-color: #f8d7da;
                color: #721c24;
                padding: 10px;
                border: 1px solid #f5c6cb;
                border-radius: 5px;
                margin: 10px;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback(){
        const apirul = this.getAttribute('api-url');
        this.fetchdata(apirul);
    }

    fetchdata = async (url) => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            const paciente = data || [];
            this.render(paciente);
        }catch(error){
            console.error(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al realizar API</p>
            `;
        }
    }

    render = (paciente) => {
        if(paciente.length === 0){
            this.container.innerHTML = `
                <p class="error-alert">No hay pacientes disponibles</p>
            `;
            return;
        }

        let tableHtml = `
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Cédula</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Direccion de Residencia</th>
                        <th>Diagnóstico</th>
                    </tr>
                </thead>
                <tbody>
        `;

        paciente.forEach(p => {
            tableHtml += `
                <tr>
                    <td>${p.id_paciente}</td>
                    <td>${p.nombre}</td>
                    <td>${p.apellido}</td>
                    <td>${p.edad}</td>
                    <td>${p.cedula}</td>
                    <td>${p.telefono}</td>
                    <td>${p.correo}</td>
                    <td>${p.fecha_nacimiento}</td>
                    <td>${p.direccion}</td>
                    <td>${p.historial_medico}</td>
                    <td>
                        <button onclick="eliminarDoctor(${p.id_paciente})">Eliminar</button>
                        <button onclick="editarDoctor(${p.id_paciente})">Editar</button>
                    </td>
                </tr>

            `;
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        this.container.innerHTML = tableHtml;
    }
}

window.customElements.define('listar-paciente', ListarPaciente);