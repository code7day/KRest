CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) NOT NULL,
  `title` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `author`, `title`) VALUES
(1, 'Bram Stoke', 'Dracula :D'),
(11, 'Calamardo', 'Tentaculos'),
(13, 'Cien aÃ±os de Soleda', 'GracÃ­a MÃ¡rquez'),
(8, 'Hola', 'Chao');