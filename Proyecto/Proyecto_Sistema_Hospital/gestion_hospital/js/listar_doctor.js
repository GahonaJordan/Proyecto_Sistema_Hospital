class ListarDoctor extends HTMLElement{
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
                    <td>
                        <button class="btn-delete" data-id="${doctor.id_doctor}">Eliminar</button>
                        <button class=".btn-update" data-id="${doctor.id_doctor}">Actualizar</button>
                    </td>
                </tr>
            `;
        });

        tableHtml += `
                </tbody>
            </table>
        `;

        this.container.innerHTML = tableHtml;

        this.container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => { 
                console.log('Eliminar');
                alert('Eliminar') });
        });

        this.container.querySelectorAll('.btn-update').forEach(btn => {
            btn.addEventListener('click', this.updateBook);
        });
    }
}

window.customElements.define('listar-doctor', ListarDoctor);