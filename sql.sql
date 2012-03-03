CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(30) COLLATE utf8_bin NOT NULL,
  `title` varchar(20) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=18 ;

INSERT INTO `books` (`id`, `author`, `title`) VALUES
(1, 'Bram Stoke', 'Drácula'),
(11, 'Calamardo', 'Tentaculos'),
(13, 'Gabriel García Máquez', 'Cien años de Soledad'),
(16, 'Alberto', 'Golat'),
(17, 'Alberto', 'El Silmarilion');
