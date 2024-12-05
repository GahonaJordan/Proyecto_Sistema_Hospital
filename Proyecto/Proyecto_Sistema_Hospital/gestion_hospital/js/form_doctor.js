class NuevoDoctor extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: 'open'});
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
                <h2>Registro de doctores</h2>
                <form id="doctor-form">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" required>

                    <label for="especialidad">Especialidad</label>
                    <input type="text" id="especialidad" name="especialidad" required>

                    <label for="cedula">Cédula</label>
                    <input type="text" id="cedula" name="cedula" required>

                    <label for="telefono">Telefono</label>
                    <input type="text" id="telefono" name="telefono" required>

                    <label for="correo">Correo</label>
                    <input type="email" id="correo" name="correo" required>

                    <label for="horario">Horario</label>
                    <input type="text" id="horario" name="horario" required>

                    <button type="submit">Registrar</button>
                    <button type="reset">Limpiar</button>
                    <button type="button" onclick="window.location.href='/Proyecto_Sistema_Hospital/gestion_hospital/doctor.html'">Regresar</button>
                </form>
            </div>
        `;

        this.shadowRoot.querySelector('#doctor-form').addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (evento) => {
        evento.preventDefault();
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const apellido = this.shadowRoot.querySelector('#apellido').value;
        const especialidad = this.shadowRoot.querySelector('#especialidad').value;
        const cedula = this.shadowRoot.querySelector('#cedula').value;
        const telefono = this.shadowRoot.querySelector('#telefono').value;
        const correo = this.shadowRoot.querySelector('#correo').value;
        const horario = this.shadowRoot.querySelector('#horario').value;

        const nuevoDoctor = {
            nombre,
            apellido,
            especialidad,
            cedula,
            telefono,
            correo,
            horario
        };

        try{
            const response = await fetch('http://127.0.0.1:8000/doctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoDoctor)
            });

            if(response.ok){
                alert('Doctor registrado con éxito');
                this.shadowRoot.querySelector('#doctor-form').reset();
            }else{
                alert('Ocurrió un error al registrar el doctor');
            }
        }catch (error) {
            console.error(`Error al realizar fetch: ${error}`);
            this.container.innerHTML = `
                <p class="error-alert">Error al registrar el Doctor</p>

            `;
        }
    };
}

window.customElements.define('nuevo-doctor', NuevoDoctor);