-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2024 a las 12:05:20
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ser_consciente`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos_talleres`
--

CREATE TABLE `cursos_talleres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos_talleres`
--

INSERT INTO `cursos_talleres` (`id`, `tipo`, `titulo`, `fecha_inicio`, `fecha_fin`, `descripcion`) VALUES
(1, 'Curso', 'Introducción al Psicoanálisis', '2024-03-01', '2024-04-30', 'Este curso proporciona una introducción a las teorías fundamentales del psicoanálisis, explorando sus aplicaciones en la práctica clínica y personal.'),
(2, 'Taller', 'Sanación Energética con Reiki', '2024-04-15', '2024-05-15', 'Un taller práctico donde aprenderás a aplicar Reiki para equilibrar las energías del cuerpo y fomentar el bienestar físico y emocional.'),
(3, 'Curso', 'Terapias Alternativas', '2024-05-05', '2024-06-05', 'Curso avanzado sobre terapias alternativas, que abarca desde la aromaterapia hasta la acupuntura y otras técnicas complementarias.'),
(4, 'Taller', 'Desarrollo Personal a Través del Tarot', '2024-06-01', '2024-06-30', 'Taller interactivo en el que exploramos cómo el tarot puede ser utilizado como herramienta de autoconocimiento y desarrollo personal.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `embeds`
--

CREATE TABLE `embeds` (
  `id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `embeds`
--

INSERT INTO `embeds` (`id`, `link`, `created_at`) VALUES
(4, 'https://www.instagram.com/p/DC1-Nogun92/', '2024-12-02 18:51:11'),
(5, 'https://www.instagram.com/p/CltqB8wtgEd/', '2024-12-02 21:30:56'),
(6, 'https://www.facebook.com/Mhoni.Vidente.Noticias/posts/pfbid033Q4DT9gKR713EEaK7zx3kD6hGGM3PSZoE35omxHYrXZjjTYxxuKtBFNDUZSJvydVl', '2024-12-02 21:32:15'),
(7, 'https://www.facebook.com/pedroeb/posts/pfbid02a5kB73joZPDv3Q2W2GP9PwFbfXgQj75uCAAdjvFMVTbjwtkmhg4aNjgnEhn8WRWVl', '2024-12-02 21:33:42'),
(8, 'https://www.instagram.com/p/CyoQvh1LG2b/', '2024-12-04 16:21:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos_timeline`
--

CREATE TABLE `eventos_timeline` (
  `id` int(11) NOT NULL,
  `titulo` varchar(55) NOT NULL,
  `year` varchar(5) NOT NULL,
  `descripcion` text NOT NULL,
  `color` enum('primary','secondary','success','warning','error') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos_timeline`
--

INSERT INTO `eventos_timeline` (`id`, `titulo`, `year`, `descripcion`, `color`) VALUES
(1, 'Creación de la Empresa', '2024', 'Ser Consciente se fundó en 2024 con el propósito de ofrecer servicios de psicoanálisis, numerología y bienestar integral. Comenzamos con una visión clara de promover la sanación emocional y la autocomprensión en la comunidad.', 'primary'),
(2, 'Expansión de Servicios', '2024', 'En 2024, la empresa amplió su oferta de servicios incluyendo talleres y terapias grupales. El enfoque se amplió para incluir una mayor variedad de prácticas alternativas de bienestar, como la sanación energética.', 'secondary'),
(3, 'Logros y Reconocimientos', '2026', 'Para 2026, Ser Consciente ha recibido varios premios por su contribución al bienestar psicológico y espiritual. La empresa se ha consolidado como un referente en la región para la salud mental y emocional.', 'success'),
(4, 'Expansión Internacional', '2027', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet metus risus. Sed vitae velit at purus bibendum tempor. Phasellus vitae elit eu nisi vestibulum facilisis.', 'warning'),
(5, 'Proyección Futura', '2028', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae justo ut nisi faucibus dapibus non eu tortor. Aliquam erat volutpat. Vivamus tempor, velit ut dictum suscipit, nisi ligula efficitur nunc.', 'error'),
(7, 'Cursos', '2051', 'Todavía no empiezan', 'primary');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `detalle` text NOT NULL,
  `rutaImagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `titulo`, `descripcion`, `detalle`, `rutaImagen`) VALUES
(1, 'Psicoanálisis', 'Sesiones Terapéuticas', 'Estas sesiones están orientadas a explorar el inconsciente, identificando patrones y emociones profundas para promover el bienestar emocional.', '/images/psicoanalisisExample.jpg'),
(2, 'Numerología', 'Análisis Numérico', 'A través de la numerología, se interpretan los números asociados con tu vida para descubrir significados y patrones que te ayudan a entender tu propósito.', '/images/Placeholder1.png'),
(3, 'Cartas Astrales', 'Lectura Astrológica', 'La lectura de cartas astrales conecta aspectos de tu vida con la influencia de los astros, identificando fortalezas y desafíos.', '/images/Placeholder2.jpg'),
(4, 'Constelaciones Familiares', 'Sesiones Transformadoras', 'Estas sesiones trabajan en sanar vínculos familiares mediante dinámicas que mejoran las relaciones con tus seres queridos.', '/images/Placeholder3.jpeg'),
(5, 'Sanación Energética', 'Equilibrio Energético', 'A través de técnicas energéticas, estas sesiones buscan equilibrar el flujo de energía en tu cuerpo, promoviendo armonía y relajación.', '/images/tarotExample.jpeg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `testimonios`
--

CREATE TABLE `testimonios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `emoji` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `testimonios`
--

INSERT INTO `testimonios` (`id`, `nombre`, `rol`, `mensaje`, `emoji`) VALUES
(1, 'María G.', 'Paciente', '¡Increíble experiencia de sanación!', '😊'),
(2, 'Javier M.', 'Cliente', 'Conocimientos profundos y útiles', '😊'),
(3, 'Laura R.', 'Visitante', '¡Una joya en el arte de sanar!', '🌟'),
(4, 'Jona G.', 'Trabajador', '¡Es lo mejor trabajar aquí, gracias por la oportunidad!', '😇'),
(5, 'Fatima B.', 'Diseñadora', 'Realmente emocionante contribuir', '☘️'),
(6, 'Ana M.', 'Cliente', '¡Grandes personas, son de gran ayuda!', '👩‍⚕️'),
(7, 'Said M.', 'Paciente', 'Una gran experiencia, estoy muy agradecido por toda la ayuda.', '👼🏻');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cursos_talleres`
--
ALTER TABLE `cursos_talleres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `embeds`
--
ALTER TABLE `embeds`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos_timeline`
--
ALTER TABLE `eventos_timeline`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cursos_talleres`
--
ALTER TABLE `cursos_talleres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `embeds`
--
ALTER TABLE `embeds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `eventos_timeline`
--
ALTER TABLE `eventos_timeline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `testimonios`
--
ALTER TABLE `testimonios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
