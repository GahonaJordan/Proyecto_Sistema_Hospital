import express from 'express';

import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi api");
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'doctor_paciente'
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar a la base de datos");
        return
    } else {
        console.log("Conexion Exitosa");
    }
});
//consultar la tabla doctor
app.get('/doctor/', (req, res) => {
    const query = "SELECT * FROM doctor";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al ejecutar la consulta');
            return;
        } else {
            res.status(200).json(results);
        }
    });
});
//consultar la tabla paciente
app.get('/paciente/', (req, res) => {
    const query = "SELECT * FROM paciente";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al ejecutar la consulta');
            return;
        } else {
            res.status(200).json(results);
        }
    });
});
//consultar la tabla doctor_paciente
app.get('/doctor_paciente/', (req, res) => {
    const query = `
        select 
            CONCAT(d.nombre, ' ', d.apellido) AS Doctor,
		    CONCAT(p.nombre, ' ', p.apellido) AS Paciente,
            dp.fecha_asignacion
        from doctor d
        join doctor_paciente dp on d.id_doctor = dp.doctor_id
        join paciente p on dp.paciente_id = p.id_paciente;
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error); // Agregar un log para depuración.
            res.status(500).send('Error al ejecutar la consulta');
            return;
        }
        res.status(200).json(results); // No necesitas un else aquí porque el return anterior ya detiene la ejecución.
    });
});

// ---------------------------------------------------------------------------------------
// modificar el insertar datos en la tabla doctor
//----------------------------------------------------------------------------------------
app.post('/doctor/', (req, res) => {
    const { id_doctor, nombre, apellido, especialidad, cedula, telefono, correo, horario } = req.body;
    const query = 'INSERT INTO doctor (id_doctor,nombre,apellido,especialidad,cedula,telefono,correo,horario) VALUES(?,?,?,?,?,?,?,?)';
    db.query(query,
        [id_doctor, nombre, apellido, especialidad, cedula, telefono, correo, horario],
        (error, results) => {
            if (error) {
                res.status(500).send('Error al ejecutar la consulta');
                return;
            } else {
                res.status(201).json({ message: 'Doctor registrado exitosamente', results });
            }
        }
    );
});

// ---------------------------------------------------------------------------------------
// modificar el delete de datos en la tabla doctor
//----------------------------------------------------------------------------------------
app.delete('/doctor/:id_doctor', (req, res) => {
    
    const { id_doctor } = req.params;
    const query = 'DELETE FROM doctor WHERE id_doctor=?';
    db.query(query, [id_doctor], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el doctor');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe el doctor');
            return;
        }
        res.status(200).json({ message: 'Doctor eliminado exitosamente' });
    });
});

// ---------------------------------------------------------------------------------------
// modificar el editar de datos en la tabla doctor
//----------------------------------------------------------------------------------------

app.put('/doctor/:id_doctor', (req, res) => {
    const { id_doctor } = req.params;
    const { nombre, apellido, especialidad, cedula, telefono, correo, horario } = req.body;
    const query = 'UPDATE doctor set nombre=?, apellido=?, especialidad=?, cedula=?, telefono=?, correo=?, horario=? WHERE id_doctor=?';
    db.query(query,
        [nombre, apellido, especialidad, cedula, telefono, correo, horario, id_doctor],
        (error, results) => {
            if (error) {
                res.status(500).send('Error al actualizar el doctor');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('No existe el doctor');
                return;
            }
            res.status(200).json('Doctor actualizado exitosamente');
        }
    );
});

// ---------------------------------------------------------------------------------------
// modificar el insertar datos en la tabla paciente
//----------------------------------------------------------------------------------------
app.post('/paciente/', (req, res) => {
    const { id_paciente, nombre, apellido, edad, cedula, telefono, correo, fecha_nacimiento, direccion, historial_medico } = req.body;
    const query = 'INSERT INTO paciente (id_paciente,nombre,apellido,edad,cedula,telefono,correo,fecha_nacimiento,direccion,historial_medico) VALUES(?,?,?,?,?,?,?,?,?,?)';
    db.query(query,
        [id_paciente, nombre, apellido, edad, cedula, telefono, correo, fecha_nacimiento, direccion, historial_medico],
        (error, results) => {
            if (error) {
                res.status(500).send('Error al ejecutar la consulta');
                return;
            } else {
                res.status(201).json({ message: 'Paciente registrado exitosamente', results });
            }
        }
    );
});

// ---------------------------------------------------------------------------------------
// Crear el delete de datos en la tabla paciente
//----------------------------------------------------------------------------------------
app.delete('/paciente/:id_paciente', (req, res) => {
    
    const { id_paciente } = req.params;
    const query = 'DELETE FROM paciente WHERE id_paciente=?';
    db.query(query, [id_paciente], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el paciente');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe el paciente');
            return;
        }
        res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    });
});

// ---------------------------------------------------------------------------------------
// modificar el insertar datos en la tabla doctor_paciente
//----------------------------------------------------------------------------------------

app.post('/doctor_paciente/', (req, res) => {
    const { doctor_id, paciente_id, fecha_asignacion } = req.body;
    const query = 'INSERT INTO doctor_paciente (doctor_id,paciente_id,fecha_asignacion) VALUES(?,?,?)';
    db.query(query,
        [doctor_id, paciente_id, fecha_asignacion],
        (error, results) => {
            if (error) {
                res.status(500).send('Error al ejecutar la consulta');
                return;
            } else {
                res.status(201).json({ message: 'Asignacion registrada exitosamente', results });
            }
        }
    );
});