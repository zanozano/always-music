-- TABLA ALWAYS MUSIC ESTUDIANTES
CREATE DATABASE always_music

CREATE TABLE estudiantes (
	id SERIAL PRIMARY KEY,
	nombre varchar(30) NOT NULL,
	rut varchar(12) NOT NULL,
	curso varchar(30) NOT NULL,
	nivel int NOT NULL
);
SELECT * FROM estudiantes;
