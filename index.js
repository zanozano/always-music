const { Client } = require('pg');

//LINEA DE COMANDOS
const cmd = process.argv.slice(2);

let argFunction = cmd[0];
let argData1 = cmd[1];
let argData2 = cmd[2];
let argData3 = cmd[3];
let argData4 = cmd[4];

//1. Realizar la conexión con PostgreSQL con la clase Client.
const config = {
	user: 'postgres',
	host: 'localhost',
	database: 'always_music',
	password: 'postgres',
	port: 5433,
};
const client = new Client(config);
client.connect();

//2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos
if (argFunction == 'nuevo') {
	async function nuevo(nombre, rut, curso, nivel) {
		const res = await client.query(
			`INSERT INTO estudiantes (nombre,rut,curso,nivel) VALUES ('${nombre}','${rut}','${curso}','${nivel}') RETURNING *;`
		);
		console.log('Estudiante', res.rows[0].nombre, 'fue agregado con éxito');
		client.end();
	}
	nuevo(argData1, argData2, argData3, argData4);
}

//3. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
if (argFunction == 'rut') {
	async function rut(rut) {
		const res = await client.query(`SELECT * FROM estudiantes WHERE rut = '${rut}';`);
		console.log('Registro actual', res.rows[0]);
		client.end();
	}
	rut(argData1);
}
//4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
if (argFunction == 'consulta') {
	async function consulta() {
		const res = await client.query('SELECT * FROM estudiantes;');
		console.log('Todo los registros', res.rows);
		client.end();
	}
	consulta();
}
//5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
if (argFunction == 'editar') {
	async function editar(nombre, rut, curso, nivel) {
		const res = await client.query(
			`UPDATE estudiantes SET nombre = '${nombre}', curso = '${curso}', nivel = '${nivel}' WHERE rut = '${rut}' RETURNING *;`
		);
		console.log('Estudiante', res.rows[0].nombre, 'fue editado con éxito');
		client.end();
	}
	editar(argData1, argData2, argData3, argData4);
}
//6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
if (argFunction == 'eliminar') {
	async function eliminar(rut) {
		const res = await client.query(`DELETE FROM estudiantes WHERE rut = '${rut}' RETURNING *;`);
		console.log('Cantidad de registros afectados', res.rowCount);
		console.log('Estudiante', res.rows[0].nombre, 'fue eliminado con éxito');
		client.end();
	}
	eliminar(argData1);
}
