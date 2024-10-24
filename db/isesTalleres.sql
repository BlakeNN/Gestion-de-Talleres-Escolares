-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2024 a las 20:37:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `isestalleres`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE `inscripciones` (
  `id_insc` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_taller` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripciones`
--

INSERT INTO `inscripciones` (`id_insc`, `id_user`, `id_taller`) VALUES
(1, 2, 1),
(3, 6, 3),
(4, 8, 4),
(5, 10, 5),
(6, 12, 6),
(7, 14, 7),
(8, 16, 8),
(9, 18, 9),
(10, 20, 10),
(11, 22, 11),
(12, 24, 12),
(13, 26, 13),
(14, 28, 14),
(15, 30, 15),
(16, 32, 16),
(17, 34, 17),
(18, 36, 18),
(19, 38, 19),
(20, 40, 20),
(21, 26, 1),
(22, 38, 1),
(23, 50, 1),
(24, 26, 1),
(25, 2, 1),
(26, 50, 1),
(27, 38, 1),
(28, 2, 1),
(29, 26, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talleres`
--

CREATE TABLE `talleres` (
  `id_taller` int(11) NOT NULL,
  `taller` varchar(50) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `cursoTaller` int(11) DEFAULT NULL,
  `carreraTaller` varchar(50) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talleres`
--

INSERT INTO `talleres` (`id_taller`, `taller`, `id_user`, `cursoTaller`, `carreraTaller`, `fecha`, `hora`) VALUES
(1, 'Taller de HTML5', 1, 1, 'Desarrollo Web', '2024-11-29', '10:00:00'),
(3, 'Taller de Cocina Italiana', 5, 3, 'Gastronomia', '2024-11-03', '12:00:00'),
(4, 'Taller de Node.js', 7, 4, 'Desarrollo Web', '2024-11-04', '13:00:00'),
(5, 'Taller de Criptografía', 9, 1, 'Ciberseguridad', '2024-11-05', '14:00:00'),
(6, 'Taller de Pastelería Avanzada', 11, 2, 'Gastronomia', '2024-11-06', '15:00:00'),
(7, 'Taller de CSS3 y Flexbox', 13, 3, 'Desarrollo Web', '2024-11-07', '16:00:00'),
(8, 'Taller de Hacking Ético', 15, 4, 'Ciberseguridad', '2024-11-08', '17:00:00'),
(9, 'Taller de Cocina Vegana', 17, 1, 'Gastronomia', '2024-11-09', '10:00:00'),
(10, 'Taller de JavaScript ES6+', 19, 2, 'Desarrollo Web', '2024-11-10', '11:00:00'),
(11, 'Taller de Forense Digital', 1, 3, 'Ciberseguridad', '2024-11-11', '12:00:00'),
(12, 'Taller de Cocina Mediterránea', 3, 4, 'Gastronomia', '2024-11-12', '13:00:00'),
(13, 'Taller de React.js', 5, 1, 'Desarrollo Web', '2024-11-13', '14:00:00'),
(14, 'Taller de Redes Privadas Virtuales (VPN)', 7, 2, 'Ciberseguridad', '2024-11-14', '15:00:00'),
(15, 'Taller de Cocina Mexicana', 9, 3, 'Gastronomia', '2024-11-15', '16:00:00'),
(16, 'Taller de MongoDB y NoSQL', 11, 4, 'Desarrollo Web', '2024-11-16', '17:00:00'),
(17, 'Taller de Ciberseguridad en IoT', 13, 1, 'Ciberseguridad', '2024-11-17', '10:00:00'),
(18, 'Taller de Cocina de Postres', 15, 2, 'Gastronomia', '2024-11-18', '11:00:00'),
(19, 'Taller de Express.js', 17, 3, 'Desarrollo Web', '2024-11-19', '12:00:00'),
(20, 'Taller de Seguridad en Aplicaciones Web', 19, 4, 'Ciberseguridad', '2024-11-20', '13:00:00'),
(22, 'Taller de WebSockets y Tiempo Real', 3, 2, 'Desarrollo Web', '2024-11-22', '15:00:00'),
(23, 'Taller de Pentesting', 5, 3, 'Ciberseguridad', '2024-11-23', '16:00:00'),
(24, 'Taller de Cocina Molecular', 7, 4, 'Gastronomia', '2024-11-24', '17:00:00'),
(25, 'Taller de DevOps con Docker', 9, 1, 'Desarrollo Web', '2024-11-25', '10:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `user` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `firstLog` tinyint(1) DEFAULT 1,
  `role` enum('prof','almn') NOT NULL,
  `curso` int(1) DEFAULT NULL,
  `carrera` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `user`, `password`, `firstLog`, `role`, `curso`, `carrera`) VALUES
(1, 'Juan Carlos Perez', '$2b$10$wEa6xk0KD.XGYwhZUn2IU.W3.IdiaDIZIXVcpBDjSlfq/xy6hbR0q', 0, 'prof', NULL, NULL),
(2, 'Juan Carlos Pérez', '$2b$10$wEa6xk0KD.XGYwhZUn2IU.W3.IdiaDIZIXVcpBDjSlfq/xy6hbR0q', 0, 'almn', 1, 'Desarrollo Web'),
(3, 'Maria Elena Gomez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(4, 'María Elena Gómez', '$2b$10$ABC123...', 1, 'almn', 2, 'Ciberseguridad'),
(5, 'Carlos Alberto Lopez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(6, 'Ana Sofía Martínez', '$2b$10$ABC123...', 1, 'almn', 3, 'Gastronomía'),
(7, 'Sofia Carolina Martinez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(8, 'Pedro Luis Torres', '$2b$10$ABC123...', 1, 'almn', 4, 'Desarrollo Web'),
(9, 'Lucas David Rodriguez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(10, 'Lucía Fernanda Díaz', '$2b$10$ABC123...', 1, 'almn', 1, 'Ciberseguridad'),
(11, 'Ana Maria Mendez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(12, 'Miguel Ángel López', '$2b$10$ABC123...', 1, 'almn', 2, 'Gastronomía'),
(13, 'Pedro Luis Diaz', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(14, 'Carlos Eduardo Morales', '$2b$10$ABC123...', 1, 'almn', 3, 'Desarrollo Web'),
(15, 'Laura Beatriz Sanchez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(16, 'Andrea Patricia Sánchez', '$2b$10$ABC123...', 1, 'almn', 4, 'Ciberseguridad'),
(17, 'Diego Alejandro Alvarez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(18, 'Roberto Javier Castillo', '$2b$10$ABC123...', 1, 'almn', 1, 'Gastronomía'),
(19, 'Claudia Fernanda Ramirez', '$2b$10$Ej5tKIXdrlkFp2ZNE0FR9eGpF8wq2Rc7P5UlKu6POOCzwrnEab65G', 1, 'prof', NULL, NULL),
(20, 'Daniela Victoria Herrera', '$2b$10$ABC123...', 1, 'almn', 2, 'Desarrollo Web'),
(22, 'Sofía Isabel Reyes', '$2b$10$ABC123...', 1, 'almn', 3, 'Ciberseguridad'),
(24, 'José Manuel Ramírez', '$2b$10$ABC123...', 1, 'almn', 4, 'Gastronomía'),
(26, 'Elena Gabriela Ortiz', '$2b$10$ABC123...', 1, 'almn', 1, 'Desarrollo Web'),
(28, 'Francisco Javier Gutiérrez', '$2b$10$ABC123...', 1, 'almn', 2, 'Ciberseguridad'),
(30, 'Sara Valentina Vega', '$2b$10$ABC123...', 1, 'almn', 3, 'Gastronomía'),
(32, 'Diego Fernando Ruiz', '$2b$10$ABC123...', 1, 'almn', 4, 'Desarrollo Web'),
(34, 'Paula Andrea Navarro', '$2b$10$ABC123...', 1, 'almn', 1, 'Ciberseguridad'),
(36, 'Ricardo Alejandro Cruz', '$2b$10$ABC123...', 1, 'almn', 2, 'Gastronomía'),
(38, 'Natalia Laura Mendoza', '$2b$10$ABC123...', 1, 'almn', 3, 'Desarrollo Web'),
(40, 'Enrique Eduardo Flores', '$2b$10$ABC123...', 1, 'almn', 4, 'Ciberseguridad'),
(42, 'Mónica Marcela Rodríguez', '$2b$10$ABC123...', 1, 'almn', 1, 'Gastronomía'),
(44, 'Guillermo David Mejía', '$2b$10$ABC123...', 1, 'almn', 2, 'Desarrollo Web'),
(46, 'Camila Alejandra Vargas', '$2b$10$ABC123...', 1, 'almn', 3, 'Ciberseguridad'),
(48, 'Andrés Felipe Paredes', '$2b$10$ABC123...', 1, 'almn', 4, 'Gastronomía'),
(50, 'Patricia Lucía Salazar', '$2b$10$ABC123...', 1, 'almn', 1, 'Desarrollo Web'),
(52, 'Sebastián Andrés Muñoz', '$2b$10$ABC123...', 1, 'almn', 2, 'Ciberseguridad'),
(54, 'Luis Gabriel Acosta', '$2b$10$ABC123...', 1, 'almn', 3, 'Gastronomía'),
(56, 'Verónica Beatriz Campos', '$2b$10$ABC123...', 1, 'almn', 4, 'Desarrollo Web'),
(58, 'Fernando Daniel Chávez', '$2b$10$ABC123...', 1, 'almn', 1, 'Ciberseguridad'),
(60, 'Alejandra Sofía Herrera', '$2b$10$ABC123...', 1, 'almn', 2, 'Gastronomía');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD PRIMARY KEY (`id_insc`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_taller` (`id_taller`);

--
-- Indices de la tabla `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`id_taller`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  MODIFY `id_insc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `talleres`
--
ALTER TABLE `talleres`
  MODIFY `id_taller` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`id_taller`) REFERENCES `talleres` (`id_taller`) ON DELETE CASCADE;

--
-- Filtros para la tabla `talleres`
--
ALTER TABLE `talleres`
  ADD CONSTRAINT `talleres_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `eliminarTaller` ON SCHEDULE EVERY 1 MINUTE STARTS '2024-10-23 15:33:09' ON COMPLETION PRESERVE DISABLE DO DELETE FROM talleres WHERE fecha < NOW() - INTERVAL 1 HOUR$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
