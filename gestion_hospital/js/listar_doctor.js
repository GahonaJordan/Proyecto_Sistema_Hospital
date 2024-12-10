class ListarDoctor extends HTMLElement{
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
        this.fetchData(apirul);
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const doctors = data || [];
            this.render(doctors);
        } catch (error) {
            console.error(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al realizar API</p>

            `;
        }
    }

    render = (doctors) => {
        if(doctors.length === 0){
            this.container.innerHTML = `
                <p class="error-alert">No hay doctores disponibles</p>
            `;
            return;
        }

        let tableHtml = `
        <div class="mi-div">
            <h1>Lista de Doctores</h1>
        </div>
        <div class="direccional">
            <a href="/Proyecto_Sistema_Hospital/gestion_hospital/from_doctor.html" class="btn-blue">Crear Doctor</a>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Especialidad</th>
                        <th>Cedula</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Horario de Trabajo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        doctors.forEach(doctor => {
            tableHtml += `
                <tr>
                    <td>${doctor.id_doctor}</td>
                    <td>${doctor.nombre}</td>
                    <td>${doctor.apellido}</td>
                    <td>${doctor.especialidad}</td>
                    <td>${doctor.cedula}</td>
                    <td>${doctor.telefono}</td>
                    <td>${doctor.correo}</td>
                    <td>${doctor.horario}</td>
                    <td class="actions">
                        <button class="btn-delete" data-id="${doctor.id_doctor}">Eliminar</button>
                        <button class="btn-update" data-id="${doctor.id_doctor}">Actualizar</button>
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
        
        // Asignamos eventos a los botones de actualización
        this.container.querySelectorAll('.btn-update').forEach((button) => {
            button.addEventListener('click', () => this.handleUpdate(button.dataset.id));
        });
    };

    // Método para manejar la eliminación
    handleDelete = async (id_doctor) => {
        // Mostrar confirmación antes de eliminar
        const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar el doctor con ID: ${id_doctor}?`);
        if (confirmDelete) {
            try {
                // Enviar solicitud DELETE para eliminar el doctor
                const response = await fetch(`http://localhost:8000/doctor/${id_doctor}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Doctor eliminado con éxito');
                    // Actualizar la lista de doctores después de la eliminación
                    const apiUrl = this.getAttribute('api-url');
                    this.fetchData(apiUrl);
                } else {
                    alert('Error al eliminar al doctor');
                }
            } catch (error) {
                console.error("Error en la eliminación", error);
                alert('Error con la conexión de la API');
            }
        }
    };
}

window.customElements.define('listar-doctor', ListarDoctor);


window.customElements.define('listar-doctor', ListarDoctor);