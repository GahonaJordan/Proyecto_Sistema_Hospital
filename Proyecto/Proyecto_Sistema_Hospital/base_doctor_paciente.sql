-- tabla del doctor
CREATE TABLE doctor ( 
    id_doctor INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    especialidad VARCHAR(100) NOT NULL, -- Especialidad del doctor
    cedula VARCHAR(10) NOT NULL UNIQUE, 
    telefono VARCHAR(15), -- Número de contacto
    correo VARCHAR(100), -- Correo electrónico
    en_servicio BOOLEAN DEFAULT 1 
);
-- tabla paciente
CREATE TABLE paciente ( 
    id_paciente INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    cedula VARCHAR(10) NOT NULL UNIQUE, 
    telefono VARCHAR(15), -- Número de contacto
    correo VARCHAR(100), -- Correo electrónico
    fecha_nacimiento DATE NOT NULL, -- Fecha de nacimiento
    direccion VARCHAR(255) -- Dirección del paciente
);
-- tabla de relacion muchos a muchos
CREATE TABLE doctor_paciente (
    doctor_id INT NOT NULL, 
    paciente_id INT NOT NULL, 
    fecha_asignacion DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha en la que se asignó el paciente al doctor
    PRIMARY KEY (doctor_id, paciente_id), 
    FOREIGN KEY (doctor_id) REFERENCES doctor(id_doctor) ON DELETE CASCADE,
    FOREIGN KEY (paciente_id) REFERENCES paciente(id_paciente) ON DELETE CASCADE
);
-- datos para el doctor
INSERT INTO doctor (id_doctor, nombre, apellido, especialidad, cedula, telefono, correo, en_servicio) VALUES
(1, 'Luis', 'González', 'Cardiología', '0102030405', '0991234567', 'luis.gonzalez@hospital.com', 1),
(2, 'María', 'Ramírez', 'Pediatría', '0203040506', '0987654321', 'maria.ramirez@hospital.com', 1),
(3, 'Carlos', 'López', 'Dermatología', '0304050607', '0998765432', 'carlos.lopez@hospital.com', 1),
(4, 'Ana', 'Martínez', 'Ginecología', '0405060708', '0976543210', 'ana.martinez@hospital.com', 1),
(5, 'Jorge', 'Hernández', 'Neurología', '0506070809', '0965432109', 'jorge.hernandez@hospital.com', 1),
(6, 'Lucía', 'Pérez', 'Psiquiatría', '0607080910', '0954321098', 'lucia.perez@hospital.com', 1),
(7, 'Pedro', 'Torres', 'Traumatología', '0708091011', '0943210987', 'pedro.torres@hospital.com', 1),
(8, 'Clara', 'Flores', 'Oncología', '0809101112', '0932109876', 'clara.flores@hospital.com', 1),
(9, 'José', 'Vega', 'Neumología', '0910111213', '0921098765', 'jose.vega@hospital.com', 1),
(10, 'Elena', 'Castro', 'Gastroenterología', '1011121314', '0910987654', 'elena.castro@hospital.com', 1);
-- datos para paciente
INSERT INTO paciente (id_paciente, nombre, apellido, cedula, telefono, correo, fecha_nacimiento, direccion) VALUES
(1, 'Miguel', 'García', '2010101010', '0991010101', 'miguel.garcia@gmail.com', '1990-05-12', 'Av. Principal 123'),
(2, 'Laura', 'Fernández', '2020202020', '0982020202', 'laura.fernandez@gmail.com', '1985-11-23', 'Calle Secundaria 456'),
(3, 'Juan', 'López', '2030303030', '0973030303', 'juan.lopez@gmail.com', '2000-07-15', 'Barrio Central 789'),
(4, 'Sofía', 'Martínez', '2040404040', '0964040404', 'sofia.martinez@gmail.com', '1995-02-19', 'Urbanización Norte 101'),
(5, 'Andrés', 'Pérez', '2050505050', '0955050505', 'andres.perez@gmail.com', '1987-09-05', 'Av. Los Pinos 202'),
(6, 'Camila', 'Hernández', '2060606060', '0946060606', 'camila.hernandez@gmail.com', '1992-04-30', 'Calle Los Rosales 303'),
(7, 'Lucas', 'Gómez', '2070707070', '0937070707', 'lucas.gomez@gmail.com', '1999-12-25', 'Barrio Sur 404'),
(8, 'Valeria', 'Torres', '2080808080', '0928080808', 'valeria.torres@gmail.com', '1994-06-18', 'Urbanización Este 505'),
(9, 'Gabriel', 'Flores', '2090909090', '0919090909', 'gabriel.flores@gmail.com', '1988-03-10', 'Av. Central 606'),
(10, 'Mariana', 'Vega', '2101010101', '0991011121', 'mariana.vega@gmail.com', '1996-01-22', 'Calle Oeste 707'),
(11, 'Elena', 'Ramos', '2111111111', '0981111111', 'elena.ramos@gmail.com', '1984-08-14', 'Av. Los Olivos 808'),
(12, 'Carlos', 'Romero', '2121212121', '0972121212', 'carlos.romero@gmail.com', '1979-03-26', 'Calle La Paz 909'),
(13, 'María', 'Gutiérrez', '2131313131', '0961313131', 'maria.gutierrez@gmail.com', '1991-07-09', 'Barrio La Merced 1001'),
(14, 'Diego', 'Cruz', '2141414141', '0951414141', 'diego.cruz@gmail.com', '1983-11-04', 'Av. Libertad 1101'),
(15, 'Ana', 'Morales', '2151515151', '0941515151', 'ana.morales@gmail.com', '1989-02-18', 'Urbanización Norte 1202'),
(16, 'Pedro', 'Jiménez', '2161616161', '0931616161', 'pedro.jimenez@gmail.com', '1995-06-27', 'Calle Los Álamos 1303'),
(17, 'Lucía', 'Ruiz', '2171717171', '0921717171', 'lucia.ruiz@gmail.com', '1982-10-13', 'Barrio San Juan 1404'),
(18, 'Santiago', 'Ortiz', '2181818181', '0911818181', 'santiago.ortiz@gmail.com', '1993-01-30', 'Av. El Sol 1505'),
(19, 'Daniela', 'Silva', '2191919191', '0981919191', 'daniela.silva@gmail.com', '1987-05-19', 'Calle La Victoria 1606'),
(20, 'Roberto', 'Mendoza', '2202020202', '0972020202', 'roberto.mendoza@gmail.com', '1985-12-28', 'Barrio El Carmen 1707'),
(21, 'Isabella', 'Castro', '2212121212', '0962121212', 'isabella.castro@gmail.com', '1994-04-11', 'Urbanización Santa Ana 1808'),
(22, 'Jorge', 'Suárez', '2222222222', '0952222222', 'jorge.suarez@gmail.com', '1981-09-16', 'Av. Los Andes 1909'),
(23, 'Victoria', 'Ponce', '2232323232', '0942323232', 'victoria.ponce@gmail.com', '1990-06-05', 'Calle La Luz 2010'),
(24, 'Felipe', 'Valencia', '2242424242', '0932424242', 'felipe.valencia@gmail.com', '1986-03-21', 'Barrio La Floresta 2111'),
(25, 'Mariana', 'Castillo', '2252525252', '0922525252', 'mariana.castillo@gmail.com', '1978-07-03', 'Av. El Bosque 2212'),
(26, 'David', 'Rojas', '2262626262', '0912626262', 'david.rojas@gmail.com', '1998-12-22', 'Calle Los Sauces 2313'),
(27, 'Alicia', 'Paredes', '2272727272', '0982727272', 'alicia.paredes@gmail.com', '1996-11-15', 'Barrio San Pedro 2414'),
(28, 'Luis', 'Navarro', '2282828282', '0972828282', 'luis.navarro@gmail.com', '1993-08-06', 'Urbanización Los Laureles 2515'),
(29, 'Patricia', 'Muñoz', '2292929292', '0962929292', 'patricia.munoz@gmail.com', '1980-01-01', 'Av. Los Lirios 2616'),
(30, 'Mateo', 'Sánchez', '2303030303', '0953030303', 'mateo.sanchez@gmail.com', '1997-05-30', 'Calle La Esperanza 2717'),
(31, 'Laura', 'Espinoza', '2313131313', '0943131313', 'laura.espinoza@gmail.com', '1988-09-09', 'Barrio La Colina 2818'),
(32, 'Antonio', 'Vargas', '2323232323', '0933232323', 'antonio.vargas@gmail.com', '1983-04-04', 'Urbanización Los Cedros 2919'),
(33, 'Sara', 'Barrera', '2333333333', '0923333333', 'sara.barrera@gmail.com', '1992-12-20', 'Av. La Pradera 3020'),
(34, 'Tomás', 'Blanco', '2343434343', '0913434343', 'tomas.blanco@gmail.com', '1981-07-01', 'Calle Los Laureles 3121'),
(35, 'Alejandro', 'Aguilar', '2353535353', '0983535353', 'alejandro.aguilar@gmail.com', '1996-10-27', 'Barrio Los Eucaliptos 3222'),
(36, 'Olivia', 'Miranda', '2363636363', '0973636363', 'olivia.miranda@gmail.com', '1979-03-18', 'Urbanización San Rafael 3323'),
(37, 'Sebastián', 'Molina', '2373737373', '0963737373', 'sebastian.molina@gmail.com', '1985-06-14', 'Av. La Alameda 3424'),
(38, 'Natalia', 'Delgado', '2383838383', '0953838383', 'natalia.delgado@gmail.com', '1998-11-10', 'Calle Las Acacias 3525'),
(39, 'Fernando', 'Palacios', '2393939393', '0943939393', 'fernando.palacios@gmail.com', '1984-08-22', 'Barrio Las Palmas 3626'),
(40, 'Adriana', 'Burgos', '2404040404', '0934040404', 'adriana.burgos@gmail.com', '1991-02-09', 'Urbanización El Lago 3727');
-- datos para la tabla de relacion doctor_paciente
INSERT INTO doctor_paciente (doctor_id, paciente_id, fecha_asignacion) VALUES
(1, 1, '2024-12-01'),
(1, 2, '2024-12-02'),
(2, 3, '2024-12-01'),
(2, 4, '2024-12-03'),
(3, 5, '2024-12-01'),
(3, 6, '2024-12-02'),
(4, 7, '2024-12-03'),
(4, 8, '2024-12-01'),
(5, 9, '2024-12-04'),
(5, 10, '2024-12-02'),
(6, 11, '2024-12-03'),
(6, 12, '2024-12-01'),
(7, 13, '2024-12-02'),
(7, 14, '2024-12-03'),
(8, 15, '2024-12-04'),
(8, 16, '2024-12-01'),
(9, 17, '2024-12-02'),
(9, 18, '2024-12-03'),
(10, 19, '2024-12-04'),
(10, 20, '2024-12-01'),
(1, 21, '2024-12-02'),
(2, 22, '2024-12-03'),
(3, 23, '2024-12-04'),
(4, 24, '2024-12-01'),
(5, 25, '2024-12-02'),
(6, 26, '2024-12-03'),
(7, 27, '2024-12-04'),
(8, 28, '2024-12-01'),
(9, 29, '2024-12-02'),
(10, 30, '2024-12-03'),
(1, 31, '2024-12-04'),
(2, 32, '2024-12-01'),
(3, 33, '2024-12-02'),
(4, 34, '2024-12-03'),
(5, 35, '2024-12-04'),
(6, 36, '2024-12-01'),
(7, 37, '2024-12-02'),
(8, 38, '2024-12-03'),
(9, 39, '2024-12-04'),
(10, 40, '2024-12-01'),
(1, 3, '2024-12-02'),
(2, 5, '2024-12-03'),
(3, 7, '2024-12-04'),
(4, 9, '2024-12-01'),
(5, 11, '2024-12-02'),
(6, 13, '2024-12-03'),
(7, 15, '2024-12-04'),
(8, 17, '2024-12-01'),
(9, 19, '2024-12-02'),
(10, 21, '2024-12-03');


