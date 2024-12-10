class ListarPaciente extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.container = document.createElement('div');
        //this.container.className = 'container';
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: center;
            }
            th, td {
                padding: 10px;
                border: 1px solid #ccc;
            }
            th {
                background-color: #f4f4f4;
            }
            .actions button {
                margin: 0 5px;
                padding: 5px 10px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn-update {
                background-color: #4caf50;
                color: white;
            }
            .btn-delete {
                background-color: #f44336;
                color: white;
            }
            .error-alert {
                color: red;
                font-weight: bold;
            }
            .empty-alert {
                color: gray;
                font-style: italic;
            }
            .btn-blue {
                background-color: #007bff;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                margin: 10px 0;
            }
            .btn-blue:hover {
                background-color: #0056b3;
            }     
            .mi-div {
                background-color: #f8f9fa; 
                border: 1px solid #dee2e6; 
                border-radius: 8px; 
                padding: 20px; 
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
                margin: 20px auto; 
                max-width: 600px; 
            }

            .mi-div h1 {
                font-family: 'Arial', sans-serif; 
                font-size: 30px; 
                color: #343a40;
                margin: 0; 
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
    };

    render = (paciente) => {
        if(paciente.length === 0){
            this.container.innerHTML = `
                <p class="error-alert">No hay pacientes disponibles</p>
            `;
            return;
        }

        let tableHtml = `
        <div class="mi-div">
            <h1>Lista de Pacientes</h1>
        </div>
        <div class="direccional">
            <a href="/Proyecto_Sistema_Hospital/gestion_hospital/from_paciente.html" class="btn-blue">Crear Paciente</a>
        </div>
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
                        <th>Acciones</th>
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
                    <td class="actions">
                        <button class="btn-delete" data-id="${p.id_paciente}">Eliminar</button>
                        <button class="btn-update" data-id="${p.id_paciente}">Editar</button>
                    </td>
                </tr>

            `;
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        this.container.innerHTML = tableHtml;

        // Asignamos eventos a los botones de eliminación
        this.container.querySelectorAll('.btn-delete').forEach((button) => {
            button.addEventListener('click', () => this.handleDelete(button.dataset.id));
        });
    };
    // Método para manejar la eliminación
    handleDelete = async (id_paciente) => {
        // Mostrar confirmación antes de eliminar
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar al paciente con ID: ${id_paciente}?`);
        if (confirmDelete) {
            try {
                // Enviar solicitud DELETE para eliminar el paciente
                const response = await fetch(`http://localhost:8000/paciente/${id_paciente}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Paciente eliminado con éxito');
                    // Actualizar la lista de libros después de la eliminación
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchdata(apiUrl);
                } else {
                    alert('Error al eliminar al paciente');
                }
            } catch (error) {
                console.error("Error en la eliminación", error);
                alert('Error con la conexión de la API');
            }
        }
    };
}

window.customElements.define('listar-paciente', ListarPaciente);