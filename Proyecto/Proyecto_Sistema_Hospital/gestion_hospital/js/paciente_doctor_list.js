class ListarPacienteDoctor extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
        this.estilo.textContent = `
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-size: 16px;
                text-align: center;
            th, td {
                padding: 10px;
                border: 1px solid #ccc;
            }
            th {
                background-color: #f4f4f4;
            }
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
            const pacientedoc = data || [];
            this.render(pacientedoc);
        } catch (error) {
            console.error(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al realizar API</p>

            `;
        }
    };

    render = (pacientedoc) => {
        if(pacientedoc.length === 0){
            this.container.innerHTML = `
                <p class="empty-alert">No hay datos</p>
            `;
            return;
        }

        let tableHtml = `
        <div class="mi-div">
            <h1>Lista de Asignaciónes</h1>
        </div>
        <div class="direccional">
            <a href="/Proyecto_Sistema_Hospital/gestion_hospital/from_asingancion.html" class="btn-blue">Nueva Asignación</a>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Id del Doctor</th>
                        <th>Ide del Paciente</th>
                        <th>Fecha de Asignacion</th>
                    </tr>
                </thead>
                <tbody>
        `;

        pacientedoc.forEach(pd => {
            tableHtml += `
                <tr>
                    <td>${pd.doctor_id}</td>
                    <td>${pd.paciente_id}</td>
                    <td>${pd.fecha_asignacion}</td>
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

window.customElements.define('listar-paciente-doctor', ListarPacienteDoctor);