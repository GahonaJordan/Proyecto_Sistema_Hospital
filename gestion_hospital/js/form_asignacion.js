class NuevaAsignacion extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.container = document.createElement('div');
        this.estilo = document.createElement('style');
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

            .error-alert {
                color: red;
                font-weight: bold;
            }
        `;

        this.shadowRoot.appendChild(this.estilo);
        this.shadowRoot.appendChild(this.container);
    }

    connectedCallback() {
        this.render();
        this.loadOptions(); // Llamar a este método después de renderizar el formulario
    }

    render = () => {
        this.container.innerHTML = `
            <div class="form-container">
                <h2>Asignación de doctores</h2>
                <form id="asignacion-form">
                    <label for="doctor_id">Doctor</label>
                    <select id="doctor_id" name="doctor_id" required>
                        <option value="">Cargando doctores...</option>
                    </select>

                    <label for="paciente_id">Paciente</label>
                    <select id="paciente_id" name="paciente_id" required>
                        <option value="">Cargando pacientes...</option>
                    </select>

                    <label for="fecha_asignacion">Fecha de asignación</label>
                    <input type="date" id="fecha_asignacion" name="fecha_asignacion" required>

                    <button type="submit">Asignar</button>
                    <button type="reset">Limpiar</button>
                    <button type="button" onclick="window.location.href='/Proyecto_Sistema_Hospital/gestion_hospital/paciente_doctor.html'">Regresar</button>
                </form>
            </div>
        `;

        this.shadowRoot.getElementById('asignacion-form').addEventListener('submit', this.handleSubmit);
    }

    loadOptions = async () => {
        try {
            // Cargar doctores
            const doctorResponse = await fetch('http://127.0.0.1:8000/doctor');
            if (!doctorResponse.ok) throw new Error('Error al cargar los doctores');
            const doctores = await doctorResponse.json();
            const doctorSelect = this.shadowRoot.getElementById('doctor_id');
            doctorSelect.innerHTML = doctores.map(
                doctor => `<option value="${doctor.id_doctor}">${doctor.nombre} ${doctor.apellido}</option>`
            ).join('');

            // Cargar pacientes
            const pacienteResponse = await fetch('http://localhost:8000/paciente');
            if (!pacienteResponse.ok) throw new Error('Error al cargar los pacientes');
            const pacientes = await pacienteResponse.json();
            const pacienteSelect = this.shadowRoot.getElementById('paciente_id');
            pacienteSelect.innerHTML = pacientes.map(
                paciente => `<option value="${paciente.id_paciente}">${paciente.nombre} ${paciente.apellido}</option>`
            ).join('');
        } catch (error) {
            console.error(`Error al cargar las opciones: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al cargar los datos. Por favor, inténtelo más tarde.</p>
            `;
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const doctor_id = this.shadowRoot.getElementById('doctor_id').value;
        const paciente_id = this.shadowRoot.getElementById('paciente_id').value;
        const fecha_asignacion = this.shadowRoot.getElementById('fecha_asignacion').value;

        const asignacion = {
            doctor_id,
            paciente_id,
            fecha_asignacion
        };

        try {
            const response = await fetch('http://localhost:8000/doctor_paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(asignacion)
            });

            if (response.ok) {
                alert('Asignación exitosa');
                this.shadowRoot.getElementById('asignacion-form').reset();
            } else {
                alert('Ocurrió un error al asignar');
            }
        } catch (error) {
            console.error(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al registrar el Doctor</p>
            `;
        }
    }
}

window.customElements.define('nueva-asignacion', NuevaAsignacion);
