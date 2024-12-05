class FormPaciente extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
        this.container = document.createElement("div");
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
                .form-container {
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .form-container h2 {
                    margin-bottom: 20px;
                }

                .form-container label {
                    display: block;
                    margin-bottom: 5px;
                }

                .form-container input, .form-container select {
                    width: 100%;
                    padding: 5px;
                    margin-bottom: 10px;
                    box-sizing: border-box;
                }

                .form-container button {
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback(){
        this.render();
    }

    render = () => {
        this.container.innerHTML = `
            <div class="form-container">
            <h2>Registro de Pacientes</h2>
            <form id="paciente-form">
                <label for="nombre">Nombre</label>
                <input type="text" name="nombre" id="nombre" required>

                <label for="apellido">Apellido</label>
                <input type="text" name="apellido" id="apellido" required>

                <label for="edad">Edad</label>
                <input type="number" name="edad" id="edad" required>

                <label for="cedula">Cédula</label>
                <input type="text" name="cedula" id="cedula" required>

                <label for="telefono">Telefono</label>
                <input type="text" name="telefono" id="telefono" required>

                <label for="correo">Correo</label>
                <input type="email" name="correo" id="correo" required>

                <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" required>

                <label for="direccion">Dirección</label>
                <input type="text" name="direccion" id="direccion" required>

                <label for="historial_medico">Historial Médico</label>
                <input type="text" name="historial_medico" id="historial_medico" required>

                <button type="submit">Registrar</button>
                <button type="reset">Limpiar</button>
                <button type="button" onclick="window.location.href='/Proyecto_Sistema_Hospital/gestion_hospital/paciente.html'">Regresar</button>
            </form>
            </div>
        `;

        this.shadowRoot.querySelector("#paciente-form").addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const apellido = this.shadowRoot.querySelector('#apellido').value;
        const edad = this.shadowRoot.querySelector('#edad').value;
        const cedula = this.shadowRoot.querySelector('#cedula').value;
        const telefono = this.shadowRoot.querySelector('#telefono').value;
        const correo = this.shadowRoot.querySelector('#correo').value;
        const fecha_nacimiento = this.shadowRoot.querySelector('#fecha_nacimiento').value;
        const direccion = this.shadowRoot.querySelector('#direccion').value;
        const historial_medico = this.shadowRoot.querySelector('#historial_medico').value;

        const newPaciente = {
            nombre,
            apellido,
            edad,
            cedula,
            telefono,
            correo,
            fecha_nacimiento,
            direccion,
            historial_medico
        };

        try {
            const response = await fetch('http://localhost:8000/paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPaciente)
            });

            if(response.ok){
                alert('Paciente registrado exitosamente');
                this.shadowRoot.querySelector('#doctor-form').reset();
            } else {
                alert('Ocurrió un error al registrar el paciente');
            }
        }catch(error){
            console.log(`Error al realizar fetch ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    }
}

window.customElements.define('form-paciente', FormPaciente);